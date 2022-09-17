import React, { useCallback, useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { getAllUserConversationsById } from '../../service/conversation/GetAllUserConversationsById';
import { Conversation } from './Conversation';
import { UserConversation } from '../models/UserConversation';
import { SearchBar } from './SearchBar';

interface Props {
  activeConversationId?: string;
  onCreateConversationResponse: (message: string) => void;
  onDelete: (conversationId: string) => void;
  onConversationClick: (conversation: UserConversation) => void;
}

export const SidePanel: React.FunctionComponent<Props> = (props) => {
  const { userCredentials } = useAuthContext();

  const [userConversations, setUserConversations] = useState<
    UserConversation[] | []
  >([]);

  const userId = userCredentials?.userId;

  const getAndSetAllUserConversations = useCallback(async () => {
    if (!userId) {
      return;
    }

    const response = await getAllUserConversationsById({ userId });

    if (!response) {
      setUserConversations([]);
      return;
    }

    setUserConversations(response.userConversations);
  }, [userId]);

  useEffect(() => {
    (async () => {
      try {
        getAndSetAllUserConversations();
      } catch (err) {}
    })();
  }, [userId, getAndSetAllUserConversations]);

  //refetch the conversations when status of a user changes
  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_API_SERVER!);

    //TODO refactor with the UseEffect above?
    socket.on('status-change', () => {
      (async () => {
        getAndSetAllUserConversations();
      })();
    });
  }, [userId, getAndSetAllUserConversations]);

  return (
    <div className='w-96 bg-slate-500 relative'>
      <div className='flex relative pt-9 pb-6 px-4 border-b'>
        <SearchBar
          setCreateConvoResponseMessage={(message: string) =>
            props.onCreateConversationResponse(message)
          }
        />
      </div>
      <div className='flex flex-col justify-center pt-5'>
        {userConversations &&
          userConversations.map((conversation) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              isActive={conversation._id === props.activeConversationId}
              onDelete={() => props.onDelete(conversation._id)}
              onClick={() => props.onConversationClick(conversation)}
            />
          ))}
      </div>
    </div>
  );
};
