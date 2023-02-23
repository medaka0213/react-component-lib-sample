import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ImagePreview } from './ImagePreview';

export default {
  title: 'ImagePreview',
  component: ImagePreview,
} as ComponentMeta<typeof ImagePreview>;

const Template: ComponentStory<typeof ImagePreview> = (args) => (
  <ImagePreview {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: 'https://img.virtualrocketwatching.net/image/image_8b96ad17-e816-46c6-b324-4821cc2ea99b.jpeg',
  alt: 'random image',
};
