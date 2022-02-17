import React from 'react';
import { UserModel } from './Start';

interface Props {
  userData: UserModel;
}

const SearchResult: React.FC<Props> = ({ userData }) => {
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

export default SearchResult;
