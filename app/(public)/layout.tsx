/**
 * Public Layout
 * Main layout for public-facing pages (catalog, cart, checkout)
 */

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingDockWrapper } from '@/components/layout/FloatingDockWrapper';
import { CartProvider } from '@/context/CartContext';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Header />
        
        <main className="flex-1 bg-[#f5f8f7] w-full">
          <div className="w-full">
            {children}
          </div>
        </main>
        
        <Footer />
        
        {/* Floating Dock Navigation - Mobile Only */}
        <FloatingDockWrapper />
      </div>
    </CartProvider>
  );
}
