import React from 'react';
import { signInWithGoogle, auth } from '../auth/firebaseConfig';
import { apiBeginning, IUser } from '../App';

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
    <div className='w-60 h-full bg-slate-700'>
      <h1>Chatting app</h1>
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
