import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ username: email, password });
      const { access_token } = response.data;

      // Get user info from token (you might want to decode JWT or make an API call)
      const userInfo = {
        email,
        isAdmin: email === 'admin@jobboard.com', // This is a simple check, in production you'd decode the JWT
      };

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);

      toast.success('Login successful!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different types of error responses
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          const detail = error.response.data.detail;
          if (Array.isArray(detail)) {
            // Handle validation error array
            errorMessage = detail.map(error => error.msg).join(', ');
          } else if (typeof detail === 'string') {
            errorMessage = detail;
          } else {
            errorMessage = 'Login failed. Please check your credentials.';
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'object') {
          // If it's an object, try to extract a meaningful message
          const errorKeys = Object.keys(error.response.data);
          if (errorKeys.length > 0) {
            const firstError = error.response.data[errorKeys[0]];
            if (Array.isArray(firstError)) {
              errorMessage = firstError[0];
            } else if (typeof firstError === 'string') {
              errorMessage = firstError;
            }
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      throw new Error(errorMessage); // Re-throw as a string error
    }
  };

  const register = async (userData) => {
    try {
      await authAPI.register(userData);
      toast.success('Registration successful! Please log in.');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          const detail = error.response.data.detail;
          if (Array.isArray(detail)) {
            // Handle validation error array
            errorMessage = detail.map(error => error.msg).join(', ');
          } else if (typeof detail === 'string') {
            errorMessage = detail;
          } else {
            errorMessage = 'Registration failed. Please check your information.';
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'object') {
          const errorKeys = Object.keys(error.response.data);
          if (errorKeys.length > 0) {
            const firstError = error.response.data[errorKeys[0]];
            if (Array.isArray(firstError)) {
              errorMessage = firstError[0];
            } else if (typeof firstError === 'string') {
              errorMessage = firstError;
            }
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 