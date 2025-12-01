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
      <div className="bg-white border-b border-slate-200 px-6 py-6">
        <nav className="flex mb-4" aria-label="Breadcrumb">
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

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Gestión de Productos
            </h1>
            <p className="mt-2 text-slate-600 text-lg">
              Administra el catálogo de productos de tu tienda
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4">
            <div className="bg-emerald-50 px-4 py-3 rounded-lg border border-emerald-100">
              <div className="text-xl font-bold text-emerald-700">{products.length}</div>
              <div className="text-xs text-emerald-600 font-medium">Total</div>
            </div>
            <div className="bg-green-50 px-4 py-3 rounded-lg border border-green-100">
              <div className="text-xl font-bold text-green-700">
                {products.filter(p => p.is_available).length}
              </div>
              <div className="text-xs text-green-600 font-medium">Disponibles</div>
            </div>
            <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-100">
              <div className="text-xl font-bold text-blue-700">
                {products.filter(p => p.has_variants).length}
              </div>
              <div className="text-xs text-blue-600 font-medium">Con variantes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
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
