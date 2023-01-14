import React, { VFC } from 'react';
import NextLink from 'next/link';

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
  let props: any = {
    href,
    style: { ...iconWrapStyle, ...sx },
  };
  if (external) {
    props = { ...props, target: '_blank' };
  }
  return (
    <NextLink {...props}>
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
    </NextLink>
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
