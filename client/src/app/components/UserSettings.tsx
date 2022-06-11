import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from '@mui/material/Button';
import { XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';

interface Props {
  onCloseDialog: () => void;
  dialogIsOpen: boolean;
}

export const UserSettings: React.FC<Props> = ({
  onCloseDialog,
  dialogIsOpen,
}) => {
  const [emailIsEncrypted, setEmailIsEncrypted] = useState<boolean>(true);
  const { userCredentials, logout } = useAuthContext();

  const splittedEmail = userCredentials?.email.split('@');
  const encryptedEmail =
    splittedEmail &&
    splittedEmail[0].replace(/[a-zA-Z0-9]/g, '*') +
      '@' +
      splittedEmail.slice(1).join('');

  return (
    <Dialog onClose={onCloseDialog} open={dialogIsOpen} fullWidth={true}>
      <div className='flex items-center justify-between pr-6 border-b border-gray-300'>
        <DialogTitle>My Account</DialogTitle>
        <XIcon className='base-icon' onClick={onCloseDialog} />
      </div>
      <div className='p-6'>
        <div className='flex items-center'>
          <div className='relative'>
            <img
              src={userCredentials?.photoUrl}
              alt='User'
              className='rounded-full w-20 h-20'
              referrerPolicy='no-referrer'
            />
            <CheckCircleIcon className='base-icon text-green-500 absolute top-14 -right-1 bg-white rounded-full' />
          </div>
          <p className='ml-4 font-semibold mr-auto'>
            {userCredentials?.fullName}
          </p>
          <Button variant='contained' onClick={logout}>
            Log Out
          </Button>
        </div>
        <div className='bg-gray-700 mt-4 p-4 rounded-xl'>
          <div className='mb-3'>
            <p className='text-gray-400'>Username</p>
            <p className='text-white font-semibold text-lg'>
              {userCredentials?.fullName}
            </p>
          </div>
          <div>
            <p className='text-gray-400'>Email</p>
            <div className='flex'>
              <p className='text-white font-semibold text-lg'>
                {emailIsEncrypted ? encryptedEmail : userCredentials?.email}
              </p>
              <button
                className='text-sm ml-2 text-blue-500'
                onClick={() => setEmailIsEncrypted((prevState) => !prevState)}
              >
                Show
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
