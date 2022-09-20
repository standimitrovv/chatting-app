import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  members: {
    type: Array,
    required: true,
  },
});

export const ConversationModel = mongoose.model(
  'User-Conversation',
  ConversationSchema
);

export interface Conversation {
  _id: string;
  members: [string, string];
}
