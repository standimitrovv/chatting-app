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
  console.log(userD.userCredentials);
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
    const { email, fullName, photoUrl } = JSON.parse(
      localStorage.getItem('userData')!
    );
    // console.log(userData);
  }, []);

  const handleActiveChannel = (channelState: IActiveChannelState) => {
    setActiveChannel(channelState);
  };

  return (
    <ContextProvider>
      <div className='flex flex-col md:flex-row h-screen'>
        <SideBar user={user} switchTheActiveChannel={handleActiveChannel} />
        {activeChannel.all && <AllChat user={user} />}
        {activeChannel.start && <StartPage />}
      </div>
    </ContextProvider>
  );
};

export default App;
