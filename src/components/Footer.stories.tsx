import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Footer } from './Footer';

export default {
  title: 'Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: [
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      field: 'age',
      headerName: 'Age',
    },
  ],
  rows: [
    {
      name: 'John',
      age: 20,
    },
    {
      name: 'Jane',
      age: 21,
    },
  ],
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  columns: [
    {
      field: 'name',
      headerName: 'Name: width 200',
      width: 200,
    },
    {
      field: 'age',
      headerName: 'Age',
    },
  ],
  rows: [
    {
      name: 'John',
      age: 20,
    },
    {
      name: 'Jane',
      age: 21,
    },
  ],
};
