package com.booksy.backend.controller;

import com.booksy.backend.model.User;
import com.booksy.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // registro
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String email = request.get("email");
        String password = request.get("password");

        // validar si el email ya existe
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "email ya existe"));
        }

        // crear usuario
        User user = new User(name, email, password);
        User savedUser = userRepository.save(user);

        // respuesta
        Map<String, Object> response = new HashMap<>();
        response.put("authToken", "token_" + savedUser.getId());
        response.put("userId", savedUser.getId());

        return ResponseEntity.ok(response);
    }

    // login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        // buscar usuario
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "credenciales invalidas"));
        }

        User user = userOpt.get();

        // respuesta
        Map<String, Object> response = new HashMap<>();
        response.put("authToken", "token_" + user.getId());
        response.put("userId", user.getId());

        return ResponseEntity.ok(response);
    }

    // obtener usuario
    @GetMapping("/me/{userId}")
    public ResponseEntity<?> getUser(@PathVariable String userId) {
        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "usuario no encontrado"));
        }

        User user = userOpt.get();

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }
}