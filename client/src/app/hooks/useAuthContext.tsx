import { createContext, useContext } from 'react';
import { AuthContext } from '../models/AuthContext';
import { UserCredentials } from '../models/UserCredentials';

export const Context = createContext<AuthContext>({
  isLoggedIn: false,
  userCredentials: undefined,
  login: (userCredentials: UserCredentials) => {},
  logout: () => {},
});

export const useAuthContext = () => {
  const AuthContext = useContext(Context);

  if (!AuthContext) {
    throw new Error('Missing Provider for AuthContext');
  }

  return AuthContext;
};
