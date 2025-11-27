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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 sticky top-24">
      <h2 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
        Resumen del pedido
      </h2>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({cart.itemCount} items)</span>
          <span className="font-medium text-slate-900">{formatCurrency(cart.total)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Envío</span>
          <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-sm">Gratis</span>
        </div>

        <div className="border-t border-slate-100 pt-4 mt-4">
          <div className="flex justify-between items-end">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight block">
                {formatCurrency(cart.total)}
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                Impuestos incluidos
              </span>
            </div>
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <Button
          variant="primary"
          onClick={onCheckout}
          disabled={cart.items.length === 0}
          className="w-full h-12 text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
        >
          Continuar con el pedido
        </Button>
      )}

      <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Pago seguro al recibir</span>
      </div>
    </div>
  );
}
