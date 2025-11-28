'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils/formatters';
import { useCartContext } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, onClick, viewMode = 'grid' }: ProductCardProps) {
  const { addItem } = useCartContext();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAvailable) return;

    // If product has variants, open modal instead
    if (product.has_variants && product.variants && product.variants.length > 1) {
      onClick?.();
      return;
    }

    setIsAddingToCart(true);

    try {
      // Get the variant or use base product
      const variant = product.variants?.[0];
      const price = variant?.price || product.base_price || 0;

      addItem({
        productId: product.id,
        productName: product.name,
        variantId: variant?.id || null,
        variantName: variant?.variant_name || null,
        quantity: 1,
        price: price,
        imageUrl: product.image_url || null,
        unitType: product.unit_type || null,
      });

      // Show success feedback
      setShowAddedFeedback(true);
      setTimeout(() => {
        setShowAddedFeedback(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200"
      role="button"
      tabIndex={0}
    >
      {/* Image container */}
      <div
        onClick={onClick}
        className="relative w-full aspect-square bg-slate-50 overflow-hidden cursor-pointer"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            quality={80}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-300"
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

        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2">
          {!isAvailable && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-md">
              Agotado
            </span>
          )}

          {product.has_variants && product.variants && product.variants.length > 1 && (
            <span className="ml-auto px-2 py-1 bg-slate-800/80 backdrop-blur-sm text-white text-xs font-medium rounded-md">
              {product.variants.length} opciones
            </span>
          )}
        </div>
      </div>

      {/* Product info */}
      <div className="p-3">
        {/* Product name */}
        <h3
          onClick={onClick}
          className="font-semibold text-slate-900 text-sm line-clamp-2 mb-1 cursor-pointer hover:text-emerald-600 transition-colors"
        >
          {product.name}
        </h3>

        {/* Description - only show on larger screens */}
        {product.description && (
          <p className="hidden sm:block text-xs text-slate-500 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price and action */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <span className="text-lg font-bold text-emerald-600">
            {getDisplayPrice()}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={!isAvailable || isAddingToCart}
            className={`
              flex items-center justify-center
              w-9 h-9 rounded-lg
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              ${showAddedFeedback
                ? 'bg-green-500 text-white'
                : isAvailable
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-400'
              }
            `}
            aria-label={showAddedFeedback ? 'Agregado' : 'Agregar al carrito'}
          >
            {showAddedFeedback ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : isAddingToCart ? (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
