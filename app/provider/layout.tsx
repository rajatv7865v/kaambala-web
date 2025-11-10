'use client';

import ProviderProtectedRoute from '@/components/ProviderProtectedRoute';
import ProviderSidebar from '@/components/ProviderSidebar';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProviderProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <ProviderSidebar />
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ProviderProtectedRoute>
  );
}

