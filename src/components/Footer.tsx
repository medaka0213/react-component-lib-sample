import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export function Footer() {
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 56 }}
      elevation={3}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          maxWidth: 1200,
        }}
      >
        Hello world
      </Box>
    </Paper>
  );
}
