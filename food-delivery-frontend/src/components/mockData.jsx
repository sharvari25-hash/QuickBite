export const categories = [
  {
    id: 1,
    name: "Biryani",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=60",
    count: 120,
  },
  {
    id: 2,
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60",
    count: 85,
  },
  {
    id: 3,
    name: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    count: 95,
  },
  {
    id: 4,
    name: "Chinese",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    count: 110,
  },
  {
    id: 5,
    name: "South Indian",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    count: 75,
  },
  {
    id: 6,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=60",
    count: 60,
  },
  {
    id: 7,
    name: "North Indian",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
    count: 130,
  },
  {
    id: 8,
    name: "Fast Food",
    image: "https://images.unsplash.com/photo-1527324688151-0e627063f2b1?w=500&auto=format&fit=crop&q=60",
    count: 90,
  },
]

export const allRestaurants = [
  {
    id: 1,
    name: "Spicy Biryani House",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    deliveryTime: 30,
    category: "Biryani, Mughlai",
    deliveryFee: "Free",
    discount: "50% OFF",
    menu: [
      { id: 101, name: "Hyderabadi Chicken Biryani", price: 350, description: "Authentic Hyderabadi Dum Biryani served with Mirchi ka Salan and Raita.", vegetarian: false, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=60" },
      { id: 102, name: "Mutton Biryani", price: 450, description: "Tender mutton pieces marinated in spices and cooked with aromatic basmati rice.", vegetarian: false, image: "https://images.unsplash.com/photo-1631515243349-e06036043944?w=500&auto=format&fit=crop&q=60" },
      { id: 103, name: "Veg Biryani", price: 280, description: "Fresh mixed vegetables cooked with basmati rice and spices.", vegetarian: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60" },
      { id: 104, name: "Chicken 65", price: 250, description: "Spicy, deep-fried chicken dish.", vegetarian: false, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 2,
    name: "South Delight",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    rating: 4.2,
    deliveryTime: 25,
    category: "South Indian",
    deliveryFee: "₹20",
    discount: "40% OFF",
    menu: [
      { id: 201, name: "Masala Dosa", price: 120, description: "Crispy crepe made from rice and lentil batter, filled with spiced potato.", vegetarian: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60" },
      { id: 202, name: "Idli Sambar", price: 80, description: "Steamed rice cakes served with lentil soup.", vegetarian: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60" },
      { id: 203, name: "Uttapam", price: 140, description: "Thick pancake with toppings cooked right into the batter.", vegetarian: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 3,
    name: "Punjabi Zaika",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    deliveryTime: 35,
    category: "North Indian",
    deliveryFee: "Free",
    menu: [
      { id: 301, name: "Butter Chicken", price: 380, description: "Chicken cooked in a mildly spiced curry sauce.", vegetarian: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60" },
      { id: 302, name: "Dal Makhani", price: 280, description: "Whole black lentils and kidney beans cooked with butter and cream.", vegetarian: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60" },
      { id: 303, name: "Paneer Tikka", price: 320, description: "Marinated paneer cheese served in a spiced gravy.", vegetarian: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=60" },
      { id: 304, name: "Naan", price: 40, description: "Leavened, oven-baked flatbread.", vegetarian: true, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 4,
    name: "Pizza Corner",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60",
    rating: 4.3,
    deliveryTime: 28,
    category: "Italian, Pizza",
    deliveryFee: "₹15",
    discount: "Buy 1 Get 1",
    menu: [
      { id: 401, name: "Margherita Pizza", price: 250, description: "Classic tomato and mozzarella cheese pizza.", vegetarian: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60" },
      { id: 402, name: "Pepperoni Pizza", price: 350, description: "Pizza topped with pepperoni slices.", vegetarian: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60" },
      { id: 403, name: "Veggie Supreme", price: 300, description: "Loaded with bell peppers, onions, olives, and corn.", vegetarian: true, image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 5,
    name: "Burger Junction",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    rating: 4.1,
    deliveryTime: 22,
    category: "Fast Food, Burgers",
    deliveryFee: "Free",
    discount: "25% OFF",
    menu: [
      { id: 501, name: "Classic Cheese Burger", price: 180, description: "Juicy patty with cheese, lettuce, and tomato.", vegetarian: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
      { id: 502, name: "Veggie Burger", price: 150, description: "Potato and mixed veg patty with spicy sauce.", vegetarian: true, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60" },
      { id: 503, name: "Chicken Crispy Burger", price: 220, description: "Crispy fried chicken fillet burger.", vegetarian: false, image: "https://images.unsplash.com/photo-1615297928064-24977384d0f9?w=500&auto=format&fit=crop&q=60" },
      { id: 504, name: "French Fries", price: 100, description: "Crispy salted fries.", vegetarian: true, image: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 6,
    name: "Tandoori Flames",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=60",
    rating: 4.4,
    deliveryTime: 32,
    category: "Grill, Tandoori",
    deliveryFee: "₹25",
    menu: [
      { id: 601, name: "Tandoori Chicken", price: 400, description: "Chicken marinated in yogurt and spices, roasted in a tandoor.", vegetarian: false, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=60" },
      { id: 602, name: "Paneer Tikka", price: 320, description: "Grilled marinated paneer cubes.", vegetarian: true, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60" },
      { id: 603, name: "Seekh Kebab", price: 350, description: "Minced meat grilled skewers.", vegetarian: false, image: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 7,
    name: "The Veggie Hub",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60",
    rating: 4.0,
    deliveryTime: 28,
    category: "Vegetarian, Healthy",
    deliveryFee: "Free",
    discount: "20% OFF",
    menu: [
      { id: 701, name: "Greek Salad", price: 220, description: "Fresh salad with feta cheese and olives.", vegetarian: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60" },
      { id: 702, name: "Veggie Wrap", price: 180, description: "Grilled vegetables wrapped in a tortilla.", vegetarian: true, image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=500&auto=format&fit=crop&q=60" },
      { id: 703, name: "Quinoa Bowl", price: 280, description: "Healthy quinoa bowl with avocado and chickpeas.", vegetarian: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 8,
    name: "Chinese Dragon",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    rating: 4.3,
    deliveryTime: 30,
    category: "Chinese, Asian",
    deliveryFee: "₹20",
    menu: [
      { id: 801, name: "Hakka Noodles", price: 200, description: "Stir-fried noodles with vegetables.", vegetarian: true, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60" },
      { id: 802, name: "Manchurian", price: 220, description: "Fried veg balls in spicy sauce.", vegetarian: true, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
      { id: 803, name: "Spring Rolls", price: 180, description: "Crispy rolls filled with veggies.", vegetarian: true, image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 9,
    name: "Dessert Paradise",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    deliveryTime: 20,
    category: "Desserts, Ice Cream",
    deliveryFee: "Free",
    discount: "30% OFF",
    menu: [
      { id: 901, name: "Chocolate Cake", price: 150, description: "Rich chocolate layer cake.", vegetarian: true, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
      { id: 902, name: "Strawberry Ice Cream", price: 100, description: "Fresh strawberry ice cream.", vegetarian: true, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&auto=format&fit=crop&q=60" },
      { id: 903, name: "Donuts", price: 120, description: "Assorted donuts.", vegetarian: true, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 10,
    name: "Street Food Corner",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60",
    rating: 4.2,
    deliveryTime: 25,
    category: "Street Food, Snacks",
    deliveryFee: "₹15",
    menu: [
      { id: 1001, name: "Pani Puri", price: 60, description: "Crispy hollow balls filled with spicy water.", vegetarian: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60" },
      { id: 1002, name: "Samosa", price: 40, description: "Deep-fried pastry with spiced potato filling.", vegetarian: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60" },
      { id: 1003, name: "Vada Pav", price: 50, description: "Spicy potato fritter in a bun.", vegetarian: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 11,
    name: "Healthy Bites",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60",
    rating: 4.1,
    deliveryTime: 35,
    category: "Healthy, Salads",
    deliveryFee: "Free",
    menu: [
      { id: 1101, name: "Avocado Salad", price: 280, description: "Green salad with avocado slices.", vegetarian: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60" },
      { id: 1102, name: "Fruit Bowl", price: 200, description: "Mixed seasonal fruits.", vegetarian: true, image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=500&auto=format&fit=crop&q=60" },
      { id: 1103, name: "Smoothie Bowl", price: 250, description: "Berry smoothie with granola.", vegetarian: true, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
    ]
  },
  {
    id: 12,
    name: "Midnight Cravings",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&auto=format&fit=crop&q=60",
    rating: 3.9,
    deliveryTime: 40,
    category: "Late Night, Snacks",
    deliveryFee: "₹30",
    menu: [
      { id: 1201, name: "Cheese Nachos", price: 180, description: "Crispy nachos with cheese sauce.", vegetarian: true, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&auto=format&fit=crop&q=60" },
      { id: 1202, name: "Maggi", price: 60, description: "Spicy instant noodles.", vegetarian: true, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&auto=format&fit=crop&q=60" },
      { id: 1203, name: "Club Sandwich", price: 150, description: "Multi-layer sandwich.", vegetarian: false, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60" },
    ]
  },
]

export const topRestaurants = allRestaurants.slice(0, 5);