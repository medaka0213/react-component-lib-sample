import React, { VFC, useState } from 'react';

import Button, { ButtonProps } from '@mui/material/Button';

export type SubmitButtonProps = ButtonProps & {
  onClick?: () => Promise<any>;
};

export const SubmitButton: VFC<SubmitButtonProps> = ({
  children,
  onClick,
  variant = 'contained',
  sx,
  disabled,
  color = 'primary',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const _onClick = async (e: any) => {
    setIsSubmitting(true);
    if (onClick) await onClick(e);
    setIsSubmitting(false);
  };

  return (
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
      {isSubmitting ? 'loading...' : children || 'Submit'}
    </Button>
  );
};
