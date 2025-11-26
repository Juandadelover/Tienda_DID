'use client';

/**
 * Edit Product Page
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProductForm } from '@/components/admin/ProductForm';
import { Spinner } from '@/components/ui/Spinner';
import { Variant } from '@/components/admin/VariantManager';

interface ProductData {
  id: string;
  name: string;
  description?: string;
  category_id: string;
  image_url?: string;
  unit_type: 'unit' | 'weight';
  has_variants: boolean;
  base_price?: number;
  variants: Variant[];
}

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Producto no encontrado');
          }
          throw new Error('Error al cargar producto');
        }

        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar producto');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg inline-block">
          {error}
        </div>
        <div className="mt-4">
          <Link
            href="/admin/productos"
            className="text-emerald-600 hover:text-emerald-700"
          >
            ← Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <Link
          href="/admin/productos"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a productos
        </Link>
        
        <h1 className="text-3xl font-bold text-slate-900">Editar Producto</h1>
        <p className="text-slate-600 mt-1">
          Modifica la información del producto
        </p>
      </div>

      {/* Product Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ProductForm
          productId={productId}
          initialData={{
            name: product.name,
            description: product.description,
            category_id: product.category_id,
            image_url: product.image_url,
            unit_type: product.unit_type,
            has_variants: product.has_variants,
            base_price: product.base_price,
            variants: product.variants,
          }}
        />
      </div>
    </div>
  );
}
