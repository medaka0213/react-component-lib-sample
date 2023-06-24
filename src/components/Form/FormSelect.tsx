import React, { ReactNode, VFC } from 'react';
import { Formik, useFormik, useField } from 'formik';

import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';

import { FormProps } from '../types';

export type SelectItem = {
  label?: string;
  value: any;
  divider?: boolean;
};

export type FormSelectProps = FormProps & {
  name: string;
  variant?: 'outlined' | 'filled' | 'standard';
  options: SelectItem[];
  size?: 'small' | 'medium';
  formik: any;
};

export const App: VFC<FormSelectProps> = ({
  color = 'primary',
  variant = 'filled',
  name,
  title = '',
  options = [],
  disabled = false,
  onChange,
  size = 'small',
  formik: { values = {}, errors = {}, handleChange },
}) => {
  return (
    <FormControl fullWidth variant={variant} color={color}>
      <InputLabel id={name + '-label'}>{title}</InputLabel>
      <Select
        size={size}
        labelId={name + '-label'}
        id={name}
        value={values[name]}
        label={title ? `${title} (${name})` : name}
        onChange={async (e: any, child: ReactNode) => {
          handleChange && (await handleChange(e));
          onChange && (await onChange(e, child));
        }}
        name={name}
        disabled={disabled}
      >
        {options.map((item, index) => (
          <MenuItem key={index} value={item.value} divider={item.divider}>
            {item.label || item.value}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && <FormHelperText error>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const FormSelect = (props: FormSelectProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
