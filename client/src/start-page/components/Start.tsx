import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { SearchResult } from './SearchResult';
import { useHttp } from '../../app/hooks/useHttp';
import { Conversation } from './Conversation';
import { User } from '../models/User';
import { UserConversation } from '../models/UserConversation';
import { Chat } from './Chat';
import { SearchIcon } from '@heroicons/react/outline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useConversation } from '../hooks/useConversation';

export const StartPage: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [userConversations, setUserConversations] = useState<
    UserConversation[] | []
  >([]);

  const [convoResponseMessage, setConvoResponseMessage] = useState<string>('');

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<User[] | []>([]);
  const { isLoading, sendRequest, error } = useHttp();
  const { userCredentials } = useAuthContext();

  const { activeConversation, setActiveConversation } = useConversation();

  const userId = userCredentials?.userId;

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (userInput.trim().length >= 2) {
        try {
          const { users } = await sendRequest(`/users/get-users`);
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

  useEffect(() => {
    const getConvosOfUser = async () => {
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
    };
    getConvosOfUser();
  }, [userId, sendRequest, convoResponseMessage]);

  const createConversation = async (friendId: string) => {
    setIsSearching(false);
    try {
      const response = await sendRequest(
        `/conversations/create-convo`,
        'POST',
        JSON.stringify({ userId, friendId }),
        { 'Content-Type': 'application/json' }
      );
      setConvoResponseMessage(response.message);
    } catch (err) {}
  };

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
      <div className='w-72 bg-slate-500 relative'>
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
