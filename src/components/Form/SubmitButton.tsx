import React, { VFC, useState, useEffect } from 'react';
import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';

import Button, { ButtonProps } from '@mui/material/Button';

export type SubmitButtonProps = ButtonProps & {
  onClick?: () => Promise<any>;
  isSubmitting?: boolean;
};

export const SubmitButton: VFC<SubmitButtonProps> = ({
  children,
  onClick,
  variant = 'contained',
  sx,
  disabled,
  color = 'primary',
  isSubmitting: _isSubmitting = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(_isSubmitting);

  const _onClick = async (e: any) => {
    setIsSubmitting(true);
    if (onClick) await onClick(e);
    setIsSubmitting(false);
  };

  useEffect(() => {
    setIsSubmitting(_isSubmitting);
  }, [_isSubmitting]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button
        disabled={isSubmitting || disabled}
        onClick={_onClick}
        variant={variant}
        sx={{
          width: '100%',
          ...sx,
        }}
        color={color}
      >
        {children || 'Submit'}
      </Button>
      {isSubmitting && <LinearProgress />}
    </ThemeProvider>
  );
};
