import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Only allow access if user is authenticated
  // You can add more specific checks here (like checking for specific email)
  return currentUser ? children : <Login />;
};

export default ProtectedRoute;
