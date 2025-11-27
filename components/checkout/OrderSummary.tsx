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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Resumen del pedido
        </h3>
      </div>

      {/* Items List */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {items.map((item) => {
          const itemKey = `${item.productId}-${item.variantId || 'base'}`;
          const variant = item.variantName ? ` - ${item.variantName}` : '';
          const subtotal = item.price * item.quantity;

          return (
            <div key={itemKey} className="flex justify-between text-sm group">
              <div className="flex-1 pr-4">
                <p className="text-slate-900 font-medium group-hover:text-emerald-600 transition-colors">
                  <span className="text-slate-500 mr-2">{item.quantity}x</span>
                  {item.productName}
                  {item.variantName && (
                    <span className="text-slate-500 font-normal block text-xs mt-0.5">
                      {item.variantName}
                    </span>
                  )}
                </p>
              </div>
              <p className="text-slate-900 font-medium tabular-nums">
                {formatCurrency(subtotal)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Delivery Info */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-slate-500 font-medium">Tipo de entrega</span>
          <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            {deliveryType === 'pickup' ? 'Recoger' : 'Domicilio'}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-slate-700 font-medium">
          {deliveryType === 'pickup' ? (
            <>
              <span className="text-lg">🏪</span>
              <span>Recoger en tienda</span>
            </>
          ) : (
            <>
              <span className="text-lg">🚚</span>
              <span>Domicilio gratis</span>
            </>
          )}
        </div>
      </div>

      {/* Total Section */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex justify-between items-end">
          <span className="text-slate-500 font-medium pb-1">Total a pagar</span>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight block">
              {formatCurrency(total)}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-1 block">
              {items.length} {items.length === 1 ? 'producto' : 'productos'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
