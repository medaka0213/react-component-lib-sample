import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { OGPDisplay } from './OGPDisplay';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default {
  title: 'OGPDisplay',
  component: OGPDisplay,
} as ComponentMeta<typeof OGPDisplay>;

const Template: ComponentStory<typeof OGPDisplay> = (args) => (
  <OGPDisplay {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title:
    "This Week In Space podcast: Episode 74 — New Horizons' future in the Kuiper Belt with Alan Stern",
  description:
    "Alan Stern led NASA's New Horizons probe to Pluto, the Kuiper Belt's Arrokoth and beyond. But will NASA keep its funding for more?",
  image: 'https://cdn.mos.cms.futurecdn.net/LVvCSvaRpPPtQ8xoWFg4jR-1200-80.jpg',
  url: 'https://www.space.com/this-week-in-space-podcast-twit',
};
