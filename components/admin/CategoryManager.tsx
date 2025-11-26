'use client';

/**
 * CategoryManager Component
 * CRUD interface for managing product categories
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';

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

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <p className="font-medium">Error al cargar categorías</p>
        <p className="text-sm mt-1">{error}</p>
        <Button 
          variant="secondary" 
          onClick={fetchCategories} 
          className="mt-3"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Categorías ({categories.length})
        </h2>
        <Button onClick={openCreateForm}>
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          Nueva Categoría
        </Button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Productos
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  No hay categorías. Crea la primera.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      {category.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={category.product_count > 0 ? 'default' : 'agotado'}>
                      {category.product_count} producto{category.product_count !== 1 ? 's' : ''}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditForm(category)}
                        aria-label={`Editar ${category.name}`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteModal(category)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        aria-label={`Eliminar ${category.name}`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={closeForm}
        title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre de la categoría"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Ej: Productos de limpieza"
            maxLength={100}
            required
            autoFocus
            error={formError || undefined}
          />

          <p className="text-sm text-slate-500">
            El slug se generará automáticamente a partir del nombre.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={closeForm}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Spinner size="sm" className="mr-2" />
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
        <div className="space-y-4">
          <p className="text-slate-600">
            ¿Estás seguro de que deseas eliminar la categoría{' '}
            <strong className="text-slate-900">
              "{categoryToDelete?.name}"
            </strong>
            ?
          </p>

          {categoryToDelete && categoryToDelete.product_count > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-amber-800 text-sm">
                <strong>⚠️ Advertencia:</strong> Esta categoría tiene{' '}
                {categoryToDelete.product_count} producto(s) asociado(s).
                Debes mover o eliminar los productos antes de eliminar la categoría.
              </p>
            </div>
          )}

          {deleteError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{deleteError}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
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
            >
              {isDeleting ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Eliminando...
                </>
              ) : (
                'Eliminar'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
