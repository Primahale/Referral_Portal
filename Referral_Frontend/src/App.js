import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { LoginPage } from './pages/Login';
import Register from './pages/Register';
import { ReferralList } from './pages/ReferralList';
import NewReferral from './pages/NewReferral';
import UploadResume from './components/UploadResume';

const App = () => {
  return (
    <Router>
      <Navbar>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/referrals" element={<ReferralList />} /> {/* ReferralList page route */}
          <Route path="/referrals/new" element={<NewReferral />} />
          <Route path="/upload-resume" element={<UploadResume />} /> {/* New route for Upload Resume */}
          <Route path="/" element={<div>Welcome to the Referral Portal</div>} />
        </Routes>
      </Navbar>
    </Router>
  );
};

export default App;
