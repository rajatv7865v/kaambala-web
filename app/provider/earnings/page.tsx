'use client';

import { useEffect, useState } from 'react';
import { Order } from '@/lib/orders';

export default function ProviderEarningsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [earnings, setEarnings] = useState({
    total: 0,
    thisMonth: 0,
    thisWeek: 0,
    today: 0,
  });

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
        calculateEarnings(assignedOrders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateEarnings = (orders: Order[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const completedOrders = orders.filter(o => o.status === 'completed' && o.price);
    
    const total = completedOrders.reduce((sum, o) => sum + (o.price || 0), 0);
    const thisMonth = completedOrders
      .filter(o => new Date(o.updatedAt) >= firstDayOfMonth)
      .reduce((sum, o) => sum + (o.price || 0), 0);
    const thisWeek = completedOrders
      .filter(o => new Date(o.updatedAt) >= weekAgo)
      .reduce((sum, o) => sum + (o.price || 0), 0);
    const todayEarnings = completedOrders
      .filter(o => {
        const orderDate = new Date(o.updatedAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      })
      .reduce((sum, o) => sum + (o.price || 0), 0);

    setEarnings({ total, thisMonth, thisWeek, today: todayEarnings });
  };

  const getFilteredOrders = () => {
    const completedOrders = orders.filter(o => o.status === 'completed' && o.assignedTo);
    
    if (filter === 'all') return completedOrders;
    if (filter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return completedOrders.filter(o => {
        const orderDate = new Date(o.updatedAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      });
    }
    if (filter === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return completedOrders.filter(o => new Date(o.updatedAt) >= weekAgo);
    }
    if (filter === 'month') {
      const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      return completedOrders.filter(o => new Date(o.updatedAt) >= firstDayOfMonth);
    }
    return completedOrders;
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Earnings</h1>
        <p className="text-gray-600">Track your earnings and completed services</p>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm font-medium text-green-100 mb-2">Total Earnings</p>
          <p className="text-3xl font-bold">₹{earnings.total.toLocaleString()}</p>
          <p className="text-xs text-green-100 mt-1">All time</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm font-medium text-blue-100 mb-2">This Month</p>
          <p className="text-3xl font-bold">₹{earnings.thisMonth.toLocaleString()}</p>
          <p className="text-xs text-blue-100 mt-1">Current month</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm font-medium text-purple-100 mb-2">This Week</p>
          <p className="text-3xl font-bold">₹{earnings.thisWeek.toLocaleString()}</p>
          <p className="text-xs text-purple-100 mt-1">Last 7 days</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm font-medium text-orange-100 mb-2">Today</p>
          <p className="text-3xl font-bold">₹{earnings.today.toLocaleString()}</p>
          <p className="text-xs text-orange-100 mt-1">Today's earnings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'All Time' },
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'This Week' },
          { value: 'month', label: 'This Month' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
              filter === f.value
                ? 'text-white'
                : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
            }`}
            style={filter === f.value ? { backgroundColor: '#e56481' } : {}}
            onMouseEnter={(e) => filter !== f.value && (e.currentTarget.style.backgroundColor = '#f3f4f6')}
            onMouseLeave={(e) => filter !== f.value && (e.currentTarget.style.backgroundColor = 'white')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Earnings List */}
      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#e56481] border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading earnings...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600">No earnings yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Completed Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{order.service}</p>
                        <p className="text-xs text-gray-500">{order.serviceType}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{order.phone}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">
                        {new Date(order.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-gray-900">₹{order.price?.toLocaleString() || '0'}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-semibold text-gray-900">
                    Total ({filteredOrders.length} services):
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{filteredOrders.reduce((sum, o) => sum + (o.price || 0), 0).toLocaleString()}
                    </p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

