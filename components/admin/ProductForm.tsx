'use client';

/**
 * ProductForm Component
 * Create/edit product form with all fields
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ImageUploader } from './ImageUploader';
import { VariantManager, Variant } from './VariantManager';
import { createClient } from '@/lib/supabase/client';

interface Category {
  id: string;
  name: string;
}

interface ProductFormData {
  name: string;
  description: string;
  category_id: string;
  image_url: string;
  unit_type: 'unit' | 'weight';
  has_variants: boolean;
  base_price: string;
}

interface ProductFormProps {
  productId?: string; // If provided, form is in edit mode
  initialData?: {
    name: string;
    description?: string;
    category_id: string;
    image_url?: string;
    unit_type: 'unit' | 'weight';
    has_variants: boolean;
    base_price?: number;
    variants?: Variant[];
  };
}

export function ProductForm({ productId, initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!productId;

  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category_id: initialData?.category_id || '',
    image_url: initialData?.image_url || '',
    unit_type: initialData?.unit_type || 'unit',
    has_variants: initialData?.has_variants || false,
    base_price: initialData?.base_price?.toString() || '',
  });

  const [variants, setVariants] = useState<Variant[]>(initialData?.variants || []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('categories')
          .select('id, name')
          .order('name');

        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error al cargar categorías');
      } finally {
        setIsFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (field: keyof ProductFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear base_price when switching to variants
    if (field === 'has_variants' && value === true) {
      setFormData(prev => ({ ...prev, [field]: value, base_price: '' }));
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return 'El nombre es requerido';
    if (!formData.category_id) return 'La categoría es requerida';
    
    if (formData.has_variants) {
      const activeVariants = variants.filter(v => !v.isDeleted);
      if (activeVariants.length === 0) {
        return 'Debe agregar al menos una variante';
      }
    } else {
      if (!formData.base_price.trim()) return 'El precio es requerido';
      const price = parseFloat(formData.base_price);
      if (isNaN(price) || price < 0) return 'El precio debe ser un número válido';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        category_id: formData.category_id,
        image_url: formData.image_url || null,
        unit_type: formData.unit_type,
        has_variants: formData.has_variants,
        base_price: formData.has_variants ? null : parseFloat(formData.base_price),
      };

      let savedProductId = productId;

      if (isEditMode) {
        // Update product
        const res = await fetch(`/api/products/${productId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Error al actualizar producto');
        }
      } else {
        // Create product
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Error al crear producto');
        }

        const data = await res.json();
        savedProductId = data.product.id;
      }

      // Handle variants
      if (formData.has_variants && savedProductId) {
        for (const variant of variants) {
          if (variant.isDeleted && variant.id && !variant.isNew) {
            // Delete existing variant
            await fetch(`/api/variants/${variant.id}`, { method: 'DELETE' });
          } else if (variant.isNew && !variant.isDeleted) {
            // Create new variant
            await fetch('/api/variants', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                product_id: savedProductId,
                variant_name: variant.variant_name,
                price: variant.price,
                is_available: variant.is_available,
              }),
            });
          } else if (!variant.isNew && !variant.isDeleted && variant.id) {
            // Update existing variant
            await fetch(`/api/variants/${variant.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                variant_name: variant.variant_name,
                price: variant.price,
                is_available: variant.is_available,
              }),
            });
          }
        }
      }

      router.push('/admin/productos');
      router.refresh();
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err instanceof Error ? err.message : 'Error al guardar producto');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetchingCategories) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Nombre del producto *
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ej: Arroz Diana"
              disabled={isLoading}
              maxLength={200}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descripción breve del producto..."
              disabled={isLoading}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
              Categoría *
            </label>
            <select
              id="category"
              value={formData.category_id}
              onChange={(e) => handleChange('category_id', e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unit Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tipo de unidad *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="unit_type"
                  value="unit"
                  checked={formData.unit_type === 'unit'}
                  onChange={(e) => handleChange('unit_type', e.target.value)}
                  disabled={isLoading}
                  className="w-4 h-4 text-emerald-600"
                />
                <span>Por unidad</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="unit_type"
                  value="weight"
                  checked={formData.unit_type === 'weight'}
                  onChange={(e) => handleChange('unit_type', e.target.value)}
                  disabled={isLoading}
                  className="w-4 h-4 text-emerald-600"
                />
                <span>Por peso</span>
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <ImageUploader
            currentImageUrl={formData.image_url || undefined}
            onUpload={handleImageUpload}
            onRemove={handleImageRemove}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Has Variants Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.has_variants}
                onChange={(e) => handleChange('has_variants', e.target.checked)}
                disabled={isLoading}
                className="w-5 h-5 text-emerald-600 rounded"
              />
              <div>
                <span className="font-medium text-slate-900">Producto con variantes</span>
                <p className="text-sm text-slate-500">
                  Ej: diferentes tamaños o presentaciones
                </p>
              </div>
            </label>
          </div>

          {/* Price or Variants */}
          {formData.has_variants ? (
            <VariantManager
              variants={variants}
              onChange={setVariants}
              disabled={isLoading}
            />
          ) : (
            <div>
              <label htmlFor="base_price" className="block text-sm font-medium text-slate-700 mb-2">
                Precio *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <Input
                  id="base_price"
                  type="number"
                  value={formData.base_price}
                  onChange={(e) => handleChange('base_price', e.target.value)}
                  placeholder="0"
                  disabled={isLoading}
                  min={0}
                  className="pl-8"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Spinner />
              {isEditMode ? 'Guardando...' : 'Creando...'}
            </span>
          ) : (
            isEditMode ? 'Guardar cambios' : 'Crear producto'
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/admin/productos')}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
