'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { FocusCardsWrapper } from './FocusCardsWrapper';
import { useAnimation, useStaggerAnimation } from '@/lib/hooks/useAnimation';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  /** Usar el efecto de focus cards (blur en cards no enfocadas) */
  useFocusEffect?: boolean;
}

/**
 * Enhanced Empty state con mejor diseño y responsividad
 */
function EmptyState() {
  const { enabled, getTransition } = useAnimation();

  return (
    <motion.div
      className="text-center py-20 px-4"
      initial={enabled ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={getTransition('normal')}
    >
      <div className="max-w-md mx-auto">
        {/* Animated shopping cart icon */}
        <motion.div
          className="relative mb-8"
          animate={enabled ? {
            y: [0, -10, 0],
          } : undefined}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <motion.svg
              className="w-12 h-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              animate={enabled ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              } : undefined}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l1.9-9m8.1 9V21a2 2 0 01-2 2H9a2 2 0 01-2-2v-1.1"
              />
            </motion.svg>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center"
            animate={enabled ? {
              y: [0, -8, 0],
              rotate: [0, 180, 360]
            } : undefined}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.h3
          className="text-xl md:text-2xl font-bold text-slate-900 mb-3"
          initial={enabled ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...getTransition('normal'), delay: enabled ? 0.2 : 0 }}
        >
          No se encontraron productos
        </motion.h3>

        <motion.p
          className="text-slate-600 mb-8 text-base md:text-lg"
          initial={enabled ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...getTransition('normal'), delay: enabled ? 0.3 : 0 }}
        >
          Intenta con otros filtros o términos de búsqueda diferentes
        </motion.p>

        {/* Suggestions */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={enabled ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...getTransition('normal'), delay: enabled ? 0.4 : 0 }}
        >
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Ver todos los productos
          </button>
          <button
            onClick={() => {
              const searchBar = document.querySelector('input[type="text"]') as HTMLInputElement;
              searchBar?.focus();
            }}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Nueva búsqueda
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * ProductGrid - Grid de productos con animaciones
 * 
 * Soporta dos modos:
 * 1. Normal: Grid simple con stagger animation
 * 2. Focus Effect: Efecto de blur en cards no enfocadas (useFocusEffect=true)
 */
export function ProductGrid({
  products,
  onProductClick,
  useFocusEffect = true
}: ProductGridProps) {
  const { enabled } = useAnimation();
  const { containerVariants, itemVariants } = useStaggerAnimation(products.length);

  if (products.length === 0) {
    return <EmptyState />;
  }

  // Si useFocusEffect está activo, usar FocusCardsWrapper
  if (useFocusEffect) {
    return (
      <FocusCardsWrapper
        products={products}
        onProductClick={onProductClick}
        renderCard={(product, isHovered) => (
          <ProductCard
            product={product}
            onClick={() => onProductClick?.(product)}
            isHovered={isHovered}
            disableHoverEffect={true}
          />
        )}
      />
    );
  }

  // Modo normal con stagger animation y mejor responsividad
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      role="list"
      aria-label="Productos disponibles"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            layout
            role="listitem"
            className="w-full"
          >
            <ProductCard
              product={product}
              onClick={() => onProductClick?.(product)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
