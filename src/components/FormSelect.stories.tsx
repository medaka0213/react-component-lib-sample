import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormSelectApp } from "./FormSelect";

export default {
  component: FormSelectApp,
  title: "FormSelect",
};

const Template: ComponentStory<typeof FormSelectApp> = (args) => <FormSelectApp {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "sample",
  title: "title",
  onChange() {
    //一秒待つ
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
  formik: {
    values: {},
    errors: {
      sample: "error",
    },
    touched: {},
  },
  selectItems: [
    {
      value: "value1",
    },
    {
      value: "value2",
      label: "value2 (with divder)",
      divider: true,
    },
    {
      value: "value2",
    },
  ],
};
