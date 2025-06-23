import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ProfileSummary = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a placeholder for logged-out users
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ width: 64, height: 64, mb: 2 }}>{user.name.charAt(0)}</Avatar>
          <Typography variant="h6">{user.name}</Typography>
          <Typography color="text.secondary">{user.email}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary; 