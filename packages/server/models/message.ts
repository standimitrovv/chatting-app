import mongoose from 'mongoose';

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
  createdAt: {
    type: Date,
    required: true,
  },
});

export const MessageModel = mongoose.model('Message', MessageSchema);

export interface Message {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
}
