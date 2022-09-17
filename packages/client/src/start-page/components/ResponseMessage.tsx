import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useResponseMessage } from '../hooks/useResponseMessage';

export const ResponseMessage: React.FunctionComponent = () => {
  const { responseMessage, onResponseMessage } = useResponseMessage();

  return (
    <Snackbar
      open={Boolean(responseMessage)}
      autoHideDuration={5000}
      onClose={() => onResponseMessage('')}
    >
      <Alert
        onClose={() => onResponseMessage('')}
        variant='filled'
        severity={
          responseMessage.startsWith('Successfully') ? 'success' : 'error'
        }
        sx={{ width: '100%' }}
      >
        {responseMessage}
      </Alert>
    </Snackbar>
  );
};
