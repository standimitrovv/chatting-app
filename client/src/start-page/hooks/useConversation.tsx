import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../models/User';
import { UserConversation } from '../models/UserConversation';
import { useHttp } from '../../app/hooks/useHttp';
import { useAuthContext } from '../../app/hooks/useAuthContext';

interface ConversationContext {
  activeConversation?: UserConversation;
  setActiveConversation: (conversation: UserConversation | undefined) => void;
  friendData?: User;
}

const ConvoContext = createContext<ConversationContext>({
  activeConversation: undefined,
  setActiveConversation: (conversation: UserConversation | undefined) => {},
  friendData: undefined,
});

export const useConversation = () => {
  const context = useContext(ConvoContext);

  if (!context) {
    throw new Error('useConversation Provider is missing');
  }

  return context;
};

export const ConversationProvider: React.FunctionComponent = (props) => {
  const { sendRequest } = useHttp();

  const { userCredentials } = useAuthContext();

  const [activeConvo, setActiveConvo] = useState<UserConversation | undefined>(
    undefined
  );

  const [friendData, setFriendData] = useState<User | undefined>(undefined);

  const friendId = activeConvo?.members.find(
    (id) => id !== userCredentials?.userId
  );

  console.log(activeConvo);

  useEffect(() => {
    const getFriendData = async () => {
      if (!friendId) {
        return;
      }
      const response = await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/users/get-user/${friendId}`
      );
      setFriendData(response.user);
    };
    getFriendData();
  }, [friendId, sendRequest]);

  const setActiveConversation = (conversation: UserConversation | undefined) =>
    setActiveConvo(conversation);

  const context = {
    activeConversation: activeConvo,
    setActiveConversation,
    friendData,
  };

  return (
    <ConvoContext.Provider value={context}>
      {props.children}
    </ConvoContext.Provider>
  );
};
