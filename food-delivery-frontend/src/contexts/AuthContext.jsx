"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

// Create the context
const AuthContext = createContext(null);

// Create the Provider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize state by reading from localStorage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('quickbite_user_session_v2');
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
      localStorage.setItem('quickbite_user_session_v2', JSON.stringify(user));
    } else {
      localStorage.removeItem('quickbite_user_session_v2');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);

      if (data && data.token) {
        setUser(data);

        // Navigation logic based on role from backend (formatted as ROLE_...)
        // Normalize role for checking
        const normalizedRole = role.replace('ROLE_', '');
        
        if (normalizedRole === 'CUSTOMER') {
          navigate('/customer-dashboard');
        } else if (normalizedRole === 'RESTAURANT') {
          navigate('/restaurant-dashboard'); 
        } else if (normalizedRole === 'ADMIN') {
            navigate('/admin-dashboard');
        } else if (normalizedRole === 'DELIVERY') {
            navigate('/delivery-dashboard');
        } else {
          navigate('/'); 
        }
        return data;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; 
    }
  };

  const register = async (userData) => {
      try {
          const response = await authService.register(userData);
          return response;
      } catch (error) {
          console.error('Registration error:', error);
          throw error;
      }
  };

  const logout = () => {
    setUser(null); 
    navigate('/'); 
  };
  
  const value = {
    user,
    isLoading,
    login,
    register,
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
