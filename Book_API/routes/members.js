const express = require('express');
const router = express.Router();
const Member = require('../models/member');

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get('/', async (req, res) => {
  const members = await Member.find();
  const result = members.map(member => ({
    code: member.code,
    name: member.name,
    borrowedBooksCount: member.borrowedBooks.length
  }));
  res.json(result);
});

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Add a new member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *           example:
 *             code: "M001"
 *             name: "Angga"
 *     responses:
 *       200:
 *         description: Member added successfully
 */
router.post('/', async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.json({ message: 'Member added successfully' });
});

module.exports = router;
