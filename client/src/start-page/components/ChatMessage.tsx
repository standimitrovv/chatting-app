import React from 'react';
import { ConversationMessages } from '../models/ConversationMessages';
import { useConversation } from '../hooks/useConversation';
import TimeAgo from 'react-timeago';

interface Props {
  own?: boolean;
  conversation?: ConversationMessages;
}

export const ChatMessage: React.FC<Props> = ({ own, conversation }) => {
  const { friendCredentials } = useConversation();

  return (
    <div className={`px-7 flex items-center ${own && 'ml-auto'} mb-3`}>
      {!own && (
        <img
          src={friendCredentials?.photoUrl}
          alt='Profile pic'
          referrerPolicy='no-referrer'
          className='w-9 h-9 rounded-full mr-3'
        />
      )}
      <div
        className={`text-white py-2 px-4 rounded-xl  w-fit ${
          own ? 'bg-[#e8ebfa]' : 'bg-white'
        }`}
      >
        <div className='flex items-center'>
          {!own && (
            <h5 className='mr-2 text-black'>{friendCredentials?.fullName}</h5>
          )}
          <p className='text-xs text-gray-400'>21.05.2022</p>
        </div>
        <p className='text-base text-black font-light'>{conversation?.text}</p>
      </div>
    </div>
  );
};
