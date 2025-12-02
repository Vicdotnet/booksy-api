package com.booksy.backend.controller;

import com.booksy.backend.model.Book;
import com.booksy.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    // obtener todos los libros
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return ResponseEntity.ok(books);
    }

    // obtener libro por id
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable String id) {
        Optional<Book> book = bookRepository.findById(id);

        if (book.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("libro no encontrado");
        }

        return ResponseEntity.ok(book.get());
    }

    // obtener libros por categoria
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Book>> getBooksByCategory(@PathVariable String category) {
        List<Book> books = bookRepository.findByCategory(category);
        return ResponseEntity.ok(books);
    }

    // crear libro
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book savedBook = bookRepository.save(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }

    // actualizar libro
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable String id, @RequestBody Book bookDetails) {
        Optional<Book> bookOpt = bookRepository.findById(id);

        if (bookOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("libro no encontrado");
        }

        Book book = bookOpt.get();
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPrice(bookDetails.getPrice());
        book.setCategory(bookDetails.getCategory());
        book.setImageUrl(bookDetails.getImageUrl());

        Book updatedBook = bookRepository.save(book);
        return ResponseEntity.ok(updatedBook);
    }

    // eliminar libro
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable String id) {
        if (!bookRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("libro no encontrado");
        }

        bookRepository.deleteById(id);
        return ResponseEntity.ok("libro eliminado");
    }
}