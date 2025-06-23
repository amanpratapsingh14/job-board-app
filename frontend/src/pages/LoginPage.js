import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  Grid,
  Link
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const emailError = touched.email && (!email || !validateEmail(email));
  const passwordError = touched.password && !password;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, password: true });
    if (!validateEmail(email) || !password) return;
    try {
      await login(email, password);
      navigate('/admin/dashboard'); 
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            error={!!emailError}
            helperText={emailError ? 'Enter a valid email address' : ''}
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
            onBlur={() => handleBlur('password')}
            error={!!passwordError}
            helperText={passwordError ? 'Password is required' : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validateEmail(email) || !password}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage; 