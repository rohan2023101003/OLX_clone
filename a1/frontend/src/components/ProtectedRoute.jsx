import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUserData } from './Api';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchUserData();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Show a loading message while checking authentication
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;