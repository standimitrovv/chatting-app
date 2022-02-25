import React, { useState, useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { auth, signInWithGoogle } from '../../auth/firebaseConfig';
import { IUser } from '../../App';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import googleSvg from '../../images/google.png';
import useHttp from '../hooks/useHttp';

interface Props {
  userCredentials: IUser;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '1px solid #000',
  boxShadow: 18,
  p: 4,
};

const Input: React.FC<Props> = ({ userCredentials }) => {
  const [usersInput, setUsersInput] = useState<string>('');
  const { isLoggedIn, login } = useContext(AuthContext);
  const { sendRequest } = useHttp();

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (usersInput.trim().length !== 0 && auth.currentUser) {
      const userId = localStorage.getItem('userId');
      const message = {
        text: usersInput,
        usersName: userCredentials.fullName,
        usersImageUrl: userCredentials.photoUrl,
        dateOfSending: new Date(),
        creator: userId,
      };
      await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/all-chat/create-message`,
        'POST',
        JSON.stringify(message),
        {
          'Content-Type': 'application/json',
        }
      );

      setUsersInput('');
    }
  };

  const signTheUserIn = () => {
    signInWithGoogle()
      .then((result) => {
        const fullName = result.user.displayName as string;
        const email = result.user.email as string;
        const photoUrl = result.user.photoURL as string;
        const userId = result.user.uid as string;

        sendRequest(
          `${process.env.REACT_APP_API_SERVER}/users/create-user`,
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
  //bg-zinc-700
  return (
    <div>
      <div className='w-full md:w-9/12 fixed bottom-0 px-2 py-3 border-t border-gray h-26'>
        <form
          className='my-4 flex space-x-4 px-4 md:mr-28 lg:mr-24 xl:mr-20 2xl:mr-3'
          onSubmit={submitFormHandler}
        >
          <input
            type='text'
            placeholder='Write a message..'
            className='p-3 rounded-sm w-full h-full bg-zinc-300 focus-within:outline-none '
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsersInput(e.target.value)
            }
            value={usersInput}
          />

          <button
            type='submit'
            className='bg-blue-500 rounded-sm text-white font-semibold px-4 '
          >
            Send
          </button>
        </form>
      </div>
      <Modal
        open={!isLoggedIn}
        // onClose={() => setIsNotLogged(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
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
        </Box>
      </Modal>
    </div>
  );
};

export default Input;
