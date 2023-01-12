import React, { useRef, useCallback } from 'react';
import { Modal, Box, BoxProps } from '@mui/material';

type DialogWrapperProps = {
  children: React.ReactNode;
};

export const DialogWrapper: React.VFC<DialogWrapperProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
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
          height: '100%',
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
