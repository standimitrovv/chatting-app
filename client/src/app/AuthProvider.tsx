import React, { useState } from 'react';
import { UserCredentials } from './models/UserCredentials';
import { Context } from './hooks/useAuthContext';

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
