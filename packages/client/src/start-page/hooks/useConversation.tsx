import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { getAllUserConversationsById } from '../../service/conversation/GetAllUserConversationsById';
import { getUserById } from '../../service/user/GetUserById';
import { User } from '../models/User';
import { UserConversation } from '../models/UserConversation';

interface ConversationContext {
  activeConversation?: UserConversation;
  setActiveConversation: (conversation: UserConversation | undefined) => void;
  getFriendData: (conversation: UserConversation | undefined) => Promise<void>;
  friendCredentials: User | undefined;
  conversations: UserConversation[];
  saveConversation: (conversation: UserConversation) => void;
  deleteConversation: (conversationId: string) => void;
  fetchAllConversations: () => Promise<void>;
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

  const [conversations, setConversations] = useState<UserConversation[]>([]);

  const [activeConvo, setActiveConvo] = useState<UserConversation | undefined>(
    undefined
  );

  const [friendCredentials, setFriendCredentials] = useState<User | undefined>(
    undefined
  );

  const userId = userCredentials?.userId;

  const setActiveConversation = useCallback(
    (conversation: UserConversation | undefined) =>
      setActiveConvo(conversation),
    []
  );

  const getFriendData = useCallback(
    async (conversation: UserConversation | undefined) => {
      const friendId = conversation?.members.find((id) => id !== userId);

      if (!friendId) return;

      try {
        const { data } = await getUserById({ userId: friendId });

        if (!data.user) {
          setFriendCredentials(undefined);

          return;
        }

        setFriendCredentials(data.user);
      } catch (err) {}
    },
    [userId]
  );

  const fetchAllConversations = useCallback(async () => {
    if (!userId) {
      return;
    }

    const { data } = await getAllUserConversationsById({ userId });

    if (!data.userConversations || data.userConversations.length === 0) {
      setConversations([]);

      return;
    }

    setConversations(data.userConversations);
  }, [userId]);

  const saveConversation = (conversation: UserConversation) => {
    setConversations((prevState) => [...prevState, conversation]);
  };

  const deleteConversation = (conversationId: string) => {
    setConversations((prevState) => {
      return prevState.filter(
        (conversation) => conversation._id !== conversationId
      );
    });
  };

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
    conversations,
    saveConversation,
    deleteConversation,
    fetchAllConversations,
  };

  return (
    <ConvoContext.Provider value={context}>
      {props.children}
    </ConvoContext.Provider>
  );
};
