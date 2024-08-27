import React, { useState, VFC, useEffect } from 'react';

import {
  Box,
  Button,
  Slider as MuiSlider,
  Input as MuiInput,
} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Modal from '@mui/material/Modal';

import { CommonProps } from './types';

type SlideShowProps = CommonProps & {
  images: string[];
  texts?: string[];
  onChange?: (index: number) => void;
  index?: number;
  fullScreen?: boolean;
  onFullScreen?: () => void;
  customRender?: ({
    src,
    text,
    index,
  }: {
    src: string;
    text: string;
    index: number;
  }) => any;
};

export const SlideShowContent: VFC<SlideShowProps> = ({
  images,
  texts,
  onChange,
  index = 0,
  fullScreen = false,
  customRender,
  ...props
}) => {
  const [slideIndex, setSlideIndex] = useState<number>(index);

  useEffect(() => {
    onChange && onChange(slideIndex);
  }, [slideIndex]);

  useEffect(() => {
    setSlideIndex(index);
  }, [index]);

  return (
    <Box {...props}>
      <Box
        sx={{
          m: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
          }}
        >
          {customRender ? (
            customRender({
              src: images[slideIndex],
              text: texts?.[slideIndex] || '',
              index: slideIndex,
            })
          ) : (
            <img
              alt={`slide-${slideIndex}`}
              src={images[slideIndex]}
              width={'100%'}
              style={{
                border: '1px solid #eee',
              }}
            />
          )}
        </div>
      </Box>
      <Box
        sx={{
          m: 0,
          py: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'background.paper',
        }}
      >
        <Button
          onClick={() => setSlideIndex(slideIndex - 1 < 0 ? 0 : slideIndex - 1)}
          startIcon={<ArrowBackIosNewIcon color="primary" />}
          sx={{
            mr: 2,
          }}
        >
          prev
        </Button>
        <MuiInput
          sx={{
            width: 45,
            my: 'auto',
            mr: 2,
          }}
          value={slideIndex || ''}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setSlideIndex(
              value > images.length - 1
                ? images.length - 1
                : value < 0
                ? 0
                : value
            );
          }}
          inputProps={{
            step: 1,
            min: -1,
            max: images.length - 1,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
        <MuiSlider
          sx={{
            my: 'auto',
          }}
          defaultValue={0}
          min={0}
          max={images.length - 1}
          valueLabelDisplay="auto"
          value={slideIndex}
          onChange={(e: any) => {
            setSlideIndex(parseInt(e?.target?.value as string));
          }}
        />

        <Button
          onClick={() =>
            setSlideIndex(
              slideIndex + 1 > images.length - 1
                ? images.length - 1
                : slideIndex + 1
            )
          }
          endIcon={<ArrowForwardIosIcon color="primary" />}
          sx={{
            ml: 2,
          }}
        >
          next
        </Button>
        <Button
          onClick={() => {
            props.onFullScreen && props.onFullScreen();
          }}
        >
          {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </Button>
      </Box>
    </Box>
  );
};

export const App: VFC<SlideShowProps> = ({ sx, ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SlideShowContent
        sx={{
          ...sx,
        }}
        {...props}
        fullScreen={false}
        onFullScreen={() => setOpen(!open)}
      />
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            width: 'min(calc(90vh * 15 / 9), 100vw)',
          }}
        >
          <SlideShowContent
            {...props}
            fullScreen={open}
            onFullScreen={() => setOpen(!open)}
          />
        </Box>
      </Modal>
    </>
  );
};

import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const SlideShow = (props: SlideShowProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);

export default SlideShow;
