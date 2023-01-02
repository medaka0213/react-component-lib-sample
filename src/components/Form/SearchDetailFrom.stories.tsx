import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SeachDetailFrom } from './SearchDetailFrom';

const formik = {
  values: {},
  errors: {
    sample: 'error',
  },
  touched: {},
};

export default {
  component: SeachDetailFrom,
  title: 'SeachDetailFrom',
};

const Template: ComponentStory<typeof SeachDetailFrom> = (args) => (
  <SeachDetailFrom {...args} />
);

export const Default = Template.bind({});
Default.args = {
  keys: [],
};
