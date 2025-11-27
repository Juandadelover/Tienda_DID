'use client';

/**
 * ProductTable Component
 * Admin product list with edit, delete, and availability toggle
 * Mobile-first responsive design with card layout on mobile
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency } from '@/lib/utils/formatters';
import { 
  Pencil, 
  Trash2, 
  Package, 
  Image as ImageIcon,
  MoreVertical,
  Eye,
  EyeOff
} from 'lucide-react';

interface Variant {
  id: string;
  variant_name: string;
  price: number;
  is_available: boolean;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  category_name: string;
  image_url?: string;
  is_available: boolean;
  has_variants: boolean;
  base_price?: number;
  variants: Variant[];
}

interface ProductTableProps {
  products: Product[];
  onRefresh: () => void;
}

export function ProductTable({ products, onRefresh }: ProductTableProps) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingId, setIsTogglingId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const getProductPrice = (product: Product): string => {
    if (product.has_variants && product.variants.length > 0) {
      const prices = product.variants.map(v => v.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      if (minPrice === maxPrice) {
        return formatCurrency(minPrice);
      }
      return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;
    }
    return product.base_price ? formatCurrency(product.base_price) : '-';
  };

  const handleToggleAvailability = async (product: Product) => {
    setIsTogglingId(product.id);
    setOpenMenuId(null);
    
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_available: !product.is_available }),
      });

      if (res.ok) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
    } finally {
      setIsTogglingId(null);
    }
  };

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setDeleteModalOpen(false);
        setProductToDelete(null);
        onRefresh();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 text-center border border-slate-100">
        <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No hay productos</h3>
        <p className="text-slate-500 mb-6 max-w-sm mx-auto">Comienza agregando tu primer producto al catálogo</p>
        <Link href="/admin/productos/nuevo">
          <Button className="inline-flex items-center gap-2">
            <span>+</span>
            Agregar Producto
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-3">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex gap-3">
              {/* Product Image */}
              <div className="shrink-0">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">{product.name}</h3>
                    <p className="text-sm text-slate-500">{product.category_name}</p>
                  </div>
                  
                  {/* Mobile Actions Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    
                    {openMenuId === product.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 top-10 z-20 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-scale-in">
                          <Link
                            href={`/admin/productos/${product.id}/editar`}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                            onClick={() => setOpenMenuId(null)}
                          >
                            <Pencil className="w-4 h-4" />
                            Editar
                          </Link>
                          <button
                            onClick={() => handleToggleAvailability(product)}
                            disabled={isTogglingId === product.id}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            {product.is_available ? (
                              <>
                                <EyeOff className="w-4 h-4" />
                                Marcar agotado
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4" />
                                Marcar disponible
                              </>
                            )}
                          </button>
                          <hr className="my-2 border-slate-100" />
                          <button
                            onClick={() => openDeleteModal(product)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Price and Status Row */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-900">{getProductPrice(product)}</span>
                  <button
                    onClick={() => handleToggleAvailability(product)}
                    disabled={isTogglingId === product.id}
                    className="focus:outline-none active:scale-95 transition-transform"
                  >
                    <Badge 
                      variant={product.is_available ? 'success' : 'error'}
                      className="text-xs px-2.5 py-1"
                    >
                      {isTogglingId === product.id ? '...' : (product.is_available ? 'Disponible' : 'Agotado')}
                    </Badge>
                  </button>
                </div>
                
                {product.has_variants && product.variants.length > 0 && (
                  <p className="text-xs text-slate-400 mt-2">
                    {product.variants.length} variante{product.variants.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product, index) => (
                <tr 
                  key={product.id} 
                  className={`hover:bg-slate-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                >
                  {/* Product Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg ring-1 ring-slate-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center ring-1 ring-slate-200">
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate max-w-[200px]">{product.name}</p>
                        {product.has_variants && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            {product.variants.length} variante{product.variants.length !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-sm text-slate-600 font-medium">
                      {product.category_name}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">
                      {getProductPrice(product)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleAvailability(product)}
                      disabled={isTogglingId === product.id}
                      className="focus:outline-none hover:scale-105 active:scale-95 transition-transform inline-block"
                    >
                      <Badge 
                        variant={product.is_available ? 'success' : 'error'}
                        className="text-xs px-3 py-1.5 font-medium"
                      >
                        {isTogglingId === product.id ? '...' : (product.is_available ? 'Disponible' : 'Agotado')}
                      </Badge>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/productos/${product.id}/editar`}>
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => openDeleteModal(product)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Eliminar Producto"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-slate-900 font-medium">
                ¿Eliminar "{productToDelete?.name}"?
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Esta acción no se puede deshacer. El producto será eliminado permanentemente.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => setDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
