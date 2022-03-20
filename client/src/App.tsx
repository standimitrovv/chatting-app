import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth/authContext';
import SideBar from './shared/components/SideBar';
import AllChat from './AllChat/AllChat';
import StartPage from './Start/Start';
import { IActiveChannelState } from './shared/components/SideBar';
import { NotAuthorized } from './shared/components/NotAuthorized';

export interface IUser {
  fullName: string;
  email: string;
  photoUrl: string;
  userId: string;
}

const App: React.FC = () => {
  const { userCredentials, login } = useContext(AuthContext);
  const [activeChannel, setActiveChannel] = useState<IActiveChannelState>({
    start: true,
    all: false,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if (userData && userCredentials) {
      const userCreds = Object.values(userCredentials).every(
        (el) => el.length !== 0
      );
      if (!userCreds) login(userData);
    }
  }, [login, userCredentials]);

  const handleActiveChannel = (channelState: IActiveChannelState) => {
    setActiveChannel(channelState);
  };

  return (
    <>
      {userCredentials && (
        <div className='flex flex-col md:flex-row h-screen'>
          <SideBar
            user={userCredentials}
            switchTheActiveChannel={handleActiveChannel}
          />
          {activeChannel.all && <AllChat user={userCredentials} />}
          {activeChannel.start && <StartPage />}
        </div>
      )}
      {!userCredentials && <NotAuthorized />}
    </>
  );
};

export default App;
