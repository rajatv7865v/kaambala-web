'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProviderLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success && data.token) {
        // Check if user is service provider
        if (data.user.role === 'service-provider') {
          localStorage.setItem('auth_token', data.token);
          router.push('/provider/dashboard');
        } else {
          setError('Access denied. Service provider credentials required.');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/logo.jpeg"
                alt="Kaambala"
                width={80}
                height={80}
                className="rounded-full mx-auto"
              />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Provider Login</h1>
            <p className="text-gray-600">Sign in to access your provider dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#e56481] focus:border-transparent outline-none transition-all"
                placeholder="provider@kaambala.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#e56481] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: isLoading ? '#d45471' : '#e56481' }}
              onMouseEnter={(e) =>
                !isLoading &&
                (e.currentTarget.style.backgroundColor = '#d45471')
              }
              onMouseLeave={(e) =>
                !isLoading &&
                (e.currentTarget.style.backgroundColor = '#e56481')
              }
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-2 text-center">Demo Service Provider Accounts:</p>
            <div className="space-y-1 text-xs text-gray-500 text-center">
              <p>• provider@kaambala.com / provider123</p>
              <p>• electrician@kaambala.com / electrician123</p>
              <p>• plumber@kaambala.com / plumber123</p>
              <p>• beautician@kaambala.com / beautician123</p>
              <p>• carpenter@kaambala.com / carpenter123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

