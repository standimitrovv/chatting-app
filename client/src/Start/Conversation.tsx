import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { UserConversation, UserModel } from './Start';
import useHttp from '../shared/hooks/useHttp';

interface Props {
  conversation: UserConversation;
  currentUserId: string;
}

const Conversation: React.FC<Props> = ({ conversation, currentUserId }) => {
  const [friendData, setFriendData] = useState<UserModel>({
    _id: '',
    email: '',
    fullName: '',
    photoUrl: '',
    userId: '',
  });
  const { sendRequest } = useHttp();

  useEffect(() => {
    const friendId = conversation.members.find((id) => id !== currentUserId);
    const getDataOfFriend = async () => {
      const { user } = await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/users/get-users/${friendId}`
      );
      setFriendData(user);
    };
    getDataOfFriend();
  }, [sendRequest, conversation.members, currentUserId]);

  return (
    <div className='flex items-center px-6 py-3 group hover:bg-slate-800 cursor-pointer'>
      <img
        src={friendData.photoUrl}
        alt="User's profile "
        className='w-8 h-8 rounded-full'
        referrerPolicy='no-referrer'
      />
      <p className='ml-4 text-white font-semibold'>{friendData.fullName}</p>
      <XIcon className='w-5 h-5 text-white cursor-pointer ml-auto hidden group-hover:inline-block' />
    </div>
  );
};

export default Conversation;
