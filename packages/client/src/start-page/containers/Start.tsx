import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { deleteConversation } from '../../service/conversation/DeleteConversation';
import { ResponseMessage } from '../components/ResponseMessage';
import { SidePanel } from '../components/SidePanel';
import { useConversation } from '../hooks/useConversation';
import { Chat } from './Chat';

export const StartPage: React.FC = () => {
  const [convoResponseMessage, setConvoResponseMessage] = useState<string>('');

  const { activeConversation, setActiveConversation } = useConversation();

  const { userCredentials } = useAuthContext();

  const onDeleteConversation = async (conversationId: string) => {
    try {
      const response = await deleteConversation({ conversationId });

      if (response.message) {
        setActiveConversation(undefined);
        setConvoResponseMessage(response.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);

    const userId = { userId: userCredentials?.userId };

    socket.emit('join', userId);

    return () => {
      window.onbeforeunload = function () {
        //BUG sending `transport close` to API
        socket.emit('disconnect', userId);
      };
    };
  }, [userCredentials?.userId]);

  return (
    <div className='flex w-full'>
      <SidePanel
        activeConversationId={activeConversation?._id}
        onCreateConversationResponse={setConvoResponseMessage}
        onDelete={onDeleteConversation}
        onConversationClick={(conversation) =>
          setActiveConversation(conversation)
        }
      />
      <div className='bg-cyan-400 w-full pt-8'>
        {activeConversation && <Chat />}
      </div>
      <ResponseMessage
        conversationResponse={convoResponseMessage}
        setConversationResponse={setConvoResponseMessage}
      />
    </div>
  );
};
