'use client';

import React, { useEffect, useState } from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';
import { 
  IconHome, 
  IconShoppingCart, 
  IconMenu, 
  IconBrandWhatsapp 
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * FloatingDockWrapper
 * Componente de navegación flotante para mobile
 * - Solo visible en breakpoint mobile (<768px)
 * - Scroll-aware: se oculta al hacer scroll down, muestra en scroll up
 * - Accesible: role="navigation", aria-label, aria-current
 * - Colores: Slate-900/80 background, Emerald-600 items
 * - Iconos: Home, Categorías (Menu), Carrito, WhatsApp
 */

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  ariaLabel?: string;
}

export const FloatingDockWrapper = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll-aware behavior: ocultar dock en scroll down, mostrar en scroll up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDiff = currentScrollY - lastScrollY;

          if (Math.abs(scrollDiff) > 5) {
            const direction = scrollDiff > 0 ? 'down' : 'up';
            setScrollDirection(direction);

            // Solo actualizar visibilidad si estamos en mobile
            if (window.innerWidth < 768) {
              setIsVisible(direction === 'up' || currentScrollY < 100);
            }
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Navegación items con iconos de Tabler
  const navItems: NavItem[] = [
    {
      title: 'Home',
      icon: <IconHome className="h-5 w-5" />,
      href: '/',
      ariaLabel: 'Ir a inicio',
    },
    {
      title: 'Categorías',
      icon: <IconMenu className="h-5 w-5" />,
      href: '/#categorias',
      ariaLabel: 'Ver categorías',
    },
    {
      title: 'Carrito',
      icon: <IconShoppingCart className="h-5 w-5" />,
      href: '/carrito',
      ariaLabel: 'Ver carrito de compras',
    },
    {
      title: 'WhatsApp',
      icon: <IconBrandWhatsapp className="h-5 w-5" />,
      href: 'https://wa.me/57xxxxxxxxx',
      ariaLabel: 'Contactar por WhatsApp',
    },
  ];

  // Formatear items para el FloatingDock
  const dockItems = navItems.map((item) => ({
    title: item.title,
    icon: item.icon,
    href: item.href,
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 flex justify-center items-end pb-6 px-4 hidden md:hidden"
          role="navigation"
          aria-label="Navegación principal flotante"
        >
          {/* Fondo blur degradado para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/5 via-transparent to-transparent pointer-events-none" />

          {/* Dock flotante con estilos Tienda DID */}
          <div className="relative z-50 bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-600/20 p-1">
            <FloatingDock
              items={dockItems}
              mobileClassName="flex gap-2"
              desktopClassName="hidden"
            />
          </div>

          {/* Label de accesibilidad para screen readers */}
          <span className="sr-only">
            Navegación flotante con opciones: Home, Categorías, Carrito, y WhatsApp
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingDockWrapper;
