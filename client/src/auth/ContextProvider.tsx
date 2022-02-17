import React, { useState } from 'react';
import { AuthContext, UserCredentials } from './authContext';

interface Props {
  children: React.ReactNode;
}

const ContextProvider: React.FC<Props> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userCredentials, setUserCredentials] = useState<
    UserCredentials | undefined
  >(undefined);

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

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
