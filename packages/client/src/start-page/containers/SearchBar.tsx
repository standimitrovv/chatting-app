import { SearchIcon } from '@heroicons/react/outline';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../app/hooks/useAuthContext';
import { saveConversation } from '../../service/conversation/SaveConversation';
import { getAllUsersExceptCurrentOne } from '../../service/user/GetUsers';
import { User } from '../models/User';
import { SearchResult } from '../components/SearchResult';
import { UserConversation } from '../models/UserConversation';

interface Props {
  updateUserConversations: (conversation: UserConversation) => void;
  setCreateConvoResponseMessage: (message: string) => void;
}

export const SearchBar: React.FunctionComponent<Props> = (props) => {
  const { userCredentials } = useAuthContext();

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
      const { data } = await saveConversation({ userId, friendId });

      if (data.conversation) {
        props.updateUserConversations(data.conversation);
      }

      props.setCreateConvoResponseMessage(data.message);
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
              onClick={() => onConversationClick(result.userId)}
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
