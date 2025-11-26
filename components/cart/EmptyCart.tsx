'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function EmptyCart() {
  return (
    <div className="bg-white rounded-lg p-8 md:p-12 text-center shadow-sm">
      {/* Empty cart icon */}
      <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-6">
        <svg
          className="w-12 h-12 text-slate-400"
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
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Tu carrito está vacío
      </h2>
      
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        Agrega productos a tu carrito para comenzar tu pedido. Encontrarás todo lo que necesitas en nuestro catálogo.
      </p>

      <Link href="/">
        <Button variant="primary" className="min-w-[200px]">
          Ver catálogo
        </Button>
      </Link>
    </div>
  );
}
