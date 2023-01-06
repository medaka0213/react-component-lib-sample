import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchDetailForm } from './SearchDetailForm';

export default {
  component: SearchDetailForm,
  title: 'SearchDetailForm',
};

const Template: ComponentStory<typeof SearchDetailForm> = (args) => (
  <SearchDetailForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
