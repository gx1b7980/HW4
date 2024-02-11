import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper, Container } from '@mui/material';
import { AuthContext } from '../AuthContext'; // Ensure this path matches your project structure

let port = 3008;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;
axios.defaults.baseURL = baseURL;
axios.defaults.baseURL = "https://ganna.one/HW4";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuthToken, setUsername: setContextUsername } = useContext(AuthContext) as { setAuthToken: Function, setUsername: Function };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/login", { username, password });
      localStorage.setItem('token', response.data.token); // Storing the token
      localStorage.setItem('username', username); // Storing the username for displaying "Hi username"
      
      if (setAuthToken) setAuthToken(response.data.token); // Updating auth token in context
      if (setContextUsername) setContextUsername(username); // Updating username in context
      navigate('/'); // Navigate to home page on successful login

      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message); // Display error from server response
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh">
        <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" component="h1" marginBottom={2}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <Box textAlign="center">
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
