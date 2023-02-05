import React, { VFC } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GridColDef } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

import { CommonProps } from './types';

type ItemListTableProps = CommonProps &
  BoxProps & {
    rows: any[];
    columns: GridColDef[];
    isLoading?: boolean;
    onRowClick: (row: any) => void;
  };

function getColspan(row: any, colums: any[], index: number) {
  let colspan = 0;
  for (let i = index + 1; i < colums.length; i++) {
    if (i > colums.length - 1) {
      break;
    }

    if (!row[colums[i].field]) {
      colspan = colspan ? colspan + 1 : 2;
    } else {
      break;
    }
  }
  return colspan;
}

export const ItemListTable: VFC<ItemListTableProps> = ({
  rows = [],
  columns = [],
  sx,
  ...props
}) => {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        overflow: 'auto',
        ...sx,
      }}
      {...props}
    >
      {props.isLoading && <LinearProgress />}
      {!props.isLoading && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field} {...column}>
                    {column.headerName || column.field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={async () =>
                    props.onRowClick && (await props.onRowClick(row))
                  }
                >
                  {columns.map(
                    (column, j) =>
                      row[column.field] && (
                        <TableCell
                          key={column.field}
                          colSpan={getColspan(row, columns, j)}
                        >
                          {row[column.field]}
                        </TableCell>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ItemListTable;
