import React, { VFC } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

import { CommonProps } from './types';

export type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

export const Link: VFC<LinkProps> = ({
  sx,
  children,
  href,
  external = false,
}) => {
  return (
    <a
      href={href}
      target={external ? '_blank' : '_self'}
      rel="noopener noreferrer"
      style={sx}
    >
      {children || href}
      {external && (
        <LaunchIcon
          sx={{
            fontSize: '1rem',
            ml: 0.5,
          }}
        />
      )}
    </a>
  );
};
