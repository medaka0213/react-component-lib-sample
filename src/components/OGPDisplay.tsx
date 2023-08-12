import React, { VFC } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material';

export type OGPDisplayProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};
const App: VFC<OGPDisplayProps> = ({
  title,
  image,
  description,
  url,
}: OGPDisplayProps) => {
  return (
    <Card>
      <CardActionArea href={url || ''}>
        <CardMedia
          component="img"
          height="140"
          image={image || ''}
          alt={title || url || ''}
        />
        <CardContent>
          <Typography variant="h6">{title || ''}</Typography>
          <Typography variant="body2" color="textSecondary">
            {description.length > 280
              ? description.slice(0, 280) + '...'
              : description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const OGPDisplay = (props: OGPDisplayProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
