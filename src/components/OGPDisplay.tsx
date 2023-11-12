import React, { VFC } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Skeleton,
} from '@mui/material';

export type OGPDisplayProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  image_height?: string;
};
const App: VFC<OGPDisplayProps> = ({
  title,
  image,
  description,
  url,
  image_height = '140',
}: OGPDisplayProps) => {
  return (
    <Card>
      <CardActionArea href={url || ''}>
        {image ? (
          <CardMedia
            component="img"
            height={image_height}
            image={image}
            alt={title || url || ''}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={Number(image_height)}
          />
        )}
        <CardContent>
          <>
            <Typography variant="h6">{title || <Skeleton />}</Typography>
            <Typography variant="body2" color="textSecondary">
              {(description?.length || 0) > 280
                ? (description || '').slice(0, 280) + '...'
                : description || <Skeleton />}
            </Typography>
          </>
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
