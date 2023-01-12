import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SlideShow } from './SlideShow';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default {
  title: 'SlideShow',
  component: SlideShow,
} as ComponentMeta<typeof SlideShow>;

var images = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i) => {
  return `https://img.virtualrocketwatching.net/slide/slide_511f03eb-3131-455f-b894-a314032ffe83/${String(
    i
  ).padStart(5, '0')}.jpeg`;
});

const Template: ComponentStory<typeof SlideShow> = (args) => (
  <SlideShow {...args} />
);

export const Default = Template.bind({});
Default.args = {
  images,
};

export const Texts = Template.bind({});
Texts.args = {
  images,
  texts: images.map((i) => {
    return i + '\n\n' + i;
  }),
};

export const NoTexts = Template.bind({});
NoTexts.args = {
  images,
  texts: images.map((i) => {
    return '';
  }),
};

export const Fullscreen = Template.bind({});
Fullscreen.args = {
  images,
  fullScreen: true,
  texts: images.map((i) => {
    return '';
  }),
  sx: {
    width: '50%',
  },
};
