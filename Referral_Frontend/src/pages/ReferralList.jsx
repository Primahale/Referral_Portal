import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const ReferralList = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axios.get('https://referral-portal-1.onrender.com/referrals');
        setReferrals(response.data);
      } catch (err) {
        console.error('Failed to load referrals:', err);
      }
    };

    fetchReferrals();
  }, []);

  const handleStatusChange = async (referralId, newStatus) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/api/referrals/${referralId}`, {
        status: newStatus,
      });

      setReferrals((prevReferrals) =>
        prevReferrals.map((referral) =>
          referral._id === referralId ? { ...referral, status: newStatus } : referral
        )
      );
      
      setLoading(false);
      alert('Status updated successfully!');
    } catch (error) {
      setLoading(false);
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  // Function to handle the download or viewing of resume
  const handleDownloadResume = (resumeFilename) => {
    const resumeUrl = `http://localhost:5000/resumes/${resumeFilename}`;
    window.open(resumeUrl, '_blank'); // Open the resume in a new tab
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, marginBottom: 5 }}>
        <Button variant="contained" color="primary" href="/referrals/new" sx={{ fontWeight: 'bold' }}>
          Add New Referral
        </Button>
      </Box>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Referral List
        </Typography>

        {referrals.length > 0 ? (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral._id}>
                    <TableCell>{referral.name}</TableCell>
                    <TableCell>{referral.email}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={referral.status}
                          onChange={(e) => handleStatusChange(referral._id, e.target.value)}
                          disabled={loading} 
                        >
                          <MenuItem value="New">New</MenuItem>
                          <MenuItem value="Evaluated">Evaluated</MenuItem>
                          <MenuItem value="Hired">Hired</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      {referral.resume ? (
                        <>
                          {/* <Button
                            variant="outlined"
                            onClick={() => handleDownloadResume(referral.resume)} // pass the resume filename
                          >
                            View Resume
                          </Button> */}
                          <Typography variant="body2" sx={{ marginTop: 1, color: 'gray' }}>
                            Resume Uploaded
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'red' }}>
                          No Resume Uploaded
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
            No referrals found.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};
