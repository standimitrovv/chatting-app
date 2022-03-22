import React, { useEffect, useState } from 'react';
import useHttp from '../app/hooks/useHttp';
import { UserCredentials } from '../app/models/UserCredentials';
import { IMessage } from './models/Message';

interface Props {
  messages: IMessage[];
}

const Greeting: React.FC<Props> = ({ messages }) => {
  const [users, setUsers] = useState<UserCredentials[] | []>([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { users } = await sendRequest(
          `${process.env.REACT_APP_API_SERVER}/users/get-users`
        );
        setUsers(users);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, [sendRequest]);

  return (
    <div className='text-white border-b px-5 py-6 text-center md:text-left'>
      <p className='font-bold '>Welcome to Stanimir's community chat</p>
      <div className='flex text-gray-300 font-semibold justify-center mt-2 text-sm md:justify-start'>
        <p>{messages.length} messages</p>
        <p className='mx-2'>|</p>
        <p>{users.length} members</p>
      </div>
    </div>
  );
};

export default Greeting;
