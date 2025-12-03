'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

interface SWRProviderProps {
  children: ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        // Configuración global de SWR
        fetcher: async (url: string) => {
          const res = await fetch(url);
          if (!res.ok) {
            const error = new Error('Error en la solicitud');
            throw error;
          }
          return res.json();
        },
        // No revalidar automáticamente al enfocar la ventana
        revalidateOnFocus: false,
        // Reintentar 2 veces en caso de error
        errorRetryCount: 2,
        // Deduplicar peticiones en el mismo intervalo
        dedupingInterval: 30000,
        // Mantener datos en caché aunque el componente se desmonte
        keepPreviousData: true,
        // Tiempo de espera para considerar datos como "stale"
        focusThrottleInterval: 5000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
