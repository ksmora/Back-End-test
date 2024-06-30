const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  code: String,
  name: String,
  borrowedBooks: [
    {
      bookId: mongoose.Schema.Types.ObjectId,
      borrowedDate: Date
    }
  ],
  penaltyEndDate: Date
});

module.exports = mongoose.model('Member', memberSchema);
