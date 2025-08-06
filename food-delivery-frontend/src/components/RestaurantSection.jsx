"use client"

import { useState, useEffect } from "react"
import { Star, Clock, Truck, Heart } from "lucide-react"

const restaurants = [
  {
    id: 1,
    name: "McDonald's",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    deliveryTime: "20-35",
    deliveryFee: "Free",
    category: "Fast Food",
    distance: "0.5 mi",
    promoted: true,
  },
  {
    id: 2,
    name: "Pizza Hut",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.1,
    deliveryTime: "25-40",
    deliveryFee: "$2.99",
    category: "Pizza",
    distance: "1.2 mi",
  },
  {
    id: 3,
    name: "Subway",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    deliveryTime: "15-30",
    deliveryFee: "Free",
    category: "Sandwiches",
    distance: "0.8 mi",
  },
  {
    id: 4,
    name: "KFC",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    deliveryTime: "20-35",
    deliveryFee: "$1.99",
    category: "Chicken",
    distance: "1.5 mi",
  },
  {
    id: 5,
    name: "Starbucks",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    deliveryTime: "10-25",
    deliveryFee: "Free",
    category: "Coffee",
    distance: "0.3 mi",
  },
  {
    id: 6,
    name: "Chipotle",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    deliveryTime: "15-30",
    deliveryFee: "$2.49",
    category: "Mexican",
    distance: "1.0 mi",
  },
]

export default function RestaurantSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [favorites, setFavorites] = useState(new Set())
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("restaurants")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredRestaurants(restaurants)
    } else {
      const filtered = restaurants.filter((restaurant) => {
        const categoryMap = {
          "Fast Food": ["Fast Food", "Chicken"],
          Pizza: ["Pizza"],
          Asian: ["Asian", "Chinese"],
          Mexican: ["Mexican"],
          Coffee: ["Coffee"],
        }
        const categories = categoryMap[activeFilter] || [activeFilter]
        return categories.includes(restaurant.category)
      })
      setFilteredRestaurants(filtered)
    }
  }, [activeFilter])

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const filters = ["All", "Fast Food", "Pizza", "Asian", "Mexican", "Coffee"]

  return (
    <section id="restaurants" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`mb-12 text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold text-black mb-4">Restaurants near you</h2>
          <p className="text-xl text-gray-600">Discover local favorites and new cuisines</p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex space-x-2 mb-12 overflow-x-auto pb-2 scrollbar-hide transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Restaurant Image */}
              <div className="relative overflow-hidden">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(restaurant.id)
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 hover:scale-110 transform"
                >
                  <Heart
                    className={`h-4 w-4 transition-colors duration-300 ${
                      favorites.has(restaurant.id) ? "text-red-500 fill-current" : "text-gray-600"
                    }`}
                  />
                </button>

                {/* Badges */}
                {restaurant.deliveryFee === "Free" && (
                  <div className="absolute top-3 left-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Free delivery
                  </div>
                )}
                {restaurant.promoted && (
                  <div className="absolute bottom-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Promoted
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl text-black group-hover:text-primary-600 transition-colors duration-300 truncate pr-2">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-lg flex-shrink-0">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{restaurant.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 font-medium">{restaurant.category}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 space-x-2">
                  <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-lg">
                    <Clock className="h-4 w-4 text-primary-500" />
                    <span className="font-medium">{restaurant.deliveryTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-lg">
                    <Truck className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{restaurant.deliveryFee}</span>
                  </div>
                  <span className="font-medium text-gray-500">{restaurant.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div
          className={`text-center mt-12 transform transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button className="bg-white text-black border-2 border-gray-300 px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white hover:border-black transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
            View all restaurants
          </button>
        </div>
      </div>
    </section>
  )
}
