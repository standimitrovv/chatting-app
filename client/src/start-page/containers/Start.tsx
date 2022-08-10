import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { useHttp } from '../../app/hooks/useHttp';
import { Chat } from './Chat';
import { useConversation } from '../hooks/useConversation';
import { ResponseMessage } from '../components/ResponseMessage';
import { SidePanel } from '../components/SidePanel';
import { useAuthContext } from '../../app/hooks/useAuthContext';

export const StartPage: React.FC = () => {
  const [convoResponseMessage, setConvoResponseMessage] = useState<string>('');

  const { sendRequest, error } = useHttp();

  const { activeConversation, setActiveConversation } = useConversation();

  const { userCredentials } = useAuthContext();

  const deleteConversation = async (conversationId: string) => {
    try {
      const response = await sendRequest(
        `/conversations/delete-convo/${conversationId}`,
        'DELETE'
      );
      if (error) {
        setConvoResponseMessage(error);
      }

      if (response.message) {
        setActiveConversation(undefined);
        setConvoResponseMessage(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);

    const userId = { userId: userCredentials?.userId };

    socket.emit('join', userId);

    return () => {
      window.onbeforeunload = function () {
        socket.emit('disconnect', userId);
      };
    };
  }, [userCredentials?.userId]);

  return (
    <div className='flex w-full'>
      <SidePanel
        activeConversationId={activeConversation?._id}
        onCreateConversationResponse={setConvoResponseMessage}
        onDelete={deleteConversation}
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
