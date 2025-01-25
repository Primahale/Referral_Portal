import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewReferral = () => {
  const navigate = useNavigate();

  const [referralData, setReferralData] = useState({
    name: '',
    email: '',
    experience: '',
    status: 'New',
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReferralData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setReferralData((prevState) => ({
      ...prevState,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Add data to formData, including file
    formData.append('name', referralData.name);
    formData.append('email', referralData.email);
    formData.append('experience', referralData.experience);
    formData.append('status', referralData.status);
    formData.append('resume', referralData.resume);

    try {
      // Make POST request to API
      const response = await axios.post('https://referral-portal-1.onrender.com/referrals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success (redirect or show success message)
      console.log('Referral created successfully:', response.data);
      navigate('/referrals');
    } catch (error) {
      // Handle error (show error message)
      console.error('Error creating referral:', error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography variant="h5">Create Referral</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={referralData.name}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            value={referralData.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Experience (e.g., 5)"
            name="experience"
            value={referralData.experience}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={referralData.status}
              onChange={handleInputChange}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Evaluated">Evaluated</MenuItem>
              <MenuItem value="Hired">Hired</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>

          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
            style={{ marginBottom: '20px', width: '100%' }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
            }}
          >
            Create Referral
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewReferral;
