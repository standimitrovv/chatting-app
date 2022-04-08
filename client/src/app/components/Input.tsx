import React, { useState } from 'react';
import { auth } from '../FirebaseConfig';
import { UserCredentials } from '../models/UserCredentials';
import useHttp from '../hooks/useHttp';

interface Props {
  userCredentials: UserCredentials;
}

const Input: React.FC<Props> = ({ userCredentials }) => {
  const [usersInput, setUsersInput] = useState<string>('');
  const { sendRequest } = useHttp();

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (usersInput.trim().length !== 0 && auth.currentUser) {
      const userId = localStorage.getItem('userId');
      const message = {
        text: usersInput,
        usersName: userCredentials.fullName,
        usersImageUrl: userCredentials.photoUrl,
        dateOfSending: new Date(),
        creator: userId,
      };
      await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/all-chat/create-message`,
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
    <div>
      <div className='w-full md:w-9/12 fixed bottom-0 px-2 py-3 border-t border-gray h-26'>
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
    </div>
  );
};

export default Input;
