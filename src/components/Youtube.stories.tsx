import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { YoutubePlayer } from './Youtube';

export default {
  title: 'YoutubePlayer',
  component: YoutubePlayer,
} as ComponentMeta<typeof YoutubePlayer>;

const Template: ComponentStory<typeof YoutubePlayer> = (args) => (
  <YoutubePlayer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  videoId: 'KQBVOQ79G2s',
};

export const ByUrl = Template.bind({});
ByUrl.args = {
  videoUrl: 'https://www.youtube.com/watch?v=KQBVOQ79G2s',
};

export const ByShortUrl = Template.bind({});
ByShortUrl.args = {
  videoUrl: 'https://youtu.be/KQBVOQ79G2s',
};

export const StartTime = Template.bind({});
StartTime.args = {
  videoUrl: 'https://youtu.be/KQBVOQ79G2s',
  start: 60,
};
