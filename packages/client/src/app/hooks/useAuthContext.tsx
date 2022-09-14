import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { saveUser } from '../../service/user/SaveUser';
import { signInWithGoogle } from '../FirebaseConfig';
import { AvailableUserStatuses } from '../models/AvailableUserStatuses';
import { UserCredentials } from '../models/UserCredentials';

interface AuthContext {
  isLoggedIn: boolean;
  userCredentials: UserCredentials | undefined;
  userStatus: AvailableUserStatuses | undefined;
  onUserStatusChange: (status: AvailableUserStatuses) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

export const Context = createContext<AuthContext>({
  isLoggedIn: false,
  userCredentials: undefined,
  userStatus: undefined,
  onUserStatusChange: (status: AvailableUserStatuses) => {},
  loginWithGoogle: async () => {},
  logout: () => {},
});

export const useAuthContext = () => {
  const AuthContext = useContext(Context);

  if (!AuthContext) {
    throw new Error('Missing Provider for AuthContext');
  }

  return AuthContext;
};

export const AuthProvider: React.FunctionComponent = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [userCredentials, setUserCredentials] = useState<
    UserCredentials | undefined
  >(undefined);

  const [userStatus, setUserStatus] = useState<AvailableUserStatuses>('Online');

  const login = useCallback((userCredentials: UserCredentials) => {
    setIsLoggedIn(true);

    setUserCredentials(userCredentials);

    localStorage.setItem('userData', JSON.stringify(userCredentials));
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      const { user } = await signInWithGoogle();

      const {
        displayName: fullName,
        email,
        photoURL: photoUrl,
        uid: userId,
      } = user;

      if (!email || !photoUrl || !fullName) {
        throw new Error('Not enough credentials provided');
      }

      await saveUser({ email, photoUrl, userId, fullName });

      login({ email, fullName, photoUrl, userId });
    } catch (err) {
      console.error(err);
    }
  }, [login]);

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
      loginWithGoogle,
      logout,
    }),
    [
      isLoggedIn,
      userCredentials,
      userStatus,
      onUserStatusChange,
      loginWithGoogle,
      logout,
    ]
  );

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};
