<<<<<<< HEAD
"use client";

import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode }) {
  const { login } = useAuth();

  // State now perfectly matches all relevant backend entity fields
  const [formData, setFormData] = useState({
    // User fields
   name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    avatarUrl: "",
    role: "customer",

    // Restaurant fields
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    categories: "",
    imageUrl: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    
    // Delivery Partner Profile fields
    licenseNumber: "",
    vehicleType: "MOTORCYCLE",
    vehicleModel: "",
    vehicleRegistrationNumber: "",
    idProofUrl: "", // ★★★ FIELD IS NOW CORRECTLY INCLUDED ★★★
    zone: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const apiPost = async (url, body) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

    try {
      if (mode === "signin") {
        await login(formData.email, formData.password);
        onClose();
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        const { role } = formData;
        let endpoint = "";
        let payload = {};

        switch (role) {
          case "customer":
            endpoint = `${API_BASE_URL}/api/auth/register/customer`;
            payload = {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              password: formData.password,
              avatarUrl: formData.avatarUrl,
              address: {
                line1: formData.addressLine1,
                city: formData.city,
                state: formData.state,
                postalCode: formData.postalCode,
                country: formData.country,
              },
            };
            break;

          case "restaurant":
            endpoint = `${API_BASE_URL}/api/auth/register/restaurant`;
            payload = {
              owner: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                avatarUrl: formData.avatarUrl,
              },
              restaurant: {
                name: formData.businessName,
                email: formData.businessEmail,
                phone: formData.businessPhone,
                categories: formData.categories,
                imageUrl: formData.imageUrl,
                address: {
                  line1: formData.addressLine1,
                  city: formData.city,
                  state: formData.state,
                  postalCode: formData.postalCode,
                  country: formData.country,
                },
                latitude: formData.latitude,
                longitude: formData.longitude,
              },
            };
            break;

          case "delivery":
            endpoint = `${API_BASE_URL}/api/auth/register/delivery-partner`;
            payload = {
              user: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                avatarUrl: formData.avatarUrl,
              },
              profile: {
                licenseNumber: formData.licenseNumber,
                vehicleType: formData.vehicleType.toUpperCase(),
                vehicleModel: formData.vehicleModel,
                vehicleRegistrationNumber: formData.vehicleRegistrationNumber,
                zone: formData.zone,
              },
            };
            break;

          default:
            throw new Error("Invalid role selected.");
        }

        await apiPost(endpoint, payload);
        alert(
          "Registration successful! Please sign in to continue, or await admin approval."
        );
        onSwitchMode();
=======
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
>>>>>>> 0acb141ef9aed6248ab6c16ca6b0a0cb1c7b755b
      }
      onClose()
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.")
      console.error("Authentication process error:", err)
    }
<<<<<<< HEAD
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
=======
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
>>>>>>> 0acb141ef9aed6248ab6c16ca6b0a0cb1c7b755b
    }
  };

<<<<<<< HEAD
  if (!isOpen) return null;

  const renderRestaurantFields = () => (
    <>
      <hr className="my-4" />
      <h3 className="text-lg font-semibold mb-2">Restaurant Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Email
          </label>
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Phone
          </label>
          <input
            type="tel"
            name="businessPhone"
            value={formData.businessPhone}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categories (e.g., Pizza, Indian)
          </label>
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1
          </label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
      </div>
    </>
  );

   const renderDeliveryFields = () => (
    <>
      <hr className="my-4" />
      <h3 className="text-lg font-semibold mb-2">Delivery Partner Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label><select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="input-field" required><option>MOTORCYCLE</option><option>SCOOTER</option><option>CAR</option><option>BICYCLE</option></select></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label><input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} className="input-field" required /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">License Number</label><input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="input-field" required /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Registration No.</label><input type="text" name="vehicleRegistrationNumber" value={formData.vehicleRegistrationNumber} onChange={handleChange} className="input-field" required /></div>
        
        {/* ★★★ THIS IS THE CORRECTED PART ★★★ */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">ID Proof URL</label>
          <input type="url" name="idProofUrl" value={formData.idProofUrl} onChange={handleChange} className="input-field" placeholder="Link to your ID proof" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Zone</label>
          <input type="text" name="zone" value={formData.zone} onChange={handleChange} className="input-field" required />
        </div>
      </div>
    </>
  );

  const renderCustomerAddressFields = () => (
    <>
      <hr className="my-4" />
      <h3 className="text-lg font-semibold mb-2">Address Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1
          </label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {mode === "signup" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="customer">Customer</option>
                <option value="restaurant">Restaurant Owner</option>
                <option value="delivery">Delivery Partner</option>
              </select>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            {mode === "signup" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field pl-10"
                    required
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {mode === "signup" &&
              formData.role === "restaurant" &&
              renderRestaurantFields()}
            {mode === "signup" &&
              formData.role === "delivery" &&
              renderDeliveryFields()}
            {mode === "signup" &&
              formData.role === "customer" &&
              renderCustomerAddressFields()}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50"
            >
              {isLoading
                ? "Processing..."
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={onSwitchMode}
                className="font-semibold text-primary-600 hover:underline"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
=======
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
>>>>>>> 0acb141ef9aed6248ab6c16ca6b0a0cb1c7b755b
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
  );
}
