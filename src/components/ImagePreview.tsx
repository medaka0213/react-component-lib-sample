import React from 'react';
import Image from 'next/image';

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
      <DialogWrapper>
        <img
          style={{
            border: '1px solid #eee',
            maxWidth: '100vw',
            maxHeight: '95vh',
            width: '100%',
          }}
          src={src}
          alt={alt}
        />
        {children}
      </DialogWrapper>
    </Box>
  );
};

export default ImagePreview;
