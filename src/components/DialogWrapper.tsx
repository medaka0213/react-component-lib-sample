import React, { VFC, ReactNode, useState } from 'react';
import { Modal, Box } from '@mui/material';

type DialogWrapperProps = {
  children?: ReactNode;
  showOnClick?: ReactNode;
};

export const DialogWrapper: VFC<DialogWrapperProps> = ({
  children,
  showOnClick,
}) => {
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
          {showOnClick || children}
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
