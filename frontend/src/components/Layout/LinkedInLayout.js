import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from './Header';

const LinkedInLayout = ({ left, middle, right }) => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f3f2ef' }}>
      <Header />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={3}>
            {left}
          </Grid>
          {/* Middle Column */}
          <Grid item xs={12} md={6}>
            {middle}
          </Grid>
          {/* Right Column */}
          <Grid item xs={12} md={3}>
            {right}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LinkedInLayout; 