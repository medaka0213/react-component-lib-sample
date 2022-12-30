import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileInputApp } from "./FileInput";

export default {
  title: 'FileInput',
  component: FileInputApp,
} as ComponentMeta<typeof FileInputApp>;

const Template: ComponentStory<typeof FileInputApp> = (args) => <FileInputApp {...args} />;

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
};
