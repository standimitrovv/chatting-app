import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema<AllChatMessage>({
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

export const AllChatMessageModel = mongoose.model<AllChatMessage>(
  'All-Chat-Message',
  MessageSchema
);

export interface AllChatMessage {
  _id: string;
  text: string;
  usersName: string;
  usersImageUrl: string;
  dateOfSending: Date;
  creator: string;
}
