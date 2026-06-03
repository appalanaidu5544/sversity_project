import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, isAuthenticated } = useAuth();

  // Not logged in
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (
    allowedRoles &&
    !allowedRoles.includes(currentUser.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;