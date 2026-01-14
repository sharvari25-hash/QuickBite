"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../services/mockApi";

// Create the context
const AuthContext = createContext(null);

// Create the Provider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize state by reading from localStorage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('quickbite_user_session');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user session from localStorage", error);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  // This effect runs only once on app load to remove the initial loading state
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // This effect runs whenever the 'user' object changes to keep localStorage in sync
  useEffect(() => {
    if (user) {
      localStorage.setItem('quickbite_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('quickbite_user_session');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      // Use mockApi instead of fetch
      const data = await mockApi.login(email, password);

      if (data && data.token) {
        setUser(data);

        // Navigation logic
        if (data.role === 'CUSTOMER') {
          navigate('/');
        } else if (data.role === 'RESTAURANT') {
          navigate('/dashboard'); 
        } else if (data.role === 'ADMIN') {
            navigate('/admin-dashboard');
        } else if (data.role === 'DELIVERY_PARTNER') {
            navigate('/delivery-partner-dashboard');
        } else {
          navigate('/'); 
        }
        return data;
      } else {
        throw new Error('Login response did not include an authentication token.');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; 
    }
  };

  const logout = () => {
    setUser(null); 
    navigate('/login'); 
  };
  
  const value = {
    user,
    isLoading,
    login,
    logout,
    authToken: user?.token,
    isAuthenticated: !!user?.token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
