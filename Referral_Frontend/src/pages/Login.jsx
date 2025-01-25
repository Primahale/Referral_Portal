import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // Normally, you'd verify login with an API.
    if (username && password) {
      navigate('/referrals');  // Redirect to the referrals page after login.
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
          {error && (
            <Box sx={{ backgroundColor: '#f44336', color: 'white', padding: '10px', marginBottom: '20px' }}>
              {error}
            </Box>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(error)}
            helperText={error ? error : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(error)}
            helperText={error ? error : ''}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              padding: { xs: '8px', sm: '16px' },  // Adjust padding for mobile and small screens
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <button
              type="button"
              onClick={() => navigate('/register')}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: '#007BFF',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              You don't have an account? Sign Up
            </button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
