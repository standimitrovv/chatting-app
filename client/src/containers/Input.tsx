import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../auth/firebaseConfig';
import { IUser, apiBeginning } from '../App';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import googleSvg from '../images/google.png';

interface Props {
  userCredentials: IUser;
  updateUser: (userData: IUser) => void;
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

const Input: React.FC<Props> = ({ userCredentials, updateUser }) => {
  const [usersInput, setUsersInput] = useState<string>('');
  const [isNotLogged, setIsNotLogged] = useState(false);

  const submitFormHandler = (e: React.FormEvent) => {
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
      fetch(apiBeginning + '/chat/create-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

      setUsersInput('');
    }
    if (!auth.currentUser) setIsNotLogged(true);
  };

  const signTheUserIn = () => {
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
        setIsNotLogged(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className='w-11/12 fixed bottom-0 px-2 py-3 border-t border-black bg-orange-300 h-26'>
        <form
          className='my-4 mx-2 mr-16 flex space-x-4 min-w-fit '
          onSubmit={submitFormHandler}
        >
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Write a message..'
              className='p-3 rounded-sm w-full h-full bg-gray-200 focus-within:outline-none'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsersInput(e.target.value)
              }
              value={usersInput}
            />
          </div>
          <button
            type='submit'
            className='w-20 bg-blue-500 rounded-sm text-white'
          >
            Send
          </button>
        </form>
      </div>
      <Modal
        open={isNotLogged}
        onClose={() => setIsNotLogged(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <p className='text-white text-center font-semibold'>
            It looks like you are not logged in yet!
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
