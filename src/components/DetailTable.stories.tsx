import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DetailTable } from './DetailTable';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default {
  title: 'DetailTable',
  component: DetailTable,
} as ComponentMeta<typeof DetailTable>;

const Template: ComponentStory<typeof DetailTable> = (args) => (
  <DetailTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      key: 'Name',
      value: 'Starlink',
    },
    {
      key: 'Launch Date',
      value: '2021-05-01',
    },
  ],
};
