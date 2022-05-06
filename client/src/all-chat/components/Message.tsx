import React from 'react';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { TrashIcon } from '@heroicons/react/outline';
import { useHttp } from '../../app/hooks/useHttp';
import { IMessage } from '../models/Message';

interface Props {
  message: IMessage;
}

export const Message: React.FC<Props> = ({ message }) => {
  const localHour = new Date(message.dateOfSending)
    .toLocaleString()
    .split(',')[1]
    .split(' ')
    .filter((el) => el.length > 1);

  const { sendRequest } = useHttp();
  const { userCredentials } = useAuthContext();
  const userId = userCredentials?.userId;
  const canDeleteMessage = message.creator === userId;
  const hour =
    localHour[0].split(':').slice(0, 2).join(':') + ' ' + localHour[1];

  const deleteMessage = async () => {
    const messageId = message._id;
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/all-chat/delete-message/${messageId}`,
        'DELETE'
      );
    } catch (err) {
      console.error(err);
    }
  };

  const isAdmin =
    (message.usersName === process.env.REACT_APP_ADMIN_NAME &&
      message.creator === process.env.REACT_APP_ADMIN_ID_1) ||
    message.creator === process.env.REACT_APP_ADMIN_ID_2;
  return (
    <div className='flex h-16 items-center'>
      <img
        src={message.usersImageUrl}
        alt='users profile'
        referrerPolicy='no-referrer'
        className='rounded-full w-12 h-12'
      />
      <div>
        <div className='flex px-2 items-center'>
          <h5
            className={`font-medium ${
              isAdmin ? 'text-green-500' : 'text-white'
            }`}
          >
            {message.usersName}
          </h5>
          <p className='font-thin text-xs text-gray-400 ml-2'>{hour}</p>
          {canDeleteMessage && (
            <TrashIcon
              className='h-5 w-5 cursor-pointer ml-2'
              onClick={deleteMessage}
            />
          )}
        </div>
        <div className='px-2'>
          <p className='text-gray-100'>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

