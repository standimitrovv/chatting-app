import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Modal from '@mui/material/Modal';
import googleSvg from '../../assets/images/google.png';

export const NotAuthorized: React.FunctionComponent = () => {
  const { isLoggedIn, loginWithGoogle } = useAuthContext();

  return (
    <Modal
      open={!isLoggedIn}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      className='bg-black'
    >
      <div className='absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 w-[400px] bg-gray-500 p-8 rounded-lg'>
        <p className='text-white text-center font-semibold'>
          It looks like you are not signed in yet.
        </p>

        <div className='flex relative'>
          <img
            src={googleSvg}
            alt='google icon'
            className='w-4 h-4 absolute left-14 top-7'
          />
          <button
            className='bg-white rounded-full w-full py-2 mt-4 font-bold text-blue-500'
            onClick={loginWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </Modal>
  );
};
