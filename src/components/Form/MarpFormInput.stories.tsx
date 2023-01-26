import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MarpFormInput } from './MarpFormInput';

export default {
  component: MarpFormInput,
  title: 'MarpFormInput',
};

const Template: ComponentStory<typeof MarpFormInput> = (args) => (
  <MarpFormInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
