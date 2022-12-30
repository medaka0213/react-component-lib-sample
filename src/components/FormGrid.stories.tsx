import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormGrid } from "./FormGrid";
import { FormInputApp } from "./FormInput";

const formik = {
  values: {},
  errors: {
    sample: "error",
  },
  touched: {},
};

export default {
  component: FormGrid,
  title: "FormGrid",
};

const Template: ComponentStory<typeof FormGrid> = (args) => <FormGrid {...args} />;

export const Default = Template.bind({});
Default.args = {
  sx: {},
  disabled: false,
  childrenList: [
    [
      <FormInputApp name="sample1" formik={formik} />,
      <FormInputApp name="sample2" formik={formik} />,
      <FormInputApp name="sample2" formik={formik} />,
    ],
    [<FormInputApp name="sample3" formik={formik} />],
  ],
};

export const CustomButton = Template.bind({});
CustomButton.args = {
  sx: {},
  disabled: false,
  buttonPosition: "top",
  buttonLabel: "Custom Label",
  childrenList: [
    [
      <FormInputApp name="sample1" formik={formik} />,
      <FormInputApp name="sample2" formik={formik} />,
      <FormInputApp name="sample2" formik={formik} />,
    ],
    [<FormInputApp name="sample3" formik={formik} />],
  ],
};
