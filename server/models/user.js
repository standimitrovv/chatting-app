const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: 'Message',
  },
  status: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
