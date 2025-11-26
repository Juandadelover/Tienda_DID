'use client';

/**
 * Create New Product Page
 */

import React from 'react';
import Link from 'next/link';
import { ProductForm } from '@/components/admin/ProductForm';

export default function NewProductPage() {
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
        
        <h1 className="text-3xl font-bold text-slate-900">Nuevo Producto</h1>
        <p className="text-slate-600 mt-1">
          Completa el formulario para agregar un nuevo producto al catálogo
        </p>
      </div>

      {/* Product Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ProductForm />
      </div>
    </div>
  );
}
