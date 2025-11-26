/**
 * Header Component
 * Main navigation header with logo and cart
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { STORE_INFO } from '@/lib/constants';
import { CartButton } from '@/components/cart/CartButton';

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
          
          {/* Cart Button */}
          <CartButton />
          </Link>
        </div>
      </div>
    </header>
  );
}
