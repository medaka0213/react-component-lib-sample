import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import { BoxProps } from '@mui/material';

export type DetailTableProps = BoxProps & {
  items: {
    key: string;
    value: string;
  }[];
};

const App = ({ items = [], sx = {} }: DetailTableProps) => {
  return (
    <TableContainer
      sx={{
        ...sx,
      }}
    >
      <Table aria-label="simple table">
        <TableBody>
          {items.map((item) => (
            <TableRow hover key={item.key}>
              <TableCell>{item.key}</TableCell>
              <TableCell {...item}>
                <strong>{item.value}</strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import _theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const DetailTable = (props: DetailTableProps) => {
  return (
    <ThemeProvider theme={_theme}>
      <CssBaseline />
      <App {...props} />
    </ThemeProvider>
  );
};
