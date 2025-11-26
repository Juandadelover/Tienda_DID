'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Ref para controlar cancelación de requests
  const abortControllerRef = useRef<AbortController | null>(null);
  // Ref para evitar fetches duplicados
  const lastFetchRef = useRef<string>('');

  const fetchProducts = useCallback(async (signal?: AbortSignal) => {
    // Build query string para comparar
    const params = new URLSearchParams();
    if (options.category) params.append('category', options.category);
    if (options.available !== undefined) params.append('available', String(options.available));
    if (options.search) params.append('search', options.search);
    
    const queryString = params.toString();
    const fetchKey = queryString;
    
    // Evitar fetch duplicado si la query es la misma
    if (fetchKey === lastFetchRef.current && products.length > 0) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);

      const url = `/api/products${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, { 
        signal,
        // Cache por 30 segundos
        next: { revalidate: 30 }
      });

      // Verificar si fue abortado
      if (signal?.aborted) {
        return;
      }

      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }

      const data = await response.json();
      
      // Verificar nuevamente si fue abortado antes de actualizar estado
      if (signal?.aborted) {
        return;
      }
      
      lastFetchRef.current = fetchKey;
      setProducts(data.products || []);
    } catch (err) {
      // Ignorar errores de abort
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setProducts([]);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [options.category, options.available, options.search]);

  useEffect(() => {
    // Cancelar request anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Crear nuevo controller
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    // Ejecutar fetch
    fetchProducts(controller.signal);
    
    // Cleanup: cancelar al desmontar o cuando cambian las dependencias
    return () => {
      controller.abort();
    };
  }, [fetchProducts]);

  const refetch = useCallback(() => {
    lastFetchRef.current = ''; // Forzar nuevo fetch
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    fetchProducts(controller.signal);
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch,
  };
}

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProduct(id: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) {
      setProduct(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/products/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Producto no encontrado');
        }
        throw new Error('Error al cargar producto');
      }

      const data = await response.json();
      setProduct(data.product);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
}
