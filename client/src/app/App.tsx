import React, { useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import SideBar from './components/SideBar';
import AllChat from '../all-chat/components/AllChat';
import StartPage from '../start-page/components/Start';
import { IActiveChannelState } from './components/SideBar';
import { NotAuthorized } from './components/NotAuthorized';

const App: React.FC = () => {
  const { userCredentials } = useAuthContext();
  const [activeChannel, setActiveChannel] = useState<IActiveChannelState>({
    start: true,
    all: false,
  });

  const handleActiveChannel = (channelState: IActiveChannelState) => {
    setActiveChannel(channelState);
  }
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
