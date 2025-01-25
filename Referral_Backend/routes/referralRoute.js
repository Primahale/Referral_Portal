const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Referral = require('../models/Referral');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Storage configuration for multer (set destination and filename for resume upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify directory to store files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Add timestamp to file name
  },
});

const upload = multer({ storage: storage });

// Create new referral route
router.post('/', upload.single('resume'), async (req, res) => {
  // Log incoming request data for debugging
  console.log("Request body:", req.body);
  console.log("File uploaded:", req.file);

  const { name, email, experience, status } = req.body;
  const resumePath = req.file ? req.file.path : null; // Resume file path if uploaded

  // Validate all fields
  if (!name || !email || !experience || !status || !resumePath) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const referral = new Referral({
      name,
      email,
      experience: parseInt(experience), // Ensure experience is parsed as integer
      status,
      resume: resumePath, // Store the path of the uploaded resume file
    });

    const savedReferral = await referral.save();
    res.status(201).json(savedReferral); // Respond with created referral
  } catch (error) {
    console.error('Error saving referral:', error);
    res.status(500).json({ message: 'Server error occurred, please try again later.' });
  }
});

// Define the route to handle GET requests for all referrals
router.get('/', async (req, res) => {
  try {
    const referrals = await Referral.find();  // MongoDB method to find all referrals
    res.status(200).json(referrals); // Send the list of referrals as JSON
  } catch (err) {
    console.error('Error fetching referrals:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update referral status
router.put('/:referralId', async (req, res) => {
  const { referralId } = req.params;  // Extract referralId from the URL params
  const { status } = req.body;  // Get the new status from the request body

  // Validate the status field
  if (!['New', 'Evaluated', 'Hired', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    // Find the referral by ID
    const referral = await Referral.findById(referralId);

    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    // Update the status
    referral.status = status;

    // Save the updated referral
    await referral.save();

    // Respond with success
    res.status(200).json({ message: 'Status updated successfully!', referral });
  } catch (err) {
    console.error('Error updating referral status:', err);
    res.status(500).json({ message: 'Error updating referral status', error: err.message });
  }
});

// Register User Route (sign-up)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = new User({ email, password });
    await user.save();
    
    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token }); // Return token to user
    
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Registration failed' });
  }
});

module.exports = router;
