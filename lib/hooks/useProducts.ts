'use client';

import useSWR from 'swr';
import type { Product } from '@/types/product';

interface UseProductsOptions {
  category?: string;
  available?: boolean;
  search?: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Fetcher global para SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
};

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  // Crear una clave única para SWR que incluya todos los parámetros de filtro
  const cacheKey = `/api/products?${new URLSearchParams({
    ...(options.category && { category: options.category }),
    ...(options.available !== undefined && { available: String(options.available) }),
    ...(options.search && { search: options.search }),
  }).toString()}`;

  const { data, error, isLoading, mutate } = useSWR(cacheKey, fetcher, {
    // Mantener datos en caché por 60 segundos
    dedupingInterval: 60000,
    // Revalidar al volver a enfocar la ventana
    revalidateOnFocus: false,
    // Mantener datos previos mientras carga nuevos
    keepPreviousData: true,
    // Reintentar en caso de error
    errorRetryCount: 2,
    // Caché persistente - no revalidar automáticamente tan seguido
    refreshInterval: 0,
    // Forzar revalidación cuando cambian los parámetros
    revalidateIfStale: true,
  });

  return {
    products: data?.products || [],
    loading: isLoading,
    error: error?.message || null,
    refetch: () => mutate(),
  };
}

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Fetcher para producto individual
const productFetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 404) throw new Error('Producto no encontrado');
  if (!res.ok) throw new Error('Error al cargar producto');
  return res.json();
};

export function useProduct(id: string): UseProductReturn {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/products/${id}` : null,
    productFetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
      keepPreviousData: true,
      errorRetryCount: 2,
    }
  );

  return {
    product: data?.product || null,
    loading: isLoading,
    error: error?.message || null,
    refetch: () => mutate(),
  };
}
