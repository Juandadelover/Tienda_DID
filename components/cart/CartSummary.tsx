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
    <div className="bg-white rounded-xl p-5 border border-slate-200 sticky top-20">
      <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-100">
        Resumen
      </h2>

      <div className="space-y-3 mb-5">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal ({cart.itemCount} items)</span>
          <span className="font-medium text-slate-900">{formatCurrency(cart.total)}</span>
        </div>

        <div className="flex justify-between text-sm text-slate-600">
          <span>Envío</span>
          <span className="text-emerald-600 font-medium">Gratis</span>
        </div>

        <div className="border-t border-slate-100 pt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-900">Total</span>
            <span className="text-xl font-bold text-slate-900">
              {formatCurrency(cart.total)}
            </span>
          </div>
          <p className="text-xs text-slate-400 text-right mt-1">Impuestos incluidos</p>
        </div>
      </div>

      {showCheckoutButton && (
        <Button
          variant="primary"
          onClick={onCheckout}
          disabled={cart.items.length === 0}
          className="w-full"
        >
          Continuar pedido
        </Button>
      )}

      <p className="mt-4 text-xs text-slate-400 text-center flex items-center justify-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Pago seguro al recibir
      </p>
    </div>
  );
}
