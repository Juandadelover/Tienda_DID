/**
 * Loading Component
 * Displays while page content is loading
 */

import { Spinner } from '@/components/ui/Spinner';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-slate-500">Cargando...</p>
      </div>
    </div>
  );
}
