'use client';

/**
 * Admin Categories Management Page
 * Route: /admin/categorias
 */

import React from 'react';
import { CategoryManager } from '@/components/admin/CategoryManager';

export default function AdminCategoriasPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">
          Gestión de Categorías
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Administra las categorías de productos de tu tienda
        </p>
      </div>

      {/* Category Manager */}
      <CategoryManager />
    </div>
  );
}
