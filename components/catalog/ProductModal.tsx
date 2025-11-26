'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product, ProductVariant } from '@/types/product';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils/formatters';
import { useCartContext } from '@/context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const { addItem } = useCartContext();

  if (!product) return null;

  const isAvailable = product.is_available && 
    (!product.has_variants || (product.variants && product.variants.some(v => v.is_available)));

  const getDisplayPrice = () => {
    if (selectedVariant) {
      return formatCurrency(selectedVariant.price);
    }

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

  const handleAddToCart = () => {
    // Determine price and variant info
    const price = selectedVariant ? selectedVariant.price : (product.base_price || 0);
    const variantId = selectedVariant ? selectedVariant.id : null;
    const variantName = selectedVariant ? selectedVariant.variant_name : null;

    // Add to cart
    addItem({
      productId: product.id,
      productName: product.name,
      variantId,
      variantName,
      price,
      quantity: 1,
      imageUrl: product.image_url,
      unitType: product.unit_type,
    });

    // Close modal and reset selection
    setSelectedVariant(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
      <div className="flex flex-col gap-6">
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-slate-100 rounded-lg overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-24 h-24 text-slate-300"
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
          
          {!isAvailable && (
            <div className="absolute top-4 right-4">
              <Badge variant="agotado">Agotado</Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {product.name}
          </h2>
          
          {product.description && (
            <p className="text-slate-600 mb-4">
              {product.description}
            </p>
          )}

          <div className="flex items-baseline gap-2 mb-6">
            <p className="text-3xl font-bold text-emerald-600">
              {getDisplayPrice()}
            </p>
            {product.unit_type === 'weight' && (
              <span className="text-sm text-slate-500">por kg</span>
            )}
          </div>
        </div>

        {/* Variants Selection */}
        {product.has_variants && product.variants && product.variants.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Selecciona una opción:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  disabled={!variant.is_available}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all min-h-[44px]
                    ${selectedVariant?.id === variant.id
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-slate-200 hover:border-emerald-300'
                    }
                    ${!variant.is_available
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer'
                    }
                  `}
                >
                  <div className="font-semibold text-slate-900">
                    {variant.variant_name}
                  </div>
                  <div className="text-sm text-emerald-600 font-bold">
                    {formatCurrency(variant.price)}
                  </div>
                  {!variant.is_available && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="agotado" className="text-xs">
                        Agotado
                      </Badge>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 min-h-[44px]"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={
              !isAvailable ||
              (product.has_variants && !selectedVariant)
            }
            className="flex-1 min-h-[44px]"
          >
            {product.has_variants && !selectedVariant
              ? 'Selecciona una opción'
              : 'Agregar al carrito'
            }
          </Button>
        </div>
      </div>
    </Modal>
  );
}
