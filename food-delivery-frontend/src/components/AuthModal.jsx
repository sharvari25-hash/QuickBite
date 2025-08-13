// src/components/AuthModal.jsx
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom" // Use useNavigate from react-router-dom
import { X, Mail, Lock, User, Eye, EyeOff, Phone, Store, Truck, Shield, Users } from "lucide-react"
import { useAuth } from "../contexts/AuthContext" // Import useAuth

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const { login, signup } = useAuth() // Get login and signup from AuthContext
  const navigate = useNavigate() // Use useNavigate for programmatic navigation

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [selectedRole, setSelectedRole] = useState("customer")
  const [mode, setMode] = useState(initialMode)

  const roles = [
    { value: "customer", label: "Customer", icon: Users },
    { value: "restaurant", label: "Restaurant", icon: Store },
    { value: "delivery", label: "Delivery Partner", icon: Truck },
    { value: "admin", label: "Admin", icon: Shield },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (mode === "login") {
        const userData = await login(email, password)
        console.log("Login successful:", userData)
        redirectToDashboard(userData.role.toUpperCase()) // Use role from API response
      } else {
        let payload = { name, email, password, phone } // Collect all common fields
        
        // Call signup from AuthContext with the payload and role type
        await signup(payload, selectedRole)
        console.log("Signup successful for:", selectedRole)
        redirectToDashboard(selectedRole.toUpperCase()) // Use selected role for signup redirect
      }
      onClose()
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.")
      console.error("Authentication process error:", err)
    }
  }

  const redirectToDashboard = (role) => {
    console.log("Redirecting to dashboard for role:", role)
    // Adjust paths to match your react-router-dom routes
    switch (role) {
      case "CUSTOMER":
        navigate("/customer-dashboard")
        break
      case "RESTAURANT":
        navigate("/restaurant-management")
        break
      case "DELIVERY": // Assuming your backend RoleType is 'DELIVERY'
      case "DELIVERY_PARTNER": // If your backend RoleType is 'DELIVERY_PARTNER'
        navigate("/delivery-partner-dashboard")
        break
      case "ADMIN":
        navigate("/admin-dashboard")
        break
      default:
        navigate("/") // Fallback to home page
    }
  }

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login")
    setEmail("")
    setPassword("")
    setPhone("")
    setName("")
    setError("")
  }

  if (!isOpen) return null

  const SelectedIcon = roles.find((r) => r.value === selectedRole)?.icon || Users // Fallback icon

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{mode === "login" ? "Login" : "Sign Up"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Role Selection Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                required
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <SelectedIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              />
            </div>
          </div>

          {mode === "signup" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={selectedRole === "delivery" || selectedRole === "restaurant"} // Conditionally required
                  />
                </div>
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-blue-500 hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  )
}