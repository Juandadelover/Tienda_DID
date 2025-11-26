'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import type { Product } from '@/types/product';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils/formatters';
import { useAnimation } from '@/lib/hooks/useAnimation';
import { useCartContext } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  /** Si la tarjeta está actualmente enfocada (hover) */
  isHovered?: boolean;
  /** Deshabilitar animaciones para uso en FocusCardsWrapper */
  disableHoverEffect?: boolean;
}

export function ProductCard({
  product,
  onClick,
  isHovered = false,
  disableHoverEffect = false
}: ProductCardProps) {
  const { enabled, getTransition } = useAnimation();
  const { addItem } = useCartContext();
  const [imageError, setImageError] = useState(false);

  const getDisplayPrice = () => {
    if (product.has_variants && product.variants && product.variants.length > 0) {
      const prices = product.variants.map(v => v.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      if (minPrice === maxPrice) {
        return formatCurrency(minPrice);
      }
      return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;
    }

    return product.base_price ? formatCurrency(product.base_price) : 'Precio no disponible';
  };

  const isAvailable = product.is_available &&
    (!product.has_variants || (product.variants && product.variants.some(v => v.is_available)));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Si tiene variantes, abrir modal para seleccionar
    if (product.has_variants && product.variants && product.variants.length > 0) {
      onClick?.();
      return;
    }

    // Si no tiene variantes, agregar directamente
    if (product.base_price) {
      addItem({
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.base_price,
        imageUrl: product.image_url || undefined,
        unitType: product.unit_type,
      });
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 cursor-pointer',
        'border border-gray-100',
        !disableHoverEffect && 'hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1',
        isHovered && 'shadow-xl shadow-gray-200/50 -translate-y-1'
      )}
      role="button"
      tabIndex={disableHoverEffect ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      whileHover={enabled && !disableHoverEffect ? { y: -4 } : undefined}
      whileTap={enabled && !disableHoverEffect ? { scale: 0.98 } : undefined}
    >
      {/* Image container */}
      <div className="aspect-square w-full overflow-hidden bg-gray-50">
        {product.image_url && !imageError ? (
          <motion.div
            className="relative w-full h-full"
            initial={enabled ? { opacity: 0, scale: 0.95 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={getTransition('normal')}
          >
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                'h-full w-full object-cover transition-transform duration-500',
                !disableHoverEffect && 'group-hover:scale-110',
                isHovered && 'scale-110'
              )}
              onError={() => setImageError(true)}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.svg
              className="w-16 h-16 text-gray-300 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              animate={enabled ? {
                y: [0, -3, 0],
                rotate: [0, 2, -2, 0]
              } : undefined}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </motion.svg>
            <span className="text-xs text-gray-400 font-medium">Sin imagen</span>
          </div>
        )}

        {/* Badge de no disponible */}
        {!isAvailable && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="agotado">Agotado</Badge>
          </div>
        )}

        {/* Indicador de variantes */}
        {product.has_variants && product.variants && product.variants.length > 1 && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-emerald-600 shadow-md border border-emerald-100">
              {product.variants.length} opciones
            </div>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
          {product.name}
        </h3>

        {/* Categoría */}
        {product.category_name && (
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-2">
            {product.category_name}
          </p>
        )}

        {/* Descripción corta */}
        {product.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Precio y botón de agregar */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
          <div className="flex flex-col">
            <p className="text-2xl font-black text-gray-900">
              {getDisplayPrice()}
            </p>
            {product.unit_type === 'weight' && (
              <span className="text-xs text-gray-500 font-medium">por kg</span>
            )}
          </div>

          {/* Botón de agregar al carrito */}
          <motion.button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300',
              isAvailable
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
            whileHover={enabled && isAvailable ? { scale: 1.1, rotate: 5 } : undefined}
            whileTap={enabled && isAvailable ? { scale: 0.9 } : undefined}
            aria-label={isAvailable ? `Agregar ${product.name} al carrito` : 'Producto no disponible'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
