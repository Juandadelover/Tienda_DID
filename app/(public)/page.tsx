'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { CategoryFilter } from '@/components/catalog/CategoryFilter';
import { SearchBar } from '@/components/catalog/SearchBar';
import { ProductModal } from '@/components/catalog/ProductModal';
import { Spinner } from '@/components/ui/Spinner';
import type { Product } from '@/types/product';

/**
 * Home Page - Product Catalog
 * Diseño basado en el HTML proporcionado - Tienda DID
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
    <div className="min-h-screen bg-[#f5f8f7]">
      {/* Hero Section - Premium Design */}
      <section className="relative overflow-hidden">
        <div className="w-full">
          <div className="@container">
            <div className="p-0 md:p-4">
              <div
                className="relative flex min-h-[75vh] md:min-h-[85vh] flex-col gap-8 bg-cover bg-center bg-no-repeat md:rounded-2xl items-start justify-center px-6 sm:px-10 lg:px-20 overflow-hidden"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")`
                }}
              >
                {/* Gradient Overlay - Vibrant emerald/teal gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-teal-800/85 to-emerald-950/90"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.92) 0%, rgba(19, 78, 74, 0.88) 35%, rgba(4, 47, 46, 0.90) 100%)'
                  }}
                />

                {/* Animated gradient overlay for depth */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                  <div className="absolute top-0 -right-4 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                  <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-float" />
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-emerald-300/30 rounded-full animate-float animation-delay-1000" />
                  <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-teal-300/40 rounded-full animate-float animation-delay-2000" />
                  <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-white/30 rounded-full animate-float animation-delay-3000" />
                  <div className="absolute bottom-1/3 right-2/3 w-2 h-2 bg-cyan-300/40 rounded-full animate-float animation-delay-1500" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col gap-8 text-left max-w-3xl animate-fade-in-up">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 self-start">
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-100 text-sm font-semibold tracking-wide animate-fade-in">
                      ✨ Productos Premium
                    </span>
                  </div>

                  {/* Main Heading with gradient text */}
                  <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight animate-fade-in-up animation-delay-200">
                    Calidad que{' '}
                    <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent animate-gradient-x">
                      Define
                    </span>
                    {' '}tu Estilo
                  </h1>

                  {/* Subtitle */}
                  <h2 className="text-emerald-50/90 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl animate-fade-in-up animation-delay-400">
                    Descubre nuestra selección exclusiva de productos premium diseñados para perdurar en el tiempo.
                  </h2>

                  {/* CTA Buttons with enhanced effects */}
                  <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-600">
                    <button
                      onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 md:h-14 md:px-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-base font-bold leading-normal tracking-wide md:text-lg shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative truncate flex items-center gap-2">
                        Ver Colección
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>

                    <button
                      onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 md:h-14 md:px-10 bg-white/95 backdrop-blur-sm text-emerald-900 text-base font-bold leading-normal tracking-wide md:text-lg border-2 border-white/50 hover:bg-white hover:border-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                    >
                      <span className="truncate flex items-center gap-2">
                        Ofertas del Mes
                        <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Enhanced Floating Stats Card */}
                <div className="hidden lg:block absolute bottom-12 right-12 xl:bottom-16 xl:right-20 animate-fade-in-up animation-delay-800">
                  <div className="backdrop-blur-xl bg-white/10 p-1.5 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105">
                    <div className="flex flex-wrap gap-px">
                      <div className="group flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl p-6 text-white hover:bg-white/5 transition-all duration-300">
                        <p className="text-sm font-medium leading-normal text-emerald-100/80 uppercase tracking-wider">Clientes</p>
                        <p className="tracking-tight text-4xl font-black leading-tight bg-gradient-to-br from-white to-emerald-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                          10k+
                        </p>
                        <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full group-hover:w-full transition-all duration-500" />
                      </div>
                      <div className="group flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl p-6 text-white hover:bg-white/5 transition-all duration-300">
                        <p className="text-sm font-medium leading-normal text-emerald-100/80 uppercase tracking-wider">Productos</p>
                        <p className="tracking-tight text-4xl font-black leading-tight bg-gradient-to-br from-white to-teal-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                          500+
                        </p>
                        <div className="h-1 w-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full group-hover:w-full transition-all duration-500" />
                      </div>
                      <div className="group flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl p-6 text-white hover:bg-white/5 transition-all duration-300">
                        <p className="text-sm font-medium leading-normal text-emerald-100/80 uppercase tracking-wider">Experiencia</p>
                        <p className="tracking-tight text-4xl font-black leading-tight bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                          5 años
                        </p>
                        <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full group-hover:w-full transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce-slow">
                  <span className="text-white/60 text-xs font-medium uppercase tracking-widest">Descubre más</span>
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -50px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(50px, 50px) scale(1.05); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
            50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          }
          
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0) translateX(-50%); }
            50% { transform: translateY(-10px) translateX(-50%); }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }
          
          .animate-gradient-x {
            background-size: 200% auto;
            animation: gradient-x 3s ease infinite;
          }
          
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
          
          .animation-delay-200 {
            animation-delay: 0.2s;
            opacity: 0;
          }
          
          .animation-delay-400 {
            animation-delay: 0.4s;
            opacity: 0;
          }
          
          .animation-delay-600 {
            animation-delay: 0.6s;
            opacity: 0;
          }
          
          .animation-delay-800 {
            animation-delay: 0.8s;
            opacity: 0;
          }
          
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          
          .animation-delay-1500 {
            animation-delay: 1.5s;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-3000 {
            animation-delay: 3s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </section>

      {/* Sección de Catálogo */}
      <section id="catalogo" className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Nuestro{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Catálogo
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explora nuestra selección cuidadosamente curada de productos premium
              </p>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div id="search-section" className="mb-12">
            {/* Search Bar - Full Width */}
            <div className="mb-8">
              <SearchBar
                onSearchChange={setSearchQuery}
                placeholder="Buscar productos..."
              />
            </div>

            {/* Category Filter - Centered */}
            <div className="flex justify-center">
              {categoriesLoading ? (
                <div className="flex justify-center py-2">
                  <Spinner />
                </div>
              ) : (
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              )}
            </div>
          </div>

          {/* Results info */}
          {!productsLoading && (
            <div className="mb-8 text-center">
              <p className="text-sm font-medium text-gray-600">
                <span className="text-emerald-600 font-bold text-base">{products.length}</span>{' '}
                {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                {selectedCategory && (
                  <span>
                    {' '}en{' '}
                    <span className="font-semibold text-emerald-600">
                      {categories.find(c => c.slug === selectedCategory)?.name}
                    </span>
                  </span>
                )}
                {searchQuery && (
                  <span>
                    {' '}para{' '}
                    <span className="font-semibold text-gray-900">&quot;{searchQuery}&quot;</span>
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Products Grid */}
          {productsLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Spinner />
              <p className="mt-4 text-gray-600 font-medium">Cargando productos...</p>
            </div>
          ) : (
            <ProductGrid
              products={products}
              onProductClick={handleProductClick}
            />
          )}
        </div>
      </section>

      {/* Product detail modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
