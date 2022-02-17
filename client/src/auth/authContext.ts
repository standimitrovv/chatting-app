import { createContext } from 'react';

export interface UserCredentials {
  email: string;
  fullName: string;
  photoUrl: string;
  userId: string;
}

interface Context {
  isLoggedIn: boolean;
  userCredentials: UserCredentials | undefined;
  login: (userCredentials: UserCredentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<Context>({
  isLoggedIn: false,
  userCredentials: undefined,
  login: (userCredentials: UserCredentials) => {},
  logout: () => {},
});
