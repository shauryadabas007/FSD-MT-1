const express = require('express');
const app = express();

app.use(express.json());

let books = [
    {    
        id: 101,
        title: "Wings of Fire",
        author: "APJ Abdul Kalam",
        genre: "Autobiography",
        publishedYear: 1999,
        available: true
    },
    {
        id: 102,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        publishedYear: 1998,
        available: true
    },
    {
        id: 103,
        title: "Harry Potter",
        author: "J.K. Rowling",
        genre: "Fantasy",
        publishedYear: "1997",
        available: false
    }
];

// Get all books

app.get('/api/books', (req, res) => {
    res.status(200).json(books);
});

// Post a new book

app.post('/api/books', (req, res) => {
    const { title, author, genre, publishedYear, available } = req.body;

    if (
        typeof title !== 'string' || !title.trim() ||
        typeof author !== 'string' || !author.trim() ||
        typeof genre !== 'string' || !genre.trim() ||
        typeof publishedYear !== 'number' ||
        !Number.isInteger(publishedYear) ||
        typeof available !== 'boolean'
    ) {
        return res.status(400).json({
            message: "Invalid input. All fields are required."
        });
    }

    const newBook = {
        id: Math.max(...books.map(book => book.id), 100) + 1,
        title,
        author,
        genre,
        publishedYear,
        available
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// Get book by ID

app.get('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json(book);
});

// Put update the book

app.put('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, genre, publishedYear, available } = req.body;

    if (
        typeof title !== 'string' || !title.trim() ||
        typeof author !== 'string' || !author.trim() ||
        typeof genre !== 'string' || !genre.trim() ||
        typeof publishedYear !== 'number' ||
        !Number.isInteger(publishedYear) ||
        typeof available !== 'boolean'
    ) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.publishedYear = publishedYear;
    book.available = available;

    res.status(200).json(book);
});

// Delete a book

app.delete('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(index, 1);

    res.status(200).json({
        message: "Book deleted successfully"
    });
});

// Filter books by author

app.get('/api/books/filter', (req, res) => {
    const author = req.query.author;

    if (typeof author !== 'string') {
        return res.status(400).json({
            message: "Author query parameter is required"
        });
    }

    const result = books.filter(book =>
        book.author.toLowerCase() === author.toLowerCase()
    );

    res.status(200).json(result);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});