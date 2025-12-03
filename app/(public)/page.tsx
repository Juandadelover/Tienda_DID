'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Sparkles, TrendingUp, Grid3x3, List, Search, X } from 'lucide-react';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Spinner } from '@/components/ui/Spinner';
import type { Product } from '@/types/product';

const ProductModal = dynamic(() => import('@/components/catalog/ProductModal').then(mod => mod.ProductModal), {
  loading: () => null,
  ssr: false
});

type ViewMode = 'grid' | 'list';
type SortOption = 'recent' | 'price-asc' | 'price-desc' | 'name';

/**
 * Home Page - Product Catalog
 * Diseño moderno con Hero Section y filtros avanzados
 */
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  // Fetch categories and products
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading, error: productsError } = useProducts({
    category: selectedCategory || undefined,
    available: true,
  });

  // Filter and sort products (solo búsqueda en frontend, el filtro de categoría ya viene de la API)
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search (solo si hay búsqueda)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.category_name && p.category_name.toLowerCase().includes(query))
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.base_price || 0) - (b.base_price || 0);
        case 'price-desc':
          return (b.base_price || 0) - (a.base_price || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchQuery, sortBy]);

  const handleCategoryChange = useCallback((categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    // Limpiar búsqueda cuando cambiamos de categoría para evitar confusión
    if (categorySlug && searchQuery) {
      setSearchQuery('');
    }
  }, [searchQuery]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    // Si hay una categoría seleccionada y el usuario busca, podría ser confuso
    // pero permitimos la combinación para flexibilidad
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery('');
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const isLoading = categoriesLoading || productsLoading;

  // Mostrar error si hay problemas con la carga de productos
  if (productsError && !isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Error al cargar productos</h2>
          <p className="text-sm text-slate-500 mb-4">{productsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Más compacto y limpio */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white pb-24 md:pb-28">
        {/* Efectos de fondo sutiles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center space-y-3">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Productos de Calidad</span>
            </div>

            {/* Título principal */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Descubre Nuestro{' '}
              <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                Catálogo
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-sm md:text-base text-emerald-100 max-w-lg mx-auto">
              Encuentra productos excepcionales para tu hogar
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 pt-3">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold">{filteredAndSortedProducts.length}</div>
                <div className="text-xs text-emerald-200">
                  {selectedCategory ? `en ${categories.find(c => c.slug === selectedCategory)?.name}` : 'productos'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold">{categories.filter(c => (c.product_count ?? 0) > 0).length}</div>
                <div className="text-xs text-emerald-200">categorías</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  100%
                </div>
                <div className="text-xs text-emerald-200">disponible</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator - más grande para mejor separación */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="w-full h-20 md:h-24">
            <path d="M0 120L80 100C160 80 320 60 480 50C640 40 800 40 960 50C1120 60 1280 80 1360 90L1440 100V120H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pt-8 md:pb-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-16 pr-12 py-4 text-base border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 bg-white shadow-sm hover:shadow-md hover:border-emerald-200 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Filtrar por categoría</h2>
            {(selectedCategory || searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
              }`}
            >
              Todos ({products.length})
            </button>
            {categories
              .filter(cat => (cat.product_count ?? 0) > 0) // Solo mostrar categorías con productos
              .map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  {cat.name} ({cat.product_count})
                </button>
              ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Spinner />
            <p className="mt-3 text-sm text-slate-500">
              {selectedCategory
                ? `Cargando productos de ${categories.find(c => c.slug === selectedCategory)?.name}...`
                : 'Cargando productos...'
              }
            </p>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-slate-600">
                  <span className="font-semibold text-emerald-600">{filteredAndSortedProducts.length}</span>
                  {' '}{filteredAndSortedProducts.length === 1 ? 'producto' : 'productos'}
                  {selectedCategory && (
                    <span className="ml-1">
                      en <span className="font-medium text-emerald-600">
                        {categories.find(c => c.slug === selectedCategory)?.name}
                      </span>
                    </span>
                  )}
                </span>

                {/* Filtros activos */}
                <div className="flex items-center gap-2">
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium">
                      Categoría: {categories.find(c => c.slug === selectedCategory)?.name}
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">
                      Búsqueda: "{searchQuery}"
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="recent">Más recientes</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>

                <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                      }`}
                    title="Vista cuadrícula"
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                      }`}
                    title="Vista lista"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-full mb-4">
                  <Sparkles className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">No se encontraron productos</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Intenta ajustar los filtros o realizar una nueva búsqueda
                </p>
                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
                : 'space-y-3'
              }>
                {filteredAndSortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Product detail modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
