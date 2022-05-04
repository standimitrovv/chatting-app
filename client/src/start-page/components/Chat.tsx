import React, { useEffect } from 'react';
import Input from '../../app/components/Input';
import { useHttp } from '../../app/hooks/useHttp';

interface Props {
  convoId: string;
}

export const Chat: React.FunctionComponent<Props> = ({ convoId }) => {
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchUserConversation = async () => {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_SERVER}/messages/get-messages/${convoId}`
      );
      console.log(response);
    };

    fetchUserConversation();
  }, [convoId, sendRequest]);

  return (
    <div>
      <Input />
    </div>
  );
};
