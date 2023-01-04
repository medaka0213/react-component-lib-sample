import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchDetailFromInput } from './SearchDetailFromInput';

export default {
  component: SearchDetailFromInput,
  title: 'SearchDetailFromInput',
};

const Template: ComponentStory<typeof SearchDetailFromInput> = (args) => (
  <SearchDetailFromInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
