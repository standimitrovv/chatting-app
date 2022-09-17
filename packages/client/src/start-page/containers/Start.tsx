import React, { useEffect } from 'react';
import openSocket from 'socket.io-client';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { ResponseMessage } from '../components/ResponseMessage';
import { useConversation } from '../hooks/useConversation';
import { useResponseMessage } from '../hooks/useResponseMessage';
import { Chat } from './Chat';
import { SidePanel } from './SidePanel';

export const StartPage: React.FunctionComponent = () => {
  const { responseMessage, onResponseMessage } = useResponseMessage();

  const { activeConversation } = useConversation();

  const { userCredentials } = useAuthContext();

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);

    const userId = { userId: userCredentials?.userId };

    socket.emit('join', userId);

    return () => {
      window.onbeforeunload = function () {
        //BUG sending `transport close` to API
        socket.emit('disconnect', userId);
      };
    };
  }, [userCredentials?.userId]);

  return (
    <div className='flex w-full'>
      <SidePanel />

      <div className='bg-cyan-400 w-full pt-8'>
        {activeConversation && <Chat />}
      </div>

      <ResponseMessage
        responseMessage={responseMessage}
        onResponseMessage={onResponseMessage}
      />
    </div>
  );
};
