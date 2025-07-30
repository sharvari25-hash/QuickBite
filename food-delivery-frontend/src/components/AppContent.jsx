"use client"

import { useAuth } from "../contexts/AuthContext"
import LandingPage from "../pages/LandingPage"
import CustomerDashboard from "../pages/CustomerDashboard"
import RestaurantDashboard from "../pages/RestaurantDashboard"
import DeliveryDashboard from "../pages/DeliveryDashboard"
import AdminDashboard from "../pages/AdminDashboard"

export default function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  // If user is not authenticated, show the landing page
  if (!user) {
    return <LandingPage />
  }

  // Role-based dashboard rendering
  switch (user.role) {
    case "customer":
      return <CustomerDashboard />
    case "restaurant":
      return <RestaurantDashboard />
    case "delivery":
      return <DeliveryDashboard />
    case "admin":
      return <AdminDashboard />
    default:
      return <CustomerDashboard />
  }
}
