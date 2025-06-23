import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Avatar
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const validateUrl = (url) => !url || /^(https?:\/\/)?([\w\d-]+\.)+[\w-]{2,}(\/.*)?$/.test(url);

const CompanyProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    website: '',
    location: '',
    industry: '',
    size: '',
    logo: null,
    logoUrl: '',
  });
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      const key = `company_profile_${user.email}`;
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved) setFormData(saved);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logo: file, logoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const errors = {
    companyName: touched.companyName && !formData.companyName,
    website: touched.website && formData.website && !validateUrl(formData.website),
  };

  const isFormInvalid = !formData.companyName || (formData.website && !validateUrl(formData.website));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ companyName: true, website: true });
    if (isFormInvalid) return;
    // Save to localStorage
    const key = `company_profile_${user.email}`;
    localStorage.setItem(key, JSON.stringify(formData));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 6, p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Company Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar src={formData.logoUrl} sx={{ width: 72, height: 72, mb: 1 }} />
              <Button variant="outlined" component="label">
                Upload Logo
                <input type="file" hidden accept="image/*" onChange={handleLogo} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                onBlur={() => handleBlur('companyName')}
                error={!!errors.companyName}
                helperText={errors.companyName ? 'Company name is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                onBlur={() => handleBlur('website')}
                error={!!errors.website}
                helperText={errors.website ? 'Enter a valid URL' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g. 51-200 employees"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={isFormInvalid}
          >
            Save Profile
          </Button>
          {success && <Typography color="success.main" sx={{ mt: 2 }}>Profile updated!</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default CompanyProfilePage; 