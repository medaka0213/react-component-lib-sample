import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SubmitButton } from "./SubmitButton";

export default {
  title: 'SubmitButton',
  component: SubmitButton,
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => <SubmitButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
  sx: {},
  disabled: false,
  variant: "contained",
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  disabled: true,
};

export const OutLined = Template.bind({});
OutLined.args = {
  ...Default.args,
  variant: "outlined",
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  ...Default.args,
  children: "Custom Title",
};
