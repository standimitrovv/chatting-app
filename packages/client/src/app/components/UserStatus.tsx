import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { AvailableUserStatuses } from '../models/AvailableUserStatuses';
import { useAuthContext } from '../hooks/useAuthContext';
import { updateUserActivityStatus } from '../../service/user/UpdateUserActivityStatus';
import { StatusOptionsMenu } from './StatusOptionsMenu';

export const UserStatus: React.FunctionComponent = () => {
  const { userCredentials, userStatus, onUserStatusChange } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | undefined>(
    undefined
  );

  const userId = userCredentials && userCredentials.userId;

  if (!userId) {
    return null;
  }

  const onUserStatusClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(undefined);
  };

  const onStatusItemClick = async (status: AvailableUserStatuses) => {
    onUserStatusChange(status);

    try {
      await updateUserActivityStatus({ userId, status });

      //TODO get the response message and display a snackbar with it
    } catch (err) {
      console.error(err);
    }

    onMenuClose();
  };

  return (
    <>
      <div className='flex items-center ml-4' onClick={onUserStatusClick}>
        <span className='text-sm cursor-pointer'>{userStatus}</span>
        <ChevronDownIcon className='small-icon ml-1' />
      </div>

      <StatusOptionsMenu
        anchorEl={anchorEl}
        onClick={onStatusItemClick}
        onClose={onMenuClose}
      />
    </>
  );
};
