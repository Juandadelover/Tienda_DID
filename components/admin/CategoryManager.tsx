'use client';

/**
 * CategoryManager Component
 * CRUD interface for managing product categories
 * Modernized UI with premium table design
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';
import {
  Pencil,
  Trash2,
  Plus,
  FolderTree,
  Search,
  AlertTriangle,
  Package,
  ChevronUp,
  Filter
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  product_count: number;
  created_at: string;
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create/Edit form state
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formName, setFormName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting state
  const [sortField, setSortField] = useState<'name' | 'slug' | 'product_count'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter state
  const [filterStatus, setFilterStatus] = useState<'all' | 'with-products' | 'empty'>('all');

  // Selection state for bulk actions
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/categories');
      const data = await res.json();

      if (res.ok) {
        setCategories(data.categories);
      } else {
        setError(data.error || 'Error al cargar categorías');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter and sort categories
  const filteredCategories = categories
    .filter(cat => {
      const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' ||
        (filterStatus === 'with-products' && cat.product_count > 0) ||
        (filterStatus === 'empty' && cat.product_count === 0);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      return aVal < bVal ? -direction : aVal > bVal ? direction : 0;
    });

  // Open form for creating new category
  const openCreateForm = () => {
    setEditingCategory(null);
    setFormName('');
    setFormError(null);
    setShowForm(true);
  };

  // Open form for editing existing category
  const openEditForm = (category: Category) => {
    setEditingCategory(category);
    setFormName(category.name);
    setFormError(null);
    setShowForm(true);
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormName('');
    setFormError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = formName.trim();

    if (!trimmedName) {
      setFormError('El nombre es requerido');
      return;
    }

    if (trimmedName.length > 100) {
      setFormError('El nombre no puede exceder 100 caracteres');
      return;
    }

    setIsSaving(true);

    try {
      const isEditing = !!editingCategory;
      const url = isEditing
        ? `/api/categories/${editingCategory.id}`
        : '/api/categories';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName }),
      });

      const data = await res.json();

      if (res.ok) {
        closeForm();
        fetchCategories();
      } else {
        setFormError(data.error || 'Error al guardar categoría');
      }
    } catch (err) {
      console.error('Error saving category:', err);
      setFormError('Error de conexión');
    } finally {
      setIsSaving(false);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteError(null);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
    setDeleteError(null);
  };

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedCategories(new Set());
    } else {
      setSelectedCategories(new Set(filteredCategories.map(c => c.id)));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectCategory = (id: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCategories(newSelected);
    setSelectAll(newSelected.size === filteredCategories.length);
  };

  // Handle category deletion
  const handleDelete = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const res = await fetch(`/api/categories/${categoryToDelete.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        closeDeleteModal();
        fetchCategories();
        setSelectedCategories(prev => {
          const newSet = new Set(prev);
          newSet.delete(categoryToDelete.id);
          return newSet;
        });
      } else {
        setDeleteError(data.error || 'Error al eliminar categoría');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setDeleteError('Error de conexión');
    } finally {
      setIsDeleting(false);
    }
  };

  // Bulk delete handler
  const handleBulkDelete = async () => {
    if (selectedCategories.size === 0) return;

    const confirmMessage = `¿Estás seguro de que deseas eliminar ${selectedCategories.size} categoría${selectedCategories.size !== 1 ? 's' : ''}? Esta acción no se puede deshacer.`;

    if (!confirm(confirmMessage)) return;

    setIsDeleting(true);

    try {
      const deletePromises = Array.from(selectedCategories).map(id =>
        fetch(`/api/categories/${id}`, { method: 'DELETE' })
      );

      const results = await Promise.all(deletePromises);
      const allSuccessful = results.every(res => res.ok);

      if (allSuccessful) {
        fetchCategories();
        setSelectedCategories(new Set());
        setSelectAll(false);
      } else {
        alert('Error al eliminar algunas categorías');
      }
    } catch (err) {
      console.error('Error bulk deleting categories:', err);
      alert('Error de conexión');
    } finally {
      setIsDeleting(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" className="text-emerald-600" />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-semibold">Error al cargar categorías</h3>
        </div>
        <p className="text-sm mb-4">{error}</p>
        <Button
          variant="secondary"
          onClick={fetchCategories}
          className="bg-white border-red-200 hover:bg-red-50 text-red-700"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Bulk Actions Bar */}
      {selectedCategories.size > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              <span className="text-base sm:text-sm font-semibold text-amber-800">
                {selectedCategories.size} categoría{selectedCategories.size !== 1 ? 's' : ''} seleccionada{selectedCategories.size !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="secondary"
                onClick={() => setSelectedCategories(new Set())}
                className="hover:bg-slate-100 py-3 sm:py-2 text-base sm:text-sm"
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white py-3 sm:py-2 text-base sm:text-sm"
              >
                {isDeleting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Eliminando...
                  </>
                ) : (
                  'Eliminar seleccionadas'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header & Actions */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
        {/* Mobile Header - Compact */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Categorías</h2>
                <p className="text-sm text-slate-500">{categories.length} total</p>
              </div>
            </div>
            <Button onClick={openCreateForm} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2">
              <Plus className="w-4 h-4 mr-1" />
              Nueva
            </Button>
          </div>

          {/* Mobile Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar categorías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'with-products' | 'empty')}
              className="w-full px-3 py-3 text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="all">Todas las categorías</option>
              <option value="with-products">Con productos</option>
              <option value="empty">Sin productos</option>
            </select>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:block">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <FolderTree className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Categorías</h2>
                <p className="text-sm text-slate-500">{categories.length} total • {filteredCategories.length} mostradas</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="hidden lg:flex gap-4">
              <div className="bg-emerald-50 px-4 py-3 rounded-lg border border-emerald-100">
                <div className="text-xl font-bold text-emerald-700">{categories.length}</div>
                <div className="text-xs text-emerald-600 font-medium">Total</div>
              </div>
              <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-100">
                <div className="text-xl font-bold text-blue-700">
                  {categories.filter(c => c.product_count > 0).length}
                </div>
                <div className="text-xs text-blue-600 font-medium">Con productos</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar categorías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'with-products' | 'empty')}
                className="flex-1 sm:flex-none px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white min-w-[140px]"
              >
                <option value="all">Todas</option>
                <option value="with-products">Con productos</option>
                <option value="empty">Vacías</option>
              </select>

              <Button onClick={openCreateForm} className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200 px-4 py-2.5 whitespace-nowrap">
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Nueva Categoría</span>
                <span className="sm:hidden">Nueva</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => {
                      if (sortField === 'name') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('name');
                        setSortDirection('asc');
                      }
                    }}>
                    <div className="flex items-center gap-1">
                      Nombre
                      {sortField === 'name' && (
                        <ChevronUp className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => {
                      if (sortField === 'slug') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('slug');
                        setSortDirection('asc');
                      }
                    }}>
                    <div className="flex items-center gap-1">
                      Slug
                      {sortField === 'slug' && (
                        <ChevronUp className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => {
                      if (sortField === 'product_count') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('product_count');
                        setSortDirection('asc');
                      }
                    }}>
                    <div className="flex items-center gap-1">
                      Productos
                      {sortField === 'product_count' && (
                        <ChevronUp className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                          <Search className="w-6 h-6 text-slate-300" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">No se encontraron categorías</p>
                          <p className="text-sm mt-1">Intenta con otra búsqueda o crea una nueva</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedCategories.has(category.id)}
                          onChange={() => toggleSelectCategory(category.id)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          {category.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-slate-400" />
                          <span className={`text-sm font-medium ${category.product_count > 0 ? 'text-slate-700' : 'text-slate-400'}`}>
                            {category.product_count}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditForm(category)}
                            className="h-8 w-8 p-0 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteModal(category)}
                            className="h-8 w-8 p-0 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {filteredCategories.length === 0 ? (
            <div className="px-6 py-16 text-center text-slate-500">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-lg">No se encontraron categorías</p>
                  <p className="text-base mt-2">Intenta con otra búsqueda o crea una nueva</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredCategories.map((category) => (
                <div key={category.id} className="p-5 hover:bg-slate-50/50 transition-colors active:bg-slate-100/50">
                  <div className="flex gap-4">
                    <div className="pt-1 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={selectedCategories.has(category.id)}
                        onChange={() => toggleSelectCategory(category.id)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-6 h-6"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-slate-900 text-lg leading-tight pr-2 break-words">{category.name}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => openEditForm(category)}
                            className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors active:scale-95"
                            title="Editar"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(category)}
                            className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-95"
                            title="Eliminar"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                          <span className="text-sm font-mono font-medium">{category.slug}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-5 h-5 text-slate-400" />
                          <span className={`font-semibold text-base ${category.product_count > 0 ? 'text-slate-700' : 'text-slate-400'}`}>
                            {category.product_count} producto{category.product_count !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Nombre de la categoría"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Ej: Productos de limpieza"
              maxLength={100}
              required
              autoFocus
              error={formError || undefined}
              className="text-lg"
            />

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
              <div className="mt-0.5">
                <FolderTree className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Información del Slug</p>
                <p className="opacity-90">
                  El slug se generará automáticamente a partir del nombre y se usará en la URL de la tienda.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={closeForm}
              disabled={isSaving}
              className="hover:bg-slate-100"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
            >
              {isSaving ? (
                <>
                  <Spinner size="sm" className="mr-2 text-white" />
                  Guardando...
                </>
              ) : editingCategory ? (
                'Actualizar'
              ) : (
                'Crear Categoría'
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Eliminar Categoría"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl border border-red-100">
            <div className="p-2 bg-red-100 rounded-full text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-red-900 mb-1">Confirmar eliminación</h4>
              <p className="text-red-700 text-sm">
                ¿Estás seguro de que deseas eliminar la categoría <strong className="text-red-900">"{categoryToDelete?.name}"</strong>? Esta acción no se puede deshacer.
              </p>
            </div>
          </div>

          {categoryToDelete && categoryToDelete.product_count > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-amber-800 text-sm">
                <strong>No se puede eliminar:</strong> Esta categoría tiene <strong>{categoryToDelete.product_count} productos</strong> asociados. Debes mover o eliminar los productos antes de eliminar la categoría.
              </p>
            </div>
          )}

          {deleteError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              {deleteError}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={closeDeleteModal}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting || (categoryToDelete?.product_count || 0) > 0}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <>
                  <Spinner size="sm" className="mr-2 text-white" />
                  Eliminando...
                </>
              ) : (
                'Sí, eliminar'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
