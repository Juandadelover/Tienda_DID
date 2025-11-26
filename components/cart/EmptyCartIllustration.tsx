'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

/**
 * EmptyCartIllustration
 * Componente de estado vacío para el carrito
 * - Animaciones: fade-in + slide-up en entrada
 * - SVG ilustración personalizada
 * - Botón CTA hacia el catálogo
 * - Accesible: aria-label descriptivos
 */

export const EmptyCartIllustration = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      }}
      aria-label="El carrito está vacío"
    >
      {/* Ilustración SVG del carrito vacío */}
      <motion.div
        className="mb-6"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      >
        <svg
          className="w-24 h-24 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5V3m6 2V3"
            opacity={0.5}
          />
        </svg>
      </motion.div>

      {/* Texto principal */}
      <motion.h2
        className="text-2xl font-bold text-slate-900 mb-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Tu carrito está vacío
      </motion.h2>

      {/* Texto secundario */}
      <motion.p
        className="text-slate-500 text-center mb-8 max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Explora nuestro catálogo y agrega productos que te gusten
      </motion.p>

      {/* Botón CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/"
          className={`
            inline-flex items-center justify-center
            px-6 py-3 rounded-lg
            bg-emerald-600 text-white font-semibold
            hover:bg-emerald-700 transition-colors
            shadow-md hover:shadow-lg
            min-h-[44px] min-w-[44px]
          `}
          aria-label="Volver al catálogo para comprar"
        >
          Volver al catálogo
        </Link>
      </motion.div>

      {/* Elemento decorativo flotante */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i === 0
                ? 'bg-emerald-200 top-1/4 left-1/4'
                : i === 1
                  ? 'bg-emerald-100 top-1/3 right-1/4'
                  : 'bg-emerald-200 bottom-1/4 left-1/3'
            }`}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EmptyCartIllustration;
