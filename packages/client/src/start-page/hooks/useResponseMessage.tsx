import { useState, createContext, useContext } from 'react';

interface ResponseMessageContext {
  responseMessage: string;
  onResponseMessage: (message: string) => void;
}

const Context = createContext<ResponseMessageContext | null>(null);

export const useResponseMessage = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Missing context for Response Message');
  }

  return context;
};

export const ResponseMessageProvider: React.FunctionComponent = (props) => {
  const [responseMessage, setResponseMessage] = useState<string>('');

  const onResponseMessage = (message: string) => {
    setResponseMessage(message);
  };

  const context = {
    responseMessage,
    onResponseMessage,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};
