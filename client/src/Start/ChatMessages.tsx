import React, { useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import { ConversationMessages } from './Start';
import Input from '../shared/components/Input';

interface Props {
  own: boolean;
  conversation: ConversationMessages;
}

const ChatMessages: React.FC<Props> = ({ own, conversation }) => {
  const { userCredentials } = useContext(AuthContext);
  console.log(userCredentials);
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
