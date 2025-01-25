import axios from 'axios';

const API_URL = 'https://referral-portal-1.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
    login: async (email, password) => {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    },
  
    register: async (email, password) => {
      try {
        const response = await api.post('/auth/register', { email, password });
        return response.data; // Return the success response from API
      } catch (error) {
        // Log detailed error response for debugging
        console.error('Error during registration:', error?.response?.data || error.message);
        throw new Error(
          error?.response?.data?.message || 'Registration failed. Please try again later.'
        );
      }
    },
  };

export const referralService = {
  createReferral: async (data) => {
    const response = await api.post('/referrals', data);
    return response.data;
  },

  getReferrals: async () => {
    const response = await api.get('/referrals');
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/referrals/${id}/status`, { status });
    return response.data;
  },

  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.fileUrl;
  },
};
