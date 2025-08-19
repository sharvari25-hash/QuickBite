"use client";

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
// ★★★ THIS IS THE CORRECTED IMPORT LINE ★★★
import { 
    ShoppingCart, Plus, Minus, CreditCard, Landmark, Smartphone, CheckCircle, Loader2, 
    User, Calendar, Lock 
} from 'lucide-react';

// --- API HELPER HOOK (can be in its own file) ---
const useApi = (authToken) => {
  const api = useMemo(() => {
    const instance = axios.create({ baseURL: "http://localhost:8080" });
    instance.interceptors.request.use(
      (config) => {
        if (authToken) config.headers["Authorization"] = `Bearer ${authToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
    return instance;
  }, [authToken]);
  return api;
};


// --- MAIN CART COMPONENT (Self-Sufficient) ---
export default function Cart({ onBrowse, onOrderSuccess }) {
  const { authToken } = useAuth();
  const api = useApi(authToken);

  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [mutatingItemId, setMutatingItemId] = useState(null);

  useEffect(() => {
    if (!authToken) {
      setIsLoading(false);
      setError("Please log in to view your cart.");
      return;
    }
    
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/customer/cart');
        setCart(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch cart.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [authToken, api]);

  const handleAddToCart = async (menuItem) => {
    setMutatingItemId(menuItem.id);
    try {
      const response = await api.post(`/api/customer/cart/items?menuItemId=${menuItem.id}&quantity=1`);
      setCart(response.data);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setMutatingItemId(null);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    setMutatingItemId(cartItemId);
    try {
      const response = await api.delete(`/api/customer/cart/items/${cartItemId}`);
      setCart(response.data);
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setMutatingItemId(null);
    }
  };
  
  const handlePlaceOrder = async () => {
    try {
      const response = await api.post('/api/customer/orders');
      if (onOrderSuccess) onOrderSuccess(response.data);
      setCart(null);
      setCheckoutStep('success');
      return true;
    } catch (err) {
      alert(`Error placing order: ${err.response?.data?.message || err.message}`);
      return false;
    }
  };

  const handleProceedToCheckout = () => { if (cart?.items?.length > 0) setCheckoutStep('payment'); };
  const handleBackToCart = () => setCheckoutStep('cart');
  const totalPrice = useMemo(() => cart?.items?.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0).toFixed(2) || '0.00', [cart]);

  if (isLoading) return <div className="card flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary-500" /></div>;
  if (error) return <div className="card text-center p-12 text-red-600">Error: {error}</div>;

  switch (checkoutStep) {
    case 'payment': return <PaymentPage totalPrice={totalPrice} onBack={handleBackToCart} onPaymentSuccess={handlePlaceOrder} />;
    case 'success': return <OrderSuccess onBrowse={onBrowse} />;
    default:
      if (!cart || cart.items.length === 0) return <EmptyCart onBrowse={onBrowse} />;
      return <CartView cartItems={cart.items} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleProceedToCheckout} totalPrice={totalPrice} mutatingItemId={mutatingItemId} />;
  }
}

// --- HELPER COMPONENT: Cart View ---
function CartView({ cartItems, onAddToCart, onRemoveFromCart, onCheckout, totalPrice, mutatingItemId }) {
  return (
    <div className="card">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.map((cartItem) => {
          const isMutating = mutatingItemId === cartItem.id || mutatingItemId === cartItem.menuItem.id;
          return (
            <div key={cartItem.id} className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg">
              <img src={cartItem.menuItem.imageUrl || "/placeholder.svg"} alt={cartItem.menuItem.name} className="w-full sm:w-16 h-24 sm:h-16 object-cover rounded-lg" />
              <div className="flex-1"><h3 className="font-semibold">{cartItem.menuItem.name}</h3></div>
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex items-center space-x-2">
                  <button onClick={() => onRemoveFromCart(cartItem.id)} disabled={isMutating} className="p-1 disabled:opacity-50"><Minus className="h-4 w-4" /></button>
                  <span className="font-semibold w-8 text-center">{isMutating ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : cartItem.quantity}</span>
                  <button onClick={() => onAddToCart(cartItem.menuItem)} disabled={isMutating} className="p-1 disabled:opacity-50"><Plus className="h-4 w-4" /></button>
                </div>
                <p className="font-bold text-right ml-4">₹{(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t pt-4 mt-6">
        <div className="flex justify-between items-center mb-4"><span className="text-xl font-bold">Total:</span><span className="text-xl font-bold">₹{totalPrice}</span></div>
        <button onClick={onCheckout} className="w-full btn-primary py-3">Proceed to Checkout</button>
      </div>
    </div>
  );
}

// --- HELPER COMPONENT: Payment Page ---
function PaymentPage({ totalPrice, onPaymentSuccess, onBack }) {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '', upiId: '', bank: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({ ...prev, [name]: value }));
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsProcessing(true);
      console.log("Simulating payment with details:", paymentDetails);
      await new Promise(resolve => setTimeout(resolve, 2000));
      await onPaymentSuccess();
      setIsProcessing(false);
    };
  
    return (
      <div className="card max-w-4xl mx-auto">
        <button onClick={onBack} className="text-primary-600 hover:underline mb-6 text-sm font-medium flex items-center">← Back to Cart</button>
        <h2 className="text-2xl font-bold mb-6">Complete Your Payment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
                <h3 className="font-semibold text-lg mb-4">Choose Payment Method</h3>
                <div className="space-y-3">
                    <PaymentOption icon={<CreditCard />} label="Credit/Debit Card" value="card" selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
                    <PaymentOption icon={<Smartphone />} label="UPI" value="upi" selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
                    <PaymentOption icon={<Landmark />} label="Net Banking" value="netbanking" selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
                </div>
            </div>
            <div>
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
                    <div className="flex justify-between items-center text-lg">
                        <span className="font-medium">Amount to Pay:</span>
                        <span className="font-bold text-xl">₹{totalPrice}</span>
                    </div>
                </div>
                <form onSubmit={handleFormSubmit}>
                    {selectedMethod === 'card' && (
                        <div className="space-y-4">
                            <div className="relative"><CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleInputChange} className="input-field pl-10" placeholder="Card Number" required minLength="16" maxLength="16" /></div>
                            <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="text" name="nameOnCard" value={paymentDetails.nameOnCard} onChange={handleInputChange} className="input-field pl-10" placeholder="Name on Card" required /></div>
                            <div className="flex gap-4">
                                <div className="relative w-1/2"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleInputChange} className="input-field pl-10" placeholder="MM / YY" required /></div>
                                <div className="relative w-1/2"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="password" name="cvv" value={paymentDetails.cvv} onChange={handleInputChange} className="input-field pl-10" placeholder="CVV" required minLength="3" maxLength="3" /></div>
                            </div>
                        </div>
                    )}
                    {selectedMethod === 'upi' && <div className="relative"><Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="text" name="upiId" value={paymentDetails.upiId} onChange={handleInputChange} className="input-field pl-10" placeholder="yourname@bank" required /></div>}
                    {selectedMethod === 'netbanking' && <div className="relative"><Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><select name="bank" value={paymentDetails.bank} onChange={handleInputChange} className="input-field pl-10" required><option value="">Select Bank</option><option>State Bank of India</option><option>HDFC Bank</option></select></div>}
                    <button type="submit" className="w-full btn-primary py-3 mt-8" disabled={isProcessing}>{isProcessing ? 'Placing Order...' : `Pay Securely`}</button>
                </form>
            </div>
        </div>
      </div>
    );
}

const PaymentOption = ({ icon, label, value, selectedMethod, setSelectedMethod }) => (
    <button onClick={() => setSelectedMethod(value)} className={`w-full flex items-center text-left p-4 border rounded-lg transition-colors ${selectedMethod === value ? 'bg-primary-50 border-primary-500 text-primary-600' : 'hover:bg-gray-50'}`}>
      <div className="mr-4">{icon}</div>
      <span className="font-semibold">{label}</span>
    </button>
);

function OrderSuccess({ onBrowse }) {
    return (
      <div className="card text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
        <p className="text-gray-600 my-4">You can now track your order in the "My Orders" section.</p>
        <button onClick={onBrowse} className="btn-primary">Browse More Restaurants</button>
      </div>
    );
}

function EmptyCart({ onBrowse }) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-4">Add some delicious items to get started!</p>
          <button onClick={onBrowse} className="btn-primary">Browse Restaurants</button>
        </div>
      </div>
    );
}