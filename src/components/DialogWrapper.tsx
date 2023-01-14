import React, { VFC, ReactNode, useState } from 'react';
import { Modal, Box, BoxProps } from '@mui/material';

type DialogWrapperProps = {
  children: ReactNode;
};

export const DialogWrapper: VFC<DialogWrapperProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(!open)}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => setOpen(false)}
        >
          {children}
        </Box>
      </Modal>
      <Box
        sx={{
          width: '100%',
          zIndex: 10000,
          '&:hover': {
            opacity: 0.9,
          },
        }}
        onClick={() => setOpen(true)}
      >
        {children}
      </Box>
    </>
  );
};
