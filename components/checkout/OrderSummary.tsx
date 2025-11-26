'use client';

/**
 * OrderSummary Component
 * Displays final order review with items, total, and delivery type
 */

import React from 'react';
import { formatCurrency } from '@/lib/utils/formatters';
import type { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  deliveryType: 'pickup' | 'delivery';
  total: number;
}

export function OrderSummary({ items, deliveryType, total }: OrderSummaryProps) {
  return (
    <div className="bg-slate-50 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">
        Resumen del pedido
      </h3>

      {/* Items List */}
      <div className="space-y-3">
        {items.map((item) => {
          const itemKey = `${item.productId}-${item.variantId || 'base'}`;
          const variant = item.variantName ? ` - ${item.variantName}` : '';
          const subtotal = item.price * item.quantity;
          
          return (
            <div key={itemKey} className="flex justify-between text-sm">
              <div className="flex-1">
                <p className="text-slate-900 font-medium">
                  {item.quantity}x {item.productName}{variant}
                </p>
                <p className="text-slate-600">
                  {formatCurrency(item.price)} c/u
                </p>
              </div>
              <p className="text-slate-900 font-medium">
                {formatCurrency(subtotal)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 my-4" />

      {/* Delivery Type */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600">Tipo de entrega:</span>
        <span className="text-slate-900 font-medium">
          {deliveryType === 'pickup' ? (
            <span className="flex items-center gap-1">
              <span>🏪</span>
              <span>Recoger en tienda</span>
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <span>🚚</span>
              <span>Domicilio gratis</span>
            </span>
          )}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 my-4" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-900">Total:</span>
        <span className="text-2xl font-bold text-emerald-600">
          {formatCurrency(total)}
        </span>
      </div>

      {/* Items Count */}
      <p className="text-sm text-slate-600 text-center">
        {items.length} {items.length === 1 ? 'producto' : 'productos'}
      </p>
    </div>
  );
}
