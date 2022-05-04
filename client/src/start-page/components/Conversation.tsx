import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { UserConversation } from '../models/UserConversation';
import { User } from '../models/User';
import {useHttp} from '../../app/hooks/useHttp';

interface Props {
  conversation: UserConversation;
  currentUserId: string;
  isActive: boolean;
  onDelete: () => void;
  onClick: () => void;
}

const Conversation: React.FC<Props> = ({
  conversation,
  currentUserId,
  isActive,
  onDelete,
  onClick,
}) => {
  const [friendData, setFriendData] = useState<User>({
    _id: '',
    email: '',
    fullName: '',
    photoUrl: '',
    userId: '',
  });
  const { sendRequest } = useHttp();

  useEffect(() => {
    const friendId = conversation.members.find((id) => id !== currentUserId);
    if (!friendId) return;
    const getDataOfFriend = async () => {
      const { user } = await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/users/get-users/${friendId}`
      );
      setFriendData(user);
    };
    getDataOfFriend();
  }, [sendRequest, conversation.members, currentUserId]);

  return (
    <div
      className={`${
        isActive && 'bg-slate-800'
      } flex items-center justify-between px-6 py-3 group hover:bg-slate-800 cursor-pointer`}
    >
      <div className='flex items-center' onClick={onClick}>
        <img
          src={friendData && friendData.photoUrl}
          alt="User's profile "
          className='w-8 h-8 rounded-full'
          referrerPolicy='no-referrer'
        />
        <p className='ml-4 text-white font-semibold'>
          {friendData && friendData.fullName}
        </p>
      </div>
      <div className='flex items-center justify-center'>
        <XIcon
          className='w-5 h-5 text-white cursor-pointer ml-auto hidden group-hover:inline-block'
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default Conversation;
