import React, { createContext, useContext, useState } from 'react';
import { User } from '../models/User';
import { UserConversation } from '../models/UserConversation';

interface ConversationContext {
  activeConversation?: UserConversation;
  setActiveConversation: (conversation: UserConversation | undefined) => void;
  setFriendData: (user: User | undefined) => void;
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
  const [activeConvo, setActiveConvo] = useState<UserConversation | undefined>(
    undefined
  );

  const [friendCredentials, setFriendCredentials] = useState<User | undefined>(
    undefined
  );

  const setActiveConversation = (conversation: UserConversation | undefined) =>
    setActiveConvo(conversation);

  const setFriendData = (user: User | undefined) => setFriendCredentials(user);

  const context = {
    activeConversation: activeConvo,
    setActiveConversation,
    setFriendData,
    friendCredentials,
  };

  return (
    <ConvoContext.Provider value={context}>
      {props.children}
    </ConvoContext.Provider>
  );
};
