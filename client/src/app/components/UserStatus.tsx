import React, { useState } from 'react';
import { ChevronDownIcon, XCircleIcon } from '@heroicons/react/outline';
import {
  CheckCircleIcon,
  MinusCircleIcon,
  ClockIcon,
} from '@heroicons/react/solid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AvailableUserStatuses } from '../models/AvailableUserStatuses';
import { useAuthContext } from '../hooks/useAuthContext';

const statusAvailable = [
  {
    id: 1,
    icon: CheckCircleIcon,
    name: 'Available',
    color: 'text-green-500',
  },
  {
    id: 2,
    icon: MinusCircleIcon,
    name: 'Do Not Disturb',
    color: 'text-red-500',
  },
  {
    id: 3,
    icon: ClockIcon,
    name: 'Away',
    color: 'text-yellow-500',
  },
  {
    id: 4,
    icon: XCircleIcon,
    name: 'Offline',
    color: 'text-gray-500',
  },
];

export const UserStatus: React.FunctionComponent = () => {
  const { userStatus, onUserStatusChange } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | undefined>(
    undefined
  );

  const onUserStatusClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onStatusItemClick = (status: AvailableUserStatuses) => {
    onUserStatusChange(status);

    setAnchorEl(undefined);
  };

  return (
    <>
      <div className='flex items-center ml-4' onClick={onUserStatusClick}>
        <span className='text-sm cursor-pointer'>{userStatus}</span>
        <ChevronDownIcon className='small-icon ml-1' />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        sx={{
          '& .MuiMenu-paper': {
            width: 200,
          },
        }}
      >
        {statusAvailable.map((s) => (
          <MenuItem
            key={s.id}
            onClick={() => onStatusItemClick(s.name as AvailableUserStatuses)}
          >
            <s.icon className={`small-icon mr-2 ${s.color}`} />
            <p className='text-sm'>{s.name}</p>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
