import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// This is a mock API. In a real app, you'd make network requests.
const mockAuthApi = {
  login: async (email, password) => {
    if (email === 'admin@example.com' && password === 'password') {
      return { token: 'fake-admin-jwt', user: { name: 'Admin User', email, role: 'admin' } };
    }
    if (password === 'password') { // Simulate any user can login with the right password
      return { token: 'fake-user-jwt', user: { name: 'John Doe', email, role: 'user' } };
    }
    throw new Error('Invalid credentials');
  },
  signup: async (name, email, password) => {
    // Simulate successful signup
    return { token: 'fake-user-jwt', user: { name, email, role: 'user' } };
  },
  logout: async () => {
    // Simulate logout
    return;
  }
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // In a real app, you would verify the token with the backend here.
      // For this mock, we'll just re-create the user object.
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const { token, user } = await mockAuthApi.login(email, password);
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const signup = async (name, email, password) => {
    const { token, user } = await mockAuthApi.signup(name, email, password);
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    await mockAuthApi.logout();
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = { user, token, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 