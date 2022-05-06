import React, { useState, useEffect } from 'react';
import { Input } from '../../app/components/Input';
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
      console.log(response);
      setConversationMessages(response.messages);
    };

    fetchUserConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);
    socket.on('message', (data) => {
      if (data.action === 'create') {
        setConversationMessages((prevMessages) => [
          ...prevMessages,
          data.createdMessage,
        ]);
        console.log(data);
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
        await sendRequest(
          `${process.env.REACT_APP_API_SERVER}/messages/create-message`,
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
      <div style={{ height: 'calc(100% - 102px)' }} className='overflow-y-auto'>
        {conversationMessages?.map((msg) => (
          <ChatMessage
            key={msg._id}
            conversation={msg}
            own={msg.sender === userCredentials?.userId}
          />
        ))}
      </div>
      <Input conversationId={convoId} onSendMessage={onSendMessage} />
    </>
  );
};