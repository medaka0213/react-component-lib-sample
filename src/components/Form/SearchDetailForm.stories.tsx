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

export const PresetValue = Template.bind({});
PresetValue.args = {
  queries: [
    {
      key: 'datetime',
      value0: '2021-01-01T00:00:00Z',
      value1: '2021-01-08T00:00:00Z',
      enabled: true,
      mode: 'BETWEEN',
    },
  ],
  onSubmit: (values) => {
    console.log('onSubmit', values);
  },
};
