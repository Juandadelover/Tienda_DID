'use client';

import Image from 'next/image';
import type { Product } from '@/types/product';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils/formatters';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
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

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative w-full aspect-square bg-slate-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-slate-300"
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
        
        {/* Badge overlay */}
        <div className="absolute top-2 right-2">
          {!isAvailable && <Badge variant="agotado">Agotado</Badge>}
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-slate-600 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-bold text-emerald-600">
            {getDisplayPrice()}
          </p>
          
          {product.has_variants && (
            <span className="text-xs text-slate-500">
              {product.variants?.length || 0} opciones
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
