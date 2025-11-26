'use client';

import React from 'react';
import { motion } from 'motion/react';

/**
 * CartCounter
 * Componente de contador animado para items en el carrito
 * - Animaciones: scale (1.2x en cambios), pulse suave
 * - Accesible: aria-live="polite", aria-label descriptivo
 * - Colores: Emerald-600 background, white text
 */

interface CartCounterProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CartCounter = ({
  count,
  size = 'md',
  className = '',
}: CartCounterProps) => {
  // Tamaños predefinidos
  const sizeConfig = {
    sm: {
      badge: 'h-5 w-5 text-xs',
      text: 'text-xs font-bold',
    },
    md: {
      badge: 'h-6 w-6 text-sm',
      text: 'text-sm font-bold',
    },
    lg: {
      badge: 'h-8 w-8 text-base',
      text: 'text-base font-bold',
    },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      key={`counter-${count}`}
      className={`
        relative flex items-center justify-center
        ${config.badge}
        bg-emerald-600 text-white rounded-full
        shadow-md
        ${className}
      `}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 20,
      }}
      aria-live="polite"
      aria-label={`${count} productos en el carrito`}
      role="status"
    >
      <motion.span
        className={config.text}
        key={`count-${count}`}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
        }}
      >
        {count}
      </motion.span>
    </motion.div>
  );
};

export default CartCounter;
