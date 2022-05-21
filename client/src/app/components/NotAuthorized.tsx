import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Modal from '@mui/material/Modal';
import googleSvg from '../../assets/images/google.png';
import { signInWithGoogle } from '../FirebaseConfig';
import { useHttp } from '../hooks/useHttp';

export const NotAuthorized: React.FC = () => {
  const { isLoggedIn, login } = useAuthContext();
  const { sendRequest } = useHttp();

  const signTheUserIn = () => {
    signInWithGoogle()
      .then((result) => {
        const fullName = result.user.displayName as string;
        const email = result.user.email as string;
        const photoUrl = result.user.photoURL as string;
        const userId = result.user.uid as string;

        sendRequest(
          `/users/create-user`,
          'POST',
          JSON.stringify({ email, fullName, photoUrl, userId }),
          {
            'Content-Type': 'application/json',
          }
        ).then((res) => console.log(res));

        login({ email, fullName, photoUrl, userId });
      })
      .catch((err) => console.error(err));
  };

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
            onClick={signTheUserIn}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </Modal>
  );
};
