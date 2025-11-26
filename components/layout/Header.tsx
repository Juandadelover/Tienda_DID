/**
 * Header Component
 * Diseño basado en el HTML proporcionado - Tienda DID
 * Con banner de horario, navegación y botones circulares
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { STORE_INFO } from '@/lib/constants';
import { CartButton } from '@/components/cart/CartButton';
import { useAnimation } from '@/lib/hooks/useAnimation';
import { useHorario } from '@/lib/hooks/useHorario';

// Logo SVG del HTML proporcionado
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg 
      fill="currentColor" 
      viewBox="0 0 48 48" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { enabled, getTransition } = useAnimation();
  const { isOpen: storeIsOpen } = useHorario();

  // Detect scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollThrottled);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '#catalogo', label: 'Tienda' },
    { href: '#nosotros', label: 'Sobre Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <>
      {/* Top Banner - Horario de Atención */}
      <div className="bg-emerald-600/20">
        <p className="text-gray-800 text-sm font-normal leading-normal py-2 px-4 text-center">
          Horarios de Atención: Lunes a Viernes de 9:00 a 22:00
          {storeIsOpen ? (
            <span className="ml-2 inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 font-medium">Abierto</span>
            </span>
          ) : (
            <span className="ml-2 text-red-600 font-medium">• Cerrado</span>
          )}
        </p>
      </div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid px-6 sm:px-10 lg:px-20 py-4 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f5f8f7]/95 backdrop-blur-md shadow-lg border-emerald-600/20'
            : 'bg-[#f5f8f7]/80 backdrop-blur-sm border-emerald-600/20'
        }`}
        initial={false}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-4 text-emerald-600 hover:opacity-80 transition-opacity"
          onClick={handleNavClick}
        >
          <div className="w-6 h-6">
            <LogoIcon className="w-full h-full" />
          </div>
          <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-tight">
            {STORE_INFO.name}
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-9">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-800 text-sm font-medium leading-normal hover:text-emerald-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <button 
            onClick={() => {
              const searchSection = document.getElementById('search-section');
              searchSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-emerald-600/10 text-gray-800 hover:bg-emerald-600/20 transition-colors"
            aria-label="Buscar productos"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* User Button (Admin) */}
          <Link
            href="/admin"
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-emerald-600/10 text-gray-800 hover:bg-emerald-600/20 transition-colors"
            aria-label="Administración"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* Cart Button - Usando el componente existente pero con estilo circular */}
          <CartButton variant="circular" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-emerald-600/10 text-gray-800 hover:bg-emerald-600/20 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={enabled ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={enabled ? { opacity: 0, height: 0 } : undefined}
            transition={getTransition('normal')}
            className="md:hidden fixed top-[116px] left-0 right-0 z-40 bg-[#f5f8f7]/95 backdrop-blur-md border-b border-emerald-600/20 shadow-lg"
          >
            <nav className="py-4 space-y-2 px-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={enabled ? { opacity: 0, x: -20 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...getTransition('normal'), delay: enabled ? index * 0.1 : 0 }}
                >
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className="block px-4 py-3 text-base font-medium rounded-lg text-gray-800 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
