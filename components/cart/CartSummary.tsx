'use client';

import type { Cart } from '@/types/cart';
import { formatCurrency } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';

interface CartSummaryProps {
  cart: Cart;
  onCheckout?: () => void;
  showCheckoutButton?: boolean;
}

export function CartSummary({
  cart,
  onCheckout,
  showCheckoutButton = true
}: CartSummaryProps) {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl p-8 shadow-lg border border-slate-200 sticky top-4">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        💳 Resumen del pedido
      </h2>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-slate-700">
          <span className="font-medium">Subtotal ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})</span>
          <span className="font-bold text-lg">{formatCurrency(cart.total)}</span>
        </div>

        <div className="h-px bg-gradient-to-r from-slate-200 to-transparent"></div>

        <div className="flex justify-between items-center text-slate-700">
          <span className="font-medium">📦 Envío</span>
          <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm">Gratis</span>
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 mt-4">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-bold text-slate-900">Total a pagar</span>
            <span className="text-3xl font-bold text-emerald-600">
              {formatCurrency(cart.total)}
            </span>
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <Button
          variant="primary"
          onClick={onCheckout}
          disabled={cart.items.length === 0}
          className="w-full py-4 text-base font-bold tracking-wide rounded-xl shadow-lg shadow-emerald-500/30 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:shadow-none disabled:scale-100"
        >
          <span className="flex items-center justify-center gap-2 uppercase">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Continuar con el pedido
          </span>
        </Button>
      )}

      <p className="text-xs text-slate-500 mt-5 text-center leading-relaxed">
        💰 El pago se realizará en efectivo al recibir tu pedido
      </p>
    </div>
  );
}
