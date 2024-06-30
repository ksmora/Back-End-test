// tests/books.test.js
const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');

describe('Books API', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should fetch all books', async () => {
    // const res = await request(app).get('/books');
    const res = await request(app).get('/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a new book', async () => {
    const newBook = {
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K. Rowling",
      stock: 1
    };

    const res = await request(app)
      .post('/books')
      .send(newBook);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Book added successfully');
  });
});
