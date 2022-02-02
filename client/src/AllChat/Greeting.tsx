import React, { useEffect, useState } from 'react';
import { IUser, apiBeginning } from '../App';
import { IMessage } from './AllChat';

interface Props {
  messages: IMessage[];
}

const Greeting: React.FC<Props> = ({ messages }) => {
  const [users, setUsers] = useState<IUser[] | []>([]);

  useEffect(() => {
    fetch(apiBeginning + '/users/get-users')
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.log(err));
  }, []);

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
