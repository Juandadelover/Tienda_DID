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
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Productos</h1>
          <p className="text-slate-600 mt-1">
            {products.length} producto{products.length !== 1 ? 's' : ''} en total
          </p>
        </div>
        <Link href="/admin/productos/nuevo">
          <Button className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar Producto
          </Button>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Products Table */}
      <ProductTable products={products} onRefresh={fetchProducts} />
    </div>
  );
}
