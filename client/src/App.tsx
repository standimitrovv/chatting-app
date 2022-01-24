import React, { useState, useRef, useEffect } from 'react';
import { signInWithGoogle, auth } from './auth/firebaseConfig';
import Message from './components/Message';

export interface IMessage {
  _id: string;
  text: string;
  usersName: string;
  usersImageUrl: string;
  dateOfSending: string;
  creator: string;
}

interface User {
  fullName: string;
  email: string;
  photoUrl: string;
}

function App() {
  const [messages, setMessages] = useState<IMessage[] | []>([]);
  const [user, setUser] = useState<User>({
    fullName: '',
    email: '',
    photoUrl: '',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const apiBeginning = 'http://localhost:3001';

  useEffect(() => {
    const fullName = localStorage.getItem('name') as string;
    const email = localStorage.getItem('email') as string;
    const photoUrl = localStorage.getItem('userImg') as string;
    setUser({ fullName, email, photoUrl });
  }, []);

  useEffect(() => {
    fetch(apiBeginning + '/chat/get-messages')
      .then((res) => res.json())
      .then((data) => setMessages(data.result))
      .catch((err) => console.error(err));
  }, []);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current && auth.currentUser) {
      const enteredMessage = inputRef.current.value;
      const userId = localStorage.getItem('userId');
      fetch(apiBeginning + '/chat/create-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: enteredMessage,
          usersName: user.fullName,
          usersImageUrl: user.photoUrl,
          dateOfSending: new Date(),
          creator: userId,
        }),
      })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };

  const signTheUserIn = () => {
    if (!user.email)
      signInWithGoogle()
        .then((result) => {
          const fullName = result.user.displayName as string;
          const email = result.user.email as string;
          const photoUrl = result.user.photoURL as string;
          const userId = result.user.uid as string;
          setUser({ fullName, email, photoUrl });

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
    <div className='h-screen'>
      <div className='mb-5'>
        <h1>Chatting app</h1>
        <button
          className='mt-5 bg-slate-300 p-2 rounded-sm'
          onClick={signTheUserIn}
        >
          {!user.email ? 'Sign in with Google' : 'Sign out'}
        </button>
      </div>
      {user.email && (
        <div>
          <div className='flex flex-col space-y-5'>
            {messages &&
              messages.map((msg) => <Message message={msg} key={msg._id} />)}
          </div>
          <div>
            <form onSubmit={submitFormHandler}>
              <input
                type='text'
                placeholder='write message'
                className='py-3 px-2 mr-2 border-2'
                ref={inputRef}
              />
              <button
                type='submit'
                className='text-white bg-blue-500 py-3 px-2 rounded-sm'
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
