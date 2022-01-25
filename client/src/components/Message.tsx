import React from 'react';
import { IMessage } from '../App';

interface Props {
  message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
  const localHour = new Date(message.dateOfSending)
    .toLocaleString()
    .split(',')[1]
    .split(' ')
    .filter((el) => el.length > 1);

  const hour =
    localHour[0].split(':').slice(0, 2).join(':') + ' ' + localHour[1];

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
          <h5 className='font-medium'>{message.usersName}</h5>
          <p className='font-thin text-sm text-gray-400 ml-2'>{hour}</p>
        </div>
        <div className='px-2'>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
