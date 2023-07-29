import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormInput, FormInputProps } from './FormInput';

export default {
  component: FormInput,
  title: 'FormInput',
};

const Template: ComponentStory<typeof FormInput> = (args) => (
  <FormInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'sample',
  title: 'title',
  formik: {
    values: {
      sample: 'value',
    },
    errors: {
      sample: 'error',
    },
    touched: {},
  },
};

export const NoTiltle = Template.bind({});
NoTiltle.args = {
  ...Default.args,
  title: '',
};

export const ChangeColor = Template.bind({});
ChangeColor.args = {
  ...Default.args,
  color: 'secondary',
};

export const CopyText = Template.bind({});
CopyText.args = {
  ...Default.args,
  copyBytton: true,
};

export const Multiline = Template.bind({});
Multiline.args = {
  ...Default.args,
  type: 'textarea',
  rows: 10,
  formik: {
    ...Default.args.formik,
    values: {
      sample: 'line1\nline2\n\nline3',
    },
  },
};

export const MultilineCopy = Template.bind({});
MultilineCopy.args = {
  ...Multiline.args,
  copyBytton: true,
};

export const Select = Template.bind({});
Select.args = {
  ...Default.args,
  type: 'select',
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

export const Checkbox = Template.bind({});
Checkbox.args = {
  ...Default.args,
  type: 'checkbox',
  name: 'sample',
  title: 'title',
  formik: {
    values: {
      sample: true,
    },
    errors: {
      sample: 'error',
    },
    touched: {},
  },
};
