import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import Message from './components/Message';
import SideBar from './containers/SideBar';
import Input from './containers/Input';
import Greeting from './containers/Greeting';

export interface IMessage {
  _id: string;
  text: string;
  usersName: string;
  usersImageUrl: string;
  dateOfSending: string;
  creator: string;
}

export interface IUser {
  fullName: string;
  email: string;
  photoUrl: string;
}

export const apiBeginning = 'http://localhost:3001';

const App: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[] | []>([]);
  const [user, setUser] = useState<IUser>({
    fullName: '',
    email: '',
    photoUrl: '',
  });

  useEffect(() => {
    const fullName = localStorage.getItem('name') as string;
    const email = localStorage.getItem('email') as string;
    const photoUrl = localStorage.getItem('userImg') as string;
    setUser({ fullName, email, photoUrl });
  }, []);

  useEffect(() => {
    fetch(apiBeginning + '/chat/get-messages')
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
      if (data.action === 'get') {
        setMessages(data.result);
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
    setUser(userCredentials);
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <SideBar user={user} updateUser={updateUserCredentials} />

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
    </div>
  );
};

export default App;
