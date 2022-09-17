import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
  responseMessage: string;
  onResponseMessage: (message: string) => void;
}

export const ResponseMessage: React.FunctionComponent<Props> = (props) => {
  return (
    <Snackbar
      open={Boolean(props.responseMessage)}
      autoHideDuration={5000}
      onClose={() => props.onResponseMessage('')}
    >
      <Alert
        onClose={() => props.onResponseMessage('')}
        variant='filled'
        severity={
          props.responseMessage.startsWith('Successfully') ? 'success' : 'error'
        }
        sx={{ width: '100%' }}
      >
        {props.responseMessage}
      </Alert>
    </Snackbar>
  );
};
