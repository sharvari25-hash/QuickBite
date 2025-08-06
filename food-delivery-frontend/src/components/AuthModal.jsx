"use client"

import { useState } from "react"
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode }) {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    // ... other fields remain the same
    businessName: "",
    gstin: "",
    fssaiNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    openingHours: "",
    closingHours: "",
    vehicleType: "",
    licenseNumber: "",
    idProofUrl: "",
    zone: "",
    label: "",
    street: "",
    country: "",
    isDefault: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // This generic API helper remains the same
  const apiPost = async (url, body, token = null) => {
    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Request failed with status ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return response.json()
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
      console.error("VITE_API_BASE_URL is not defined.");
      setErrors({ general: "Client-side configuration error." });
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "signin") {
        // Sign-in logic is the same for all roles, including admin
        await login(formData.email, formData.password);
        onClose();
      } else {
        // --- PUBLIC SIGN UP LOGIC ---
        if (formData.password !== formData.confirmPassword) {
          setErrors({ confirmPassword: "Passwords don't match" });
          setIsLoading(false);
          return;
        }

        // The 'admin' role case is removed to prevent public admin creation
        if (formData.role === 'admin') {
            setErrors({ general: "Admin registration is not allowed from this form." });
            setIsLoading(false);
            return;
        }

        const { role, name, email, password } = formData;
        let registrationResponse;
        let payload;

        switch (role) {
          case "restaurant":
            payload = {
              name, email, password,
              businessName: formData.businessName, gstin: formData.gstin, fssaiNumber: formData.fssaiNumber,
              address: formData.address, city: formData.city, state: formData.state, postalCode: formData.postalCode,
              openingHours: formData.openingHours, closingHours: formData.closingHours,
            };
            registrationResponse = await apiPost(`${API_BASE_URL}/api/auth/register/restaurant`, payload);
            break;

          case "delivery":
            payload = {
              name, email, password,
              vehicleType: formData.vehicleType, licenseNumber: formData.licenseNumber,
              idProofUrl: formData.idProofUrl, zone: formData.zone,
            };
            registrationResponse = await apiPost(`${API_BASE_URL}/api/auth/register/delivery`, payload);
            break;

          case "customer":
          default:
            payload = { name, email, password, roleType: 'CUSTOMER' };
            registrationResponse = await apiPost(`${API_BASE_URL}/api/auth/register`, payload);
            break;
        }
        
        alert("Registration successful! Please sign in.");
        onSwitchMode();
      }
    } catch (error) {
      setErrors({ general: error.message || "An unknown error occurred." });
    } finally {
      setIsLoading(false);
    }
}

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  if (!isOpen) return null

  // --- All the render functions below remain unchanged ---

  const renderRestaurantFields = () => (
    <>
      <hr className="my-4" />
      <h3 className="text-lg font-semibold mb-2">Restaurant Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="input-field"
            placeholder="Your restaurant's name"
            required
          />
        </div>
        {/* GSTIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GSTIN</label>
          <input
            type="text"
            name="gstin"
            value={formData.gstin}
            onChange={handleChange}
            className="input-field"
            placeholder="Your GSTIN"
            required
          />
        </div>
        {/* FSSAI Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">FSSAI Number</label>
          <input
            type="text"
            name="fssaiNumber"
            value={formData.fssaiNumber}
            onChange={handleChange}
            className="input-field"
            placeholder="Your FSSAI number"
            required
          />
        </div>
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-field"
            placeholder="Restaurant address"
            required
          />
        </div>
        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" placeholder="City" required />
        </div>
        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="input-field"
            placeholder="State"
            required
          />
        </div>
        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="input-field"
            placeholder="Postal code"
            required
          />
        </div>
        {/* Opening Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Opening Hours</label>
          <input
            type="time"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        {/* Closing Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Closing Hours</label>
          <input
            type="time"
            name="closingHours"
            value={formData.closingHours}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
      </div>
    </>
  )

  const renderDeliveryFields = () => (
    <>
      <hr className="my-4" />
      <h3 className="text-lg font-semibold mb-2">Delivery Partner Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Bike, Scooter"
            required
          />
        </div>
        {/* License Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="input-field"
            placeholder="Your driver's license number"
            required
          />
        </div>
        {/* ID Proof URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof URL</label>
          <input
            type="url"
            name="idProofUrl"
            value={formData.idProofUrl}
            onChange={handleChange}
            className="input-field"
            placeholder="Link to your ID proof"
            required
          />
        </div>
        {/* Zone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
          <input
            type="text"
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            className="input-field"
            placeholder="Your delivery zone"
            required
          />
        </div>
      </div>
    </>
  )

  const renderAddressFields = () => (
    <>
      <hr className="my-4" />
      <h3 className="text-lg font-semibold mb-2">Address Details (Optional)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Home, Work"
          />
        </div>
        {/* Street */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} className="input-field" placeholder="Street" />
        </div>
        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" placeholder="City" />
        </div>
        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} className="input-field" placeholder="State" />
        </div>
        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="input-field"
            placeholder="Postal code"
          />
        </div>
        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input-field"
            placeholder="Country"
          />
        </div>
        {/* Default Address */}
        <div className="md:col-span-2 flex items-center">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
            Set as default address
          </label>
        </div>
      </div>
    </>
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">{mode === "signin" ? "Sign In" : "Create Account"}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
            <select name="role" value={formData.role} onChange={handleChange} className="input-field">
              <option value="customer">Customer</option>
              <option value="restaurant">Restaurant Owner</option>
              <option value="delivery">Delivery Partner</option>
            </select>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Conditional Fields */}
            {mode === "signup" && formData.role === "restaurant" && renderRestaurantFields()}
            {mode === "signup" && formData.role === "delivery" && renderDeliveryFields()}
            {mode === "signup" && formData.role === "customer" && renderAddressFields()}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {mode === "signin" ? "Signing in..." : "Creating account..."}
                </div>
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={onSwitchMode}
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}