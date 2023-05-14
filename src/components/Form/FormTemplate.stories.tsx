import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormTemplate, FormTemplateProps } from './FormTemplate';

export default {
  component: FormTemplate,
  title: 'FormTemplate',
};

const Template: ComponentStory<typeof FormTemplate> = (args) => (
  <FormTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'sample',
  title: 'title',
  formik: {
    values: {
      sample: 'value',
      sample_number: 1,
      sample_select: 'value2',
    },
    errors: {
      sample: 'error',
    },
    touched: {},
  },
  childrenList: [[{
    name: 'sample',
  }, {
    name: 'sample_number',
    type: 'number',
  }], [{
    name: 'sample_select',
    type: 'select',
    options: [
      {
        value: 'value1',
      },
      {
        value: 'value2',
        label: 'value2 (with divder)',
        divider: true,
      }]
  }]]
};
