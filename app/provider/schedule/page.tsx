'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/orders';

export default function ProviderSchedulePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/provider/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        const assignedOrders = data.orders.filter((o: Order) => o.assignedTo);
        setOrders(assignedOrders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdersForDate = (date: string) => {
    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);
    
    return orders.filter(order => {
      if (order.scheduledDate) {
        const scheduled = new Date(order.scheduledDate);
        scheduled.setHours(0, 0, 0, 0);
        return scheduled.getTime() === selected.getTime();
      }
      // If no scheduled date, show orders created on that date
      const created = new Date(order.createdAt);
      created.setHours(0, 0, 0, 0);
      return created.getTime() === selected.getTime();
    });
  };

  const getUpcomingOrders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return orders.filter(order => {
      if (order.scheduledDate) {
        return new Date(order.scheduledDate) >= today;
      }
      return new Date(order.createdAt) >= today;
    }).slice(0, 5);
  };

  const selectedDateOrders = getOrdersForDate(selectedDate);
  const upcomingOrders = getUpcomingOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Schedule</h1>
        <p className="text-gray-600">View and manage your service schedule</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Date</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#e56481] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Orders for Selected Date */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Services for {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h2>
            </div>

            {isLoading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#e56481] border-t-transparent mb-4"></div>
                <p className="text-gray-600">Loading schedule...</p>
              </div>
            ) : selectedDateOrders.length === 0 ? (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600">No services scheduled for this date</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {selectedDateOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/provider/orders/${order.id}`}
                    className="block p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{order.service}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{order.serviceType}</p>
                        {order.scheduledDate && (
                          <p className="text-xs text-gray-500">
                            Scheduled: {new Date(order.scheduledDate).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        )}
                      </div>
                      {order.price && (
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{order.price}</p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Services Sidebar */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Services</h2>
            {upcomingOrders.length === 0 ? (
              <p className="text-sm text-gray-500">No upcoming services</p>
            ) : (
              <div className="space-y-4">
                {upcomingOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/provider/orders/${order.id}`}
                    className="block p-4 rounded-xl border border-gray-200 hover:border-[#e56481] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm text-gray-900">{order.service}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{order.serviceType}</p>
                    {order.scheduledDate ? (
                      <p className="text-xs text-gray-500">
                        {new Date(order.scheduledDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })} at {new Date(order.scheduledDate).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

