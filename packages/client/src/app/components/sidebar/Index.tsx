import React from 'react';
import { IndividualChat } from './IndividualChat';
import { Settings } from './Settings';

interface Props {
  isIndividualChatActive: boolean;
  isAllChatActive: boolean;
  onIndividualChatClick: () => void;
  onAllChatClick: () => void;
}

export const SideBar: React.FunctionComponent<Props> = (props) => {
  return (
    <div className='py-4 md:py-0 md:w-28 md:h-full bg-slate-800 flex flex-col items-center relative'>
      <IndividualChat
        isActive={props.isIndividualChatActive}
        onClick={props.onIndividualChatClick}
      />

      <div className='border-b w-2/5 mb-5 -mt-[1.9rem] h-8'>&nbsp;</div>

      {/* <AllChat
        isActive={props.isAllChatActive}
        onClick={props.onAllChatClick}
      /> */}

      <Settings />
    </div>
  );
};
