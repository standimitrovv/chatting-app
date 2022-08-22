import mongoose from 'mongoose';

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

export const AllChatMessageModel = mongoose.model(
  'All-Chat-Message',
  MessageSchema
);
