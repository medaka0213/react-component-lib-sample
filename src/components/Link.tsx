import React, { VFC } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

import { CommonProps } from './types';

export type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

const iconWrapStyle = {
  display: 'inline-flex',
  VerticalAlign: 'text-bottom',
  BoxSizing: 'inherit',
  textAlign: 'center',
  AlignItems: 'center',
};

const App: VFC<LinkProps> = ({ sx, children, href, external = false }) => {
  return (
    <a
      href={href}
      target={external ? '_blank' : '_self'}
      rel="noopener noreferrer"
      style={{ ...iconWrapStyle, ...sx }}
    >
      {children || href}
      {external && (
        <LaunchIcon
          sx={{
            fontSize: '0.8rem',
            ml: 0.25,
            mt: 0.5,
          }}
        />
      )}
    </a>
  );
};

import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const Link = (props: LinkProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
