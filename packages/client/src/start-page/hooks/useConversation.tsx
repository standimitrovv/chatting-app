import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { getUserById } from '../../service/user/GetUserById';
import { User } from '../models/User';
import { UserConversation } from '../models/UserConversation';

interface ConversationContext {
  activeConversation?: UserConversation;
  setActiveConversation: (conversation: UserConversation | undefined) => void;
  getFriendData: (conversation: UserConversation | undefined) => Promise<any>;
  friendCredentials: User | undefined;
}

const ConvoContext = createContext<ConversationContext | null>(null);

export const useConversation = () => {
  const context = useContext(ConvoContext);

  if (!context) {
    throw new Error('useConversation Provider is missing');
  }

  return context;
};

export const ConversationProvider: React.FunctionComponent = (props) => {
  const { userCredentials } = useAuthContext();

  const [activeConvo, setActiveConvo] = useState<UserConversation | undefined>(
    undefined
  );

  const [friendCredentials, setFriendCredentials] = useState<User | undefined>(
    undefined
  );

  const setActiveConversation = useCallback(
    (conversation: UserConversation | undefined) =>
      setActiveConvo(conversation),
    []
  );

  const getFriendData = useCallback(
    async (conversation: UserConversation | undefined) => {
      const friendId = conversation?.members.find(
        (id) => id !== userCredentials?.userId
      );

      if (!friendId) return;

      try {
        const response = await getUserById({ userId: friendId });

        if (!response.user) {
          setFriendCredentials(undefined);

          return;
        }

        setFriendCredentials(response.user);
      } catch (err) {}
    },
    [userCredentials?.userId]
  );

  // gets the data of the user that you are chatting with
  useEffect(() => {
    (async () => {
      await getFriendData(activeConvo);
    })();
  }, [getFriendData, activeConvo]);

  const context = {
    activeConversation: activeConvo,
    setActiveConversation,
    getFriendData,
    friendCredentials,
  };

  return (
    <ConvoContext.Provider value={context}>
      {props.children}
    </ConvoContext.Provider>
  );
};
