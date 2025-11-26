/**
 * Header Component
 * Main navigation header with logo and cart
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { STORE_INFO } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image
              src="/images/logo.svg"
              alt={STORE_INFO.name}
              width={40}
              height={40}
              priority
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">
                {STORE_INFO.name}
              </span>
              <span className="text-xs text-gray-600 hidden mobile:block">
                Tu tienda de confianza
              </span>
            </div>
          </Link>
          
          {/* Cart Button - Will be enhanced with cart context later */}
          <Link
            href="/carrito"
            className="relative p-3 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Ver carrito"
          >
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            
            {/* Cart badge - will be dynamic with cart context */}
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
