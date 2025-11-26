/**
 * Not Found Component
 * Displays when a page is not found (404)
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <svg 
            className="w-10 h-10 text-slate-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          404
        </h1>
        <p className="text-lg text-slate-600 mb-6">
          Página no encontrada
        </p>
        <p className="text-slate-500 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button>
              Ir al catálogo
            </Button>
          </Link>
          <Link href="/carrito">
            <Button variant="secondary">
              Ver carrito
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
