import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth/authContext';
import SideBar from './shared/components/SideBar';
import AllChat from './AllChat/AllChat';
import StartPage from './Start/Start';
import { IActiveChannelState } from './shared/components/SideBar';
import ContextProvider from './auth/ContextProvider';

export interface IUser {
  fullName: string;
  email: string;
  photoUrl: string;
}

const App: React.FC = () => {
  const userD = useContext(AuthContext);
  console.log(userD);
  const [user, setUser] = useState<IUser>({
    fullName: '',
    email: '',
    photoUrl: '',
  });
  const [activeChannel, setActiveChannel] = useState<IActiveChannelState>({
    start: true,
    all: false,
  });

  useEffect(() => {
    const fullName = localStorage.getItem('name') as string;
    const email = localStorage.getItem('email') as string;
    const photoUrl = localStorage.getItem('userImg') as string;
    setUser({ fullName, email, photoUrl });
  }, []);

  const updateUserCredentials = (userCredentials: IUser) => {
    setUser(userCredentials);
  };

  const handleActiveChannel = (channelState: IActiveChannelState) => {
    setActiveChannel(channelState);
  };

  return (
    <ContextProvider>
      <div className='flex flex-col md:flex-row h-screen'>
        <SideBar
          user={user}
          updateUser={updateUserCredentials}
          switchTheActiveChannel={handleActiveChannel}
        />
        {activeChannel.all && (
          <AllChat user={user} updateUser={updateUserCredentials} />
        )}
        {activeChannel.start && <StartPage />}
      </div>
    </ContextProvider>
  );
};

export default App;
