import { useState, useCallback } from 'react';

type Methods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface Headers {
  [x: string]: string;
}

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const sendRequest = useCallback(
    async (
      url: string,
      method: Methods = 'GET',
      body: BodyInit | null | undefined = null,
      headers: Headers | {} = {}
    ) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}${url}`,
          {
            method,
            body,
            headers,
          }
        );
        const responseData = await response.json();
        if (!response.ok) throw new Error(responseData.message);
        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message);
        return;
      }
    },
    []
  );

  return { isLoading, error, sendRequest };
};
