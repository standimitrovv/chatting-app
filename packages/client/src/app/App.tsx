import React, { useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { SideBar, IActiveChannelState } from './components/SideBar';
import { AllChat } from '../all-chat/components/AllChat';
import { StartPage } from '../start-page/containers/Start';
import { NotAuthorized } from './containers/NotAuthorized';

export const App: React.FunctionComponent = () => {
  const { userCredentials } = useAuthContext();
  const [activeChannel, setActiveChannel] = useState<IActiveChannelState>({
    start: true,
    all: false,
  });

  const handleActiveChannel = (channelState: IActiveChannelState) => {
    setActiveChannel(channelState);
  };
  return (
    <>
      {userCredentials && (
        <div className='flex flex-col md:flex-row h-screen'>
          <SideBar switchTheActiveChannel={handleActiveChannel} />
          {/* {activeChannel.all && <AllChat user={userCredentials} />} */}
          {activeChannel.start && <StartPage />}
        </div>
      )}
      {!userCredentials && <NotAuthorized />}
    </>
  );
};
