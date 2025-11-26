'use client';

/**
 * CheckoutForm Component
 * Customer data form with Zod validation
 * Handles name, phone, delivery type, address (conditional), and notes
 */

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { DeliverySelector } from './DeliverySelector';
import { z } from 'zod';

// Form validation schema
const checkoutFormSchema = z.object({
  customerName: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es muy largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  customerPhone: z.string()
    .regex(/^3[0-9]{9}$/, 'Número de celular inválido (debe iniciar con 3 y tener 10 dígitos)'),
  
  deliveryType: z.enum(['delivery', 'pickup'] as const),
  
  address: z.string().optional(),
  
  notes: z.string().max(500, 'Las notas son muy largas').optional(),
}).refine((data) => {
  // Address is required for delivery
  if (data.deliveryType === 'delivery') {
    return data.address && data.address.trim().length >= 10;
  }
  return true;
}, {
  message: 'La dirección es requerida para domicilio (mínimo 10 caracteres)',
  path: ['address'],
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isLoading?: boolean;
}

export function CheckoutForm({ onSubmit, isLoading = false }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    customerPhone: '',
    deliveryType: 'pickup',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleDeliveryTypeChange = (value: 'pickup' | 'delivery') => {
    setFormData((prev) => ({ ...prev, deliveryType: value }));
    
    // Clear address error when switching to pickup
    if (value === 'pickup' && errors.address) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.address;
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof CheckoutFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: keyof CheckoutFormData) => {
    try {
      checkoutFormSchema.parse(formData);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.issues.find((err) => err.path[0] === field);
        if (fieldError) {
          setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      customerName: true,
      customerPhone: true,
      deliveryType: true,
      address: true,
      notes: true,
    });

    try {
      const validatedData = checkoutFormSchema.parse(formData);
      setErrors({});
      onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Name */}
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-slate-700 mb-2">
          Nombre completo *
        </label>
        <Input
          id="customerName"
          type="text"
          value={formData.customerName}
          onChange={(e) => handleChange('customerName', e.target.value)}
          onBlur={() => handleBlur('customerName')}
          placeholder="Ej: María González"
          disabled={isLoading}
          error={touched.customerName ? errors.customerName : undefined}
          className="w-full"
        />
      </div>

      {/* Customer Phone */}
      <div>
        <label htmlFor="customerPhone" className="block text-sm font-medium text-slate-700 mb-2">
          Número de celular *
        </label>
        <Input
          id="customerPhone"
          type="tel"
          value={formData.customerPhone}
          onChange={(e) => handleChange('customerPhone', e.target.value)}
          onBlur={() => handleBlur('customerPhone')}
          placeholder="3001234567"
          disabled={isLoading}
          error={touched.customerPhone ? errors.customerPhone : undefined}
          className="w-full"
          maxLength={10}
        />
        <p className="text-xs text-slate-500 mt-1">
          10 dígitos, debe iniciar con 3
        </p>
      </div>

      {/* Delivery Type */}
      <DeliverySelector
        value={formData.deliveryType}
        onChange={handleDeliveryTypeChange}
        disabled={isLoading}
      />

      {/* Address (conditional) */}
      {formData.deliveryType === 'delivery' && (
        <div className="animate-fadeIn">
          <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
            Dirección de entrega *
          </label>
          <Input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => handleBlur('address')}
            placeholder="Ej: Calle 10 # 15-20, Barrio Centro"
            disabled={isLoading}
            error={touched.address ? errors.address : undefined}
            className="w-full"
          />
          <p className="text-xs text-slate-500 mt-1">
            Mínimo 10 caracteres
          </p>
        </div>
      )}

      {/* Notes (optional) */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
          Notas adicionales (opcional)
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          onBlur={() => handleBlur('notes')}
          placeholder="Ej: Sin cebolla, llamar antes de entregar, etc."
          disabled={isLoading}
          rows={3}
          maxLength={500}
          className={`
            w-full px-4 py-2 border rounded-lg resize-none
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
            disabled:bg-slate-100 disabled:cursor-not-allowed
            ${errors.notes && touched.notes ? 'border-red-500' : 'border-slate-300'}
          `}
        />
        {errors.notes && touched.notes && (
          <p className="text-sm text-red-600 mt-1">{errors.notes}</p>
        )}
        <p className="text-xs text-slate-500 mt-1 text-right">
          {formData.notes?.length || 0} / 500
        </p>
      </div>

      {/* Required fields note */}
      <p className="text-xs text-slate-500">
        * Campos requeridos
      </p>
    </form>
  );
}
