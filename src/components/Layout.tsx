import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

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
  children: React.ReactNode;
  window?: () => Window;
  drawer: React.ReactNode;
  bgColor: string;
};

function LayoutApp(props: LayoutProps) {
  const { window, drawer, bgColor = 'primary.main' } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${(open && drawerWidth) || 0}px)` },
          ml: { md: `${(open && drawerWidth) || 0}px` },
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
            sx={{ mr: 2, display: { md: open ? 'none' : 'block' } }}
          >
            <MenuIcon />
          </IconButton>
          <Logo
            variant="white"
            sx={{
              height: '40px',
              display: { md: open ? 'none' : 'block' },
            }}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: (open && drawerWidth) || 0 },
          flexShrink: { md: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* モバイル用 */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <DrawerHeader sx={{ backgroundColor: bgColor }}>
            <Logo
              variant="white"
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
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: (open && drawerWidth) || 0,
            },
          }}
          open
        >
          <DrawerHeader sx={{ backgroundColor: bgColor }}>
            <Logo
              variant="white"
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
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${(open && drawerWidth) || 0}px)` },
          height: '100%',
          minHeight: '100vh',
          backgroundColor: '#eee',
        }}
      >
        <Toolbar />
        <Box
          sx={{
            border: '1px solid #eaeaea',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            p: 1,
            maxWidth: '1280px',
            '@media (min-width: 600px)': {},
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}

export const Layout = (props: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutApp {...props} />
    </ThemeProvider>
  );
};
