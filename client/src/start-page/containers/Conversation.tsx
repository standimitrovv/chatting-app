import React, { useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useConversation } from '../hooks/useConversation';
import { UserConversation } from '../models/UserConversation';
interface Props {
  isActive: boolean;
  conversation: UserConversation;
  onDelete: () => void;
  onClick: () => void;
}

export const Conversation: React.FC<Props> = ({
  isActive,
  conversation,
  onDelete,
  onClick,
}) => {
  const { friendCredentials, getFriendData } = useConversation();

  useEffect(() => {
    const getFriendCredentials = async () => {
      await getFriendData(conversation);
    };
    getFriendCredentials();
  }, [getFriendData, conversation]);

  return (
    <div
      className={`${
        isActive && 'bg-slate-800'
      } flex items-center justify-between px-6 py-3 group hover:bg-slate-800 cursor-pointer`}
    >
      <div className='flex items-center' onClick={onClick}>
        <img
          src={friendCredentials && friendCredentials.photoUrl}
          alt="User's profile "
          className='w-8 h-8 rounded-full'
          referrerPolicy='no-referrer'
        />
        <p className='ml-4 text-white font-semibold'>
          {friendCredentials && friendCredentials.fullName}
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