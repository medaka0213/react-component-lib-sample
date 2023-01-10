import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { extract_youtube_id } from '../utils/string';
import { CommonProps } from './types';

type YoutubeProps = CommonProps &
  BoxProps & {
    videoId?: string;
    videoUrl?: string;
    start: number;
    width: string;
  };

export const YoutubePlayer: React.VFC<YoutubeProps> = ({
  videoId,
  videoUrl,
  start = 0,
  ...props
}) => {
  const _videoId = videoId || extract_youtube_id(videoUrl || '');
  return (
    <Box {...props}>
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
        }}
      >
        <iframe
          style={{ width: '100%', height: '100%' }}
          src={`https://www.youtube.com/embed/${_videoId}?start=${start}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen="1"
        ></iframe>
      </div>
    </Box>
  );
};
