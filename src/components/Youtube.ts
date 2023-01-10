import React from 'react';
import YouTube from 'react-youtube';
import { BoxProps, ButtonProps } from '@mui/material';
import { CommonProps } from './types';

export type YouTubeProps = BoxProps &
  CommonProps & {
    height: string | number;
    width: string | number;
    start?: number;
    end?: number;
    videoId: string;
    autoplay?: 0 | 1;
  };

const Youtube: React.VFC<YouTubeProps> = ({
  height: '100%',
  width: '100%',
  start,
  end,
  videoId: '2g811Eo7K8U',
  autoplay: 0
}) => {
  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
}
