const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/booksydb';

const books = [
  {
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    price: 15.99,
    category: 'Ficción',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91TvVQS7loL.jpg'
  },
  {
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    price: 12.50,
    category: 'Clásicos',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81z8Ov3EAOL.jpg'
  },
  {
    title: 'El código limpio',
    author: 'Robert C. Martin',
    price: 45.00,
    category: 'Programación',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51E2055ZGUL.jpg'
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 20.00,
    category: 'Historia',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71VDjGfPuNL.jpg'
  },
  {
    title: 'El principito',
    author: 'Antoine de Saint-Exupéry',
    price: 10.99,
    category: 'Infantil',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71OZY035FKL.jpg'
  },
  {
    title: '1984',
    author: 'George Orwell',
    price: 14.99,
    category: 'Ficción',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg'
  },
  {
    title: 'Estructuras de datos en Java',
    author: 'Mark Allen Weiss',
    price: 55.00,
    category: 'Programación',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ZVKT0Q2PL.jpg'
  },
  {
    title: 'Breve historia del tiempo',
    author: 'Stephen Hawking',
    price: 18.50,
    category: 'Ciencia',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81SZE8XN0QL.jpg'
  },
  {
    title: 'Harry Potter y la piedra filosofal',
    author: 'J.K. Rowling',
    price: 22.00,
    category: 'Fantasía',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg'
  },
  {
    title: 'El origen de las especies',
    author: 'Charles Darwin',
    price: 16.00,
    category: 'Ciencia',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71eCJv0CyYL.jpg'
  }
];

async function seed() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('conectado a mongodb');
    
    const db = client.db();
    const booksCollection = db.collection('books');
    
    await booksCollection.deleteMany({});
    console.log('coleccion limpiada');
    
    const result = await booksCollection.insertMany(books);
    console.log(`${result.insertedCount} libros insertados`);
    
  } catch (error) {
    console.error('error:', error);
  } finally {
    await client.close();
  }
}

seed();
