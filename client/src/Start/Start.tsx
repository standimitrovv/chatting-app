import React, { useState, useEffect } from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import user from '../images/user.png';
import SearchResult from './SearchResult';
import CircularProgress from '@mui/material/CircularProgress';

export interface UserModel {
  _id: string;
  email: string;
  fullName: string;
  photoUrl: string;
  userId: string;
}

const StartPage: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<UserModel[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (userInput.length >= 2) {
        try {
          setIsLoading(true);
          const response = await fetch('http://localhost:3001/users/get-users');
          const { users } = await response.json();
          if (!response.ok)
            throw new Error('Something went wrong with getting users');

          const filteredUsers = users.filter((user: UserModel) => {
            if (userInput.trim().length < 2) return null;
            if (user.fullName.toLowerCase().includes(userInput.toLowerCase())) {
              return user;
            } else return null;
          });
          setSearchResults(filteredUsers);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.error(err);
        }
      }
    };

    const timer = setTimeout(() => {
      fetchAllUsers();
    }, 1000);
    return () => clearTimeout(timer);
  }, [userInput]);

  const createConversation = (userId: string) => {
    console.log(userId);
    setIsSearching(false);
  };

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
          <div className='flex items-center px-6 py-3 group hover:bg-slate-800 cursor-pointer'>
            <img
              src={user}
              alt="User's profile "
              className='w-10 h-8 rounded-full'
            />
            <p className='ml-4 text-white font-semibold'>Stanimir Dimitrov</p>
            <XIcon className='w-5 h-5 text-white cursor-pointer ml-auto hidden group-hover:inline-block' />
          </div>
          <div className='flex items-center px-6 py-3 space-x-4'>
            <img
              src={user}
              alt="User's profile "
              className='w-10 h-8 rounded-full'
            />
            <p>Stanimir Dimitrov</p>
          </div>
        </div>
      </div>
      <div>
        <p>User specific chat</p>
      </div>
    </div>
  );
};

export default StartPage;
