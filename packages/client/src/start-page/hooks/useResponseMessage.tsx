import { useState } from 'react';

export const useResponseMessage = () => {
  const [responseMessage, setResponseMessage] = useState<string>('');

  const onResponseMessage = (message: string) => {
    setResponseMessage(message);
  };

  return { responseMessage, onResponseMessage };
};
