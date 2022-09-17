import Tooltip from '@mui/material/Tooltip';
import React from 'react';

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export const AllChat: React.FunctionComponent<Props> = (props) => {
  return (
    <div
      className={`w-full flex justify-center items-center before:h-6 before:rounded-full before:absolute before:left-0 group ${
        props.isActive ? 'border-l-4 rounded-sm' : 'hover:before:border-l-4 '
      } `}
      onClick={props.onClick}
    >
      <div
        className={`w-14 h-14 pb-4  ${
          props.isActive
            ? 'bg-blue-500 rounded-lg'
            : 'group-hover:bg-blue-500 group-hover:rounded-lg bg-slate-600 rounded-full'
        }  cursor-pointer `}
      >
        <Tooltip
          title='All Chat'
          placement='right'
          arrow
          sx={{ maxWidth: 220 }}
        >
          <p className='text-white w-14 h-14 flex items-center justify-center font-bold  '>
            All
          </p>
        </Tooltip>
      </div>
    </div>
  );
};
