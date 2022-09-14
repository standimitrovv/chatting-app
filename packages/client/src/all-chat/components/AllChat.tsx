import React, { useState, useEffect } from 'react';
import { Greeting } from './Greeting';
import { Input } from '../../app/components/Input';
import { UserCredentials } from '../../app/models/UserCredentials';
import { IMessage } from '../models/Message';
import { Message } from './Message';
import openSocket from 'socket.io-client';

interface Props {
  user: UserCredentials;
}

export const AllChat: React.FC<Props> = ({ user }) => {
  const [messages, setMessages] = useState<IMessage[] | []>([]);

  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       const { result } = await sendRequest(`/all-chat/get-messages`);
  //       setMessages(result);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getMessages();
  // }, [sendRequest]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);
    socket.on('messages', (data) => {
      if (data.action === 'create') {
        setMessages((prevState) => [...prevState, data.result]);
      }
      if (data.action === 'delete') {
        const messageId = data.result._id;
        setMessages((prevState) => {
          prevState = prevState.filter((message) => message._id !== messageId);
          return [...prevState];
        });
      }
    });
  }, []);

  return (
    <div className='flex flex-col w-full h-full bg-zinc-700'>
      <Greeting messages={messages} />
      <div
        className={`flex flex-col flex-1 ${
          messages.length > 16
            ? 'overflow-y-scroll space-y-3'
            : 'overflow-hidden space-y-1'
        }  p-5 mb-24 `}
      >
        {messages &&
          messages.map((msg) => <Message message={msg} key={msg._id} />)}
      </div>

      <Input />
    </div>
  );
};
