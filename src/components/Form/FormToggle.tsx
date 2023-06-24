import React, { VFC, ChangeEvent } from 'react';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { FormProps } from '../types';

export type FormToggleProps = FormProps & {
  name: string;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  formik: any;
};

export const App: VFC<FormToggleProps> = ({
  color = 'primary',
  name = '',
  title,
  disabled = false,
  onChange,
  children,
  size = 'small',
  variant = 'filled',
  formik: { values = {}, errors = {}, handleChange },
}) => {
  return (
    <FormControl
      color={color}
      variant={variant}
      fullWidth
      focused
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        pl: 2,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={values[name]}
            onChange={async (e: ChangeEvent<HTMLInputElement>) => {
              if (handleChange) await handleChange(e);
              if (onChange) await onChange(e);
            }}
            name={name}
            size={size}
          />
        }
        label={title || name}
      />
      {errors[name] && <FormHelperText error>{errors[name]}</FormHelperText>}
      {children}
    </FormControl>
  );
};

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const FormToggle = (props: FormToggleProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
