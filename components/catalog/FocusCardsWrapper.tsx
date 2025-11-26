/**
 * FocusCardsWrapper - Wrapper personalizado para Focus Cards de Aceternity
 * Implementa el efecto de blur en tarjetas no enfocadas para el catálogo de Tienda DID
 * 
 * @version 1.0.0
 * @see https://ui.aceternity.com/components/focus-cards
 */

'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/lib/hooks/useAnimation';
import { transitions } from '@/lib/config/animations';
import type { Product } from '@/types/product';

/**
 * Props para cada tarjeta en el grid
 */
interface FocusCardProps {
  /** Producto a mostrar */
  product: Product;
  /** Índice de la tarjeta en el grid */
  index: number;
  /** Índice de la tarjeta actualmente enfocada (hover) */
  hoveredIndex: number | null;
  /** Callback cuando el mouse entra en la tarjeta */
  onHover: (index: number) => void;
  /** Callback cuando el mouse sale de la tarjeta */
  onHoverEnd: () => void;
  /** Callback cuando se hace clic en la tarjeta */
  onClick?: (product: Product) => void;
  /** Children personalizados para renderizar dentro de la tarjeta */
  children: React.ReactNode;
}

/**
 * Tarjeta individual con efecto de focus/blur
 */
export function FocusCard({
  product,
  index,
  hoveredIndex,
  onHover,
  onHoverEnd,
  onClick,
  children,
}: FocusCardProps) {
  const { enabled, getTransition } = useAnimation();

  // Calcular si esta tarjeta está enfocada o difuminada
  const isHovered = hoveredIndex === index;
  const shouldBlur = hoveredIndex !== null && !isHovered;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(product);
    }
  };

  return (
    <motion.div
      className={cn(
        'relative rounded-xl overflow-hidden cursor-pointer',
        'bg-white shadow-sm hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2',
        'transition-shadow duration-200'
      )}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onHoverEnd}
      onClick={() => onClick?.(product)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${product.name}`}
      initial={false}
      animate={{
        scale: enabled ? (shouldBlur ? 0.98 : isHovered ? 1.02 : 1) : 1,
        opacity: enabled && shouldBlur ? 0.7 : 1,
      }}
      transition={getTransition('fast')}
      style={{
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Props para el contenedor de tarjetas
 */
interface FocusCardsWrapperProps {
  /** Lista de productos a mostrar */
  products: Product[];
  /** Callback cuando se hace clic en una tarjeta */
  onProductClick?: (product: Product) => void;
  /** Función para renderizar el contenido de cada tarjeta */
  renderCard: (product: Product, isHovered: boolean) => React.ReactNode;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

/**
 * Contenedor para tarjetas con efecto de focus
 * Implementa el patrón de focus-cards donde al hacer hover en una tarjeta,
 * las demás se difuminan para crear un efecto de enfoque visual.
 * 
 * @example
 * ```tsx
 * <FocusCardsWrapper
 *   products={products}
 *   onProductClick={handleProductClick}
 *   renderCard={(product, isHovered) => (
 *     <ProductCardContent product={product} showPrice={isHovered} />
 *   )}
 * />
 * ```
 */
export function FocusCardsWrapper({
  products,
  onProductClick,
  renderCard,
  className,
}: FocusCardsWrapperProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <div
      className={cn(
        'grid gap-4 sm:gap-5 md:gap-6 w-full',
        'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        className
      )}
      role="list"
      aria-label="Productos disponibles"
    >
      {products.map((product, index) => (
        <FocusCard
          key={product.id}
          product={product}
          index={index}
          hoveredIndex={hoveredIndex}
          onHover={handleHover}
          onHoverEnd={handleHoverEnd}
          onClick={onProductClick}
        >
          {renderCard(product, hoveredIndex === index)}
        </FocusCard>
      ))}
    </div>
  );
}

export default FocusCardsWrapper;
