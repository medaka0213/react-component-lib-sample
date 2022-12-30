import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileInput } from "./FileInput";

export default {
  title: 'FileInput',
  component: FileInput,
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => <FileInput {...args} />;

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
