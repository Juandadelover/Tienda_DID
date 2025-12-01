'use client';

/**
 * Admin Layout
 * Protected layout with authentication check and sidebar navigation
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNav } from '@/components/layout/AdminNav';
import { Spinner } from '@/components/ui/Spinner';
import { getSession, onAuthStateChange } from '@/lib/auth/authHelpers';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check initial session
    const checkAuth = async () => {
      const session = await getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        router.replace('/login');
      }
      setIsLoading(false);
    };

    checkAuth();

    // Subscribe to auth changes
    const subscription = onAuthStateChange((session) => {
      if (!session) {
        setIsAuthenticated(false);
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-slate-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar - includes mobile header and menu */}
      <AdminNav />

      {/* Desktop Sidebar Spacer - pushes content to the right */}
      <div className="hidden md:block w-16 shrink-0 transition-all duration-300" />

      {/* Main Content */}
      <main className="flex-1 pt-14 md:pt-0 min-h-screen transition-all duration-300 w-full">
        {children}
      </main>
    </div>
  );
}
