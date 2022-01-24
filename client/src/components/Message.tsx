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

  const hour = localHour[0].slice(0, 5) + ' ' + localHour[1];

  return (
    <div className='flex'>
      <img
        src={message.usersImageUrl}
        alt='users profile'
        referrerPolicy='no-referrer'
      />
      <div className='flex flex-col px-2'>
        <h5>{message.usersName}</h5>
        <p>Message: {message.text}</p>
        <p>at {hour}</p>
      </div>
    </div>
  );
};

export default Message;
