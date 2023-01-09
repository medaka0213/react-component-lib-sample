import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Copy } from './Copy';

export default {
  title: 'Copy',
  component: Copy,
} as ComponentMeta<typeof Copy>;

const Template: ComponentStory<typeof Copy> = (args) => <Copy {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'https://google.com',
  external: true,
  area: false,
};

export const SigleLine = Template.bind({});
SigleLine.args = {
  value: 'hello world',
};

export const MultiLine = Template.bind({});
MultiLine.args = {
  value:
    'line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1line1\nline2\n\nline3',
};
