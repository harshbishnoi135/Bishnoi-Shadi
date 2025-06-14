
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but hasn't completed profile and trying to access other pages
  if (isAuthenticated && !user?.isProfileComplete && location.pathname !== '/profile-registration') {
    return <Navigate to="/profile-registration" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
