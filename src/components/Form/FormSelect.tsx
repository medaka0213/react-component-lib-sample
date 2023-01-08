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
  selectItems: SelectItem[];
};

export const FormSelect: VFC<FormSelectProps> = ({
  color = 'primary',
  variant = 'filled',
  name,
  title = '',
  selectItems = [],
  disabled = false,
  onChange,
  formik: { values = {}, errors = {}, handleChange },
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl fullWidth variant={variant} color={color}>
      <InputLabel id={name + '-label'}>{title}</InputLabel>
      <Select
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
        {selectItems.map((item, index) => (
          <MenuItem key={index} value={item.value} divider={item.divider}>
            {item.label || item.value}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};
