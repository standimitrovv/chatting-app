import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { useHttp } from '../../app/hooks/useHttp';
import { Conversation } from './Conversation';
import { UserConversation } from '../models/UserConversation';
import { Chat } from './Chat';
import { useConversation } from '../hooks/useConversation';
import { SearchBar } from '../components/SearchBar';
import { ResponseMessage } from '../components/ResponseMessage';

export const StartPage: React.FC = () => {
  const [userConversations, setUserConversations] = useState<
    UserConversation[] | []
  >([]);

  const [convoResponseMessage, setConvoResponseMessage] = useState<string>('');

  const { isLoading, sendRequest, error } = useHttp();

  const { userCredentials } = useAuthContext();

  const { activeConversation, setActiveConversation } = useConversation();

  const userId = userCredentials?.userId;

  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;

        const response = await sendRequest(
          `/conversations/get-convo/${userId}`
        );

        if (!response) {
          setUserConversations([]);
          return;
        }

        setUserConversations(response.userConversations);
      } catch (err) {}
    })();
  }, [userId, sendRequest, convoResponseMessage]);

  //refetch the conversations when status of a user changes
  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);

    socket.on('status-change', () => {
      (async () => {
        const response = await sendRequest(
          `/conversations/get-convo/${userId}`
        );

        if (!response) {
          setUserConversations([]);
          return;
        }

        setUserConversations(response.userConversations);
      })();
    });
  }, [sendRequest, userId]);

  const deleteConversation = async (conversationId: string) => {
    try {
      const response = await sendRequest(
        `/conversations/delete-convo/${conversationId}`,
        'DELETE'
      );
      if (error) {
        setConvoResponseMessage(error);
      }

      if (response.message) {
        setActiveConversation(undefined);
        setConvoResponseMessage(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex w-full'>
      <div className='w-96 bg-slate-500 relative'>
        <div className='flex relative pt-9 pb-6 px-4 border-b'>
          <SearchBar
            isLoading={isLoading}
            setCreateConvoResponseMessage={(message: string) =>
              setConvoResponseMessage(message)
            }
          />
        </div>
        <div className='flex flex-col justify-center pt-5'>
          {userConversations.map((conversation) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              isActive={conversation._id === activeConversation?._id}
              onDelete={() => deleteConversation(conversation._id)}
              onClick={() => setActiveConversation(conversation)}
            />
          ))}
        </div>
      </div>
      <div className='bg-cyan-400 w-full pt-8'>
        {activeConversation && <Chat />}
      </div>
      <ResponseMessage
        conversationResponse={convoResponseMessage}
        setConversationResponse={setConvoResponseMessage}
      />
    </div>
  );
};
