import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MainBox } from './MainBox';

export default {
  title: 'MainBox',
  component: MainBox,
} as ComponentMeta<typeof MainBox>;

const Template: ComponentStory<typeof MainBox> = (args) => (
  <MainBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'ここに中身',
};
