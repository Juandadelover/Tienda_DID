/**
 * Public Layout
 * Main layout for public-facing pages (catalog, cart, checkout)
 */

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HorarioAlert } from '@/components/layout/HorarioAlert';
import { CartProvider } from '@/context/CartContext';

// Layout wrapper for public pages

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
        <Header />
        <HorarioAlert />

        <main id="main-content" className="flex-1">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
