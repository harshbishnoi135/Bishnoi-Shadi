
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Show navigation on all pages except login

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Bishnoi Shaadi
          </Link>

          {/* Navigation - Show on all pages except login */}
          
            <nav className="hidden md:flex space-x-8">
              <Link to="/about">
                <Button variant="ghost" className="text-black hover:bg-gray-100">
                  About
                </Button>
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" className="text-black hover:bg-gray-100">
                      My Profile
                    </Button>
                  </Link>
                  <Link to="/matches">
                    <Button variant="ghost" className="text-black hover:bg-gray-100">
                      Discover
                    </Button>
                  </Link>
                  <Link to="/favourites">
                    <Button variant="ghost" className="text-black hover:bg-gray-100">
                      Favourites
                    </Button>
                  </Link>
                </>
              )}
              {/* <Link to="/pricing">
                <Button variant="ghost" className="text-black hover:bg-gray-100">
                  Membership
                </Button>
              </Link> */}
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  className="text-black hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="text-black hover:bg-gray-100">
                    Login
                  </Button>
                </Link>
              )}
            </nav>

          {/* Mobile menu button */}
          
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                ☰
              </Button>
            </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
