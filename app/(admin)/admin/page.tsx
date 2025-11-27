'use client';

/**
 * Admin Dashboard Page
 * Summary stats and quick actions
 * Modernized UI with premium cards and interactions
 * Mobile-first responsive design with UX best practices
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spinner } from '@/components/ui/Spinner';
import { createClient } from '@/lib/supabase/client';
import {
  Package,
  CheckCircle2,
  XCircle,
  FolderTree,
  Plus,
  List,
  Info,
  TrendingUp,
  ArrowRight,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  availableProducts: number;
  unavailableProducts: number;
  totalCategories: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();

      try {
        // Fetch products count
        const { count: totalProducts, error: productsError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        if (productsError) throw productsError;

        // Fetch available products count
        const { count: availableProducts, error: availableError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('is_available', true);

        if (availableError) throw availableError;

        // Fetch categories count
        const { count: totalCategories, error: categoriesError } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true });

        if (categoriesError) throw categoriesError;

        setStats({
          totalProducts: totalProducts || 0,
          availableProducts: availableProducts || 0,
          unavailableProducts: (totalProducts || 0) - (availableProducts || 0),
          totalCategories: totalCategories || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Error al cargar las estadísticas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Spinner className="w-10 h-10 text-emerald-600 mx-auto" />
          <p className="text-slate-500 text-sm">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl shadow-sm max-w-lg mx-auto flex items-start gap-3">
          <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Error al cargar</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate availability percentage
  const availabilityPercent = stats?.totalProducts 
    ? Math.round((stats.availableProducts / stats.totalProducts) * 100) 
    : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Page Header - Mobile optimized */}
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
                  Resumen de tu tienda
                </p>
              </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-100 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline">Sistema</span> Activo
          </div>
        </div>
      </header>

      {/* Stats Grid - Mobile-first 2x2 grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Products */}
        <article className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <Package className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              Total
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wide">Productos</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tabular-nums">
              {stats?.totalProducts}
            </h3>
          </div>
        </article>

        {/* Available Products */}
        <article className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-emerald-100 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              {availabilityPercent}%
            </span>
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wide">Disponibles</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600 tabular-nums">
              {stats?.availableProducts}
            </h3>
          </div>
        </article>

        {/* Unavailable Products */}
        <article className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-300">
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wide">Agotados</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600 tabular-nums">
              {stats?.unavailableProducts}
            </h3>
          </div>
        </article>

        {/* Categories */}
        <article className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-purple-100 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300">
              <FolderTree className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wide">Categorías</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 tabular-nums">
              {stats?.totalCategories}
            </h3>
          </div>
        </article>
      </section>

      {/* Quick Actions - Full width on mobile */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Acciones Rápidas
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Add Product - Primary action */}
          <Link href="/admin/productos/nuevo" className="group col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-5 sm:p-6 rounded-2xl shadow-lg shadow-emerald-500/20 text-white overflow-hidden min-h-[120px] flex flex-col justify-between active:scale-[0.98] transition-transform touch-manipulation">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-xl -ml-5 -mb-5"></div>
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                  <Plus className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
              
              <div className="relative z-10 mt-3">
                <h3 className="font-bold text-lg sm:text-xl">Agregar Producto</h3>
                <p className="text-emerald-100 text-sm mt-0.5">Nuevo ítem al catálogo</p>
              </div>
            </div>
          </Link>

          {/* View Products */}
          <Link href="/admin/productos" className="group">
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 min-h-[120px] flex flex-col justify-between active:scale-[0.98] touch-manipulation relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[100%] -mr-2 -mt-2"></div>
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <List className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
              
              <div className="relative z-10 mt-3">
                <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Ver Productos</h3>
                <p className="text-slate-500 text-sm mt-0.5">Inventario y precios</p>
              </div>
            </div>
          </Link>

          {/* Manage Categories */}
          <Link href="/admin/categorias" className="group">
            <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300 min-h-[120px] flex flex-col justify-between active:scale-[0.98] touch-manipulation relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-50 to-transparent rounded-bl-[100%] -mr-2 -mt-2"></div>
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <FolderTree className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
              </div>
              
              <div className="relative z-10 mt-3">
                <h3 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">Categorías</h3>
                <p className="text-slate-500 text-sm mt-0.5">Organiza tu tienda</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Info Card - Full width on mobile */}
      <section className="mt-6 sm:mt-8">
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-xl text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
              <Info className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="font-bold text-xl sm:text-2xl">Bienvenido al Panel</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Gestiona todos los aspectos de tu tienda. Los cambios se reflejan inmediatamente en el catálogo público.
              </p>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-5 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base shrink-0 min-h-[44px] active:scale-95 touch-manipulation"
            >
              Ver tienda
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
