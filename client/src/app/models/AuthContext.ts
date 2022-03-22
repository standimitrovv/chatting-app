import { UserCredentials } from './UserCredentials';

export interface AuthContext {
  isLoggedIn: boolean;
  userCredentials: UserCredentials | undefined;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
}
