import React, { useState, useEffect } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import SideBar from './components/SideBar';
import AllChat from '../all-chat/AllChat';
import StartPage from '../start-page/Start';
import { IActiveChannelState } from './components/SideBar';
import { NotAuthorized } from './components/NotAuthorized';

const App: React.FC = () => {
  const { userCredentials, login } = useAuthContext();
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
