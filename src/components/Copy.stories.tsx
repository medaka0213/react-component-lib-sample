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
};

export const Link = Template.bind({});
Link.args = {
  value: 'hello world',
  external: true,
  sx: {
    backgroundColor: '#eee',
    border: '1px solid #ccc',
  },
};

export const MultiLine = Template.bind({});
MultiLine.args = {
  value: 'line1\nline2\n\nline3',
  external: true,
  sx: {
    backgroundColor: '#eee',
  },
};
