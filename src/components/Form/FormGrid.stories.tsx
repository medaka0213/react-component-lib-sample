import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormGrid } from './FormGrid';
import { FormInput } from './FormInput';
import { FormToggle } from './FormToggle';

const formik = {
  values: {},
  errors: {
    sample: 'error',
  },
  touched: {},
  handleChange: async (e: any) => {},
  handleSubmit: async (e: any) => {},
};

export default {
  component: FormGrid,
  title: 'FormGrid',
};

const Template: ComponentStory<typeof FormGrid> = (args) => (
  <FormGrid {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sx: {},
  disabled: false,
  childrenList: [
    [
      <FormInput key="1" name="sample1" formik={formik} />,
      <FormInput key="2" name="sample2" formik={formik} />,
      <FormInput key="3" name="sample2" formik={formik} />,
    ],
    [
      <FormInput key="1" name="sample3" formik={formik} />,
      <FormToggle key="2" name="sample4" formik={formik} />,
    ],
  ],
};

export const CustomButton = Template.bind({});
CustomButton.args = {
  sx: {},
  disabled: false,
  buttonPosition: 'top',
  buttonLabel: 'Custom Label',
  childrenList: [
    [
      <FormInput key="1" name="sample1" formik={formik} />,
      <FormInput key="2" name="sample2" formik={formik} />,
      <FormInput key="3" name="sample2" formik={formik} />,
    ],
    [<FormInput key="1" name="sample3" formik={formik} />],
  ],
};
