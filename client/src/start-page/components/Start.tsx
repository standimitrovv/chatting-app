import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { SearchIcon } from '@heroicons/react/outline';
import SearchResult from './SearchResult';
import CircularProgress from '@mui/material/CircularProgress';
import useHttp from '../../app/hooks/useHttp';
import Conversation from './Conversation';
import ChatMessages from './ChatMessages';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { User } from '../models/User';
import { ConversationMessages } from '../models/ConversationMessages';
import { UserConversation } from '../models/UserConversation';

const StartPage: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [userConversations, setUserConversations] = useState<
    UserConversation[] | []
  >([]);
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessages[] | []
  >([]);
  const [activeConvo, setActiveConvo] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<User[] | []>([]);
  const [convoResponseMessage, setConvoResponseMessage] = useState<string>('');
  const { isLoading, sendRequest, error } = useHttp();
  const { userCredentials } = useAuthContext();
  const userId = userCredentials?.userId;

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (userInput.trim().length >= 2) {
        try {
          const { users } = await sendRequest(
            `${process.env.REACT_APP_API_SERVER}/users/get-users`
          );
          const allUsersExceptCurrentOne = users.filter(
            (user: User) => user.userId !== userId
          );
          const filteredUsers = allUsersExceptCurrentOne.filter(
            (user: User) => {
              if (userInput.trim().length < 2) return null;
              if (
                user.fullName.toLowerCase().includes(userInput.toLowerCase())
              ) {
                return user;
              } else return null;
            }
          );
          setSearchResults(filteredUsers);
        } catch (err) {
          console.error(err);
        }
      }
    };
    const timer = setTimeout(() => {
      fetchAllUsers();
    }, 1000);
    return () => clearTimeout(timer);
  }, [userInput, sendRequest, userId]);

  const createConversation = async (friendId: string) => {
    setIsSearching(false);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/conversations/create-convo`,
        'POST',
        JSON.stringify({ userId, friendId }),
        { 'Content-Type': 'application/json' }
      );
      setConvoResponseMessage(response.message);
    } catch (err) {}
  };

  const fetchUserConversation = async (conversationId: string) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/messages/get-messages/${conversationId}`
      );
      if (response) {
        setConversationMessages(response.messages);
        setActiveConvo(conversationId);
      }
    } catch (err) {}
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/conversations/delete-convo/${conversationId}`,
        'DELETE'
      );
      if (error) {
        setConvoResponseMessage(error);
        return;
      }
      setConvoResponseMessage(response.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getConvosOfUser = async () => {
      try {
        if (!userId) return;
        const response = await sendRequest(
          `${process.env.REACT_APP_API_SERVER}/conversations/get-convo/${userId}`
        );
        if (!response) return;
        setUserConversations(response.userConversations);
      } catch (err) {
        console.log(err);
      }
    };
    getConvosOfUser();
  }, [userId, sendRequest, convoResponseMessage]);

  return (
    <div className='flex w-full'>
      <div className='w-1/5 bg-slate-500 relative'>
        <div className='flex relative pt-9 pb-6 px-4 border-b'>
          <div className='w-full relative'>
            <div className='flex items-center relative justify-between'>
              {!isLoading ? (
                <SearchIcon className='h-5 w-5 text-white absolute left-4' />
              ) : (
                <CircularProgress
                  size={20}
                  className='w-full text-white absolute left-4 top-[2.9rem]'
                />
              )}
              <input
                type='text'
                placeholder='Search for a friend...'
                className='rounded-md py-2 pl-12 bg-gray-600 text-white font-bold focus-within:outline-none w-full'
                onChange={(e) => setUserInput(e.target.value)}
                onClick={() => setIsSearching((prevState) => !prevState)}
                value={userInput}
              />
            </div>
            {isSearching && userInput.trim().length >= 1 && (
              <div
                className={`bg-orange-400 rounded-lg flex flex-col text-center absolute w-full ${
                  searchResults.length === 0 || isLoading
                    ? 'h-11 flex items-center justify-center '
                    : 'h-fit'
                }`}
              >
                {isLoading && searchResults.length === 0 ? (
                  <p className='py-3 px-2 w-full'>Loading..</p>
                ) : userInput.length === 1 ? (
                  <p className='py-3 px-2 w-full'>
                    Enter one more character please.
                  </p>
                ) : searchResults.length === 0 && !isLoading ? (
                  <p className='py-3 px-2 w-full'>No results found.</p>
                ) : (
                  searchResults.map((result) => (
                    <div
                      key={result._id}
                      onClick={() => createConversation(result.userId)}
                    >
                      <SearchResult userData={result} />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center pt-5'>
          {userConversations.map((conversation) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              currentUserId={userId!}
              isActive={conversation._id === activeConvo}
              onDelete={() => deleteConversation(conversation._id)}
              onClick={() => fetchUserConversation(conversation._id)}
            />
          ))}
        </div>
      </div>
      <div className='bg-cyan-400 w-[80%] py-12'>
        {conversationMessages &&
          conversationMessages.map((m) => (
            <ChatMessages
              key={m._id}
              own={m.sender === userId}
              conversation={m}
            />
          ))}
      </div>
      <Snackbar
        open={convoResponseMessage !== ''}
        autoHideDuration={5000}
        onClose={() => setConvoResponseMessage('')}
      >
        <Alert
          onClose={() => setConvoResponseMessage('')}
          variant='filled'
          severity={
            convoResponseMessage.startsWith('Successfully')
              ? 'success'
              : 'error'
          }
          sx={{ width: '100%' }}
        >
          {convoResponseMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StartPage;
