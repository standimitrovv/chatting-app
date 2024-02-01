import { SearchIcon } from '@heroicons/react/outline';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { saveConversation as saveConversationService } from '../../service/conversation/SaveConversation';
import { getAllUsersExceptCurrentOne } from '../../service/user/GetUsers';
import { SearchResults } from '../components/SearchResults';
import { useConversation } from '../hooks/useConversation';
import { useResponseMessage } from '../hooks/useResponseMessage';
import { User } from '../models/User';

export const SearchBar: React.FunctionComponent = () => {
  const { userCredentials } = useAuthContext();

  const { saveConversation } = useConversation();

  const { onResponseMessage } = useResponseMessage();

  const [isSearching, setIsSearching] = useState(false);

  const [searchResults, setSearchResults] = useState<User[] | []>([]);

  const [userInput, setUserInput] = useState<string>('');

  const userId = userCredentials?.userId;

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (userInput.trim().length < 2) {
        return;
      }

      try {
        const users = await getAllUsersExceptCurrentOne(userId!);

        const filteredUsers = users.filter((user) =>
          user.fullName.toLowerCase().includes(userInput.toLowerCase())
        );

        if (filteredUsers.length === 0) {
          setIsSearching(false);

          return;
        }

        setSearchResults(filteredUsers);

        setIsSearching(false);
      } catch (err) {
        console.error(err);
      }
    };

    const timer = setTimeout(() => {
      fetchAllUsers();
    }, 1000);

    return () => clearTimeout(timer);
  }, [userInput, userId]);

  const onConversationClick = async (friendId: string) => {
    setIsSearching(false);

    setUserInput('');

    if (!userId) {
      return;
    }

    try {
      const { data } = await saveConversationService({ userId, friendId });

      if (data.conversation) {
        saveConversation(data.conversation);
      }

      onResponseMessage(data.message);
    } catch (err) {}
  };

  const onInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);

    if (e.target.value.length === 0) {
      setIsSearching(false);
    }

    setUserInput(e.target.value);
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

      {userInput.trim().length > 0 && (
        <SearchResults
          searchResults={searchResults}
          userInputLength={userInput.trim().length}
          isSearching={isSearching}
          onClick={onConversationClick}
        />
      )}
    </div>
  );
};
