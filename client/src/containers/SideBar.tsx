import React from 'react';
import { signInWithGoogle, auth } from '../auth/firebaseConfig';
import { apiBeginning, IUser } from '../App';
import appLogo from '../images/logo.jpg';

interface Props {
  user: IUser;
  updateUser: (userCredentials: IUser) => void;
}

const SideBar: React.FC<Props> = ({ user, updateUser }) => {
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
  return (
    <div className='h-30 py-4 md:py-0 md:w-60  md:h-full bg-black flex flex-col items-center'>
      <div className='md:mt-12'>
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
      </button>
    </div>
  );
};

export default SideBar;
