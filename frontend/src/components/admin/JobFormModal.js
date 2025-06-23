import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  MenuItem,
} from '@mui/material';

const JobFormModal = ({ open, onClose, onSave, job }) => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    location: '',
    salary: '',
    status: 'Open',
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        title: '',
        companyName: '',
        description: '',
        location: '',
        salary: '',
        status: 'Open',
      });
    }
  }, [job, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{job ? 'Edit Job' : 'Add New Job'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="title"
              label="Job Title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="companyName"
              label="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Job Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="salary"
              label="Salary"
              value={formData.salary}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              select
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobFormModal; 