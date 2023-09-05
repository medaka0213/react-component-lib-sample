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
  errorMessage?: string;
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
  errorMessage,
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
    const _disabled = Boolean(
      disabled || Object.keys(errors).length || isSubmitting
    );
    return (
      <SubmitButton
        color={color}
        disabled={_disabled}
        isSubmitting={isSubmitting}
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
      _childrenList = _childrenList.concat([[<Button key="1" />]]);
    } else {
      _childrenList = [[<Button key="2" />]].concat(_childrenList);
    }
  }

  let Error = () => (
    <>
      {Object.keys(errors).map((k) => (
        <Box
          key={k}
          sx={{
            width: '100%',
            color: 'error.main',
          }}
        >
          入力検証エラー: {k}: {errors[k]}
        </Box>
      ))}
      {errorMessage && (
        <Box sx={{ width: '100%', color: 'error.main' }}>{errorMessage}</Box>
      )}
    </>
  );

  return (
    <Box
      sx={{
        width: '100%',
        my: 2,
        ...sx,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container>
          {buttonPosition === 'top' && <Error />}
          {_childrenList.map((childrenRow, i) => (
            <>
              {childrenRow.map((child, j) => (
                <Grid key={j} xs={xs} sm={Number(xs / childrenRow.length)}>
                  <Box
                    sx={{
                      pr: 1,
                      height: '100%',
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
          {buttonPosition === 'bottom' && <Error />}
        </Grid>
      </form>
    </Box>
  );
};

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { boolean } from 'yup';

export const FormGrid = (props: FormGridProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
