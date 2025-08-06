import React from 'react';
import { useOrders } from '../contexts/OrderProvider';
import { Package, CheckCircle, Clock } from 'lucide-react';

// A small component to display a single order
const OrderItem = ({ order }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 mb-3">
        <div>
          <p className="font-bold text-gray-800">{order.id}</p>
          <p className="text-sm text-gray-500">
            Placed on: {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right mt-2 sm:mt-0">
          <p className="text-lg font-bold">₹{order.total}</p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            {order.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        {order.items.map(item => (
          <div key={item.id} className="flex items-center space-x-3">
            <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
            <div className="flex-grow">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


// The main component that lists all orders
export default function MyOrders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600">Your past orders will appear here once you check out.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}