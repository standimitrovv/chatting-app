import React, { useEffect } from 'react';
import openSocket from 'socket.io-client';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { deleteConversation as deleteConversationService } from '../../service/conversation/DeleteConversation';
import { useConversation } from '../hooks/useConversation';
import { useResponseMessage } from '../hooks/useResponseMessage';
import { Conversation } from './Conversation';
import { SearchBar } from './SearchBar';

export const SidePanel: React.FunctionComponent = () => {
  const { userCredentials } = useAuthContext();

  const { onResponseMessage } = useResponseMessage();

  const {
    activeConversation,
    setActiveConversation,
    conversations,
    deleteConversation,
    fetchAllConversations,
  } = useConversation();

  const userId = userCredentials?.userId;

  const onDeleteConversation = async (conversationId: string) => {
    try {
      const { data } = await deleteConversationService({ conversationId });

      setActiveConversation(undefined);

      onResponseMessage(data.message);

      deleteConversation(conversationId);
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className='col-span-1 bg-slate-500 relative'>
      <div className='flex relative pt-9 pb-6 px-4 border-b'>
        <SearchBar />
      </div>
      <div className='flex flex-col justify-center pt-5'>
        {conversations.map((conversation) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            isActive={conversation._id === activeConversation?._id}
            onDelete={() => onDeleteConversation(conversation._id)}
            onClick={() => setActiveConversation(conversation)}
          />
        ))}
      </div>
    </div>
  );
};
