"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the context but don't export it
const AuthContext = createContext()

// The Provider component remains the same, just defined as a const
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const API_BASE_URL = "http://localhost:8080/api/auth"

  useEffect(() => {
    const savedUser = localStorage.getItem("quickeats_user")
    const token = localStorage.getItem("quickeats_token")
    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
      setAuthToken(token);
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Login failed")
      }

      const data = await response.json()
      const { token, ...userData } = data

      setUser(userData);
      setAuthToken(token);
      localStorage.setItem("quickeats_user", JSON.stringify(userData));
      localStorage.setItem("quickeats_token", token);

      return userData
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      let responseBody;
      if (contentType && contentType.includes("application/json")) {
        responseBody = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text);
      }

      if (!response.ok) {
        throw new Error(responseBody.message || "Registration failed");
      }

      const { token, ...userData } = responseBody;
      setUser(userData);
      setAuthToken(token);
      localStorage.setItem("quickeats_user", JSON.stringify(userData));
      localStorage.setItem("quickeats_token", token);

      return userData;
    } catch (error) {
      console.error("Register error:", error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("quickeats_user");
    localStorage.removeItem("quickeats_token");
  }

  const value = {
    user,
    authToken,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!authToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// The hook function also remains the same, just defined as a const
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}