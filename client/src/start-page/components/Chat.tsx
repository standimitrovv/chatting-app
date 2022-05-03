import React from 'react';
import Input from '../../app/components/Input';

interface Props {
  convoId: string;
}

export const Chat: React.FunctionComponent<Props> = ({ convoId }) => {
  return (
    <div>
      <Input />
    </div>
  );
};
