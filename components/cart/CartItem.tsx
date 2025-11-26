'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
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
  const [isRemoving, setIsRemoving] = useState(false);

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
    // Iniciar animación de slide-out
    setIsRemoving(true);
    // Ejecutar callback después de que termine la animación (200ms)
    setTimeout(() => {
      onRemove();
      setShowConfirmDelete(false);
    }, 200);
  };

  const subtotal = item.price * item.quantity;

  return (
    <motion.div
      className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200"
      initial={{ opacity: 1, x: 0 }}
      animate={isRemoving ? { opacity: 0, x: '100%' } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeIn' }}
      layout>
      <div className="flex gap-5">
        {/* Product image */}
        <div className="relative w-24 h-24 flex-shrink-0 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden border border-slate-200">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.productName}
              fill
              sizes="80px"
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.svg';
              }}
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
          <h3 className="font-bold text-slate-900 truncate text-base">
            {item.productName}
          </h3>
          {item.variantName && (
            <p className="text-xs text-slate-500 mt-1 bg-slate-100 inline-block px-2 py-1 rounded">
              {item.variantName}
            </p>
          )}
          <p className="text-lg text-emerald-600 font-bold mt-2">
            {formatCurrency(item.price)}
            <span className="text-xs text-slate-600 font-normal">
              {item.unitType === 'weight' ? ' / kg' : ''}
            </span>
          </p>
        </div>

        {/* Quantity controls and remove button - desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
            <button
              onClick={handleDecrement}
              className="w-9 h-9 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 active:bg-slate-100 transition-colors font-bold text-slate-700"
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span className="w-10 text-center font-bold text-slate-900 text-base">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-9 h-9 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 active:bg-slate-100 transition-colors font-bold text-slate-700"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          <div className="text-right min-w-[80px]">
            <p className="font-bold text-slate-900 text-lg">
              {formatCurrency(subtotal)}
            </p>
          </div>

          <button
            onClick={() => setShowConfirmDelete(true)}
            className="w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold hover:text-red-700"
            aria-label="Eliminar producto"
            title="Eliminar del carrito"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Quantity controls - mobile */}
      <div className="sm:hidden mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
          <button
            onClick={handleDecrement}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors font-bold text-slate-700"
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span className="w-12 text-center font-bold text-slate-900 text-lg">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors font-bold text-slate-700"
            aria-label="Aumentar cantidad"
          >
            +
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
    </motion.div>
  );
}
