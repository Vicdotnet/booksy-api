-- poblar usuarios
INSERT INTO users (name, email, password) VALUES
('Juan Perez', 'juan@mail.com', 'password123'),
('Maria Lopez', 'maria@mail.com', 'password123'),
('Pedro Silva', 'pedro@mail.com', 'password123')
ON CONFLICT DO NOTHING;

-- poblar libros
INSERT INTO books (title, author, price, category, image_url) VALUES
('El Quijote', 'Miguel de Cervantes', 15000.0, 'Clasicos', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'),
('Cien Años de Soledad', 'Gabriel Garcia Marquez', 18000.0, 'Ficcion', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'),
('1984', 'George Orwell', 12000.0, 'Ciencia Ficcion', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'),
('El Principito', 'Antoine de Saint-Exupery', 9000.0, 'Infantil', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'),
('Harry Potter', 'J.K. Rowling', 22000.0, 'Fantasia', 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400'),
('El Hobbit', 'J.R.R. Tolkien', 20000.0, 'Fantasia', 'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400'),
('Orgullo y Prejuicio', 'Jane Austen', 14000.0, 'Romance', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'),
('Crimen y Castigo', 'Fiodor Dostoievski', 16000.0, 'Clasicos', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400'),
('La Odisea', 'Homero', 13000.0, 'Clasicos', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400'),
('El Alquimista', 'Paulo Coelho', 11000.0, 'Autoayuda', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400')
ON CONFLICT DO NOTHING;