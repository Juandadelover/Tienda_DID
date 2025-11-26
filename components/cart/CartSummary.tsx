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
    <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Resumen del pedido
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal ({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})</span>
          <span className="font-semibold">{formatCurrency(cart.total)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Envío</span>
          <span className="font-semibold text-emerald-600">Gratis</span>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <span className="text-2xl font-bold text-emerald-600">
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
          className="w-full"
        >
          Continuar con el pedido
        </Button>
      )}

      <p className="text-xs text-slate-500 mt-4 text-center">
        El pago se realizará en efectivo al recibir tu pedido
      </p>
    </div>
  );
}
