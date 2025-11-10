'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProviderProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkProvider = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          router.push('/provider/login');
          return;
        }

        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const user = await response.json();
          if (user.role !== 'service-provider') {
            router.push('/provider/login');
          }
        } else {
          router.push('/provider/login');
        }
      } catch (error) {
        router.push('/provider/login');
      }
    };

    checkProvider();
  }, [router]);

  return <>{children}</>;
}

