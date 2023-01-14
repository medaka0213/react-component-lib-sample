import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormSelect } from './FormSelect';

export default {
  component: FormSelect,
  title: 'FormSelect',
};

const Template: ComponentStory<typeof FormSelect> = (args) => (
  <FormSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'sample',
  title: 'title',
  onChange() {
    //一秒待つ
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
  formik: {
    values: {},
    errors: {
      sample: 'error',
    },
    touched: {},
  },
  options: [
    {
      value: 'value1',
    },
    {
      value: 'value2',
      label: 'value2 (with divder)',
      divider: true,
    },
    {
      value: 'value2',
    },
  ],
};
