import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the `react-dom/client` package for React 18
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './styles/globle.css';

// For React 18 and later
const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root element
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
