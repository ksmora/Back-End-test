const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Member = require('../models/member');

/**
 * @swagger
 * /transactions/borrow:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 */
router.post('/borrow', async (req, res) => {
  const { memberCode, bookCode } = req.body;

  const member = await Member.findOne({ code: memberCode });
  const book = await Book.findOne({ code: bookCode });

  if (!member || !book) {
    return res.status(404).json({ message: 'Member or Book not found' });
  }

  if (member.borrowedBooks.length >= 2) {
    return res.status(400).json({ message: 'Cannot borrow more than 2 books' });
  }

  if (member.penaltyEndDate && member.penaltyEndDate > new Date()) {
    return res.status(400).json({ message: 'Member is currently penalized' });
  }

  if (book.stock <= 0) {
    return res.status(400).json({ message: 'Book is not available' });
  }

  member.borrowedBooks.push({ bookId: book._id, borrowedDate: new Date() });
  book.stock -= 1;

  await member.save();
  await book.save();

  res.json({ message: 'Book borrowed successfully' });
});

/**
 * @swagger
 * /transactions/return:
 *   post:
 *     summary: Return a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *             example:
 *              memberCode: "M001"
 *              bookCode: "JK-45"
 *     responses:
 *       200:
 *         description: Book returned successfully
 */
router.post('/return', async (req, res) => {
  const { memberCode, bookCode } = req.body;

  const member = await Member.findOne({ code: memberCode });
  const book = await Book.findOne({ code: bookCode });

  if (!member || !book) {
    return res.status(404).json({ message: 'Member or Book not found' });
  }

  const borrowedBookIndex = member.borrowedBooks.findIndex(b => b.bookId.equals(book._id));

  if (borrowedBookIndex === -1) {
    return res.status(400).json({ message: 'Book not borrowed by this member' });
  }

  const borrowedBook = member.borrowedBooks[borrowedBookIndex];
  const borrowedDate = borrowedBook.borrowedDate;

  const returnDate = new Date();
  const diffDays = Math.ceil((returnDate - borrowedDate) / (1000 * 60 * 60 * 24));

  if (diffDays > 7) {
    member.penaltyEndDate = new Date(returnDate.setDate(returnDate.getDate() + 3));
  }

  member.borrowedBooks.splice(borrowedBookIndex, 1);
  book.stock += 1;

  await member.save();
  await book.save();

  res.json({ message: 'Book returned successfully' });
});

module.exports = router;
