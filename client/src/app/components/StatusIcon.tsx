import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/outline';
import { MinusCircleIcon, ClockIcon } from '@heroicons/react/solid';
import { AvailableUserStatuses } from '../models/AvailableUserStatuses';

interface Props {
  currentStatus: AvailableUserStatuses;
}

export const StatusIcon: React.FunctionComponent<Props> = (props) => {
  if (props.currentStatus === 'Available') {
    return <CheckCircleIcon className='base-icon text-green-500 status-icon' />;
  }

  if (props.currentStatus === 'Do Not Disturb') {
    return <MinusCircleIcon className='base-icon status-icon text-red-500' />;
  }

  if (props.currentStatus === 'Away') {
    return <ClockIcon className='base-icon status-icon text-yellow-500' />;
  }

  if (props.currentStatus === 'Offline') {
    return <XCircleIcon className='base-icon status-icon text-gray-500' />;
  }

  return null;
};
