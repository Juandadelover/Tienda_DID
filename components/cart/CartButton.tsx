'use client';

import Link from 'next/link';
import { useCartContext } from '@/context/CartContext';

export function CartButton() {
  const { cart } = useCartContext();

  return (
    <Link
      href="/carrito"
      className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label={`Carrito de compras, ${cart.itemCount} items`}
    >
      {/* Cart icon */}
      <svg
        className="w-6 h-6 text-slate-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {/* Item count badge */}
      {cart.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {cart.itemCount > 99 ? '99+' : cart.itemCount}
        </span>
      )}
    </Link>
  );
}
