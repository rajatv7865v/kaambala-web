'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/orders';

export default function AvailableOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAvailableOrders();
  }, []);

  const fetchAvailableOrders = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/provider/available-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/provider/orders/${orderId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        alert('Order accepted successfully!');
        fetchAvailableOrders();
      } else {
        alert(data.error || 'Failed to accept order');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Orders</h1>
        <p className="text-gray-600">Browse and accept new service orders</p>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#e56481] border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading available orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-600">No available orders at the moment</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{order.service}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                      AVAILABLE
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Type:</span> {order.serviceType}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Description:</span> {order.description}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Address:</span> {order.address}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Phone:</span> {order.phone}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span>
                      Created: {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-end">
                  {order.price && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">₹{order.price}</p>
                      <p className="text-xs text-gray-500">Total Amount</p>
                    </div>
                  )}
                  <button
                    onClick={() => handleAcceptOrder(order.id)}
                    className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
                    style={{ backgroundColor: '#e56481' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
                  >
                    Accept Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

