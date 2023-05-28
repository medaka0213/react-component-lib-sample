import React from 'react';

import Box, { BoxProps } from '@mui/material/Box';

import { DialogWrapper } from './DialogWrapper';
import { CommonProps } from './types';

type Props = CommonProps &
  BoxProps & {
    src: string;
    alt: string;
  };

export const ImagePreview: React.FC<Props> = ({
  src,
  alt,
  children,
  ...props
}) => {
  return (
    <Box {...props}>
      <DialogWrapper showOnClick={
        <img
          src={src}
          alt={alt}
          style={{
              maxHeight: "90vh",
              maxWidth: "90vw",
            }}
        />}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
          }}
        />
        {children}
      </DialogWrapper>
    </Box>
  );
};

export default ImagePreview;
