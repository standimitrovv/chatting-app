import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { useHttp } from '../../app/hooks/useHttp';
import { SearchResult } from '../containers/SearchResult';
import { User } from '../models/User';

interface Props {
  setCreateConvoResponseMessage: (message: string) => void;
}

export const SearchBar: React.FunctionComponent<Props> = (props) => {
  const { userCredentials } = useAuthContext();

  const { sendRequest } = useHttp();

  const [isSearching, setIsSearching] = useState(false);

  const [searchResults, setSearchResults] = useState<User[] | []>([]);

  const [userInput, setUserInput] = useState<string>('');

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

          if (filteredUsers) {
            setSearchResults(filteredUsers);

            setIsSearching(false);
          }
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

    setUserInput('');

    try {
      const response = await sendRequest(
        `/conversations/create-convo`,
        'POST',
        JSON.stringify({ userId, friendId }),
        { 'Content-Type': 'application/json' }
      );
      props.setCreateConvoResponseMessage(response.message);
    } catch (err) {}
  };

  const onInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);

    if (e.target.value.length === 0) {
      setIsSearching(false);
    }

    setUserInput(e.target.value);
  };

  const renderContent = (): JSX.Element => {
    const getSearchingStateLabel = () => {
      if (searchResults.length === 0 && !isSearching) {
        return 'No results found.';
      }

      if (userInput.length === 1) {
        return 'Enter one more character, please.';
      }

      if (searchResults.length === 0) {
        return 'One moment, please.';
      }
    };

    return (
      <>
        {searchResults.length === 0 ? (
          <p className='py-3 px-2 w-full'>{getSearchingStateLabel()}</p>
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
      </>
    );
  };

  return (
    <div className='w-full relative'>
      <div className='flex items-center relative justify-between'>
        <div className='absolute w-10 h-10 flex items-center justify-center'>
          {isSearching && searchResults.length === 0 ? (
            <CircularProgress size={20} />
          ) : (
            <SearchIcon className='base-icon text-white' />
          )}
        </div>
        <input
          type='text'
          placeholder='Search for a friend...'
          className='rounded-md py-2 pl-12 bg-gray-600 text-white font-bold focus-within:outline-none w-full'
          onChange={onInputFieldChange}
          value={userInput}
        />
      </div>
      {userInput.trim().length >= 1 && (
        <div
          className={`bg-orange-400 rounded-lg flex flex-col text-center absolute w-full ${
            searchResults.length === 0
              ? 'h-11 flex items-center justify-center '
              : 'h-fit'
          }`}
        >
          {renderContent()}
        </div>
      )}
    </div>
  );
};
