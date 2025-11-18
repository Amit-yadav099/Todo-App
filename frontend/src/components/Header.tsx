import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, CheckSquare } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="backdrop-blur-md bg-white/70 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-blue-600 transition"
          >
            <CheckSquare className="h-7 w-7 text-blue-600" />
            <span>TodoApp</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center bg-blue-200 px-3 py-1.5 rounded-full shadow-sm">
                  <User className="h-4 w-4 text-gray-700 mr-2" />
                  <span className="text-gray-700 text-sm font-medium">
                    Hello, {user?.name}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg 
                  bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg 
                  hover:bg-blue-700 transition shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
