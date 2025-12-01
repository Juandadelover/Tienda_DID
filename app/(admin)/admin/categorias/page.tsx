'use client';

/**
 * Admin Categories Management Page
 * Route: /admin/categorias
 */

import React from 'react';
import { CategoryManager } from '@/components/admin/CategoryManager';

export default function AdminCategoriasPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Enhanced Page Header - Fixed at top */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sm:py-6 flex-shrink-0">
        <nav className="flex mb-3 sm:mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm sm:text-base">
            <li>
              <a href="/admin" className="text-slate-500 hover:text-slate-700 transition-colors">
                Admin
              </a>
            </li>
            <li><span className="text-slate-400">/</span></li>
            <li><span className="text-slate-900 font-medium">Categorías</span></li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Gestión de Categorías
            </h1>
            <p className="mt-1 sm:mt-2 text-slate-600 text-sm sm:text-lg">
              Organiza y administra las categorías de productos
            </p>
          </div>

          {/* Stats will be shown in CategoryManager component */}
        </div>
      </div>

      {/* Category Manager - Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6">
          <CategoryManager />
        </div>
      </div>
    </div>
  );
}
