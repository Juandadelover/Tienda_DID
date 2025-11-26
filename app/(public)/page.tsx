'use client';

import { useState } from 'react';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { CategoryFilter } from '@/components/catalog/CategoryFilter';
import { SearchBar } from '@/components/catalog/SearchBar';
import { ProductModal } from '@/components/catalog/ProductModal';
import { HorarioAlert } from '@/components/layout/HorarioAlert';
import { Spinner } from '@/components/ui/Spinner';
import type { Product } from '@/types/product';

/**
 * Home Page - Product Catalog
 * User Story 1: Public catalog with categories and real-time search
 */
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories and products
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts({
    category: selectedCategory || undefined,
    available: true,
    search: searchQuery || undefined,
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Business hours alert */}
      <HorarioAlert />

      {/* Main content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Catálogo de Productos
          </h1>
          <p className="text-slate-600">
            Encuentra todo lo que necesitas para tu hogar
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <SearchBar
            onSearchChange={setSearchQuery}
            placeholder="Buscar productos..."
          />
        </div>

        {/* Category filter */}
        {categoriesLoading ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        )}

        {/* Products grid */}
        {productsLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Spinner />
            <p className="mt-4 text-slate-600">Cargando productos...</p>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-4 text-sm text-slate-600">
              {products.length} {products.length === 1 ? 'producto' : 'productos'} encontrados
              {selectedCategory && (
                <span>
                  {' '}en{' '}
                  <span className="font-semibold">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                  </span>
                </span>
              )}
              {searchQuery && (
                <span>
                  {' '}para{' '}
                  <span className="font-semibold">&quot;{searchQuery}&quot;</span>
                </span>
              )}
            </div>

            {/* Products grid */}
            <ProductGrid
              products={products}
              onProductClick={handleProductClick}
            />
          </>
        )}
      </div>

      {/* Product detail modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
