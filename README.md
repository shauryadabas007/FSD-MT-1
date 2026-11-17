
# Library Book Management API

## Description
A REST API developed using Node.js and Express.js for managing library books.

## Technologies Used
- Node.js
- Express.js
- JavaScript

## Installation

1. Clone the repository.
2. Install dependencies:

npm install

3. Start the server:

node server.js

## Server
http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/books | Get all books |
| POST | /api/books | Add a new book |
| GET | /api/books/:id | Get book by ID |
| PUT | /api/books/:id | Update book |
| DELETE | /api/books/:id | Delete book |
| GET | /api/books/filter?author=value | Filter by author |