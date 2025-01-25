import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Logout the user using AuthContext
    navigate('/login'); // Redirect to login page
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the desired path
  };

  return (
    <Box>
      {/* Navbar with White Background */}
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Container>
          <Toolbar disableGutters>
            {/* Logo/Title */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer', color: 'black' }}  // Black text for the logo
              onClick={() => handleNavigation('/')}
            >
              Referral Portal
            </Typography>

            {/* Auth Buttons */}
            {user ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary" // Login button with primary color
                onClick={() => handleNavigation('/login')}
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Navbar;
