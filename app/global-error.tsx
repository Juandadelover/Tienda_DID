'use client';

/**
 * Global Error Component
 * Displays when an unhandled error occurs in the application
 */

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to console in development
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="es">
      <body className="antialiased">
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
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
              Lo sentimos, ocurrió un error inesperado. Por favor intenta nuevamente.
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
                {error.digest && (
                  <p className="text-xs font-mono text-slate-400 mt-2">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
