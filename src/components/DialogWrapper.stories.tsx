import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DialogWrapper } from './DialogWrapper';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default {
  title: 'DialogWrapper',
  component: DialogWrapper,
} as ComponentMeta<typeof DialogWrapper>;

const Template: ComponentStory<typeof DialogWrapper> = (args) => (
  <DialogWrapper {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <img
      src="https://sxcontent9668.azureedge.us/cms-assets/assets/Launch_Page_Starlink1_vertical_18_DESKTOP_209c4e50a1.jpg/"
      alt="Starlink"
      width={'100%'}
      height={'100%'}
    />
  ),
};

export const Long = Template.bind({});
Long.args = {
  children: (
    <img
      src="https://img.virtualrocketwatching.net/image/image_eb573419-a62c-43d0-a8de-0bcb6a4e2c6f.jpeg"
      alt="Starlink"
      style={{ maxWidth: '100vw', maxHeight: '90vh' }}
    />
  ),
};
