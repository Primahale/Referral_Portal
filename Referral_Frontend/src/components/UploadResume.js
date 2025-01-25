import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    // Handle the file upload logic here
    // You can send the file to your backend API for storage
    const formData = new FormData();
    formData.append('file', file);

    // Example API request (make sure to implement your backend to handle this)
    fetch('/api/uploadResume', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Resume uploaded successfully.');
        console.log('Upload response:', data);
      })
      .catch((error) => {
        console.error('Error uploading resume:', error);
        alert('Failed to upload resume.');
      });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Upload Your Resume</Typography>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={{ marginBottom: '10px' }}
      />
      {fileName && <Typography variant="body1">{fileName}</Typography>}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleUpload}
      >
        Upload Resume
      </Button>
    </Box>
  );
};

export default UploadResume;
