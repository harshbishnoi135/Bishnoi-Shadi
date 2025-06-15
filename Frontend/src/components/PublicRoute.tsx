import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
  restricted?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, restricted = false }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If route is restricted and user is authenticated, redirect to home
  if (restricted && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated and has completed profile, prevent access to register page
  if (isAuthenticated && user?.isProfileComplete && location.pathname === '/register') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute; 