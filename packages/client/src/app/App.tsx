import React, { useState } from 'react';
import { StartPage } from '../start-page/containers/Start';
import { SideBar } from './components/sidebar/Index';
import { NotAuthorized } from './containers/NotAuthorized';
import { useAuthContext } from './hooks/useAuthContext';

interface ActiveChat {
  individualChat: boolean;
  allChat: boolean;
}

export const App: React.FunctionComponent = () => {
  const { userCredentials } = useAuthContext();

  const [activeChat, setActiveChat] = useState<ActiveChat>({
    individualChat: true,
    allChat: false,
  });

  const onIndividualChatClick = () => {
    setActiveChat({ individualChat: true, allChat: false });
  };

  const onAllChatClick = () => {
    setActiveChat({ individualChat: false, allChat: true });
  };

  return (
    <>
      {userCredentials && (
        <div className='flex flex-col md:flex-row h-screen'>
          <SideBar
            isIndividualChatActive={activeChat.individualChat}
            isAllChatActive={activeChat.allChat}
            onIndividualChatClick={onIndividualChatClick}
            onAllChatClick={onAllChatClick}
          />

          {/* {activeChannel.all && <AllChat user={userCredentials} />} */}

          {activeChat.individualChat && <StartPage />}
        </div>
      )}
      {!userCredentials && <NotAuthorized />}
    </>
  );
};
