import React, { useEffect } from 'react';

import {
  Paper,
  Box,
  Typography,
  Button,
  Slider as MuiSlider,
  Input as MuiInput,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { CommonProps } from './types';

type SlideShowProps = CommonProps & {
  images: string[];
  texts?: string[];
  onChange?: (index: number) => void;
};

export const SlideShow: React.VFC<SlideShowProps> = ({
  images,
  texts,
  onChange,
  ...props
}) => {
  const [slideIndex, setSlideIndex] = React.useState<number>(0);

  React.useEffect(() => {
    onChange && onChange(slideIndex);
  }, [slideIndex]);

  return (
    <Box {...props}>
      <Box>
        <img
          alt={`slide-${slideIndex}`}
          src={images[slideIndex]}
          width={'100%'}
          style={{
            border: '1px solid #eee',
          }}
        />
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
          onChange={(e) => {
            setSlideIndex(parseInt(e.target.value));
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
      </Box>
      {texts && texts[slideIndex] && (
        <Paper
          elevation={0}
          sx={{
            p: 1,
            mb: 1,
          }}
        >
          <Typography
            sx={{
              whiteSpace: 'pre-line',
            }}
          >
            {texts[slideIndex]}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SlideShow;
