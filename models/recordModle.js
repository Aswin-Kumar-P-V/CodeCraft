const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  Userprompt: {
    type: String,
    required: true
  },
  GeneratedResult: {
    type: String,
    required: true
  },
  Favorite: {
    type: Boolean,
    default: false
  },
  userEmail: {
    type: String,
    required: true
  }
});

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;