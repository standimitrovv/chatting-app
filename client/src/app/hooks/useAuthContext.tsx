import React, { useState, createContext, useContext } from 'react';
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

export const AuthProvider: React.FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userCredentials, setUserCredentials] = useState<
    UserCredentials | undefined
  >({
    email: '',
    fullName: '',
    photoUrl: '',
    userId: '',
  });

  const login = (userCredentials: UserCredentials) => {
    setIsLoggedIn(true);
    setUserCredentials(userCredentials);
    localStorage.setItem('userData', JSON.stringify(userCredentials));
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserCredentials(undefined);
    localStorage.removeItem('userData');
  };

  const context = {
    isLoggedIn,
    userCredentials,
    login,
    logout,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};
