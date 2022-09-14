import React, { useState, useEffect } from 'react';
import appLogo from '../../assets/images/logo.jpg';
import { PlusIcon } from '@heroicons/react/outline';
import Tooltip from '@mui/material/Tooltip';
import { Settings } from './Settings';

interface Props {
  switchTheActiveChannel: (channelState: IActiveChannelState) => void;
}

export interface IActiveChannelState {
  start: boolean;
  all: boolean;
}

export const SideBar: React.FunctionComponent<Props> = ({
  switchTheActiveChannel,
}) => {
  const [activeChannel, setActiveChannel] = useState<IActiveChannelState>({
    start: true,
    all: false,
  });

  useEffect(() => {
    switchTheActiveChannel(activeChannel);
  }, [activeChannel, switchTheActiveChannel]);

  return (
    <div className='py-4 md:py-0 md:w-28 md:h-full bg-slate-800 flex flex-col items-center relative'>
      <div
        className='w-full group flex justify-center items-center my-4'
        onClick={() => setActiveChannel({ start: true, all: false })}
      >
        <div
          className={`h-2/3 w-full flex justify-center items-center mt-3 before:h-6 before:rounded-full before:absolute before:left-0 before:top-[2.75rem] ${
            activeChannel.start
              ? 'border-l-4 rounded-sm'
              : 'group-hover:before:border-l-4 '
          } `}
        >
          <div className='w-14 bg-cover cursor-pointer'>
            <img
              src={appLogo}
              alt='App logo'
              className={`rounded-full h-14  ${
                activeChannel.start ? 'rounded-lg' : 'group-hover:rounded-lg'
              }`}
            />
          </div>
        </div>
      </div>
      <div className='border-b w-2/5 mb-5 -mt-[1.9rem] h-8'>&nbsp;</div>
      <div
        className={`w-full flex justify-center items-center before:h-6 before:rounded-full before:absolute before:left-0 group ${
          activeChannel.all
            ? 'border-l-4 rounded-sm'
            : 'hover:before:border-l-4 '
        } `}
        onClick={() => setActiveChannel({ start: false, all: true })}
      >
        <div
          className={`w-14 h-14 pb-4  ${
            activeChannel.all
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
      <div className='group'>
        <div className='w-14 h-14 my-4 pb-4 rounded-full bg-slate-600 relative cursor-pointer group-hover:rounded-lg group-hover:bg-green-400'>
          <Tooltip placement='right' title='Add a new channel' arrow>
            <div className='w-14 h-14 flex items-center justify-center '>
              <PlusIcon className='w-6 h-6 text-green-500 group-hover:text-white ' />
            </div>
          </Tooltip>
        </div>
      </div>
      <Settings />
    </div>
  );
};
