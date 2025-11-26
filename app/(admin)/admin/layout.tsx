'use client';

/**
 * Admin Layout
 * Protected layout with authentication check and sidebar navigation
 * Modern premium design
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNav } from '@/components/layout/AdminNav';
import { Spinner } from '@/components/ui/Spinner';
import { getSession } from '@/lib/auth/authHelpers';

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
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse"></div>
            <Spinner />
          </div>
          <p className="mt-6 text-slate-600 font-medium">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/30">
      {/* Sidebar */}
      <AdminNav />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-10 max-w-[1600px]">
          {children}
        </div>
      </main>
    </div>
  );
}
