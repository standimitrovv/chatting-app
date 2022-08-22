import { AvailableUserStatuses } from '../../app/models/AvailableUserStatuses';

export interface User {
  _id: string;
  email: string;
  fullName: string;
  photoUrl: string;
  userId: string;
  status: AvailableUserStatuses;
}
