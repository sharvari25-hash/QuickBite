"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Store, Package, DollarSign, Menu, LogOut, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"

const mockOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    items: ["Big Mac", "French Fries", "Coke"],
    total: 12.97,
    status: "pending",
    time: "2 min ago",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    items: ["Chicken McNuggets", "Apple Pie"],
    total: 8.98,
    status: "preparing",
    time: "5 min ago",
  },
]

const mockMenuItems = [
  {
    id: 1,
    name: "Big Mac",
    price: 5.99,
    category: "Burgers",
    available: true,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Chicken McNuggets",
    price: 4.99,
    category: "Chicken",
    available: true,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=100&h=100&fit=crop",
  },
]

export default function RestaurantDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("orders")
  const [orders, setOrders] = useState(mockOrders)
  const [menuItems, setMenuItems] = useState(mockMenuItems)

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const toggleMenuItemAvailability = (itemId) => {
    setMenuItems(menuItems.map((item) => (item.id === itemId ? { ...item, available: !item.available } : item)))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Store className="h-8 w-8 text-primary-500" />
              <div>
                <h1 className="text-xl font-bold">{user.restaurantName || "Restaurant Dashboard"}</h1>
                <p className="text-sm text-gray-600">Restaurant Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">Restaurant Owner</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">$486.50</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary-500" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Items</p>
                <p className="text-2xl font-bold">{menuItems.filter((item) => item.available).length}</p>
              </div>
              <Menu className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="card">
              <ul className="space-y-2">
                {[
                  { id: "orders", name: "Orders", icon: Package },
                  { id: "menu", name: "Menu Management", icon: Menu },
                  { id: "profile", name: "Restaurant Profile", icon: Store },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                          activeTab === item.id ? "bg-primary-50 text-primary-700" : "text-gray-700 hover:bg-gray-50"
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
            {activeTab === "orders" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Orders</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-gray-600">Customer: {order.customer}</p>
                          <p className="text-sm text-gray-500">{order.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${order.total}</p>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Items:</p>
                        <p className="text-sm">{order.items.join(", ")}</p>
                      </div>
                      <div className="flex space-x-2">
                        {order.status === "pending" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "preparing")}
                            className="btn-primary text-sm px-3 py-1"
                          >
                            Accept
                          </button>
                        )}
                        {order.status === "preparing" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "ready")}
                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                          >
                            Mark Ready
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "menu" && (
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Menu Management</h2>
                  <button className="btn-primary">Add Item</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="relative mb-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => toggleMenuItemAvailability(item.id)}
                            className={`p-1 rounded-full ${item.available ? "bg-green-500" : "bg-red-500"}`}
                          >
                            {item.available ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : (
                              <XCircle className="h-4 w-4 text-white" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.category}</p>
                        <p className="text-primary-600 font-bold">${item.price}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 btn-secondary text-sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.available ? "Available" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Restaurant Profile</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                      <input
                        type="text"
                        value={user.restaurantName || "Demo Restaurant"}
                        className="input-field"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                      <input type="text" value={user.name} className="input-field" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" value={user.email} className="input-field" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={user.restaurantAddress || "123 Food Street"}
                        className="input-field"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}