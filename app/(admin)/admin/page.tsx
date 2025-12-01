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
    <div className="p-6 lg:p-8 2xl:p-12 space-y-6 lg:space-y-8 2xl:space-y-10 animate-fade-in max-w-7xl 2xl:max-w-[1800px] mx-auto">
      {/* Page Header - Enhanced for large screens */}
      <header className="space-y-3 lg:space-y-4">
        <div className="flex items-start justify-between gap-3 lg:gap-6">
          <div className="space-y-1 lg:space-y-2">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-5xl font-bold text-slate-900 tracking-tight">
                  Dashboard
                </h1>
                <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-slate-500 hidden sm:block mt-1">
                  Resumen de tu tienda
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 text-xs lg:text-sm 2xl:text-base font-medium text-emerald-700 bg-emerald-50 px-3 lg:px-4 py-2 lg:py-2.5 rounded-full border border-emerald-100 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline">Sistema</span> Activo
          </div>
        </div>
      </header>

      {/* Stats Grid - Enhanced for large screens */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 2xl:gap-8">
        {/* Total Products */}
        <article className="bg-white p-4 sm:p-5 lg:p-6 2xl:p-8 rounded-2xl lg:rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] sm:text-xs lg:text-sm font-semibold text-blue-600 bg-blue-50 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full">
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
              Total
            </div>
          </div>
          <div className="space-y-0.5 lg:space-y-1">
            <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-500 uppercase tracking-wide">Productos</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-slate-900 tabular-nums">
              {stats?.totalProducts}
            </h3>
          </div>
        </article>

        {/* Available Products */}
        <article className="bg-white p-4 sm:p-5 lg:p-6 2xl:p-8 rounded-2xl lg:rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-emerald-100 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            </div>
            <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-emerald-600 bg-emerald-50 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full">
              {availabilityPercent}%
            </span>
          </div>
          <div className="space-y-0.5 lg:space-y-1">
            <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-500 uppercase tracking-wide">Disponibles</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-emerald-600 tabular-nums">
              {stats?.availableProducts}
            </h3>
          </div>
        </article>

        {/* Unavailable Products */}
        <article className="bg-white p-4 sm:p-5 lg:p-6 2xl:p-8 rounded-2xl lg:rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-amber-100 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-300">
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            </div>
          </div>
          <div className="space-y-0.5 lg:space-y-1">
            <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-500 uppercase tracking-wide">Agotados</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-amber-600 tabular-nums">
              {stats?.unavailableProducts}
            </h3>
          </div>
        </article>

        {/* Categories */}
        <article className="bg-white p-4 sm:p-5 lg:p-6 2xl:p-8 rounded-2xl lg:rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-purple-100 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300">
              <FolderTree className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            </div>
          </div>
          <div className="space-y-0.5 lg:space-y-1">
            <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-500 uppercase tracking-wide">Categorías</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-purple-600 tabular-nums">
              {stats?.totalCategories}
            </h3>
          </div>
        </article>
      </section>

      {/* Quick Actions - Enhanced for large screens */}
      <section className="space-y-4 lg:space-y-6 2xl:space-y-8">
        <div className="flex items-center gap-2 lg:gap-3">
          <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8 text-emerald-500" />
          <h2 className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-bold text-slate-900">
            Acciones Rápidas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 2xl:gap-8">
          {/* Add Product - Primary action */}
          <Link href="/admin/productos/nuevo" className="group col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-5 sm:p-6 lg:p-8 2xl:p-10 rounded-2xl lg:rounded-3xl shadow-lg shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1 text-white overflow-hidden min-h-[120px] lg:min-h-[180px] 2xl:min-h-[220px] flex flex-col justify-between transition-all duration-300 touch-manipulation">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 2xl:w-64 2xl:h-64 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 lg:w-32 lg:h-32 2xl:w-40 2xl:h-40 bg-white/5 rounded-full blur-xl -ml-5 -mb-5"></div>

              <div className="relative z-10 flex items-start justify-between">
                <div className="w-12 h-12 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 bg-white/20 backdrop-blur-sm rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                  <Plus className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10" />
                </div>
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="relative z-10 mt-3 lg:mt-4">
                <h3 className="font-bold text-lg sm:text-xl lg:text-2xl 2xl:text-3xl">Agregar Producto</h3>
                <p className="text-emerald-100 text-sm lg:text-base 2xl:text-lg mt-0.5 lg:mt-1">Nuevo ítem al catálogo</p>
              </div>
            </div>
          </Link>

          {/* View Products */}
          <Link href="/admin/productos" className="group">
            <div className="bg-white p-5 sm:p-6 lg:p-8 2xl:p-10 rounded-2xl lg:rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 min-h-[120px] lg:min-h-[180px] 2xl:min-h-[220px] flex flex-col justify-between touch-manipulation relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 lg:w-32 lg:h-32 2xl:w-40 2xl:h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[100%] -mr-2 -mt-2"></div>

              <div className="relative z-10 flex items-start justify-between">
                <div className="w-12 h-12 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 bg-blue-100 text-blue-600 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <List className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10" />
                </div>
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="relative z-10 mt-3 lg:mt-4">
                <h3 className="font-bold text-base lg:text-xl 2xl:text-2xl text-slate-900 group-hover:text-blue-700 transition-colors">Ver Productos</h3>
                <p className="text-slate-500 text-sm lg:text-base 2xl:text-lg mt-0.5 lg:mt-1">Inventario y precios</p>
              </div>
            </div>
          </Link>

          {/* Manage Categories */}
          <Link href="/admin/categorias" className="group">
            <div className="bg-white p-5 sm:p-6 lg:p-8 2xl:p-10 rounded-2xl lg:rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 min-h-[120px] lg:min-h-[180px] 2xl:min-h-[220px] flex flex-col justify-between touch-manipulation relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 lg:w-32 lg:h-32 2xl:w-40 2xl:h-40 bg-gradient-to-br from-purple-50 to-transparent rounded-bl-[100%] -mr-2 -mt-2"></div>

              <div className="relative z-10 flex items-start justify-between">
                <div className="w-12 h-12 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 bg-purple-100 text-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <FolderTree className="w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10" />
                </div>
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="relative z-10 mt-3 lg:mt-4">
                <h3 className="font-bold text-base lg:text-xl 2xl:text-2xl text-slate-900 group-hover:text-purple-700 transition-colors">Categorías</h3>
                <p className="text-slate-500 text-sm lg:text-base 2xl:text-lg mt-0.5 lg:mt-1">Organiza tu tienda</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Info Card - Enhanced for large screens */}
      <section className="mt-6 sm:mt-8 lg:mt-10 2xl:mt-12">
        <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 sm:p-6 lg:p-10 xl:p-12 2xl:p-16 rounded-2xl lg:rounded-3xl xl:rounded-[2rem] shadow-xl text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 lg:w-64 lg:h-64 2xl:w-80 2xl:h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 2xl:w-64 2xl:h-64 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96 2xl:w-[32rem] 2xl:h-[32rem] bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 lg:gap-8 2xl:gap-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
              <Info className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 text-white" />
            </div>

            <div className="flex-1 space-y-2 lg:space-y-3 2xl:space-y-4">
              <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">Bienvenido al Panel</h3>
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg 2xl:text-xl leading-relaxed max-w-3xl 2xl:max-w-4xl">
                Gestiona todos los aspectos de tu tienda. Los cambios se reflejan inmediatamente en el catálogo público.
              </p>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 lg:gap-3 bg-white/10 hover:bg-white/20 hover:scale-105 backdrop-blur-sm text-white font-semibold px-5 lg:px-6 2xl:px-8 py-3 lg:py-4 2xl:py-5 rounded-xl lg:rounded-2xl transition-all duration-300 text-sm sm:text-base lg:text-lg 2xl:text-xl shrink-0 min-h-[44px] touch-manipulation"
            >
              Ver tienda
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
