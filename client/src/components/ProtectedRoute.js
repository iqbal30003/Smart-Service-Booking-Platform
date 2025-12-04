import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user) {
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;


