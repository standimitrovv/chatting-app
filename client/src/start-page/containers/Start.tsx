import React, { useState } from 'react';
import { useHttp } from '../../app/hooks/useHttp';
import { Chat } from './Chat';
import { useConversation } from '../hooks/useConversation';
import { ResponseMessage } from '../components/ResponseMessage';
import { SidePanel } from '../components/SidePanel';

export const StartPage: React.FC = () => {
  const [convoResponseMessage, setConvoResponseMessage] = useState<string>('');

  const { sendRequest, error } = useHttp();

  const { activeConversation, setActiveConversation } = useConversation();

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
