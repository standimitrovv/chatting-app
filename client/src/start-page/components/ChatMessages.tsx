import React from 'react';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { ConversationMessages } from '../models/ConversationMessages';
import Input from '../../app/components/Input';

interface Props {
  own: boolean;
  conversation: ConversationMessages;
}

const ChatMessages: React.FC<Props> = ({ own, conversation }) => {
  const { userCredentials } = useAuthContext();

  return (
    <div>
      <div className='px-7'>
        <div
          className={` text-white py-2 px-4 rounded-full mb-2 w-fit ${
            own ? 'ml-auto bg-blue-600' : 'bg-gray-500'
          }`}
        >
          <p>{conversation.text}</p>
        </div>
      </div>
      <Input userCredentials={userCredentials!} />
    </div>
  );
};

export default ChatMessages;