'use client';

import useSWR from 'swr';
import type { Category } from '@/types/category';

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Fetcher para categorías
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al cargar categorías');
  return res.json();
};

export function useCategories(): UseCategoriesReturn {
  const { data, error, isLoading, mutate } = useSWR('/api/categories', fetcher, {
    // Las categorías cambian poco - caché de 5 minutos
    dedupingInterval: 300000,
    // No revalidar al enfocar (datos estables)
    revalidateOnFocus: false,
    // Mantener datos previos mientras carga
    keepPreviousData: true,
    // Reintentar 2 veces en caso de error
    errorRetryCount: 2,
    // No refrescar automáticamente
    refreshInterval: 0,
  });

  return {
    categories: data?.categories || [],
    loading: isLoading,
    error: error?.message || null,
    refetch: () => mutate(),
  };
}
