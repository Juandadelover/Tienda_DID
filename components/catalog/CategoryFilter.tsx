'use client';

import type { Category } from '@/types/category';
import { Button } from '@/components/ui/Button';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-2 min-w-max md:flex-wrap md:min-w-0">
        {/* All products button */}
        <Button
          variant={selectedCategory === null ? 'primary' : 'ghost'}
          onClick={() => onCategoryChange(null)}
          className="whitespace-nowrap min-h-[44px] min-w-[44px]"
        >
          Todos
        </Button>

        {/* Category buttons */}
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.slug ? 'primary' : 'ghost'}
            onClick={() => onCategoryChange(category.slug)}
            className="whitespace-nowrap min-h-[44px] min-w-[44px]"
          >
            {category.name}
            {(category.product_count ?? 0) > 0 && (
              <span className="ml-1.5 text-xs opacity-75">
                ({category.product_count})
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
