import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  drawerWidth: number;
  children: any;
  drawerOpen: boolean;
}

const Content = (props: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [width, setWidth] = React.useState<string>();
  const [ml, setMl] = React.useState<number>(-30);
  const [c1, setC] = React.useState('#3f50b5');

  React.useEffect(() => {
    if (matches === true) {
      console.log('Token ist angekommen: ', matches);
      setWidth('100%');
      if (props.drawerOpen) {
        setMl(0);
      } else {
        setMl(-30);
      }

      setC(theme.palette.primary.main);
    } else {
      setWidth(`calc(100% - ${props.drawerWidth}px)`);
      setMl(0);
      setC(theme.palette.secondary.main);
    }
  }, [matches, props.drawerWidth, props.drawerOpen]);

  return (
    // !matches && (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0.5,
          // width: { sm: `calc(100% - ${props.drawerWidth}px)`}
          width: { width },
          // marginLeft: { ml },
          mt: 2,
          color: c1,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          border: '2px solid #eee',
        }}
      >
        <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>
        <span>{`witdh ${width}`}</span>
        <span>{`ml ${ml}`}</span>
        {props.children}
      </Box>
    </React.Fragment>
    //  )
  );
};

export default Content;
