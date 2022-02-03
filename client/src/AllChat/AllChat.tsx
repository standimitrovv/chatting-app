import React, { useState, useEffect } from 'react';
import Greeting from './Greeting';
import Message from './Message';
import Input from '../shared/components/Input';
import { apiBeginning, IUser } from '../App';
import openSocket from 'socket.io-client';

export interface IMessage {
  _id: string;
  text: string;
  usersName: string;
  usersImageUrl: string;
  dateOfSending: string;
  creator: string;
}

interface Props {
  user: IUser;
  updateUser: (userCredentials: IUser) => void;
}

const AllChat: React.FC<Props> = ({ user, updateUser }) => {
  const [messages, setMessages] = useState<IMessage[] | []>([]);

  useEffect(() => {
    fetch(apiBeginning + '/all-chat/get-messages')
      .then((res) => res.json())
      .then((data) => setMessages(data.result))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const socket = openSocket(apiBeginning);
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

  const updateUserCredentials = (userCredentials: IUser) => {
    updateUser(userCredentials);
  };
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

      <Input userCredentials={user} updateUser={updateUserCredentials} />
    </div>
  );
};

export default AllChat;
