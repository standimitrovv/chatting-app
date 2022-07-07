import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/outline';
import { MinusCircleIcon, ClockIcon } from '@heroicons/react/solid';
import { AvailableUserStatuses } from '../models/AvailableUserStatuses';

interface Props {
  xs?: boolean;
  status: AvailableUserStatuses;
}

export const StatusIcon: React.FunctionComponent<Props> = (props) => {
  if (props.status === 'Available') {
    return (
      <CheckCircleIcon
        className={`${
          props.xs ? 'xs-icon' : 'base-icon'
        } status-icon text-green-500`}
      />
    );
  }

  if (props.status === 'Do Not Disturb') {
    return (
      <MinusCircleIcon
        className={`${
          props.xs ? 'xs-icon' : 'base-icon'
        } status-icon text-red-500`}
      />
    );
  }

  if (props.status === 'Away') {
    return (
      <ClockIcon
        className={`${
          props.xs ? 'xs-icon' : 'base-icon'
        } status-icon text-yellow-500`}
      />
    );
  }

  if (props.status === 'Offline') {
    return (
      <XCircleIcon
        className={`${
          props.xs ? 'xs-icon' : 'base-icon'
        } status-icon text-gray-500`}
      />
    );
  }

  return null;
};
