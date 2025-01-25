const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
// const multer = require('multer');
const path = require('path');
const User = require('./models/User');  // Use require
// const referralRoutes = require('./models/Referral');
const authRoutes = require('./routes/authRoute');
const referralRoutes = require('./routes/referralRoute')

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;


// Serve static files (for resumes, assuming they are in the 'uploads' directory)
app.use('/resumes', express.static(path.join(__dirname, 'uploads')));

// Endpoint for downloading the resume
// app.get('/download-resume/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, 'uploads', filename);

//   res.download(filePath, filename, (err) => {
//     if (err) {
//       console.error('Error downloading file', err);
//       res.status(500).send('Error downloading file');
//     }
//   });
// });

// Body-parser to handle POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Middleware
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Your React app's URL
  credentials: true,
}

app.use(cors(corsOptions));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/referrals', referralRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
