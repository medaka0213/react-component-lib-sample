import React, { useRef, useCallback } from 'react';
import { Modal, Box, BoxProps } from '@mui/material';
import { Typography } from '@mui/joy';

type DialogWrapperProps = {
  children: React.ReactNode;
};

export const DialogWrapper: React.VFC<DialogWrapperProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Box
        onClick={() => setOpen(true)}
        sx={{
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        <Typography
          component={'span'}
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'none',
            '&:hover': {
              display: 'block',
            },
            height: '100%',
            width: '100%',
          }}
        >
          Click to open
        </Typography>
        {children}
      </Box>
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
    </React.Fragment>
  );
};
