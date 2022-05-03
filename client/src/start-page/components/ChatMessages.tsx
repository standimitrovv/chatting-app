import React from 'react';
import { ConversationMessages } from '../models/ConversationMessages';

interface Props {
  own?: boolean;
  conversation?: ConversationMessages;
}

const ChatMessages: React.FC<Props> = ({ own, conversation }) => {
  return (
    <div className='px-7'>
      <div
        className={` text-white py-2 px-4 rounded-full mb-2 w-fit ${
          own ? 'ml-auto bg-blue-600' : 'bg-gray-500'
        }`}
      >
        <p>{conversation?.text}</p>
      </div>
    </div>
  );
};

export default ChatMessages;
