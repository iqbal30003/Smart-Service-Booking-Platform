import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin }) {
  const token = localStorage.getItem('ssbp_token');
  const role = localStorage.getItem('ssbp_role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;


