'use client';

/**
 * Admin Products List Page
 * Display all products with management actions
 */

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ProductTable } from '@/components/admin/ProductTable';
import { Plus } from 'lucide-react';

interface Variant {
  id: string;
  variant_name: string;
  price: number;
  is_available: boolean;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  category_name: string;
  image_url?: string;
  is_available: boolean;
  has_variants: boolean;
  base_price?: number;
  variants: Variant[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      // Fetch all products (including unavailable)
      const res = await fetch('/api/products?available=false');
      if (!res.ok) throw new Error('Error al cargar productos');
      
      const data = await res.json();
      
      // Also fetch available products and merge
      const resAvailable = await fetch('/api/products?available=true');
      const dataAvailable = await resAvailable.json();
      
      // Combine and dedupe
      const allProducts = [...data.products, ...dataAvailable.products];
      const uniqueProducts = allProducts.filter((p, i, arr) => 
        arr.findIndex(x => x.id === p.id) === i
      );
      
      setProducts(uniqueProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error al cargar productos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Enhanced Page Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sm:py-6">
        {/* Breadcrumb - Hidden on very small screens */}
        <nav className="hidden sm:flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/admin" className="text-slate-500 hover:text-slate-700 transition-colors">
                Admin
              </a>
            </li>
            <li><span className="text-slate-400">/</span></li>
            <li><span className="text-slate-900 font-medium">Productos</span></li>
          </ol>
        </nav>

        {/* Mobile: Stack layout / Desktop: Side by side */}
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-start sm:justify-between sm:gap-4">
          {/* Title Section */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
              Gestión de Productos
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-600">
              Administra el catálogo de productos de tu tienda
            </p>
          </div>
          
          {/* Add Product Button */}
          <Link href="/admin/productos/nuevo" className="block sm:shrink-0">
            <Button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-5 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all text-sm sm:text-base">
              <Plus className="w-5 h-5" />
              Agregar Producto
            </Button>
          </Link>
        </div>

        {/* Quick stats */}
        <div className="flex gap-2 sm:gap-4 mt-4 overflow-x-auto pb-1 -mx-1 px-1">
          <div className="bg-emerald-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-emerald-100 shrink-0">
            <div className="text-lg sm:text-xl font-bold text-emerald-700">{products.length}</div>
            <div className="text-xs text-emerald-600 font-medium">Total</div>
          </div>
          <div className="bg-green-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-green-100 shrink-0">
            <div className="text-lg sm:text-xl font-bold text-green-700">
              {products.filter(p => p.is_available).length}
            </div>
            <div className="text-xs text-green-600 font-medium">Disponibles</div>
          </div>
          <div className="bg-blue-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-blue-100 shrink-0">
            <div className="text-lg sm:text-xl font-bold text-blue-700">
              {products.filter(p => p.has_variants).length}
            </div>
            <div className="text-xs text-blue-600 font-medium">Con variantes</div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Products Table */}
        <ProductTable products={products} onRefresh={fetchProducts} />
      </div>
    </div>
  );
}
