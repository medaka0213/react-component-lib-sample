import React, { VFC, useState, ChangeEvent, ReactNode } from 'react';

import { FilledInput } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import CopyToClipBoard from 'react-copy-to-clipboard';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import AssignmentIcon from '@mui/icons-material/Assignment';

import { FormProps } from '../types';

export type SelectItem = {
  label?: string;
  value: any;
  divider?: boolean;
};

export type FormInputProps = FormProps & {
  name: string;
  type?: string;
  /*| 'string'
    | 'text'
    | 'textarea'
    | 'datetime'
    | 'datetime-local'
    | 'select'
    | 'number';*/
  rows?: string | number;
  copyBytton?: boolean;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  options?: SelectItem[];
  formik: any;
};

export const App: VFC<FormInputProps> = ({
  color = 'primary',
  name = '',
  type = 'text',
  title,
  rows = '10',
  placeholder = '',
  onChange,
  disabled = false,
  copyBytton = false,
  children,
  size = 'small',
  variant = 'filled',
  options = [],
  formik: { values = {}, errors = {}, handleChange },
}) => {
  const [openTip, setOpenTip] = useState(false);
  const handleClickButton = () => {
    setOpenTip(true);
  };

  return (
    <FormControl color={color} variant={variant} fullWidth focused>
      {type !== 'datetime' && type !== 'select' && (
        <>
          <InputLabel htmlFor={name}>{title || name}</InputLabel>
          <FilledInput
            size={size}
            color={color}
            id={name}
            disabled={disabled}
            type={type}
            name={name}
            onChange={async (e: ChangeEvent<HTMLInputElement>) => {
              if (handleChange) await handleChange(e);
              if (onChange) await onChange(e);
              setOpenTip(false);
            }}
            value={values[name] || ''}
            rows={rows}
            placeholder={placeholder}
            style={{
              verticalAlign: 'middle',
              position: 'relative',
            }}
            multiline={type === 'textarea'}
            maxRows={type === 'textarea' ? rows : 1}
            endAdornment={
              copyBytton && (
                <InputAdornment position="end">
                  <CopyToClipBoard text={values[name] || ''}>
                    <IconButton
                      disabled={values[name] === ''}
                      onClick={handleClickButton}
                    >
                      <AssignmentIcon color={openTip ? 'disabled' : color} />
                    </IconButton>
                  </CopyToClipBoard>
                </InputAdornment>
              )
            }
          />
        </>
      )}

      {type === 'select' && (
        <>
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
        </>
      )}

      {type === 'datetime' && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={title || name}
            inputFormat="YYYY-MM-DDTHH:mm:ss"
            value={values[name] || ''}
            onChange={async (e) => {
              const event = {
                target: {
                  value: e.format('YYYY-MM-DDTHH:mm:ss'),
                  name,
                },
              };
              if (onChange) await onChange(event);
              if (handleChange) await handleChange(event);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant={'filled'}
                color={color}
                focused
                fullWidth
                size={size}
              />
            )}
          />
        </LocalizationProvider>
      )}
      <FormHelperText error>{errors[name]}</FormHelperText>
      {children}
    </FormControl>
  );
};

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const FormInput = (props: FormInputProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
