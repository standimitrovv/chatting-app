import React, { useState, useEffect } from 'react';
import { Input } from '../../app/components/Input';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { ConversationMessages } from '../models/ConversationMessages';
import { ChatMessage } from './ChatMessage';
import openSocket from 'socket.io-client';
import { useConversation } from '../hooks/useConversation';
import { getConversationMessages } from '../../service/messages/GetConversationMessages';
import { createConversationMessage } from '../../service/messages/SaveMessage';

export const Chat: React.FunctionComponent = () => {
  const { userCredentials } = useAuthContext();

  const { activeConversation } = useConversation();

  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessages[] | []
  >([]);

  useEffect(() => {
    if (!activeConversation) {
      return;
    }

    getConversationMessages({ conversationId: activeConversation._id }).then(
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

  if (!activeConversation || !userCredentials) {
    return null;
  }

  const onSendMessage = async (usersInput: string) => {
    if (usersInput.trim().length === 0) {
      return;
    }

    const message = {
      conversationId: activeConversation?._id,
      sender: userCredentials?.userId,
      text: usersInput,
      createdAt: new Date(),
    };

    try {
      await createConversationMessage(message);
    } catch (err) {}
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
