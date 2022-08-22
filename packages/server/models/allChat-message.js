const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  usersName: {
    type: String,
    required: true,
  },
  usersImageUrl: {
    type: String,
    required: true,
  },
  dateOfSending: {
    type: Date,
    required: true,
  },
  creator: {
    type: String,
    required: true,
    ref: 'Users',
  },
});

const MessageModel = mongoose.model('All-Chat-Message', MessageSchema);
module.exports = MessageModel;
