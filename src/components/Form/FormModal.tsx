import React, { useState, VFC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { FormProps, Color } from '../types';

const _style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: '75%',
  '@media screen and (max-width:1000px)': {
    width: '100%',
  },
  p: 4,
};

export type FormModalProps = FormProps & {
  childrenSx?: any;
  childrenList: any[][];
  buttonLabel?: string;
  buttonPosition?: 'top' | 'bottom';
  Form?: VFC;
  onSubmit: (v: any) => Promise<any>;
  FormAttrs: any;
  title: string;
};

const App: VFC<FormModalProps> = ({
  children,
  sx,
  Form,
  onSubmit,
  FormAttrs,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const _onSubmit = async (e) => {
    if (onSubmit) {
      await onSubmit(e);
    }
    handleClose();
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          width: '100%',
          ...sx,
        }}
      >
        {children}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={_style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Box sx={{ mt: 2 }}>
            {Form && Form({ ...FormAttrs, onSubmit: _onSubmit } as any)}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const FormModal = (props: FormModalProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
