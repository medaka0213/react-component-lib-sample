import React from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';

const App = ({ sx = {}, children, ...props }: PaperProps) => {
  return (
    <Paper
      sx={{
        mb: 2,
        p: {
          xs: 0,
          sm: 2,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const MainBox = (props: PaperProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);

export default MainBox;
