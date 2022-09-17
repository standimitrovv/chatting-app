import React from 'react';

import appLogo from '../../../assets/images/logo.jpg';

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export const IndividualChat: React.FunctionComponent<Props> = (props) => {
  return (
    <div
      className='w-full group flex justify-center items-center my-4'
      onClick={props.onClick}
    >
      <div
        className={`h-2/3 w-full flex justify-center items-center mt-3 before:h-6 before:rounded-full before:absolute before:left-0 before:top-[2.75rem] ${
          props.isActive
            ? 'border-l-4 rounded-sm'
            : 'group-hover:before:border-l-4 '
        } `}
      >
        <div className='w-14 bg-cover cursor-pointer'>
          <img
            src={appLogo}
            alt='App logo'
            className={`rounded-full h-14  ${
              props.isActive ? 'rounded-lg' : 'group-hover:rounded-lg'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
