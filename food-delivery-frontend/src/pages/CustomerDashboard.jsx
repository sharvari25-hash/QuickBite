"use client";

import Carousel from "../components/Carousel";
import MyOrders from "../components/MyOrders";
import Cart from "../components/Cart";
import Profile from "../components/Profile"; // Import the Profile component
import CategoryCard from "../components/CategoryCard";
import RestaurantCard from "../components/RestaurantCard";
import { useAuth } from "../contexts/AuthContext";
import {
  Search,
  ShoppingCart,
  User,
  Package,
  LogOut,
  Star,
  Clock,
  Truck,
  Plus,
  Minus,
  Menu,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";

// Mock data with unique IDs
const mockRestaurants = [
  {
    id: 1,
    name: "Spicy Biryani House",
    image: "https://source.unsplash.com/featured/?restaurant,biryani",
    rating: 4.5,
    deliveryTime: 30,
    category: "Biryani, Mughlai",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
  {
    id: 2,
    name: "South Delight",
    image: "https://source.unsplash.com/featured/?restaurant,dosa",
    rating: 4.2,
    deliveryTime: 25,
    category: "South Indian",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
  {
    id: 3,
    name: "Punjabi Zaika",
    image: "https://source.unsplash.com/featured/?restaurant,punjabi",
    rating: 4.6,
    deliveryTime: 35,
    category: "North Indian",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
  {
    id: 4,
    name: "Tandoori Flames",
    image: "https://source.unsplash.com/featured/?restaurant,tandoori",
    rating: 4.3,
    deliveryTime: 28,
    category: "Grill, Tandoori",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
  {
    id: 5,
    name: "The Veggie Hub",
    image: "https://source.unsplash.com/featured/?restaurant,vegetarian",
    rating: 4.1,
    deliveryTime: 22,
    category: "Vegetarian",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
  {
    id: 6,
    name: "Downtown Pizzeria",
    image: "https://source.unsplash.com/featured/?restaurant,pizza",
    rating: 4.8,
    deliveryTime: 28,
    category: "Italian, Pizza",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
  {
    id: 7,
    name: "Noodle Kingdom",
    image: "https://source.unsplash.com/featured/?restaurant,noodles",
    rating: 4.3,
    deliveryTime: 25,
    category: "Chinese, Asian",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
  {
    id: 8,
    name: "The Kebab Stop",
    image: "https://source.unsplash.com/featured/?restaurant,kebab",
    rating: 4.7,
    deliveryTime: 35,
    category: "Middle Eastern, Grill",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
  {
    id: 9,
    name: "Sizzler's Paradise",
    image: "https://source.unsplash.com/featured/?restaurant,sizzler",
    rating: 4.5,
    deliveryTime: 40,
    category: "Continental, Steakhouse",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
  {
    id: 10,
    name: "Sweet Escapes",
    image: "https://source.unsplash.com/featured/?restaurant,dessert",
    rating: 4.9,
    deliveryTime: 20,
    category: "Desserts, Bakery",
    latitude: 23.767298 + (Math.random() - 0.5) * 0.05,
    longitude: 80.366029 + (Math.random() - 0.5) * 0.05,
  },
];
const topRestaurants = [
  {
    id: 1,
    name: "Spicy Biryani House",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    deliveryTime: 30,
    category: "Biryani, Mughlai",
    deliveryFee: "Free",
    promoted: true,
    discount: "50% OFF",
  },
  {
    id: 2,
    name: "South Delight",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    deliveryTime: 25,
    category: "South Indian",
    deliveryFee: "₹20",
    promoted: true,
    discount: "40% OFF",
  },
  {
    id: 3,
    name: "Punjabi Zaika",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    deliveryTime: 35,
    category: "North Indian",
    deliveryFee: "Free",
    promoted: true,
    discount: "30% OFF",
  },
  {
    id: 4,
    name: "Pizza Corner",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    deliveryTime: 28,
    category: "Italian, Pizza",
    deliveryFee: "₹15",
    promoted: true,
    discount: "Buy 1 Get 1",
  },
  {
    id: 5,
    name: "Burger Junction",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.1,
    deliveryTime: 22,
    category: "Fast Food, Burgers",
    deliveryFee: "Free",
    promoted: true,
    discount: "25% OFF",
  },
];

// FIX: Ensure unique IDs for mock data to avoid "Encountered two children with the same key" warnings.
const mockMenuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    image: "https://source.unsplash.com/featured/?biryani",
    price: 199,
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    image: "https://source.unsplash.com/featured/?paneer",
    price: 179,
  },
  {
    id: 3,
    name: "Masala Dosa",
    image: "https://source.unsplash.com/featured/?dosa",
    price: 99,
  },
  {
    id: 4,
    name: "Chicken Tikka",
    image: "https://source.unsplash.com/featured/?chicken",
    price: 249,
  },
  {
    id: 5,
    name: "Veg Thali",
    image: "https://source.unsplash.com/featured/?thali",
    price: 149,
  },
  {
    id: 6, // FIX: Changed ID from 1 to 6
    name: "Chicken Biryani",
    image: "https://source.unsplash.com/featured/?biryani",
    price: 199,
  },
  {
    id: 7, // FIX: Changed ID from 2 to 7
    name: "Paneer Butter Masala",
    image: "https://source.unsplash.com/featured/?paneer",
    price: 179,
  },
  {
    id: 8, // FIX: Changed ID from 3 to 8
    name: "Masala Dosa",
    image: "https://source.unsplash.com/featured/?dosa",
    price: 99,
  },
  {
    id: 9, // FIX: Changed ID from 4 to 9
    name: "Chicken Tikka",
    image: "https://source.unsplash.com/featured/?chicken",
    price: 249,
  },
  {
    id: 10, // FIX: Changed ID from 5 to 10
    name: "Veg Thali",
    image: "https://source.unsplash.com/featured/?thali",
    price: 149,
  },
];

const categories = [
  {
    id: 1,
    name: "Biryani",
    image: "/placeholder.svg?height=80&width=80",
    count: 120,
  },
  {
    id: 2,
    name: "Pizza",
    image: "/placeholder.svg?height=80&width=80",
    count: 85,
  },
  {
    id: 3,
    name: "Burger",
    image: "/placeholder.svg?height=80&width=80",
    count: 95,
  },
  {
    id: 4,
    name: "Chinese",
    image: "/placeholder.svg?height=80&width=80",
    count: 110,
  },
  {
    id: 5,
    name: "South Indian",
    image: "/placeholder.svg?height=80&width=80",
    count: 75,
  },
  {
    id: 6,
    name: "Desserts",
    image: "/placeholder.svg?height=80&width=80",
    count: 60,
  },
  {
    id: 7,
    name: "North Indian",
    image: "/placeholder.svg?height=80&width=80",
    count: 130,
  },
  {
    id: 8,
    name: "Fast Food",
    image: "/placeholder.svg?height=80&width=80",
    count: 90,
  },
];

// Calculates distance between two lat/lon points in kilometers
function getDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === lat2 && lon1 === lon2) return 0;
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// Custom hook for checking screen size
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

// --- MAIN COMPONENT ---

export default function CustomerDashboard() {
  const { user, logout } = useAuth();

  // State for application data and user interaction
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

  // State for filtering, sorting, and location
  const [filters, setFilters] = useState({
    promoted: false,
    freeDelivery: false,
    minRating: 0,
  });
  const [sortBy, setSortBy] = useState("distance");
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [locationName, setLocationName] = useState("");
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  // State for controlling UI elements like modals and sidebars
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- GEOLOCATION EFFECT ---

const getReverseGeocodedLocation = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      if (data && data.address) {
        const { road, suburb, city, state } = data.address;
        const readableAddress = `${suburb || road || 'Your Location'}, ${city || state}`;
        setLocationName(readableAddress); // Now has access to this
      } else {
         setLocationName("Location name not found");
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      setLocationName("Could not fetch location name");
    } finally {
      // It now has access to this state setter
      setIsLocationLoading(false); 
    }
  }, []);

  useEffect(() => {
    setIsLocationLoading(true);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported.");
      setIsLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        // Call the function defined inside our component
        getReverseGeocodedLocation(latitude, longitude); 
        setLocationError("");
      },
      (error) => {
        setLocationError("Please enable location access.");
        setIsLocationLoading(false);
      }
    );
  // Add getReverseGeocodedLocation to the dependency array
  }, [getReverseGeocodedLocation]);

  // --- RESPONSIVE SETTINGS ---
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  const categoryCarouselSettings = {
    visibleCount: isSmallScreen ? 3 : isMediumScreen ? 5 : 8,
    slideCount: isSmallScreen ? 2 : isMediumScreen ? 3 : 4,
  };
  const topRestaurantCarouselSettings = {
    visibleCount: isSmallScreen ? 1 : isMediumScreen ? 2 : 3,
    slideCount: 1,
  };

  // --- CORE LOGIC: Memoized Filtering & Sorting ---
  const filteredAndSortedRestaurants = useMemo(() => {
    if (!userLocation) return [];

    const restaurantsWithDistance = mockRestaurants.map((restaurant) => ({
      ...restaurant,
      distance: getDistance(
        userLocation.latitude,
        userLocation.longitude,
        restaurant.latitude,
        restaurant.longitude
      ),
    }));

    const filtered = restaurantsWithDistance.filter((restaurant) => {
      const isInRadius = restaurant.distance <= 20; // Show restaurants within 20km
      const searchMatch =
        searchQuery === "" ||
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(searchQuery.toLowerCase());
      const promotedMatch = !filters.promoted || restaurant.promoted;
      const freeDeliveryMatch =
        !filters.freeDelivery || restaurant.deliveryFee === "Free";
      const ratingMatch = restaurant.rating >= filters.minRating;

      return (
        isInRadius &&
        searchMatch &&
        promotedMatch &&
        freeDeliveryMatch &&
        ratingMatch
      );
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "deliveryTime":
          return a.deliveryTime - b.deliveryTime;
        case "distance":
        default:
          return a.distance - b.distance;
      }
    });
  }, [userLocation, searchQuery, filters, sortBy]);

  // --- HANDLER FUNCTIONS ---
  const handleCategoryClick = (category) => setSearchQuery(category.name);
  const handleRestaurantClick = (restaurant) =>
    setSelectedRestaurant(restaurant);

  // Cart management functions
  const addToCart = (item) => setCart((prev) => { const exist = prev.find(i => i.id === item.id); if (exist) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i); return [...prev, { ...item, quantity: 1 }]; });
  const removeFromCart = (itemId) => setCart((prev) => { const exist = prev.find(i => i.id === itemId); if (exist?.quantity === 1) return prev.filter(i => i.id !== itemId); return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i); });
  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  const handleOrderPlacement = () => {
    if (typeof addOrder === 'function') {
      addOrder(cart, getTotalPrice());
    }
    setCart([]);
    setActiveTab('orders');
  };

  // --- RENDER METHOD ---
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-black"
            >
            <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-black">
              Quick<span className="text-primary-500">Eats</span>
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setActiveTab("cart")}
                className="relative p-2 text-gray-600 hover:text-black"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <div className="hidden sm:flex items-center space-x-3">
                <img
                  src={user.avatar || `https://i.pravatar.cc/40?u=${user.name}`}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {isSidebarOpen && (
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            />
          )}
          <aside
            className={`fixed lg:relative top-0 left-0 h-full w-64 bg-white shadow-lg lg:shadow-none z-40 transform transition-transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:w-64 flex-shrink-0`}
          >
            <nav className="card p-4">
              <ul className="space-y-2">
                {[
                  { id: "browse", name: "Browse Restaurants", icon: Search },
                  { id: "orders", name: "My Orders", icon: Package },
                  { id: "cart", name: "Cart", icon: ShoppingCart },
                  { id: "profile", name: "Profile", icon: User },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                          activeTab === item.id
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-700 hover:bg-gray-50"
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
                  );
                })}
              </ul>
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {activeTab === "browse" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-xl shadow-sm p-2 gap-2">
  {/* --- Location Section --- */}
  <div className="flex items-center w-full sm:w-auto p-2 cursor-pointer hover:bg-gray-50 rounded-lg">
    <MapPin className="h-6 w-6 text-primary-500 flex-shrink-0" />
    <div className="ml-2 min-w-0">
      {isLocationLoading ? (
        <p className="text-sm text-gray-500">Detecting location...</p>
      ) : locationError ? (
        <p className="text-sm text-red-500 font-semibold truncate">{locationError}</p>
      ) : (
        <p className="font-bold text-gray-800 truncate">{locationName}</p>
      )}
    </div>
    <ChevronDown className="h-5 w-5 text-gray-500 ml-1 flex-shrink-0" />
  </div>

  {/* Separator */}
  <div className="hidden sm:block h-8 border-l border-gray-300 mx-2"></div>
  <div className="block sm:hidden w-full border-b border-gray-200 my-1"></div>

  {/* --- Search Input Section --- */}
  <div className="relative flex-grow w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search for restaurants, cuisines..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-2 text-base border-none focus:outline-none focus:ring-0"
    />
  </div>
</div>
                <section className="mb-8 sm:mb-12">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    What's on your mind?
                  </h2>
                  <Carousel
                    items={categories}
                    visibleCount={categoryCarouselSettings.visibleCount}
                    slideCount={categoryCarouselSettings.slideCount}
                    renderItem={(category) => (
                      <CategoryCard
                        category={category}
                        onClick={() => handleCategoryClick(category)}
                      />
                    )}
                  />
                </section>
                <section className="mb-8 sm:mb-12">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Top restaurant chains
                  </h2>
                  <Carousel
                    items={topRestaurants}
                    visibleCount={topRestaurantCarouselSettings.visibleCount}
                    slideCount={topRestaurantCarouselSettings.slideCount}
                    renderItem={(restaurant) => (
                      <RestaurantCard
                        restaurant={restaurant}
                        onClick={handleRestaurantClick}
                        isTopRestaurant
                      />
                    )}
                  />
                </section>

                <section>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Restaurants Near You
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="btn-secondary flex-1 sm:flex-none"
                      >
                        Filter
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                          className="btn-secondary flex-1 sm:flex-none"
                        >
                          Sort By
                        </button>
                        {isSortMenuOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                            <div className="py-1">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSortBy("distance");
                                  setIsSortMenuOpen(false);
                                }}
                                className={`block px-4 py-2 text-sm ${
                                  sortBy === "distance"
                                    ? "font-bold text-primary-600"
                                    : "text-gray-700"
                                } hover:bg-gray-100`}
                              >
                                Distance
                              </a>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSortBy("rating");
                                  setIsSortMenuOpen(false);
                                }}
                                className={`block px-4 py-2 text-sm ${
                                  sortBy === "rating"
                                    ? "font-bold text-primary-600"
                                    : "text-gray-700"
                                } hover:bg-gray-100`}
                              >
                                Rating
                              </a>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSortBy("deliveryTime");
                                  setIsSortMenuOpen(false);
                                }}
                                className={`block px-4 py-2 text-sm ${
                                  sortBy === "deliveryTime"
                                    ? "font-bold text-primary-600"
                                    : "text-gray-700"
                                } hover:bg-gray-100`}
                              >
                                Delivery Time
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {!userLocation && (
                    <div className="text-center p-10 bg-gray-50 rounded-lg border-2 border-dashed">
                      <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        {locationError
                          ? "Location Error"
                          : "Finding your location..."}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {locationError ||
                          "Please grant location access to find restaurants near you."}
                      </p>
                    </div>
                  )}
                  {userLocation && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredAndSortedRestaurants.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                          onClick={handleRestaurantClick}
                        />
                      ))}
                    </div>
                  )}
                  {userLocation &&
                    filteredAndSortedRestaurants.length === 0 && (
                      <div className="text-center py-12 col-span-full">
                        <p className="text-lg text-gray-500">
                          No restaurants found matching your criteria.
                        </p>
                        <p className="text-sm text-gray-400">
                          Try adjusting your search or filters.
                        </p>
                      </div>
                    )}
                </section>

                {selectedRestaurant && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-4xl h-full sm:h-[90vh] flex flex-col">
                      <div className="flex items-center justify-between p-6 border-b">
                        <div>
                          <h2 className="text-2xl font-bold">
                            {selectedRestaurant.name}
                          </h2>
                          <p className="text-gray-600">
                            {selectedRestaurant.category}
                          </p>
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
                            <div
                              key={item.id}
                              className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4"
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-primary-600 font-bold">
                                  ₹{item.price}
                                </p>
                              </div>
                              <button
                                onClick={() => addToCart(item)}
                                className="btn-primary p-2"
                              >
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
          <Cart
            cart={cart}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            onBrowse={() => setActiveTab('browse')}
            onOrderSuccess={handleOrderPlacement}
          />
        )}
            {activeTab === "orders" && (
             <MyOrders />
            )}
            {activeTab === "profile" && (
              <Profile />
            )}
          </main>
        </div>
      </div>

      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Plus className="h-6 w-6 rotate-45" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.promoted}
                    onChange={(e) =>
                      setFilters({ ...filters, promoted: e.target.checked })
                    }
                    className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>Promoted</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.freeDelivery}
                    onChange={(e) =>
                      setFilters({ ...filters, freeDelivery: e.target.checked })
                    }
                    className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>Free Delivery</span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating:{" "}
                    <span className="font-bold">
                      {filters.minRating > 0
                        ? filters.minRating.toFixed(1)
                        : "Any"}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={filters.minRating}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        minRating: parseFloat(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="w-full btn-primary py-3"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}