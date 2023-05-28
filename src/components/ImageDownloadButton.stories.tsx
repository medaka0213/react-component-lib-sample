import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ImageDownloadButton } from './ImageDownloadButton';

export default {
  title: 'ImageDownloadButton',
  component: ImageDownloadButton,
} as ComponentMeta<typeof ImageDownloadButton>;

const Template: ComponentStory<typeof ImageDownloadButton> = (args) => (
  <ImageDownloadButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: 'https://img.virtualrocketwatching.net/image/image_8b96ad17-e816-46c6-b324-4821cc2ea99b.jpeg',
  filename: 'soyuz.jpeg',
};
