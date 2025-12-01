'use client';

/**
 * AdminNav Component
 * Sidebar navigation for admin panel with mobile hamburger menu
 * Modernized with premium dark theme and responsive design
 */

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/auth/authHelpers';
import { STORE_INFO } from '@/lib/constants';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ExternalLink,
  LogOut,
  Store,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
}

// Using Lucide icons for a more modern look
const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="w-5 h-5" />,
    description: 'Resumen general',
  },
  {
    label: 'Productos',
    href: '/admin/productos',
    icon: <Package className="w-5 h-5" />,
    description: 'Gestionar catálogo',
  },
  {
    label: 'Categorías',
    href: '/admin/categorias',
    icon: <FolderTree className="w-5 h-5" />,
    description: 'Organizar tienda',
  },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await logout();
    if (result.success) {
      router.replace('/login');
    } else {
      setIsLoggingOut(false);
      alert('Error al cerrar sesión');
    }
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Sidebar content - reusable for both mobile and desktop
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {/* Brand / Logo */}
      <div className={`${isMobile ? 'p-6 pb-4' : 'p-4 pb-4'}`}>
        <Link
          href="/admin"
          className="flex items-center gap-3 group/logo !text-white"
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover/logo:shadow-emerald-500/20 transition-all duration-300 shrink-0">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div className={`${isMobile ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden whitespace-nowrap'}`}>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">
              {STORE_INFO.name}
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Administración</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <p className={`px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 ${isMobile ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'}`}>
          Menu Principal
        </p>
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group/item relative overflow-hidden min-h-[48px]
                    ${active
                      ? 'bg-emerald-600 !text-white shadow-lg shadow-emerald-900/20 font-medium'
                      : '!text-slate-400 hover:bg-slate-800 hover:!text-white active:bg-slate-700'
                    }
                  `}
                >
                  {/* Active Indicator */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-r-full" />
                  )}

                  <span className={`transition-transform duration-200 shrink-0 ${active ? 'scale-110 text-white' : 'group-hover/item:scale-110'}`}>
                    {item.icon}
                  </span>
                  <div className={`flex-1 ${isMobile ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden whitespace-nowrap'}`}>
                    <span className="block">{item.label}</span>
                    {isMobile && item.description && (
                      <span className="text-xs text-slate-500 mt-0.5 block">{item.description}</span>
                    )}
                  </div>

                  {/* Arrow indicator on mobile */}
                  {isMobile && !active && (
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover/item:text-slate-400 transition-colors" />
                  )}

                  {/* Hover effect background */}
                  {!active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className={`${isMobile ? 'p-3 m-3' : 'p-2 m-2'} bg-slate-800/50 rounded-2xl border border-slate-800`}>
        <div className="space-y-1">
          <Link
            href="/"
            target="_blank"
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-2 py-2.5 !text-slate-400 hover:!text-emerald-400 hover:bg-slate-800 active:bg-slate-700 rounded-lg transition-all text-sm font-medium group/footer min-h-[44px]"
          >
            <ExternalLink className="w-4 h-4 transition-transform group-hover/footer:-translate-y-0.5 group-hover/footer:translate-x-0.5 shrink-0" />
            <span className={`${isMobile ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden whitespace-nowrap'}`}>Ver Tienda</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-2 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-950/30 active:bg-red-950/50 rounded-lg transition-all text-sm font-medium group/footer min-h-[44px]"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover/footer:-translate-x-0.5 shrink-0" />
            <span className={`${isMobile ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden whitespace-nowrap'}`}>{isLoggingOut ? 'Cerrando...' : 'Cerrar Sesión'}</span>
          </button>
        </div>

        {/* User Info */}
        <div className={`mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-3 px-2 ${isMobile ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'}`}>
          <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-800 text-emerald-500 text-xs font-bold shrink-0">
            AD
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <p className="text-xs font-medium text-white truncate">Administrador</p>
            <p className="text-[10px] text-slate-500 truncate">admin@tiendadid.com</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between safe-area-inset-top">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-base">{STORE_INFO.name}</span>
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-600 transition-colors touch-manipulation"
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          md:hidden fixed inset-0 z-50 transition-all duration-300
          ${isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Sidebar Panel */}
        <aside
          className={`
            absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-slate-900 flex flex-col
            transform transition-transform duration-300 ease-out shadow-2xl
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* Close button inside sidebar */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>

          <SidebarContent isMobile={true} />
        </aside>
      </div>

      {/* Desktop Sidebar - Hidden on mobile, Collapsible with hover */}
      <aside className="group fixed left-0 top-0 w-16 hover:w-72 bg-slate-900 text-white h-screen flex-col border-r border-slate-800 shadow-xl z-20 hidden md:flex transition-all duration-300 ease-in-out overflow-hidden">
        <SidebarContent isMobile={false} />
      </aside>

      {/* Spacer for mobile header - removed to avoid double spacing */}
    </>
  );
}
