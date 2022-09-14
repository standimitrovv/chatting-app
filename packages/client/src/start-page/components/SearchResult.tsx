import React from 'react';
import { User } from '../models/User';

interface Props {
  userData: User;
}

export const SearchResult: React.FunctionComponent<Props> = ({ userData }) => {
  return (
    <div className='flex items-center py-3 px-4 w-full hover:bg-gray-500 cursor-pointer'>
      <img
        src={userData.photoUrl}
        alt='user profile'
        className='w-7 h-7 rounded-full mr-3'
        referrerPolicy='no-referrer'
      />
      <p>{userData.fullName}</p>
    </div>
  );
};
