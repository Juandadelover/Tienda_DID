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
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex gap-4">
        {/* Product image */}
        <div className="relative w-20 h-20 flex-shrink-0 bg-slate-100 rounded-md overflow-hidden">
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
                className="w-8 h-8 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">
            {item.productName}
          </h3>
          {item.variantName && (
            <p className="text-sm text-slate-600 mt-0.5">
              {item.variantName}
            </p>
          )}
          <p className="text-sm text-emerald-600 font-semibold mt-1">
            {formatCurrency(item.price)}
            {item.unitType === 'weight' && ' / kg'}
          </p>
        </div>

        {/* Quantity controls and remove button - desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
              aria-label="Disminuir cantidad"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-12 text-center font-semibold text-slate-900">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="text-right min-w-[80px]">
            <p className="font-bold text-slate-900">
              {formatCurrency(subtotal)}
            </p>
          </div>

          <button
            onClick={() => setShowConfirmDelete(true)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors min-w-[44px] min-h-[44px]"
            aria-label="Eliminar producto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Quantity controls - mobile */}
      <div className="sm:hidden mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            aria-label="Disminuir cantidad"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 text-center font-semibold text-slate-900 text-lg">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            aria-label="Aumentar cantidad"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="text-right">
          <p className="font-bold text-slate-900 text-lg">
            {formatCurrency(subtotal)}
          </p>
        </div>
      </div>

      {/* Delete button - mobile */}
      <div className="sm:hidden mt-3">
        <Button
          variant="ghost"
          onClick={() => setShowConfirmDelete(true)}
          className="w-full text-red-600 hover:bg-red-50"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Eliminar
        </Button>
      </div>

      {/* Confirmation dialog */}
      {showConfirmDelete && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-slate-700 mb-3">
            ¿Estás seguro de eliminar este producto del carrito?
          </p>
          <div className="flex gap-2">
            <Button
              variant="danger"
              onClick={handleRemove}
              className="flex-1"
            >
              Sí, eliminar
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowConfirmDelete(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
