'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import type { Category } from '@/types/category';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/lib/hooks/useAnimation';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

/**
 * CategoryFilter con diseño moderno de pills
 * Mejorado con gradientes, sombras y transiciones suaves
 */
export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { enabled } = useAnimation();

  // Scroll horizontal para hacer visible el tab activo en móvil
  useEffect(() => {
    if (!containerRef.current) return;

    const activeButton = containerRef.current.querySelector('[data-active="true"]') as HTMLButtonElement;
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: enabled ? 'smooth' : 'auto',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedCategory, enabled]);

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    const allCategories = [null, ...categories.map(c => c.slug)];

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % allCategories.length;
      onCategoryChange(allCategories[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + allCategories.length) % allCategories.length;
      onCategoryChange(allCategories[prevIndex]);
    }
  };

  const allCategories = [
    { id: 'all', slug: null, name: 'Todos', product_count: null },
    ...categories,
  ];

  return (
    <div
      className="flex gap-3 flex-wrap justify-center"
      role="tablist"
      aria-label="Filtrar por categoría"
    >
      <div
        ref={containerRef}
        className="flex gap-3 flex-wrap justify-center"
      >
        {allCategories.map((category, index) => {
          const isActive = selectedCategory === category.slug;

          return (
            <motion.button
              key={category.id}
              data-active={isActive}
              onClick={() => onCategoryChange(category.slug)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'relative px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300',
                'min-h-[44px]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2',
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={`category-panel-${category.slug || 'all'}`}
              tabIndex={isActive ? 0 : -1}
              whileHover={enabled ? { scale: 1.05, y: -2 } : undefined}
              whileTap={enabled ? { scale: 0.95 } : undefined}
            >
              <span className="relative z-10 flex items-center gap-2">
                {category.name}
                {typeof category.product_count === 'number' && category.product_count > 0 && (
                  <span className={cn(
                    "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  )}>
                    {category.product_count}
                  </span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
