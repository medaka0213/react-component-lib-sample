import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchDetailForm } from './SearchDetailForm';
import { TimeRange } from '../../models/TimeRange';
import { ParamToQueryItem } from '../../utils/query';

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
    {
      key: 'limit',
      value0: '1000',
      enabled: true,
      mode: 'EQ',
    },
  ],
  onSubmit: (values) => {
    console.log('onSubmit', values);
  },
};

export const PresetValue3 = Template.bind({});
PresetValue3.args = {
  keys: [
    {
      label: '日時',
      value: 'datetime',
      enabled: false,
      type: 'datetime',
    },
    {
      label: '日時 (以前のテスト)',
      value: 'datetime2',
      enabled: false,
      type: 'datetime',
    },
    {
      label: '日時 (以後のテスト)',
      value: 'datetime3',
      enabled: false,
      type: 'datetime',
    },
    {
      label: '日時 (文字列のテスト)',
      value: 'datetime4',
      enabled: false,
      type: 'datetime',
    },
  ],
  queries: [
    {
      ...TimeRange.fromMode(new Date(), 'MONTH').toQueryItem(),
      key: 'datetime',
    },
    {
      ...TimeRange.fromMode(new Date(), 'GT_E').toQueryItem(),
      key: 'datetime2',
    },
    {
      ...TimeRange.fromMode(new Date(), 'LT_E').toQueryItem(),
      key: 'datetime3',
    },
    {
      ...TimeRange.fromString(
        '2021-01-01T00:00:00...2021-02-01T00:00:00'
      ).toQueryItem(),
      key: 'datetime4',
    },
  ],
  onSubmit: (values) => {
    console.log('onSubmit', values);
  },
};

export const PresetValue4 = Template.bind({});
PresetValue4.args = {
  keys: [
    {
      label: '値が存在するテスト',
      value: 'datetime1',
      enabled: false,
      type: 'datetime',
    },
    {
      label: '以前/以後のテスト',
      value: 'datetime2',
      enabled: false,
      type: 'datetime',
    },
    {
      label: '以前/以後のテスト (文字列)',
      value: 'datetime3',
      enabled: false,
      type: 'datetime',
    },
  ],
  queries: [
    {
      ...ParamToQueryItem('datetime1=*'),
    },
    {
      ...TimeRange.fromMode(new Date(), 'GT_E').toQueryItem(),
      key: 'datetime2',
    },
    {
      ...TimeRange.fromString('...2021-02-20T00:00:00').toQueryItem(),
      key: 'datetime3',
    },
  ],
  onSubmit: (values) => {
    console.log('onSubmit', values);
  },
};
