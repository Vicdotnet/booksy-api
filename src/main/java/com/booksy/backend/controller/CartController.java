package com.booksy.backend.controller;

import com.booksy.backend.model.CartItem;
import com.booksy.backend.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    // comision del 10%
    private static final double COMMISSION_RATE = 0.10;

    // obtener items del carrito de un usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable String userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);
        return ResponseEntity.ok(items);
    }

    // agregar item al carrito
    @PostMapping
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem cartItem) {
        CartItem savedItem = cartItemRepository.save(cartItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }

    // actualizar cantidad de un item
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCartItem(@PathVariable String id, @RequestBody Map<String, Integer> request) {
        var itemOpt = cartItemRepository.findById(id);

        if (itemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("item no encontrado");
        }

        CartItem item = itemOpt.get();
        item.setQuantity(request.get("quantity"));

        CartItem updatedItem = cartItemRepository.save(item);
        return ResponseEntity.ok(updatedItem);
    }

    // eliminar item del carrito
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable String id) {
        if (!cartItemRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("item no encontrado");
        }

        cartItemRepository.deleteById(id);
        return ResponseEntity.ok("item eliminado");
    }

    // calcular total del carrito con comision
    @GetMapping("/total/{userId}")
    public ResponseEntity<Map<String, Double>> getCartTotal(@PathVariable String userId) {
        List<CartItem> items = cartItemRepository.findByUserId(userId);

        // calcular subtotal
        double subtotal = items.stream()
                .mapToDouble(item -> item.getPricePerUnit() * item.getQuantity())
                .sum();

        // calcular comision
        double commission = subtotal * COMMISSION_RATE;

        // total final
        double total = subtotal + commission;

        Map<String, Double> response = new HashMap<>();
        response.put("subtotal", subtotal);
        response.put("commission", commission);
        response.put("total", total);

        return ResponseEntity.ok(response);
    }

    // limpiar carrito
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<?> clearCart(@PathVariable String userId) {
        cartItemRepository.deleteByUserId(userId);
        return ResponseEntity.ok("carrito limpiado");
    }
}