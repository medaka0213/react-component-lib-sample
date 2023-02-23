import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SubmitButton } from './SubmitButton';
import { downloadFileFromUrl } from '../../utils/download';

export default {
  title: 'SubmitButton',
  component: SubmitButton,
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => (
  <SubmitButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onClick() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
  sx: {},
  disabled: false,
  variant: 'contained',
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  disabled: true,
};

export const OutLined = Template.bind({});
OutLined.args = {
  ...Default.args,
  variant: 'outlined',
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  ...Default.args,
  children: 'Custom Title',
};

export const DonloadFile = Template.bind({});
DonloadFile.args = {
  ...Default.args,
  children: 'Custom Title',
  onClick() {
    return downloadFileFromUrl({
      filename: 'test.jpeg',
      fileurl:
        'https://img.virtualrocketwatching.net/image/image_8b96ad17-e816-46c6-b324-4821cc2ea99b.jpeg',
    });
  },
};
