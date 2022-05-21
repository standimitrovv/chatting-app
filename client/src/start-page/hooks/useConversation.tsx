import React, { createContext, useContext, useState } from 'react';
import { User } from '../models/User';
import { UserConversation } from '../models/UserConversation';
import { useHttp } from '../../app/hooks/useHttp';
import { useAuthContext } from '../../app/hooks/useAuthContext';

interface ConversationContext {
  activeConversation?: UserConversation;
  setActiveConversation: (conversation: UserConversation | undefined) => void;
  getFriendDataForConversation: (
    conversation: UserConversation
  ) => Promise<any>;
  friendData: User | undefined;
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
  const { sendRequest } = useHttp();

  const { userCredentials } = useAuthContext();

  const [activeConvo, setActiveConvo] = useState<UserConversation | undefined>(
    undefined
  );

  const [friendData, setFriendData] = useState<User | undefined>(undefined);

  // useEffect(() => {
  //   const getFriendData = async () => {
  //     if (!friendId) {
  //       return;
  //     }
  //     const response = await sendRequest(
  //       `${process.env.REACT_APP_API_SERVER}/users/get-user/${friendId}`
  //     );
  //     setFriendData(response.user);
  //   };
  //   getFriendData();
  // }, [friendId, sendRequest]);

  const getFriendDataForConversation = async (
    conversation: UserConversation
  ) => {
    const friendId = conversation.members.find(
      (id) => id !== userCredentials?.userId
    );

    const response = await sendRequest(
      `${process.env.REACT_APP_API_SERVER}/users/get-user/${friendId}`
    );

    setFriendData(response.user);
  };

  const setActiveConversation = (conversation: UserConversation | undefined) =>
    setActiveConvo(conversation);

  const context = {
    activeConversation: activeConvo,
    setActiveConversation,
    getFriendDataForConversation,
    friendData,
  };

  return (
    <ConvoContext.Provider value={context}>
      {props.children}
    </ConvoContext.Provider>
  );
};
