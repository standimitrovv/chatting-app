import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/outline';
import { MinusCircleIcon, ClockIcon } from '@heroicons/react/solid';
import { AvailableUserStatuses } from '../models/AvailableUserStatuses';

interface Props {
  xs?: boolean;
  className?: string;
  status: AvailableUserStatuses;
}

export const StatusIcon: React.FunctionComponent<Props> = (props) => {
  if (props.status === 'Online') {
    return (
      <CheckCircleIcon
        className={`${props.xs ? 'xs-icon' : 'base-icon'} ${
          props.className
        } status-icon text-green-500`}
      />
    );
  }

  if (props.status === 'Do Not Disturb') {
    return (
      <MinusCircleIcon
        className={`${props.xs ? 'xs-icon' : 'base-icon'} ${
          props.className
        } status-icon text-red-500`}
      />
    );
  }

  if (props.status === 'Away') {
    return (
      <ClockIcon
        className={`${props.xs ? 'xs-icon' : 'base-icon'} ${
          props.className
        } status-icon text-yellow-500`}
      />
    );
  }

  if (props.status === 'Offline') {
    return (
      <XCircleIcon
        className={`${props.xs ? 'xs-icon' : 'base-icon'} ${
          props.className
        } status-icon text-gray-500`}
      />
    );
  }

  return null;
};
