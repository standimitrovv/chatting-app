import React, { useState, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import SearchResult from './SearchResult';
import CircularProgress from '@mui/material/CircularProgress';
import useHttp from '../shared/hooks/useHttp';
import Conversation from './Conversation';
export interface UserModel {
  _id: string;
  email: string;
  fullName: string;
  photoUrl: string;
  userId: string;
}

export interface UserConversation {
  members: [string];
  _id: string;
}

const StartPage: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [userConversations, setUserConversations] = useState<
    UserConversation[] | []
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<UserModel[] | []>([]);
  const { isLoading, error, sendRequest } = useHttp();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (userInput.trim().length >= 2) {
        try {
          const { users } = await sendRequest(
            `${process.env.REACT_APP_API_SERVER}/users/get-users`
          );
          const allUsersExceptCurrentOne = users.filter(
            (user: UserModel) => user.userId !== userId
          );
          const filteredUsers = allUsersExceptCurrentOne.filter(
            (user: UserModel) => {
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
      console.log(response);
    } catch (err) {}
  };

  const fetchUserConversation = async () => {};

  useEffect(() => {
    const getConvosOfUser = async () => {
      try {
        const { userConversations } = await sendRequest(
          `${process.env.REACT_APP_API_SERVER}/conversations/get-convo/${userId}`
        );
        setUserConversations(userConversations);
      } catch (err) {
        console.log(err);
      }
    };
    getConvosOfUser();
  }, [userId, sendRequest]);

  return (
    <div className='flex w-full'>
      <div className='w-1/5 bg-slate-500 relative'>
        <div className='flex items-center relative pt-9 pb-6 px-4 border-b'>
          {!isLoading ? (
            <SearchIcon className='h-5 w-5 text-white absolute left-7' />
          ) : (
            <CircularProgress
              size={20}
              className='w-full text-white absolute left-7 top-[2.9rem]'
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
            className={`w-[15.6rem] bg-orange-400 absolute top-20 left-[1.05rem] -mt-1 flex flex-col text-center ${
              searchResults.length === 0 || isLoading
                ? 'h-11 flex items-center justify-center '
                : 'h-fit'
            }`}
          >
            {isLoading && searchResults.length === 0 ? (
              <p>Loading..</p>
            ) : userInput.length === 1 ? (
              <p>Enter one more character please.</p>
            ) : searchResults.length === 0 && !isLoading ? (
              <p>No results found.</p>
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
        <div className='flex flex-col justify-center pt-5'>
          {userConversations.map((conversation) => (
            <div key={conversation._id} onClick={fetchUserConversation}>
              <Conversation
                conversation={conversation}
                currentUserId={userId!}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p>User specific chat</p>
      </div>
    </div>
  );
};

export default StartPage;
