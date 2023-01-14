import React, { VFC, useState, useRef, ChangeEvent, RefObject } from 'react';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import Box from '@mui/material/Box';
import { SubmitButton } from './SubmitButton';

import { FormProps, Color } from '../types';

export type FileInputProps = FormProps & {
  color: Color;
};

const App: VFC<FileInputProps> = ({
  color = 'primary',
  title,
  name = '',
  onChange,
  disabled = false,
  children,
  formik: { values, handleChange },
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<string>('');

  const clickFileUploadButton = async () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Box>
      <SubmitButton
        color={color}
        disabled={isLoading}
        onClick={clickFileUploadButton}
        variant="outlined"
        sx={{
          textTransform: 'none',
        }}
      >
        <UploadFileIcon />
        {file ? `選択中: ${file}` : title || 'ファイルを選択'}
      </SubmitButton>
      <input
        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
          setIsLoading(true);
          if (handleChange) await handleChange(e);
          if (onChange) await onChange(e);
          setFile(e.target.value);
          setIsLoading(false);
        }}
        id={name}
        disabled={disabled}
        name={name}
        value={values[name]}
        hidden
        ref={inputRef as RefObject<HTMLInputElement>}
        type="file"
      />
      {children}
    </Box>
  );
};

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const FileInput = (props: FileInputProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
