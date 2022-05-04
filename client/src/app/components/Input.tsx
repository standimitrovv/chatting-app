import React, { useState } from 'react';
import { useHttp } from '../hooks/useHttp';
import { useAuthContext } from '../hooks/useAuthContext';
import { ConversationMessages } from '../../start-page/models/ConversationMessages';

interface Props {
  conversation?: ConversationMessages;
}

const Input: React.FC<Props> = (props) => {
  const [usersInput, setUsersInput] = useState<string>('');

  const { sendRequest } = useHttp();

  const { userCredentials } = useAuthContext();

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (usersInput.trim().length !== 0 && userCredentials) {
      const message = {
        conversationId: props.conversation?.conversationId,
        sender: props.conversation?.sender,
        text: usersInput,
      };
      await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/messages/create-message`,
        'POST',
        JSON.stringify(message),
        {
          'Content-Type': 'application/json',
        }
      );

      setUsersInput('');
    }
  };

  //bg-zinc-700
  return (
    <>
      <div className='w-full md:w-[1470px] fixed bottom-0 px-2 py-3 border-t border-gray h-26'>
        <form
          className='my-4 flex space-x-4 px-4 md:mr-28 lg:mr-24 xl:mr-20 2xl:mr-3'
          onSubmit={submitFormHandler}
        >
          <input
            type='text'
            placeholder='Write a message..'
            className='p-3 rounded-sm w-full h-full bg-zinc-300 focus-within:outline-none '
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsersInput(e.target.value)
            }
            value={usersInput}
          />

          <button
            type='submit'
            className='bg-blue-500 rounded-sm text-white font-semibold px-4 '
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Input;
