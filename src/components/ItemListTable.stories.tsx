import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ItemListTable } from './ItemListTable';

export default {
  title: 'ItemListTable',
  component: ItemListTable,
} as ComponentMeta<typeof ItemListTable>;

const Template: ComponentStory<typeof ItemListTable> = (args) => (
  <ItemListTable {...args} />
);

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

export const CustomLink = Template.bind({});
CustomLink.args = {
  rowLink: (row: any) => 'https://www.youtube.com/watch?v=gsAy5TUPltw',
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

export const EmptyCell = Template.bind({});
EmptyCell.args = {
  columns: [
    {
      field: 'name',
      headerName: 'Name',
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
      name: 'Lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphiokarabomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygon.',
    },
  ],
};

export const EmptyCellWith0 = Template.bind({});
EmptyCellWith0.args = {
  columns: [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'age',
      headerName: 'Age',
    },
    {
      field: 'attr',
      headerName: 'Attr',
    },
  ],
  rows: [
    {
      name: 'John',
      age: 20,
      attr: 'hogehoge',
    },
    {
      name: 'Lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphiokarabomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygon.',
      age: 0,
      attr: 'hogehoge',
    },
  ],
};
