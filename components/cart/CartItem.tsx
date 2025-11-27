'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { CartItem as CartItemType } from '@/types/cart';
import { formatCurrency } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleIncrement = () => {
    onUpdateQuantity(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1);
    } else {
      setShowConfirmDelete(true);
    }
  };

  const handleRemove = () => {
    onRemove();
    setShowConfirmDelete(false);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-5">
        {/* Product image */}
        <div className="relative w-24 h-24 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.productName}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-bold text-slate-900 text-lg leading-tight truncate pr-4">
                {item.productName}
              </h3>
              <p className="font-bold text-slate-900 text-lg hidden sm:block">
                {formatCurrency(subtotal)}
              </p>
            </div>

            {item.variantName && (
              <p className="text-sm text-slate-500 font-medium mt-1">
                {item.variantName}
              </p>
            )}

            <p className="text-sm text-slate-500 mt-1">
              {formatCurrency(item.price)}
              {item.unitType === 'weight' && ' / kg'}
            </p>
          </div>

          {/* Controls - Desktop */}
          <div className="hidden sm:flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-200">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-white hover:text-emerald-600 hover:shadow-sm transition-all"
                aria-label="Disminuir cantidad"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="w-8 text-center font-semibold text-slate-900 tabular-nums">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-white hover:text-emerald-600 hover:shadow-sm transition-all"
                aria-label="Aumentar cantidad"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <button
              onClick={() => setShowConfirmDelete(true)}
              className="text-sm font-medium text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-red-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="sm:hidden mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-200">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-white hover:text-emerald-600 hover:shadow-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-8 text-center font-semibold text-slate-900 tabular-nums">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-white hover:text-emerald-600 hover:shadow-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-bold text-slate-900 text-lg">
            {formatCurrency(subtotal)}
          </p>
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="text-slate-400 hover:text-red-600 p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Confirmation dialog */}
      {showConfirmDelete && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl animate-fade-in">
          <p className="text-sm font-medium text-red-800 mb-3">
            ¿Eliminar este producto del carrito?
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleRemove}
              className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              Eliminar
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="flex-1 px-4 py-2 bg-white text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
