import React, { useState, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Logo from './Logo';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export type LayoutProps = {
  children: ReactNode;
  window?: () => Window;
  drawer: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  appBar?: ReactNode;
  bgColor: string;
  logoVariant?: 'white' | 'en' | 'jp';
};

function LayoutApp(props: LayoutProps) {
  const { window, drawer, bgColor = 'primary.main' } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);

  const handleDrawerToggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <AppBar
          sx={{
            width: { xl: `calc(100% - ${(open && drawerWidth) || 0}px)` },
            ml: { xl: `${(open && drawerWidth) || 0}px` },
            backgroundColor: bgColor,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => {
                handleDrawerToggleMobile();
                handleDrawerToggle();
              }}
              sx={{ mr: 2, display: { xl: open ? 'none' : 'block' } }}
            >
              <MenuIcon />
            </IconButton>
            <Logo
              variant={props.logoVariant || 'white'}
              sx={{
                height: '40px',
                display: { sm: open ? 'none' : 'block', xs: 'none' },
                mr: 3,
              }}
            />
            {props.appBar}
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { xl: (open && drawerWidth) || 0 },
            flexShrink: { xl: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* モバイル用 */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggleMobile}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', xl: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <DrawerHeader sx={{ backgroundColor: bgColor }}>
              <Logo
                variant={props.logoVariant || 'white'}
                sx={{
                  height: '40px',
                  mr: 'auto',
                  ml: 1,
                }}
              />
              <IconButton
                onClick={handleDrawerToggleMobile}
                color="inherit"
                sx={{
                  color: 'white',
                }}
              >
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                ) : (
                  <ChevronRightIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                )}
              </IconButton>
            </DrawerHeader>
            {drawer}
          </Drawer>
          {/* PC用 */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', xl: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: (open && drawerWidth) || 0,
              },
            }}
            open
          >
            <DrawerHeader sx={{ backgroundColor: bgColor }}>
              <Logo
                variant={props.logoVariant || 'white'}
                sx={{
                  height: '40px',
                  mr: 'auto',
                  ml: 1,
                }}
              />
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: 'white',
                }}
              >
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                ) : (
                  <ChevronRightIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                )}
              </IconButton>
            </DrawerHeader>
            {drawer}
          </Drawer>
        </Box>
        <Box
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            backgroundColor: '#eee',
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              mx: {
                xs: 0,
                lg: 'auto',
              },
            }}
          >
            <Box
              sx={{
                display: 'block',
                maxWidth: {
                  xs: '100%',
                  lg: '1200px',
                },
                width: '100%',
                height: '100%',
              }}
            >
              <DrawerHeader />
              {props.children}
            </Box>
            <Box
              sx={{
                width: {
                  xs: '0',
                  lg: '350px',
                },
                height: '100%',
                display: { xs: 'none', lg: 'block' },
              }}
            >
              <DrawerHeader />
              {props.sidebar}
            </Box>
          </Box>
        </Box>
      </Box>
      <Paper
        className="footer"
        sx={{
          justifyContent: 'center',
          align: 'center',
          width: '100%',
          py: 1,
          zIndex: 'drawer',
        }}
        elevation={3}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mx="auto"
          flexWrap="wrap"
        >
          {props.footer}
        </Box>
      </Paper>
    </>
  );
}

import _theme from './theme';
export const Layout = (props: LayoutProps) => {
  return (
    <ThemeProvider theme={_theme}>
      <CssBaseline />
      <LayoutApp {...props} />
    </ThemeProvider>
  );
};
