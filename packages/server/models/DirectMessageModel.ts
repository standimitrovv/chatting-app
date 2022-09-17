import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DirectMessageSchema = new Schema<DirectMessage>({
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

export const DirectMessageModel = mongoose.model<DirectMessage>(
  'Direct-Message',
  DirectMessageSchema
);

export interface DirectMessage {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: Date;
}
