import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormToggle } from './FormToggle';

export default {
  component: FormToggle,
  title: 'FormToggle',
};

const Template: ComponentStory<typeof FormToggle> = (args) => (
  <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>
    <FormToggle {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  name: 'sample',
  title: 'title',
  formik: {
    values: {
      sample: true,
    },
    errors: {
      sample: 'error',
    },
    touched: {},
  },
};
