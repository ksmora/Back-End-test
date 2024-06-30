const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const swagger = require('../server')

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Member'
 */
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "JK-45"
 *               title:
 *                 type: string
 *                 example: "Harry Potter"
 *               author:
 *                 type: string
 *                 example: "J.K. Rowling"
 *               stock:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Book added successfully
 */
/* add a book */
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json({ message: 'Book added successfully' });
});

/**
 * @swagger
 * /books/batch:
 *   post:
 *     summary: Add multiple books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Books added successfully
 */

/* Add  books */
router.post('/batch', async (req, res) => {
  try {
    await Book.insertMany(req.body);
    res.json({ message: 'Books added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding books', error });
  }
});

module.exports = router;
