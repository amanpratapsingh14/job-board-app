import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!token || !user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login,
    // which is a nicer user experience than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    // Redirect them to the home page if they are not an admin
    return <Navigate to="/" state={{ from: location }} replace />;
  }


  return children;
};

export default PrivateRoute; 