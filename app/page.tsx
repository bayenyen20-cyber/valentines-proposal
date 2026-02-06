'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();

        if (data.success) {
          router.push('/proposal');
        } else {
          router.push('/auth');
        }
      } catch (error) {
        router.push('/auth');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-red-100">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">💖</div>
        <p className="text-xl text-rose-600 font-semibold">Loading...</p>
      </div>
    </div>
  );
}
