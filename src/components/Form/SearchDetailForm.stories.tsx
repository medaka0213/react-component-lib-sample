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
      value0: '2023-01-01T00:00:00',
      value1: '2023-02-01T00:00:00',
      enabled: true,
      mode: 'BETWEEN',
    },
  ],
  onSubmit: (values) => {
    console.log('onSubmit', values);
  },
};

export const PresetValue2 = Template.bind({});
PresetValue2.args = {
  keys: [
    {
      label: '日時',
      value: 'datetime',
      enabled: false,
      type: 'datetime',
    },
    {
      label: 'ミッション名',
      value: 'name',
      enabled: false,
      type: 'string',
    },
    {
      label: 'ロケット',
      value: 'rocket',
      enabled: false,
      type: 'string',
    },
  ],
  queries: [
    {
      key: 'datetime',
      value0: '2023-01-01T00:00:00',
      value1: '2023-02-01T00:00:00',
      enabled: true,
      mode: 'MONTH',
    },
    {
      key: 'name',
      value0: 'Starlink',
      enabled: true,
      mode: 'BEGINS',
    },
    {
      key: 'rocket',
      value0: 'Falcon',
      enabled: true,
      mode: 'BEGINS',
    },
  ],
  onSubmit: (values) => {
    console.log('onSubmit', values);
  },
};
