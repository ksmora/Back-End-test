const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  code: String,
  title: String,
  author: String,
  stock: Number
});

module.exports = mongoose.model('Book', bookSchema);
