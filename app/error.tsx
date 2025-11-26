'use client';

/**
 * Error Component
 * Displays when an error occurs in a route segment
 */

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <svg 
            className="w-8 h-8 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          ¡Algo salió mal!
        </h1>
        <p className="text-slate-600 mb-6">
          Lo sentimos, ocurrió un error al cargar esta página.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>
            Intentar de nuevo
          </Button>
          <Button 
            variant="secondary"
            onClick={() => window.location.href = '/'}
          >
            Ir al inicio
          </Button>
        </div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-slate-100 rounded-lg text-left">
            <p className="text-xs font-mono text-slate-500 break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
