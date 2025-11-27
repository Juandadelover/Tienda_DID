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
    <div className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-colors">
      <div className="flex gap-4">
        {/* Product image */}
        <div className="relative w-20 h-20 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.productName}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-slate-300"
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
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">
                {item.productName}
              </h3>
              {item.variantName && (
                <p className="text-xs text-slate-500 mt-0.5">{item.variantName}</p>
              )}
              <p className="text-xs text-slate-400 mt-0.5">
                {formatCurrency(item.price)}{item.unitType === 'weight' && ' / kg'}
              </p>
            </div>
            <p className="font-semibold text-slate-900 text-sm whitespace-nowrap">
              {formatCurrency(subtotal)}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-0.5">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-emerald-600 transition-colors"
                aria-label="Disminuir cantidad"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="w-6 text-center text-sm font-medium text-slate-900 tabular-nums">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-emerald-600 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <button
              onClick={() => setShowConfirmDelete(true)}
              className="text-xs text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline">Eliminar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      {showConfirmDelete && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-xs text-red-700 mb-2">¿Eliminar este producto?</p>
          <div className="flex gap-2">
            <button
              onClick={handleRemove}
              className="flex-1 px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="flex-1 px-3 py-1.5 bg-white text-slate-600 text-xs font-medium rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
