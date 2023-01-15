import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';

const SideBar = () => (
  <div>
    <List>
      <ListItem key={'twitter'} disablePadding>
        <ListItemButton
          component="a"
          href="https://twitter.com/vr_launch"
          target="_blank"
        >
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary={'Twitter @vr_launch'} />
        </ListItemButton>
      </ListItem>
    </List>
  </div>
);

import { Layout } from './Layout';

export default {
  title: 'Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'primary.main',
      }}
    >
      ここにメインコンテンツ
    </Box>
  ),
  drawer: <SideBar />,
  footer: <p>ここにフッター</p>,
  sidebar: (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        width: '100%',
        height: '100%',
      }}
    >
      ここにサイトバー
    </Box>
  ),
  appBar: <p>ここにAppバー</p>,
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  children: (
    <img
      src="https://sxcontent9668.azureedge.us/cms-assets/assets/Launch_Page_Starlink1_vertical_18_DESKTOP_209c4e50a1.jpg/"
      alt="Starlink"
      width={'100%'}
      height={'auto'}
    />
  ),
  bgColor: '#004F8A',
  drawer: <SideBar />,
  footer: <p>ここにフッター</p>,
  appBar: <p>ここにAppバー</p>,
};
