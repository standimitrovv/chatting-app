import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { CogIcon } from '@heroicons/react/outline';
import { UserSettings } from './UserSettings';

export const Settings = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const handleDialogOpen = () => setDialogIsOpen(true);

  const handleDialogClose = () => setDialogIsOpen(false);

  return (
    <>
      <div className='mt-auto py-7' onClick={handleDialogOpen}>
        <Tooltip title='Settings' placement='top' arrow>
          <IconButton>
            <CogIcon className='w-7 h-7 text-gray-200 hover:animate-spin' />
          </IconButton>
        </Tooltip>
      </div>
      <UserSettings
        onCloseDialog={handleDialogClose}
        dialogIsOpen={dialogIsOpen}
      />
    </>
  );
};
