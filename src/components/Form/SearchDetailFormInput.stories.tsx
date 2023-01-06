import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Formik, useFormik } from 'formik';

import { SearchDetailFormInput } from './SearchDetailFormInput';

export default {
  component: SearchDetailFormInput,
  title: 'SearchDetailFormInput',
};

const Template: ComponentStory<typeof SearchDetailFormInput> = (args) => (
  <Formik>
    <SearchDetailFormInput {...args} />
  </Formik>
);

export const Default = Template.bind({});
Default.args = {};
