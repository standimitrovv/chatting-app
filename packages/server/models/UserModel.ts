import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
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
    required: true,
  },
});

export const UserModel = mongoose.model<User>('Users', UserSchema);

export interface User extends Document {
  _id: string;
  email: string;
  fullName: string;
  photoUrl: string;
  userId: string;
  status: UserStatus;
}

export type UserStatus = 'Online' | 'Do Not Disturb' | 'Away' | 'Offline';
