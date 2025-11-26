import { Spinner } from '@/components/ui/Spinner';

/**
 * Home Page - Catalog
 * Temporary placeholder until catalog is implemented
 */
export default function Home() {
  return (
    <div className="container-custom py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-3xl font-bold text-text-primary">Tienda DID</h1>
        <p className="text-gray-600">El catálogo de productos se implementará en la siguiente fase.</p>
        <Spinner size="lg" label="Próximamente..." />
      </div>
    </div>
  );
}
