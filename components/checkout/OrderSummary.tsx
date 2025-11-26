'use client';

/**
 * OrderSummary Component
 * Displays final order review with items, total, and delivery type
 * 
 * Features:
 * - Animated items list with stagger effect
 * - Price animation on total changes
 * - Delivery type with icons and smooth transitions
 * - Accessibility: aria-live="polite" for total updates
 * - Mobile responsive with proper spacing
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency } from '@/lib/utils/formatters';
import type { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  deliveryType: 'pickup' | 'delivery';
  total: number;
}

export function OrderSummary({ items, deliveryType, total }: OrderSummaryProps) {
  return (
    <motion.div 
      className="bg-slate-50 rounded-lg p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h3 
        className="text-lg font-semibold text-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Resumen del pedido
      </motion.h3>

      {/* Items List with Stagger Animation */}
      <motion.div 
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <AnimatePresence mode="wait">
          {items.map((item, idx) => {
            const itemKey = `${item.productId}-${item.variantId || 'base'}`;
            const variant = item.variantName ? ` - ${item.variantName}` : '';
            const subtotal = item.price * item.quantity;
            
            return (
              <motion.div
                key={itemKey}
                className="flex justify-between text-sm"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <div className="flex-1">
                  <p className="text-slate-900 font-medium">
                    {item.quantity}x {item.productName}{variant}
                  </p>
                  <p className="text-slate-600">
                    {formatCurrency(item.price)} c/u
                  </p>
                </div>
                <motion.p
                  className="text-slate-900 font-medium"
                  key={`price-${itemKey}`}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                >
                  {formatCurrency(subtotal)}
                </motion.p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Divider */}
      <motion.div 
        className="border-t border-slate-200 my-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3 }}
      />

      {/* Delivery Type */}
      <motion.div 
        className="flex items-center justify-between text-sm"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <span className="text-slate-600">Tipo de entrega:</span>
        <AnimatePresence mode="wait">
          {deliveryType === 'pickup' ? (
            <motion.span
              key="pickup"
              className="text-slate-900 font-medium flex items-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <span>🏪</span>
              <span>Recoger en tienda</span>
            </motion.span>
          ) : (
            <motion.span
              key="delivery"
              className="text-slate-900 font-medium flex items-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <span>🚚</span>
              <span>Domicilio gratis</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Divider */}
      <motion.div 
        className="border-t border-slate-200 my-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4 }}
      />

      {/* Total with Animation on Change */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        <span className="text-lg font-semibold text-slate-900">Total:</span>
        <motion.span
          key={`total-${total}`}
          className="text-2xl font-bold text-emerald-600"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          aria-live="polite"
          role="status"
        >
          {formatCurrency(total)}
        </motion.span>
      </motion.div>

      {/* Items Count */}
      <motion.p 
        className="text-sm text-slate-600 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {items.length} {items.length === 1 ? 'producto' : 'productos'}
      </motion.p>
    </motion.div>
  );
}
