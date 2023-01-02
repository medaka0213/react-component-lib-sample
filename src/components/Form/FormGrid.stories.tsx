import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormGrid } from './FormGrid';
import { FormInput } from './FormInput';

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
      <FormInput name="sample1" formik={formik} />,
      <FormInput name="sample2" formik={formik} />,
      <FormInput name="sample2" formik={formik} />,
    ],
    [<FormInput name="sample3" formik={formik} />],
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
      <FormInput name="sample1" formik={formik} />,
      <FormInput name="sample2" formik={formik} />,
      <FormInput name="sample2" formik={formik} />,
    ],
    [<FormInput name="sample3" formik={formik} />],
  ],
};
