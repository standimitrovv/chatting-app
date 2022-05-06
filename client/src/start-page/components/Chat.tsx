import React, { useState, useEffect } from 'react';
import Input from '../../app/components/Input';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { useHttp } from '../../app/hooks/useHttp';
import { ConversationMessages } from '../models/ConversationMessages';
import { ChatMessage } from './ChatMessage';
import openSocket from 'socket.io-client';

interface Props {
  convoId: string;
}

export const Chat: React.FunctionComponent<Props> = ({ convoId }) => {
  const { userCredentials } = useAuthContext();

  const { sendRequest } = useHttp();

  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessages[] | []
  >([]);

  useEffect(() => {
    const fetchUserConversation = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/messages/get-messages/${convoId}`
      );

      if (!response) {
        setConversationMessages([]);
        return;
      }

      setConversationMessages(response.messages);
    };

    fetchUserConversation();
  }, [convoId, sendRequest]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);
    socket.on('message', (data) => {
      if (data.action === 'create') {
        setConversationMessages((prevMessages) => [
          ...prevMessages,
          { ...data.createdMessage },
        ]);
      }
    });
  }, []);

  const onSendMessage = async (usersInput: string) => {
    if (usersInput.trim().length !== 0 && userCredentials) {
      const message = {
        conversationId: convoId,
        sender: userCredentials.userId,
        text: usersInput,
      };
      try {
        const res = await sendRequest(
          `${process.env.REACT_APP_API_SERVER}/messages/create-message`,
          'POST',
          JSON.stringify(message),
          {
            'Content-Type': 'application/json',
          }
        );

        setConversationMessages((prevMessages) => [
          ...prevMessages,
          res.createdMessage,
        ]);
      } catch (err) {}
    }
  };
  return (
    <div>
      {conversationMessages?.map((msg) => (
        <ChatMessage
          key={msg._id}
          conversation={msg}
          own={msg.sender === userCredentials?.userId}
        />
      ))}
      <Input conversationId={convoId} onSendMessage={onSendMessage} />
    </div>
  );
};
