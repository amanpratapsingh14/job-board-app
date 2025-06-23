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
  Link,
  Typography
} from '@mui/material';
import AdminLayout from '../../components/Layout/AdminLayout';
// import { mockApplicants } from '../../services/mockApplicants';

const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    // TODO: Replace with an API call to fetch applicants
    // Example: getApplicants().then(setApplicants);
    setApplicants([]);
  }, []);

  return (
    <AdminLayout title="Applicants">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Applied for</TableCell>
              <TableCell>Company</TableCell>
              <TableCell align="right">Resume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>{applicant.name}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.jobTitle}</TableCell>
                  <TableCell>{applicant.companyName}</TableCell>
                  <TableCell align="right">
                    <Link href={applicant.resumeUrl} target="_blank" rel="noopener">
                      <Button variant="outlined" size="small">
                        View Resume
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No applicants found. API integration needed.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
};

export default ApplicantsPage; 