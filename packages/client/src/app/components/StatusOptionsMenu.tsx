import { XCircleIcon } from '@heroicons/react/outline';
import {
  CheckCircleIcon,
  ClockIcon,
  MinusCircleIcon,
} from '@heroicons/react/solid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { AvailableUserStatuses } from '../models/AvailableUserStatuses';

interface StatusAvailable {
  id: number;
  icon: React.FunctionComponent<any>;
  name: AvailableUserStatuses;
  color: string;
}

const statusAvailable: StatusAvailable[] = [
  {
    id: 1,
    icon: CheckCircleIcon,
    name: 'Online',
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

interface Props {
  anchorEl: HTMLDivElement | undefined;
  onClose: () => void;
  onClick: (status: AvailableUserStatuses) => void;
}

export const StatusOptionsMenu: React.FunctionComponent<Props> = (props) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={!!props.anchorEl}
      onClose={props.onClose}
      sx={{
        '& .MuiMenu-paper': {
          width: 200,
        },
      }}
    >
      {statusAvailable.map((s) => (
        <MenuItem key={s.id} onClick={() => props.onClick(s.name)}>
          <s.icon className={`small-icon mr-2 ${s.color}`} />
          <p className='text-sm'>{s.name}</p>
        </MenuItem>
      ))}
    </Menu>
  );
};
