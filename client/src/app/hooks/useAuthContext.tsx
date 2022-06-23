import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { AuthContext } from '../models/AuthContext';
import { AvailableUserStatuses } from '../models/AvailableUserStatuses';
import { UserCredentials } from '../models/UserCredentials';

export const Context = createContext<AuthContext>({
  isLoggedIn: false,
  userCredentials: undefined,
  userStatus: undefined,
  onUserStatusChange: (status: AvailableUserStatuses) => {},
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
  >(undefined);

  const [userStatus, setUserStatus] =
    useState<AvailableUserStatuses>('Available');

  const login = useCallback((userCredentials: UserCredentials) => {
    setIsLoggedIn(true);
    setUserCredentials(userCredentials);
    localStorage.setItem('userData', JSON.stringify(userCredentials));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserCredentials(undefined);
    localStorage.removeItem('userData');
  }, []);

  const onUserStatusChange = useCallback((status: AvailableUserStatuses) => {
    setUserStatus(status);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const parsedUserData = JSON.parse(userData);
    login(parsedUserData);
  }, [login]);

  const context = useMemo(
    () => ({
      isLoggedIn,
      userCredentials,
      userStatus,
      onUserStatusChange,
      login,
      logout,
    }),
    [isLoggedIn, userCredentials, userStatus, onUserStatusChange, login, logout]
  );

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};
