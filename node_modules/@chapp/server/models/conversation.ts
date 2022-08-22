import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  members: {
    type: Array,
  },
});

export const ConversationModel = mongoose.model(
  'User-Conversation',
  ConversationSchema
);
