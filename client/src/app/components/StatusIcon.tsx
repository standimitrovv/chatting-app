import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/outline';
import { MinusCircleIcon, ClockIcon } from '@heroicons/react/solid';
import { useAuthContext } from '../hooks/useAuthContext';

export const StatusIcon: React.FunctionComponent = () => {
  const { userStatus } = useAuthContext();

  if (userStatus === 'Available') {
    return <CheckCircleIcon className='base-icon text-green-500 status-icon' />;
  }

  if (userStatus === 'Do Not Disturb') {
    return <MinusCircleIcon className='base-icon status-icon text-red-500' />;
  }

  if (userStatus === 'Away') {
    return <ClockIcon className='base-icon status-icon text-yellow-500' />;
  }

  if (userStatus === 'Offline') {
    return <XCircleIcon className='base-icon status-icon text-gray-500' />;
  }

  return null;
};
