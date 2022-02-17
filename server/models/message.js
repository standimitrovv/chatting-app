const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
    ref: 'Users',
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
