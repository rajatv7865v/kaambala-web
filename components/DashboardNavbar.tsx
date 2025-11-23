'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardNavbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/logo.jpeg"
                alt="Kaambala"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-gray-900">Dashboard</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/orders"
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Orders
              </Link>
              <Link
                href="/dashboard/profile"
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Profile
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e56481] to-[#d45471] flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#e56481' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d45471'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e56481'}
            >
              Logout
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <Link
              href="/dashboard"
              className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Overview
            </Link>
            <Link
              href="/dashboard/orders"
              className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/dashboard/profile"
              className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

