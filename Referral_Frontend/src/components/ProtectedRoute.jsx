import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <List>
      {user ? (
        <>
          <ListItem button onClick={() => handleNavigation('/referrals')}>
            <ListItemText primary="Referrals" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <ListItem button onClick={() => handleNavigation('/login')}>
          <ListItemText primary="Login" />
        </ListItem>
      )}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              color: theme.palette.primary.main,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation('/')}
          >
            Referral Portal
          </Typography>
          {!isMobile && user && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="primary"
                onClick={() => handleNavigation('/referrals')}
              >
                Referrals
              </Button>
              <Button color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
          {!isMobile && !user && (
            <Button color="primary" onClick={() => handleNavigation('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 10 },
          pb: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 4 },
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'white',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontWeight: 500 }}
          >
            {new Date().getFullYear()} Referral Portal. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
