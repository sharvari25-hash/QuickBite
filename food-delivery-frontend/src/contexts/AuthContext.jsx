"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("quickeats_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password, role = "customer") => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData = {
      id: Date.now(),
      email,
      role,
      name: email.split("@")[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=22c55e&color=fff`,
      createdAt: new Date().toISOString(),
      ...(role === "restaurant" && {
        restaurantName: "Demo Restaurant",
        restaurantAddress: "123 Food Street",
      }),
      ...(role === "delivery" && {
        vehicleType: "bike",
        isAvailable: true,
      }),
    }

    setUser(userData)
    localStorage.setItem("quickeats_user", JSON.stringify(userData))
    return userData
  }

  const register = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData = {
      id: Date.now(),
      ...formData,
      avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=22c55e&color=fff`,
      createdAt: new Date().toISOString(),
    }

    setUser(userData)
    localStorage.setItem("quickeats_user", JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("quickeats_user")
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
