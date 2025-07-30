"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Search, ShoppingCart, User, Package, LogOut, Star, Clock, Truck, Plus, Minus } from "lucide-react"

const mockRestaurants = [
  {
    id: 1,
    name: "McDonald's",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    rating: 4.3,
    deliveryTime: "20-35",
    deliveryFee: "Free",
    category: "Fast Food",
  },
  {
    id: 2,
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.1,
    deliveryTime: "25-40",
    deliveryFee: "$2.99",
    category: "Pizza",
  },
]

const mockMenuItems = [
  {
    id: 1,
    name: "Big Mac",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Chicken McNuggets",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "French Fries",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=100&h=100&fit=crop",
  },
]

export default function CustomerDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("browse")
  const [cart, setCart] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) => (cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)),
      )
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-black">
              Quick<span className="text-primary-500">Eats</span>
            </h1>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab("cart")}
                className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-3">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Customer</p>
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="card">
              <ul className="space-y-2">
                {[
                  { id: "browse", name: "Browse Restaurants", icon: Search },
                  { id: "orders", name: "My Orders", icon: Package },
                  { id: "cart", name: "Cart", icon: ShoppingCart },
                  { id: "profile", name: "Profile", icon: User },
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
                        {item.id === "cart" && getTotalItems() > 0 && (
                          <span className="ml-auto bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {getTotalItems()}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "browse" && (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="card">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for restaurants or dishes..."
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                {/* Restaurant Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockRestaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="card hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedRestaurant(restaurant)}
                    >
                      <img
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-black">{restaurant.name}</h3>
                        <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-lg">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold">{restaurant.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{restaurant.category}</p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-primary-500" />
                          <span>{restaurant.deliveryTime} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Truck className="h-4 w-4 text-blue-500" />
                          <span>{restaurant.deliveryFee}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Restaurant Menu Modal */}
                {selectedRestaurant && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
                      <div className="flex items-center justify-between p-6 border-b">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedRestaurant.name}</h2>
                          <p className="text-gray-600">{selectedRestaurant.category}</p>
                        </div>
                        <button
                          onClick={() => setSelectedRestaurant(null)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <Plus className="h-6 w-6 rotate-45" />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mockMenuItems.map((item) => (
                            <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-primary-600 font-bold">${item.price}</p>
                              </div>
                              <button onClick={() => addToCart(item)} className="btn-primary p-2">
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "cart" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-4">Add some delicious items to get started!</p>
                    <button onClick={() => setActiveTab("browse")} className="btn-primary">
                      Browse Restaurants
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-primary-600 font-bold">${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-gray-600 hover:text-red-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="p-1 text-gray-600 hover:text-primary-600">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold">Total: ${getTotalPrice()}</span>
                      </div>
                      <button className="w-full btn-primary py-3">Proceed to Checkout</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-4">Your order history will appear here</p>
                  <button onClick={() => setActiveTab("browse")} className="btn-primary">
                    Start Ordering
                  </button>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-20 w-20 rounded-full" />
                    <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Customer since {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input type="text" value={user.name} className="input-field" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" value={user.email} className="input-field" readOnly />
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
