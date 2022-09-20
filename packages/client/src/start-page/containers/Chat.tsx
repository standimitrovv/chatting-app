import React, { useState, useEffect } from 'react';
import { Input } from '../../app/components/Input';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { ConversationMessages } from '../models/ConversationMessages';
import { ChatMessage } from '../components/ChatMessage';
import openSocket from 'socket.io-client';
import { useConversation } from '../hooks/useConversation';
import { getAllDirectMessages } from '../../service/direct-message/GetAllDirectMessages';
import { saveDirectMessage } from '../../service/direct-message/SaveDirectMessage';

export const Chat: React.FunctionComponent = () => {
  const { userCredentials } = useAuthContext();

  const { activeConversation } = useConversation();

  const [chatMessages, setChatMessages] = useState<ConversationMessages[]>([]);

  useEffect(() => {
    (async () => {
      if (!activeConversation) {
        return;
      }

      await getAllDirectMessages({
        conversationId: activeConversation._id,
      }).then(({ data }) => {
        if (data.messages) {
          setChatMessages(data.messages);
        }
      });
    })();
  }, [activeConversation]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);

    socket.on('message', (data) => {
      if (data.action === 'create') {
        setChatMessages((prevMessages) => [
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
      const { data } = await saveDirectMessage(message);

      if (data.createdMessage) {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          data.createdMessage,
        ]);
      }
    } catch (err) {}
  };

  return (
    <div className='bg-cyan-400 w-full pt-8'>
      <div
        style={{ height: 'calc(100% - 102px)' }}
        className='overflow-y-auto flex flex-col'
      >
        {chatMessages &&
          chatMessages.map((msg) => (
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
    </div>
  );
};
