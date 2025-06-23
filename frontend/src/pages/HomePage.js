import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LinkedInLayout from '../components/Layout/LinkedInLayout';
import JobCard from '../components/JobCard';
import ProfileSummary from '../components/ProfileSummary';
import News from '../components/News';
import { getJobs } from '../services/api';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getJobs().then((data) => setJobs(data));
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.companyName ? job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const leftColumn = <ProfileSummary />;
  
  const middleColumn = (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by title, company, or location"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Typography variant="h5" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
        Recommended For You
      </Typography>
      <Grid container spacing={2}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} key={job._id || job.id}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </>
  );

  const rightColumn = <News />;

  return (
    <LinkedInLayout
      left={leftColumn}
      middle={middleColumn}
      right={rightColumn}
    />
  );
};

export default HomePage; 