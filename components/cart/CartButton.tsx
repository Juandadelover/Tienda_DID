'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useCartContext } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  variant?: 'default' | 'circular';
}

export function CartButton({ variant = 'default' }: CartButtonProps) {
  const { cart } = useCartContext();

  const isCircular = variant === 'circular';

  return (
    <Link
      href="/carrito"
      className={cn(
        "relative flex items-center justify-center transition-colors",
        isCircular 
          ? "cursor-pointer overflow-hidden rounded-full h-10 w-10 bg-emerald-600/10 text-gray-800 hover:bg-emerald-600/20"
          : "p-2 hover:bg-slate-100 rounded-lg min-w-[44px] min-h-[44px]"
      )}
      aria-label={`Carrito de compras, ${cart.itemCount} items`}
    >
      {/* Cart icon */}
      <svg
        className={cn(
          "fill-none stroke-current",
          isCircular ? "w-5 h-5" : "w-6 h-6 text-slate-700"
        )}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {/* Item count badge con pulse animation */}
      {cart.itemCount > 0 && (
        <motion.span
          className={cn(
            "absolute bg-emerald-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1",
            isCircular ? "-top-0.5 -right-0.5" : "-top-1 -right-1"
          )}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
          aria-live="polite"
          aria-label={`${cart.itemCount} productos en el carrito`}
          role="status"
        >
          {cart.itemCount > 99 ? '99+' : cart.itemCount}
        </motion.span>
      )}
    </Link>
  );
}
