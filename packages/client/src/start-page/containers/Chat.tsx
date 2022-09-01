import React, { useState, useEffect } from 'react';
import { Input } from '../../app/components/Input';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { useHttp } from '../../app/hooks/useHttp';
import { ConversationMessages } from '../models/ConversationMessages';
import { ChatMessage } from './ChatMessage';
import openSocket from 'socket.io-client';
import { useConversation } from '../hooks/useConversation';
import { getConversationMessages } from '../../service/conversation/GetConversationMessages';

export const Chat: React.FunctionComponent = () => {
  const { userCredentials } = useAuthContext();

  const { activeConversation } = useConversation();

  const { sendRequest } = useHttp();

  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessages[] | []
  >([]);

  useEffect(() => {
    if (!activeConversation) {
      return;
    }

    getConversationMessages(activeConversation._id).then(
      setConversationMessages
    );
  }, [activeConversation]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);
    socket.on('message', (data) => {
      if (data.action === 'create') {
        setConversationMessages((prevMessages) => [
          ...prevMessages,
          data.createdMessage,
        ]);
      }
    });
  }, []);

  const onSendMessage = async (usersInput: string) => {
    if (usersInput.trim().length !== 0 && userCredentials) {
      const message = {
        conversationId: activeConversation?._id,
        sender: userCredentials.userId,
        text: usersInput,
        createdAt: Date.now(),
      };
      try {
        await sendRequest(
          `/messages/create-message`,
          'POST',
          JSON.stringify(message),
          {
            'Content-Type': 'application/json',
          }
        );
      } catch (err) {}
    }
  };
  return (
    <>
      <div
        style={{ height: 'calc(100% - 102px)' }}
        className='overflow-y-auto flex flex-col'
      >
        {conversationMessages?.map((msg) => (
          <ChatMessage
            key={msg._id}
            conversation={msg}
            own={msg.sender === userCredentials?.userId}
          />
        ))}
      </div>
      <Input
        conversationId={activeConversation?._id}
        onSendMessage={onSendMessage}
      />
    </>
  );
};
