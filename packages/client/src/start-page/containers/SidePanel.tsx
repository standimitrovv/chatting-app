import React, { useEffect } from 'react';
import openSocket from 'socket.io-client';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { useConversation } from '../hooks/useConversation';
import { UserConversation } from '../models/UserConversation';
import { Conversation } from './Conversation';
import { SearchBar } from './SearchBar';

interface Props {
  activeConversationId?: string;
  onDelete: (conversationId: string) => void;
  onConversationClick: (conversation: UserConversation) => void;
}

export const SidePanel: React.FunctionComponent<Props> = (props) => {
  const { userCredentials } = useAuthContext();

  const { conversations, saveConversation, fetchAllConversations } =
    useConversation();

  const userId = userCredentials?.userId;

  useEffect(() => {
    (async () => {
      await fetchAllConversations();
    })();
  }, [userId, fetchAllConversations]);

  //refetch the conversations when status of a user changes
  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);

    //TODO refactor with the UseEffect above?
    socket.on('status-change', () => {
      (async () => {
        await fetchAllConversations();
      })();
    });
  }, [userId, fetchAllConversations]);

  return (
    <div className='w-96 bg-slate-500 relative'>
      <div className='flex relative pt-9 pb-6 px-4 border-b'>
        <SearchBar updateUserConversations={saveConversation} />
      </div>
      <div className='flex flex-col justify-center pt-5'>
        {conversations &&
          conversations.map((conversation) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              isActive={conversation._id === props.activeConversationId}
              onDelete={() => props.onDelete(conversation._id)}
              onClick={() => props.onConversationClick(conversation)}
            />
          ))}
      </div>
    </div>
  );
};
