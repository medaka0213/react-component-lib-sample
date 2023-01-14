import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, BoxProps, Tabs, Tab, Typography, Button } from '@mui/material';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

type TabListItem = {
  title: string;
  content: React.ReactNode;
};

export type TabsProps = BoxProps & {
  children: React.ReactNode;
  index: number;
  list: TabListItem[];
};

export const TabsParent = ({ list, index = 0, sx, ...props }: TabsProps) => {
  const [value, setValue] = useState(index);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(index);
  }, [index]);

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: '100%', ...sx }} {...props}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {list.map((item, index) => (
            <Tab key={index} label={item.title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {list.map((item, index) => (
        <TabPanel value={value} key={index} index={index}>
          {item.content}
        </TabPanel>
      ))}
    </Box>
  );
};
