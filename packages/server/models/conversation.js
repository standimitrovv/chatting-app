const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  members: {
    type: Array,
  },
});

const ConversationModel = mongoose.model('User-Conversation', ConversationSchema);
module.exports = ConversationModel;
