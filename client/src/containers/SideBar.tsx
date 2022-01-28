import React, { useState, useEffect } from 'react';
import { signInWithGoogle, auth } from '../auth/firebaseConfig';
import { apiBeginning, IUser } from '../App';
import appLogo from '../images/logo.jpg';
import { PlusIcon, CogIcon } from '@heroicons/react/outline';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

interface Props {
  user: IUser;
  updateUser: (userCredentials: IUser) => void;
  switchTheActiveChannel: (channelState: IActiveChannelState) => void;
}

export interface IActiveChannelState {
  start: boolean;
  all: boolean;
}

const SideBar: React.FC<Props> = ({
  user,
  updateUser,
  switchTheActiveChannel,
}) => {
  const [activeChannel, setActiveChannel] = useState<IActiveChannelState>({
    start: true,
    all: false,
  });
  const signTheUserIn = () => {
    if (!user.email)
      signInWithGoogle()
        .then((result) => {
          const fullName = result.user.displayName as string;
          const email = result.user.email as string;
          const photoUrl = result.user.photoURL as string;
          const userId = result.user.uid as string;
          updateUser({ fullName, email, photoUrl });

          fetch(apiBeginning + '/users/create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, fullName, photoUrl, userId }),
          })
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
          localStorage.setItem('name', fullName);
          localStorage.setItem('email', email);
          localStorage.setItem('userImg', photoUrl);
          localStorage.setItem('userId', userId);
        })
        .catch((err) => console.error(err));
    else {
      localStorage.clear();
      auth.signOut();
      window.location.reload();
    }
  };

  useEffect(() => {
    switchTheActiveChannel(activeChannel);
  }, [activeChannel, switchTheActiveChannel]);

  return (
    <div>
      {/* <div className='md:mt-12'>
        <img src={appLogo} alt='App logo' className='h-28 w-full md:h-full ' />
      </div>
      {user.fullName && (
        <div className='text-center'>
          <p className='text-white mt-3'>Signed in as:</p>
          <p className='text-white font-bold'>{user.fullName.split(' ')[0]}</p>
        </div>
      )}
      <button
        className='mt-5 bg-slate-300 p-2 rounded-sm'
        onClick={signTheUserIn}
      >
        {!user.email ? 'Sign in with Google' : 'Sign out'}
      </button> */}

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
        <div className='mt-auto py-7'>
          <Tooltip title='Settings' placement='top' arrow>
            <IconButton>
              <CogIcon className='w-7 h-7 text-gray-200 hover:animate-spin' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
