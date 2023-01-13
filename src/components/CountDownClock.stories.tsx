import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CountDownClock } from './CountDownClock';

export default {
  title: 'CountDownClock',
  component: CountDownClock,
} as ComponentMeta<typeof CountDownClock>;

const Template: ComponentStory<typeof CountDownClock> = (args) => (
  <CountDownClock {...args} />
);

export const Default = Template.bind({});
Default.args = {
  datetime_iso: '2021-09-01T00:00:00.000',
};

export const Head = Template.bind({});
Head.args = {
  datetime_iso: '2021-09-01T00:00:00.000',
  variant: 'h1',
};
