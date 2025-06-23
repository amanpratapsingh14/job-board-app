import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
// import { useAuth } from '../context/AuthContext';
import { getJobs, applyForJob } from '../services/api';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validateNumber = (val) => val === '' || (!isNaN(val) && Number(val) >= 0);
const validateUrl = (url) => !url || /^(https?:\/\/)?([\w\d-]+\.)+[\w-]{2,}(\/.*)?$/.test(url);

const JobApplicationPage = () => {
  const { jobId } = useParams();
  // const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    portfolioURL: '',
  });
  const [resume, setResume] = useState(null);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getJobs().then((jobs) => {
      const found = jobs.find(j => (j._id || j.id) === jobId);
      setJob(found);
    });
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const errors = {
    name: touched.name && !formData.name,
    email: touched.email && (!formData.email || !validateEmail(formData.email)),
    experience: touched.experience && (!formData.experience || isNaN(formData.experience) || Number(formData.experience) < 0),
    currentCTC: touched.currentCTC && formData.currentCTC && !validateNumber(formData.currentCTC),
    expectedCTC: touched.expectedCTC && formData.expectedCTC && !validateNumber(formData.expectedCTC),
    noticePeriod: touched.noticePeriod && formData.noticePeriod && !validateNumber(formData.noticePeriod),
    portfolioURL: touched.portfolioURL && formData.portfolioURL && !validateUrl(formData.portfolioURL),
    resume: touched.resume && !resume,
  };

  const isFormInvalid =
    !formData.name ||
    !formData.email ||
    !validateEmail(formData.email) ||
    !formData.experience ||
    isNaN(formData.experience) ||
    Number(formData.experience) < 0 ||
    (formData.currentCTC && !validateNumber(formData.currentCTC)) ||
    (formData.expectedCTC && !validateNumber(formData.expectedCTC)) ||
    (formData.noticePeriod && !validateNumber(formData.noticePeriod)) ||
    (formData.portfolioURL && !validateUrl(formData.portfolioURL)) ||
    !resume;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      experience: true,
      currentCTC: true,
      expectedCTC: true,
      noticePeriod: true,
      portfolioURL: true,
      resume: true,
    });
    if (isFormInvalid) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('experience', formData.experience);
      fd.append('currentCTC', formData.currentCTC);
      fd.append('expectedCTC', formData.expectedCTC);
      fd.append('noticePeriod', formData.noticePeriod);
      fd.append('portfolioURL', formData.portfolioURL);
      fd.append('file', resume);
      await applyForJob(jobId, fd);
      alert('Application submitted!');
      setFormData({
        name: '',
        email: '',
        experience: '',
        currentCTC: '',
        expectedCTC: '',
        noticePeriod: '',
        portfolioURL: '',
      });
      setResume(null);
      setTouched({});
    } catch (err) {
      alert('Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  const { name, email, experience, currentCTC, expectedCTC, noticePeriod, portfolioURL } = formData;

  return (
    <MainLayout>
      <Paper sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Apply for Job {job ? job.title : `#${jobId}`}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                error={!!errors.name}
                helperText={errors.name ? 'Name is required' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                error={!!errors.email}
                helperText={errors.email ? 'Enter a valid email address' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="experience"
                label="Years of Experience"
                type="number"
                id="experience"
                value={experience}
                onChange={handleChange}
                onBlur={() => handleBlur('experience')}
                error={!!errors.experience}
                helperText={errors.experience ? 'Enter a valid number (0 or more)' : ''}
              />
            </Grid>
             <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="noticePeriod"
                label="Notice Period (in days)"
                type="number"
                id="noticePeriod"
                value={noticePeriod}
                onChange={handleChange}
                onBlur={() => handleBlur('noticePeriod')}
                error={!!errors.noticePeriod}
                helperText={errors.noticePeriod ? 'Enter a valid number (0 or more)' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="currentCTC"
                label="Current CTC (e.g., 10 LPA)"
                id="currentCTC"
                value={currentCTC}
                onChange={handleChange}
                onBlur={() => handleBlur('currentCTC')}
                error={!!errors.currentCTC}
                helperText={errors.currentCTC ? 'Enter a valid number (0 or more)' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="expectedCTC"
                label="Expected CTC (e.g., 15 LPA)"
                id="expectedCTC"
                value={expectedCTC}
                onChange={handleChange}
                onBlur={() => handleBlur('expectedCTC')}
                error={!!errors.expectedCTC}
                helperText={errors.expectedCTC ? 'Enter a valid number (0 or more)' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="portfolioURL"
                label="Portfolio or GitHub URL"
                id="portfolioURL"
                value={portfolioURL}
                onChange={handleChange}
                onBlur={() => handleBlur('portfolioURL')}
                error={!!errors.portfolioURL}
                helperText={errors.portfolioURL ? 'Enter a valid URL (http(s)://...)' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Resume *
                <input
                  type="file"
                  hidden
                  required
                  onChange={(e) => { setResume(e.target.files[0]); setTouched((prev) => ({ ...prev, resume: true })); }}
                />
              </Button>
              {resume && <Typography variant="body2" sx={{ mt: 1 }}>{resume.name}</Typography>}
              {errors.resume && <Typography color="error" variant="body2">Resume is required</Typography>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isFormInvalid || submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </Box>
      </Paper>
    </MainLayout>
  );
};

export default JobApplicationPage; 