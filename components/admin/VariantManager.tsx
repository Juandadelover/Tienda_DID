'use client';

/**
 * VariantManager Component
 * Manage product variants (add, edit, delete, toggle availability)
 */

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/formatters';

export interface Variant {
  id?: string;
  variant_name: string;
  price: number;
  is_available: boolean;
  isNew?: boolean;
  isDeleted?: boolean;
}

interface VariantManagerProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
  disabled?: boolean;
}

export function VariantManager({ variants, onChange, disabled = false }: VariantManagerProps) {
  const [newVariantName, setNewVariantName] = useState('');
  const [newVariantPrice, setNewVariantPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const handleAddVariant = () => {
    if (!newVariantName.trim() || !newVariantPrice.trim()) return;

    const price = parseFloat(newVariantPrice);
    if (isNaN(price) || price < 0) return;

    const newVariant: Variant = {
      id: `new-${Date.now()}`,
      variant_name: newVariantName.trim(),
      price,
      is_available: true,
      isNew: true,
    };

    onChange([...variants, newVariant]);
    setNewVariantName('');
    setNewVariantPrice('');
  };

  const handleDeleteVariant = (id: string) => {
    const variant = variants.find(v => v.id === id);
    if (!variant) return;

    if (variant.isNew) {
      // Remove new variant completely
      onChange(variants.filter(v => v.id !== id));
    } else {
      // Mark existing variant as deleted
      onChange(variants.map(v => 
        v.id === id ? { ...v, isDeleted: true } : v
      ));
    }
  };

  const handleToggleAvailability = (id: string) => {
    onChange(variants.map(v => 
      v.id === id ? { ...v, is_available: !v.is_available } : v
    ));
  };

  const startEditing = (variant: Variant) => {
    if (!variant.id) return;
    setEditingId(variant.id);
    setEditName(variant.variant_name);
    setEditPrice(variant.price.toString());
  };

  const saveEdit = () => {
    if (!editingId || !editName.trim() || !editPrice.trim()) return;

    const price = parseFloat(editPrice);
    if (isNaN(price) || price < 0) return;

    onChange(variants.map(v => 
      v.id === editingId 
        ? { ...v, variant_name: editName.trim(), price } 
        : v
    ));

    setEditingId(null);
    setEditName('');
    setEditPrice('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditPrice('');
  };

  const activeVariants = variants.filter(v => !v.isDeleted);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Variantes del producto
      </label>

      {/* Existing Variants */}
      {activeVariants.length > 0 ? (
        <div className="space-y-2">
          {activeVariants.map((variant) => (
            <div
              key={variant.id}
              className={`flex items-center gap-3 p-3 border rounded-lg ${
                !variant.is_available ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200'
              }`}
            >
              {editingId === variant.id ? (
                // Edit Mode
                <>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Nombre"
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    placeholder="Precio"
                    className="w-28"
                    min={0}
                  />
                  <Button type="button" onClick={saveEdit} className="text-sm">
                    Guardar
                  </Button>
                  <Button type="button" variant="ghost" onClick={cancelEdit} className="text-sm">
                    Cancelar
                  </Button>
                </>
              ) : (
                // View Mode
                <>
                  <div className="flex-1">
                    <p className={`font-medium ${!variant.is_available ? 'text-slate-500' : 'text-slate-900'}`}>
                      {variant.variant_name}
                    </p>
                    <p className={`text-sm ${!variant.is_available ? 'text-slate-400' : 'text-emerald-600'}`}>
                      {formatCurrency(variant.price)}
                    </p>
                  </div>

                  {/* Availability Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleAvailability(variant.id!)}
                    disabled={disabled}
                    className={`px-2 py-1 text-xs rounded-full ${
                      variant.is_available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {variant.is_available ? 'Disponible' : 'Agotado'}
                  </button>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => startEditing(variant)}
                    disabled={disabled}
                    className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteVariant(variant.id!)}
                    disabled={disabled}
                    className="p-2 text-red-400 hover:text-red-600 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 italic">
          No hay variantes. Agrega al menos una variante.
        </p>
      )}

      {/* Add New Variant */}
      <div className="flex gap-2 pt-2 border-t border-slate-200">
        <Input
          value={newVariantName}
          onChange={(e) => setNewVariantName(e.target.value)}
          placeholder="Ej: 500g, 1kg, Grande"
          disabled={disabled}
          className="flex-1"
        />
        <Input
          type="number"
          value={newVariantPrice}
          onChange={(e) => setNewVariantPrice(e.target.value)}
          placeholder="Precio"
          disabled={disabled}
          className="w-28"
          min={0}
        />
        <Button
          type="button"
          onClick={handleAddVariant}
          disabled={disabled || !newVariantName.trim() || !newVariantPrice.trim()}
          className="whitespace-nowrap"
        >
          + Agregar
        </Button>
      </div>

      <p className="text-xs text-slate-500">
        Las variantes permiten ofrecer el mismo producto en diferentes presentaciones o tamaños.
      </p>
    </div>
  );
}
