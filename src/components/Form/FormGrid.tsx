import React, { VFC } from 'react';
import { Grid, Box, BoxProps } from '@mui/material';
import { SubmitButton } from './SubmitButton';

import { FormProps, Color } from '../types';

export type FormGridProps = FormProps & {
  childrenSx?: any;
  childrenList: any[][];
  buttonLabel?: string;
  buttonPosition?: 'top' | 'bottom';
  buttonEnabled?: boolean;
  xs?: number;
};

const App: VFC<FormGridProps> = ({
  color = 'primary',
  sx,
  childrenList = [[]],
  childrenSx,
  children,
  buttonLabel = 'Submit',
  disabled = false,
  buttonPosition = 'bottom',
  buttonEnabled = true,
  xs = 12,
  formik: {
    isSubmitting,
    handleSubmit,
    errors = {},
    values = {},
    ...formik
  } = {},
}) => {
  const Button = () => {
    console.log('Button', { isSubmitting, handleSubmit, errors, values });
    const _disabled = disabled || Object.keys(errors).length || isSubmitting;
    return (
      <SubmitButton
        color={color}
        disabled={_disabled}
        onClick={async () => handleSubmit && (await handleSubmit(values))}
        variant="contained"
      >
        {_disabled ? '...' : buttonLabel}
      </SubmitButton>
    );
  };

  let _childrenList = childrenList;
  if (buttonEnabled) {
    if (buttonPosition === 'bottom') {
      _childrenList = _childrenList.concat([[<Button />]]);
    } else {
      _childrenList = [[<Button />]].concat(_childrenList);
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        my: 2,
        ...sx,
      }}
    >
      <form>
        <Grid container>
          {buttonPosition === 'top' &&
            Object.keys(errors).map((k) => (
              <Box
                sx={{
                  width: '100%',
                  color: 'error.main',
                }}
              >
                入力検証エラー: {k}: {errors[k]}
              </Box>
            ))}
          {_childrenList.map((childrenRow, i) => (
            <>
              {childrenRow.map((child, j) => (
                <Grid key={j} xs={xs} sm={Number(xs / childrenRow.length)}>
                  <Box
                    sx={{
                      pr: 1,
                      mb: 1,
                      ...childrenSx,
                    }}
                  >
                    {child}
                  </Box>
                </Grid>
              ))}
            </>
          ))}
          <Box sx={{ width: '100%' }}>{children}</Box>
          {buttonPosition === 'bottom' &&
            Object.keys(errors).map((k) => (
              <Box
                sx={{
                  width: '100%',
                  color: 'error.main',
                }}
              >
                入力検証エラー: {k}: {errors[k]}
              </Box>
            ))}
        </Grid>
      </form>
    </Box>
  );
};

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const FormGrid = (props: FormGridProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
