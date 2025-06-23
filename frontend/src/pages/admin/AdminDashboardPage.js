import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminLayout from '../../components/Layout/AdminLayout';
import JobFormModal from '../../components/admin/JobFormModal';
import { getJobs, createJob } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  const openModal = (job = null) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleSaveJob = async (jobData) => {
    if (editingJob) {
      // TODO: Implement updateJob API call
      // const updatedJob = await updateJob(editingJob.id, jobData, token);
      // setJobs(jobs.map(job => (job.id === editingJob.id ? updatedJob : job)));
    } else {
      const newJob = await createJob(jobData, token);
      setJobs([newJob, ...jobs]);
    }
    closeModal();
  };

  const handleDelete = (jobId) => {
    // TODO: Implement deleteJob API call
    // if (window.confirm('Are you sure you want to delete this job?')) {
    //   await deleteJob(jobId, token);
    //   setJobs(jobs.filter(job => job.id !== jobId));
    // }
  };

  return (
    <AdminLayout title="Job Listings">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => openModal()}>
          Add New Job
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.companyName || 'N/A'}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>
                  <Chip 
                    label={job.status} 
                    color={job.status === 'Open' ? 'success' : 'error'} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openModal(job)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(job._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <JobFormModal
        open={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveJob}
        job={editingJob}
      />
    </AdminLayout>
  );
};

export default AdminDashboardPage; 