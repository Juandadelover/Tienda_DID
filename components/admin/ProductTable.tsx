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
  EyeOff,
  Search,
  Filter,
  ChevronUp,
  Plus
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

  // Search, sort, and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'category_name' | 'base_price' | 'is_available'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Bulk actions state
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

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
        setSelectedProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(productToDelete.id);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectProduct = (id: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProducts(newSelected);
    setSelectAll(newSelected.size === filteredProducts.length);
  };

  // Bulk actions
  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) return;

    const confirmMessage = `¿Estás seguro de que deseas eliminar ${selectedProducts.size} producto${selectedProducts.size !== 1 ? 's' : ''}? Esta acción no se puede deshacer.`;

    if (!confirm(confirmMessage)) return;

    setIsDeleting(true);

    try {
      const deletePromises = Array.from(selectedProducts).map(id =>
        fetch(`/api/products/${id}`, { method: 'DELETE' })
      );

      const results = await Promise.all(deletePromises);
      const allSuccessful = results.every(res => res.ok);

      if (allSuccessful) {
        onRefresh();
        setSelectedProducts(new Set());
        setSelectAll(false);
      } else {
        alert('Error al eliminar algunos productos');
      }
    } catch (err) {
      console.error('Error bulk deleting products:', err);
      alert('Error de conexión');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkToggleAvailability = async (makeAvailable: boolean) => {
    if (selectedProducts.size === 0) return;

    setIsDeleting(true);

    try {
      const togglePromises = Array.from(selectedProducts).map(id =>
        fetch(`/api/products/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_available: makeAvailable }),
        })
      );

      const results = await Promise.all(togglePromises);
      const allSuccessful = results.every(res => res.ok);

      if (allSuccessful) {
        onRefresh();
        setSelectedProducts(new Set());
        setSelectAll(false);
      } else {
        alert('Error al actualizar algunos productos');
      }
    } catch (err) {
      console.error('Error bulk toggling availability:', err);
      alert('Error de conexión');
    } finally {
      setIsDeleting(false);
    }
  };

  // Get unique categories for filter
  const uniqueCategories = Array.from(new Set(products.map(p => p.category_name))).sort();

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAvailability = availabilityFilter === 'all' ||
                                 (availabilityFilter === 'available' && product.is_available) ||
                                 (availabilityFilter === 'unavailable' && !product.is_available);
      const matchesCategory = categoryFilter === 'all' || product.category_name === categoryFilter;
      return matchesSearch && matchesAvailability && matchesCategory;
    })
    .sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortField) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'category_name':
          aVal = a.category_name.toLowerCase();
          bVal = b.category_name.toLowerCase();
          break;
        case 'base_price':
          aVal = a.has_variants ? Math.min(...a.variants.map(v => v.price)) : (a.base_price || 0);
          bVal = b.has_variants ? Math.min(...b.variants.map(v => v.price)) : (b.base_price || 0);
          break;
        case 'is_available':
          aVal = a.is_available ? 1 : 0;
          bVal = b.is_available ? 1 : 0;
          break;
        default:
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
      }

      const direction = sortDirection === 'asc' ? 1 : -1;
      return aVal < bVal ? -direction : aVal > bVal ? direction : 0;
    });

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
      {/* Bulk Actions Bar */}
      {selectedProducts.size > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              {selectedProducts.size} producto{selectedProducts.size !== 1 ? 's' : ''} seleccionado{selectedProducts.size !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkToggleAvailability(true)}
              className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Disponible
            </button>
            <button
              onClick={() => handleBulkToggleAvailability(false)}
              className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Agotado
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value as 'all' | 'available' | 'unavailable')}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        >
          <option value="all">Todos los estados</option>
          <option value="available">Disponibles</option>
          <option value="unavailable">Agotados</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        >
          <option value="all">Todas las categorías</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No se encontraron productos</h3>
            <p className="text-slate-500">Intenta con otra búsqueda o filtro</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3">
                <div className="shrink-0 pt-1">
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.id)}
                    onChange={() => toggleSelectProduct(product.id)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{product.name}</h3>
                      <p className="text-sm text-slate-500">{product.category_name}</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {openMenuId === product.id && (
                        <div className="absolute right-0 top-10 z-20 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2">
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
                      )}
                    </div>
                  </div>
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
          ))
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors px-2 py-1 rounded"
                    onClick={() => {
                      if (sortField === 'name') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('name');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    Producto
                    {sortField === 'name' && (
                      <ChevronUp className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors px-2 py-1 rounded"
                    onClick={() => {
                      if (sortField === 'category_name') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('category_name');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    Categoría
                    {sortField === 'category_name' && (
                      <ChevronUp className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors px-2 py-1 rounded"
                    onClick={() => {
                      if (sortField === 'base_price') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('base_price');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    Precio
                    {sortField === 'base_price' && (
                      <ChevronUp className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <div
                    className="flex items-center gap-1 justify-center cursor-pointer hover:bg-slate-100 transition-colors px-2 py-1 rounded"
                    onClick={() => {
                      if (sortField === 'is_available') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('is_available');
                        setSortDirection('asc');
                      }
                    }}
                  >
                    Estado
                    {sortField === 'is_available' && (
                      <ChevronUp className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                        <Search className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">No se encontraron productos</p>
                        <p className="text-sm mt-1">Intenta con otra búsqueda o filtro</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`hover:bg-slate-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                >
                  {/* Selection Checkbox */}
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => toggleSelectProduct(product.id)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>

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
              ))
            )}
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
