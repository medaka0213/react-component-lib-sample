import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Link } from "./Link";

export default {
  title: 'Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Googleのリンク",
  href: "https://google.com",
  external: true,
};

export const NoChild = Template.bind({});
NoChild.args = {
  href: "https://google.com",
  external: true,
};

export const Internal = Template.bind({});
Internal.args = {
  href: "https://google.com"
};
