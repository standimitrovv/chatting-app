import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
  conversationResponse: string;
  setConversationResponse: (message: string) => void;
}

export const ResponseMessage: React.FunctionComponent<Props> = (props) => {
  return (
    <Snackbar
      open={Boolean(props.conversationResponse)}
      autoHideDuration={5000}
      onClose={() => props.setConversationResponse('')}
    >
      <Alert
        onClose={() => props.setConversationResponse('')}
        variant='filled'
        severity={
          props.conversationResponse.startsWith('Successfully')
            ? 'success'
            : 'error'
        }
        sx={{ width: '100%' }}
      >
        {props.conversationResponse}
      </Alert>
    </Snackbar>
  );
};
