import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip 
} from '@mui/material';
import MainLayout from '../components/Layout/MainLayout';
// import { mockApplications } from '../services/mockApplications'; // To be replaced with API call
import { useAuth } from '../context/AuthContext';

const UserApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Replace with an API call to fetch user's applications
    // Example: getMyApplications(user.email).then(setApplications);
    if (user && user.email) {
      const key = `my_applications_${user.email}`;
      const localApps = JSON.parse(localStorage.getItem(key) || '[]');
      setApplications(localApps);
    } else {
      setApplications([]);
    }
  }, [user]);

  const getStatusChip = (status) => {
    let color = 'default';
    if (status === 'Under Review') color = 'warning';
    if (status === 'Submitted') color = 'info';
    if (status === 'Accepted') color = 'success';
    if (status === 'Rejected') color = 'error';
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <MainLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        My Applications
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell align="right">Date Applied</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app, idx) => (
              <TableRow
                key={app.jobId + idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {app.jobTitle}
                </TableCell>
                <TableCell>{app.companyName}</TableCell>
                <TableCell align="right">{app.appliedOn}</TableCell>
                <TableCell align="right">{getStatusChip(app.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default UserApplicationsPage; 