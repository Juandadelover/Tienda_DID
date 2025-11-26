'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
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

/**
 * ProductModal (Mejorado)
 * Modal expandible para detalles del producto
 * - Animación fade-in al abrir/cerrar
 * - Precio cambia suavemente al seleccionar variante
 * - Variantes con animación de selección (scale + highlight)
 * - Checkmark animado en variante seleccionada
 * - Accesible: role="dialog", aria-modal, keyboard support
 */
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
    const price = selectedVariant ? selectedVariant.price : (product.base_price || 0);
    const variantId = selectedVariant ? selectedVariant.id : null;
    const variantName = selectedVariant ? selectedVariant.variant_name : null;

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

    setSelectedVariant(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      size="lg"
      footer={
        <div className="flex w-full gap-3 px-6 py-4 justify-end bg-slate-50/50">
          <Button
            variant="ghost"
            onClick={onClose}
            className="min-h-[44px]"
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
            className="min-h-[48px] px-8 text-base font-bold tracking-wide shadow-lg shadow-emerald-500/30 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {product.has_variants && !selectedVariant
                ? 'SELECCIONA UNA OPCIÓN'
                : 'AGREGAR AL CARRITO'
              }
            </span>
          </Button>
        </div>
      }
    >
      <div className="grid md:grid-cols-2 gap-8 p-2">
        {/* Product Image Column */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group-hover:shadow-md transition-shadow duration-300">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                priority
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.svg';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-50">
                <svg
                  className="w-24 h-24 text-slate-300"
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

            {!isAvailable && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                <Badge variant="agotado" className="text-lg px-4 py-2 shadow-sm">
                  Agotado
                </Badge>
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Details Column */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div>
            {/* Description */}
            {product.description && (
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <motion.p
                key={`price-${selectedVariant?.id || 'base'}`}
                className="text-4xl font-bold text-emerald-600 tracking-tight"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {getDisplayPrice()}
              </motion.p>
              {product.unit_type === 'weight' && (
                <span className="text-base font-medium text-slate-400">/ kg</span>
              )}
            </div>
            <p className="text-sm text-slate-400 font-medium">
              Precio final incluye impuestos
            </p>
          </div>

          {/* Variants Selection */}
          {product.has_variants && product.variants && product.variants.length > 0 && (
            <div className="mt-auto">
              <label className="block text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
                Selecciona una opción
              </label>
              <div className="grid grid-cols-1 gap-3">
                <AnimatePresence mode="popLayout">
                  {product.variants.map((variant, idx) => (
                    <motion.button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.is_available}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all duration-200 text-left group
                        ${selectedVariant?.id === variant.id
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                        }
                        ${!variant.is_available
                          ? 'opacity-50 cursor-not-allowed grayscale'
                          : 'cursor-pointer'
                        }
                      `}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={variant.is_available ? { scale: 1.01 } : {}}
                      whileTap={variant.is_available ? { scale: 0.99 } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${selectedVariant?.id === variant.id ? 'text-emerald-900' : 'text-slate-700'}`}>
                          {variant.variant_name}
                        </span>
                        <span className={`font-bold ${selectedVariant?.id === variant.id ? 'text-emerald-700' : 'text-slate-500'}`}>
                          {formatCurrency(variant.price)}
                        </span>
                      </div>

                      {!variant.is_available && (
                        <div className="absolute -top-2 -right-2">
                          <Badge variant="agotado" className="text-xs shadow-sm">
                            Agotado
                          </Badge>
                        </div>
                      )}

                      {/* Checkmark animation */}
                      <AnimatePresence>
                        {selectedVariant?.id === variant.id && (
                          <motion.div
                            className="absolute inset-0 border-2 border-emerald-500 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Modal>
  );
}
