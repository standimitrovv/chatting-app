import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { CogIcon } from '@heroicons/react/outline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

const Settings = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const handleDialogOpen = () => setDialogIsOpen(true);

  const handleDialogClose = () => setDialogIsOpen(false);

  const DialogComponent: React.FC<{
    onClose: () => void;
    open: boolean;
  }> = () => (
    <Dialog onClose={handleDialogClose} open={dialogIsOpen}>
      <DialogTitle>User Settings</DialogTitle>
      <p>Signed in as: </p>
      <button>Log in/Log out</button>
    </Dialog>
  );
  return (
    <>
      <div className='mt-auto py-7' onClick={handleDialogOpen}>
        <Tooltip title='Settings' placement='top' arrow>
          <IconButton>
            <CogIcon className='w-7 h-7 text-gray-200 hover:animate-spin' />
          </IconButton>
        </Tooltip>
      </div>
      <DialogComponent onClose={handleDialogClose} open={dialogIsOpen} />
    </>
  );
};

export default Settings;
