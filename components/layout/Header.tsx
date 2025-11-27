/**
 * Header Component
 * Main navigation header with logo and cart
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { STORE_INFO } from '@/lib/constants';
import { CartButton } from '@/components/cart/CartButton';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            aria-label={`Ir al inicio de ${STORE_INFO.name}`}
          >
            <Image
              src="/images/logo.svg"
              alt={STORE_INFO.name}
              width={32}
              height={32}
              priority
            />
            <span className="text-lg font-bold text-emerald-600">
              {STORE_INFO.name}
            </span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4" role="navigation" aria-label="Menú principal">
            <Link href="/" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
              Inicio
            </Link>
            <Link href="/admin" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
              Admin
            </Link>
          </nav>
          
          {/* Cart Button */}
          <CartButton />
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-xl md:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Menú móvil"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <span className="font-bold text-lg text-primary">{STORE_INFO.name}</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                  aria-label="Cerrar menú"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="/admin"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Administración
                </Link>
              </nav>
              
              <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-center text-gray-400">
                  &copy; {new Date().getFullYear()} {STORE_INFO.name}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
