import React from 'react';
import { User } from '../models/User';
import { SearchResult } from './SearchResult';

interface Props {
  searchResults: User[];
  isSearching: boolean;
  userInputLength: number;
  onClick: (userId: string) => void;
}

export const SearchResults: React.FunctionComponent<Props> = (props) => {
  return (
    <div className='bg-orange-400 rounded-lg flex flex-col text-center absolute w-full'>
      {props.searchResults.length === 0 && (
        <p className='py-3 px-2 w-full'>
          {buildSearchingStateLabel(
            props.searchResults.length,
            props.isSearching,
            props.userInputLength
          )}
        </p>
      )}

      {props.searchResults.length > 0 &&
        props.searchResults.map((result) => (
          <SearchResult
            key={result._id}
            userData={result}
            onClick={() => props.onClick(result.userId)}
          />
        ))}
    </div>
  );
};

const buildSearchingStateLabel = (
  searchResults: number,
  isSearching: boolean,
  userInput: number
) => {
  if (searchResults === 0 && !isSearching) {
    return 'No results found.';
  }

  if (userInput === 1) {
    return 'Enter one more character, please.';
  }

  if (searchResults === 0) {
    return 'One moment, please.';
  }
};
