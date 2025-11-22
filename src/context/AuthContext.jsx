import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// API URL configuration - automatically switches between local and production
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : 'https://comp229-assignmnet-3.onrender.com/api';

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
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/verify`);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);

      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Sign in failed');
      return { 
        success: false, 
        error: error.response?.data?.message || 'Sign in failed' 
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);

      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Sign up failed');
      return { 
        success: false, 
        error: error.response?.data?.message || 'Sign up failed' 
      };
    }
  };

  const signout = () => {
    localStorage.removeItem('token');

    delete axios.defaults.headers.common['Authorization'];

    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    signin,
    signup,
    signout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin === true
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;