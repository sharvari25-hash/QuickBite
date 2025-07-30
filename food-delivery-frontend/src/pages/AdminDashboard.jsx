"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Shield, Users, Store, Truck, DollarSign, LogOut, BarChart3, Settings, Package } from "lucide-react"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-purple-500" />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">QuickEats Management Panel</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Restaurants</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
              <Store className="h-8 w-8 text-primary-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivery Partners</p>
                <p className="text-2xl font-bold">89</p>
                <p className="text-xs text-green-600">+15% from last month</p>
              </div>
              <Truck className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">$45,678</p>
                <p className="text-xs text-green-600">+23% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="card">
              <ul className="space-y-2">
                {[
                  { id: "overview", name: "Overview", icon: BarChart3 },
                  { id: "users", name: "User Management", icon: Users },
                  { id: "restaurants", name: "Restaurants", icon: Store },
                  { id: "deliveries", name: "Delivery Partners", icon: Truck },
                  { id: "settings", name: "Settings", icon: Settings },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                          activeTab === item.id ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">
                {activeTab === "overview" && "Platform Overview"}
                {activeTab === "users" && "User Management"}
                {activeTab === "restaurants" && "Restaurant Management"}
                {activeTab === "deliveries" && "Delivery Partners"}
                {activeTab === "settings" && "System Settings"}
              </h2>

              {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Package className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-semibold">Today's Orders</h3>
                    <p className="text-2xl font-bold text-blue-600">342</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <h3 className="font-semibold">Today's Revenue</h3>
                    <p className="text-2xl font-bold text-green-600">$8,456</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <BarChart3 className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                    <h3 className="font-semibold">Avg. Rating</h3>
                    <p className="text-2xl font-bold text-yellow-600">4.6</p>
                  </div>
                </div>
              )}

              {activeTab !== "overview" && (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {activeTab === "users" && <Users className="h-8 w-8 text-gray-400" />}
                    {activeTab === "restaurants" && <Store className="h-8 w-8 text-gray-400" />}
                    {activeTab === "deliveries" && <Truck className="h-8 w-8 text-gray-400" />}
                    {activeTab === "settings" && <Settings className="h-8 w-8 text-gray-400" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-600">This feature is under development</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
