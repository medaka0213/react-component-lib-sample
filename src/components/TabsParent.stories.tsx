import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TabsParent } from './TabsParent';

export default {
  title: 'TabsParent',
  component: TabsParent,
} as ComponentMeta<typeof TabsParent>;

const Template: ComponentStory<typeof TabsParent> = (args) => (
  <TabsParent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  list: [
    {
      title: 'Tab 1',
      content: 'Tab 1 Content',
    },
    {
      title: 'Tab 2',
      content: 'Tab 2 Content',
    },
  ],
};
