import { useState } from 'react';
import { ShoppingCart, Plus, Minus, CreditCard, Landmark, Smartphone, CheckCircle } from 'lucide-react';

// --- MAIN CART COMPONENT (Controller) ---
export default function Cart({ cart, onAddToCart, onRemoveFromCart, onBrowse, onOrderSuccess }) {
  // This state lives inside the Cart component and controls the flow
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'payment', 'success'

  // --- Handlers to control the internal flow ---
  const handleProceedToCheckout = () => {
    if (cart.length > 0) {
      setCheckoutStep('payment');
    }
  };

  const handleBackToCart = () => {
    setCheckoutStep('cart');
  };

  const handlePaymentSubmit = () => {
    // This function is called from the PaymentPage component below
    // It tells the parent (CustomerDashboard) that the order was successful
    onOrderSuccess(); 
    // Then it moves to its own internal success step
    setCheckoutStep('success');
  };
  
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // --- Conditional Rendering Logic ---
  // Renders the correct view based on the internal `checkoutStep` state
  switch (checkoutStep) {
    case 'payment':
      return (
        <PaymentPage 
          totalPrice={totalPrice}
          onBack={handleBackToCart}
          onPaymentSuccess={handlePaymentSubmit} // Pass the handler down
        />
      );

    case 'success':
      // The success message now takes the user back to browsing
      return (
        <OrderSuccess onBrowse={onBrowse} />
      );
      
    case 'cart':
    default:
      // If the cart is empty, show a dedicated message
      if (cart.length === 0) {
        return <EmptyCart onBrowse={onBrowse} />;
      }
      // Otherwise, show the list of cart items
      return (
        <CartView
          cart={cart}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          onCheckout={handleProceedToCheckout} // Use the internal handler
          totalPrice={totalPrice}
        />
      );
  }
}

// --- HELPER COMPONENT: Cart View (What the user sees first) ---
function CartView({ cart, onAddToCart, onRemoveFromCart, onCheckout, totalPrice }) {
  return (
    <div className="card">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full sm:w-16 h-24 sm:h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <button onClick={() => onRemoveFromCart(item.id)} className="p-1 text-gray-600 hover:text-red-600"><Minus className="h-4 w-4" /></button>
                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                <button onClick={() => onAddToCart(item)} className="p-1 text-gray-600 hover:text-primary-600"><Plus className="h-4 w-4" /></button>
              </div>
              <p className="font-bold text-right ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-xl font-bold">₹{totalPrice}</span>
        </div>
        <button onClick={onCheckout} className="w-full btn-primary py-3">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

// --- HELPER COMPONENT: Payment Page ---
function PaymentPage({ totalPrice, onPaymentSuccess, onBack }) {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      setIsProcessing(true);
      // Simulate API call to payment gateway
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess(); // Signal success to the parent Cart component
      }, 2000);
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
                    {selectedMethod === 'card' && <div className="space-y-4"><input className="input-field" placeholder="Card Number" required/><div className="flex gap-4"><input className="input-field" placeholder="MM / YY" required/><input className="input-field" placeholder="CVV" required/></div></div>}
                    {selectedMethod === 'upi' && <input className="input-field" placeholder="yourname@bank" required />}
                    {selectedMethod === 'netbanking' && <select className="input-field" required><option value="">Select Bank</option><option>State Bank of India</option><option>HDFC Bank</option></select>}
                    <button type="submit" className="w-full btn-primary py-3 mt-8" disabled={isProcessing}>{isProcessing ? 'Processing...' : `Pay Securely`}</button>
                </form>
            </div>
        </div>
      </div>
    );
}

// --- HELPER COMPONENT: Payment Option Button ---
const PaymentOption = ({ icon, label, value, selectedMethod, setSelectedMethod }) => (
    <button onClick={() => setSelectedMethod(value)} className={`w-full flex items-center text-left p-4 border rounded-lg transition-colors ${selectedMethod === value ? 'bg-primary-50 border-primary-500 text-primary-600' : 'hover:bg-gray-50'}`}>
      <div className="mr-4">{icon}</div>
      <span className="font-semibold">{label}</span>
    </button>
);

// --- HELPER COMPONENT: Order Success Message ---
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

// --- HELPER COMPONENT: Empty Cart Message ---
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