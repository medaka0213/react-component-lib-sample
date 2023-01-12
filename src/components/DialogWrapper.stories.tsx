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
      src="https://sxcontent9668.azureedge.us/cms-assets/assets/Launch_Page_Starlink1_vertical_18_MOBILE_e059d50626.jpg"
      alt="Starlink"
      width={'100%'}
      height={'100%'}
    />
  ),
};
