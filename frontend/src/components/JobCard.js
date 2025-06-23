import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const JobCard = ({ job }) => {
  return (
    <Card sx={{ mb: 2, '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {job.title}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ my: 0.5 }}>
          {job.companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} /> {job.location}
        </Typography>
      </CardContent>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <Chip 
          label={job.status} 
          color={job.status === 'Open' ? 'success' : 'default'} 
          size="small"
          variant={job.status === 'Open' ? 'filled' : 'outlined'}
        />
        <Button size="small" variant="outlined" component={RouterLink} to={`/apply/${job.id}`}>
          Apply Now
        </Button>
      </Box>
    </Card>
  );
};

export default JobCard; 