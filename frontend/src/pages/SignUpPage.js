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

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const nameError = touched.name && !name;
  const emailError = touched.email && (!email || !validateEmail(email));
  const passwordError = touched.password && (password.length < 6);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setTouched({ name: true, email: true, password: true });
    if (!name || !validateEmail(email) || password.length < 6) return;
    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign up.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 3 }}>
           <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur('name')}
                error={!!nameError}
                helperText={nameError ? 'Name is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                error={!!emailError}
                helperText={emailError ? 'Enter a valid email address' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                error={!!passwordError}
                helperText={passwordError ? 'Password must be at least 6 characters' : ''}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!name || !validateEmail(email) || password.length < 6}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpPage; 