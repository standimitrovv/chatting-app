import { AvailableUserStatuses } from './AvailableUserStatuses';
import { UserCredentials } from './UserCredentials';

export interface AuthContext {
  isLoggedIn: boolean;
  userCredentials: UserCredentials | undefined;
  userStatus: AvailableUserStatuses | undefined;
  onUserStatusChange: (status: AvailableUserStatuses) => void;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
}
