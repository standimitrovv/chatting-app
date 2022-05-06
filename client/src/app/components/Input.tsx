import React, { useState } from 'react';

interface Props {
  conversationId?: string;
  onSendMessage?: (usersInput: string) => void;
}

export const Input: React.FC<Props> = (props) => {
  const [usersInput, setUsersInput] = useState<string>('');

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    props.onSendMessage?.(usersInput);

    setUsersInput('');
  };

  //bg-zinc-700
  return (
    <div
      style={{ width: `calc(100% - 112px - 288px)` }}
      className='w-full fixed bottom-0 px-2 py-3 border-t border-gray h-26'
    >
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
  );
};

