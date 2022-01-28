import React from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import user from '../images/user.png';

const UserSpecificChat: React.FC = () => {
  return (
    <div className='flex w-full'>
      <div className='w-1/5 bg-slate-500'>
        <div className='flex items-center relative pt-9 pb-6 px-4 border-b'>
          <SearchIcon className='h-5 w-5 text-white absolute left-7' />
          <input
            type='text'
            placeholder='Search for a friend...'
            className='rounded-md py-2 pl-12 bg-gray-600 text-white font-bold focus-within:outline-none w-full'
          />
        </div>
        <div className='flex flex-col justify-center pt-5'>
          <div className='flex items-center px-6 py-3 group hover:bg-slate-800 cursor-pointer'>
            <img
              src={user}
              alt="User's profile "
              className='w-10 h-8 rounded-full'
            />
            <p className='ml-4 text-white font-semibold'>Stanimir Dimitrov</p>
            <XIcon className='w-5 h-5 text-white cursor-pointer ml-auto hidden group-hover:inline-block' />
          </div>
          <div className='flex items-center px-6 py-3 space-x-4'>
            <img
              src={user}
              alt="User's profile "
              className='w-10 h-8 rounded-full'
            />
            <p>Stanimir Dimitrov</p>
          </div>
        </div>
      </div>
      <div>chat for current user</div>
    </div>
  );
};

export default UserSpecificChat;
