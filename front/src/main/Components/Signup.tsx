import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';

let port = 3008;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;
axios.defaults.baseURL = baseURL;
axios.defaults.baseURL = "https://ganna.one/HW4";


const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/register", {
        username,
        password,
        name,
        email
      });
      console.log('Signup successful: ', response.data);
      navigate('/login'); // Navigate to the login page after successful signup
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Display more specific error if possible
        setError(err.response.data.message || 'Failed to create an account. Please try again.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 3 }}>
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5">Sign up</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          {error && (
            <Typography color="error" variant="body2">{error}</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
