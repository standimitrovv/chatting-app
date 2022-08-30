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

interface MessageModel {
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
}

export interface MessageResult extends MessageModel {
  _id: string;
}
