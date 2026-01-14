"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Carousel from "../components/Carousel";
import MyOrders from "../components/MyOrders";
import Cart from "../components/Cart";
import Profile from "../components/Profile";
import CategoryCard from "../components/CategoryCard";
import RestaurantCard from "../components/RestaurantCard";
import { useAuth } from "../contexts/AuthContext";
import { mockApi } from "../services/mockApi";
import {
  Search,
  ShoppingCart,
  User,
  Package,
  LogOut,
  Menu,
  MapPin,
  ChevronDown,
  Plus,
  Loader2,
} from "lucide-react";

// Mock data with unique IDs (keeping these for display if needed, but primary data comes from mockApi)
const mockRestaurants = [
  // ... (previous static data if you want to keep it as fallback)
];

// --- STATIC DATA ---
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
];

// --- MAIN COMPONENT ---
export default function CustomerDashboard() {
  const { user, logout, authToken } = useAuth();

  // Data state
  const [activeTab, setActiveTab] = useState("browse");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedRestaurantMenu, setSelectedRestaurantMenu] = useState([]);
  const [cart, setCart] = useState(null); // Initialize as null or object, not array
  const [orders, setOrders] = useState([]);

  // UI/Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuLoading, setIsMenuLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ minRating: 0 });
  const [sortBy, setSortBy] = useState("rating");

  // --- DATA FETCHING ---
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      // Use mockApi for fetching
      const restaurants = await mockApi.getRestaurants();
      const cartData = await mockApi.getCart();
      const ordersData = await mockApi.getOrders('CUSTOMER', user?.id);

      setAllRestaurants(restaurants);
      setCart(cartData);
      setOrders(ordersData);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user, fetchAllData]);

  const handleRestaurantClick = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsMenuLoading(true);
    try {
      // Fetch specific restaurant details which includes menu in our mock setup
      const restaurantDetail = await mockApi.getRestaurantById(restaurant.id);
      setSelectedRestaurantMenu(restaurantDetail?.menu || []);
    } catch (err) {
      alert(`Error fetching menu: ${err.message}`);
      setSelectedRestaurant(null);
    } finally {
      setIsMenuLoading(false);
    }
  };

  // --- CART & ORDER HANDLERS ---
   const addToCart = async (menuItem) => {
    try {
      const updatedCart = await mockApi.addToCart(menuItem, 1);
      setCart(updatedCart);
    } catch (err) {
      alert(`Error adding to cart: ${err.message}`);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const updatedCart = await mockApi.removeFromCart(cartItemId);
      setCart(updatedCart); 
    } catch (err) {
      alert(`Error removing from cart: ${err.message}`);
    }
  };

  const handleOrderPlacement = async () => {
    try {
      // Create the order
      const newOrder = await mockApi.createOrder({
        customerId: user.id,
        items: cart.items,
        totalPrice: cart.items.reduce((acc, item) => acc + (item.menuItem.price * item.quantity), 0),
        restaurantId: cart.items[0]?.menuItem?.restaurantId || 1 // Simple assumption
      });
      
      setOrders((prev) => [newOrder, ...prev]);
      
      // Clear cart
      const emptyCart = await mockApi.clearCart();
      setCart(emptyCart);
      
      return true; 
    } catch (err) {
      alert(`Error placing order: ${err.message}`);
      return false; 
    }
  };

  const getTotalItems = () =>
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  // --- FILTERING & SORTING LOGIC ---
  const filteredAndSortedRestaurants = useMemo(() => {
    return allRestaurants
      .filter(
        (r) =>
          (r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.categories?.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (r.rating || 0) >= filters.minRating
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "deliveryTime":
            return (
              (a.estimatedDeliveryTime || 0) - (b.estimatedDeliveryTime || 0)
            );
          default:
            return 0;
        }
      });
  }, [allRestaurants, searchQuery, filters, sortBy]);

  const topRestaurants = useMemo(() => {
    return [...allRestaurants]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 10);
  }, [allRestaurants]);

  // --- UI STATE & RESPONSIVENESS ---
  const isSmallScreen = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 640,
    []
  );
  const categoryCarouselSettings = {
    visibleCount: isSmallScreen ? 3 : 5,
    slideCount: 2,
  };
  const topRestaurantCarouselSettings = {
    visibleCount: isSmallScreen ? 1 : 3,
    slideCount: 1,
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center font-semibold">
        Loading Dashboard...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 p-4 text-center">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2"
            >
              <Menu />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold">
              Quick<span className="text-primary-500">Bite</span>
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab("cart")}
                className="relative p-2"
              >
                <ShoppingCart />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <div className="hidden sm:flex items-center space-x-3">
                <img
                  src={
                    user.avatarUrl || `https://i.pravatar.cc/40?u=${user.name}`
                  }
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-red-600"
              >
                <LogOut />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
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
            } lg:translate-x-0`}
          >
            <nav className="p-4">
              <ul className="space-y-2">
                {[
                  { id: "browse", name: "Browse", icon: Search },
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
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${
                          activeTab === item.id
                            ? "bg-primary-50 text-primary-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <Icon />
                        <span>{item.name}</span>
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
              <div className="space-y-8">
                <div className="flex items-center bg-white border rounded-xl shadow-sm p-2 gap-2">
                  <div className="flex items-center p-2">
                    <MapPin className="h-6 w-6 text-primary-500" />
                    <div className="ml-2">
                      <p className="font-bold">Your Location</p>
                    </div>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                  <div className="hidden sm:block h-8 border-l"></div>
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search restaurants or cuisines..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-none focus:ring-0"
                    />
                  </div>
                </div>
                <section>
                  <h2 className="text-2xl font-bold mb-6">Categories</h2>
                  <Carousel
                    items={categories}
                    renderItem={(cat) => (
                      <CategoryCard
                        category={cat}
                        onClick={() => setSearchQuery(cat.name)}
                      />
                    )}
                    {...categoryCarouselSettings}
                  />
                </section>
                <section>
                  <h2 className="text-2xl font-bold mb-6">Top Restaurants</h2>
                  <Carousel
                    items={topRestaurants}
                    renderItem={(resto) => (
                      <RestaurantCard
                        restaurant={resto}
                        onClick={handleRestaurantClick}
                        isTopRestaurant
                      />
                    )}
                    {...topRestaurantCarouselSettings}
                  />
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-6">All Restaurants</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedRestaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onClick={handleRestaurantClick}
                      />
                    ))}
                  </div>
                </section>

                {selectedRestaurant && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col">
                      <div className="flex justify-between p-6 border-b">
                        <h2 className="text-2xl font-bold">
                          {selectedRestaurant.name}
                        </h2>
                        <button onClick={() => setSelectedRestaurant(null)}>
                          <Plus className="rotate-45" />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-6">
                        {isMenuLoading ? (
                          <div className="flex justify-center items-center h-full">
                            <Loader2 className="animate-spin h-8 w-8 text-primary-500" />
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedRestaurantMenu.map((item) => (
                              <div
                                key={item.id}
                                className="bg-gray-50 rounded-xl p-4 flex items-center"
                              >
                                <img
                                  src={item.imageUrl || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg mr-4"
                                />
                                <div className="flex-1">
                                  <h3 className="font-semibold">{item.name}</h3>
                                  <p className="font-bold">₹{item.price}</p>
                                </div>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="btn-primary p-2"
                                >
                                  <Plus />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
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
              onBrowse={() => setActiveTab("browse")}
              onOrderSuccess={handleOrderPlacement}
            />
          )}
            {activeTab === "orders" && <MyOrders initialOrders={orders} />}
            {activeTab === "profile" && <Profile />}
          </main>
        </div>
      </div>
    </div>
  );
}
