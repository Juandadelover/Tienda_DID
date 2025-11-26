/**
 * Public Layout
 * Main layout for public-facing pages (catalog, cart, checkout)
 */

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HorarioAlert } from '@/components/layout/HorarioAlert';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HorarioAlert />
      
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
