'use client';

/**
 * CheckoutForm Component
 * Customer data form with Zod validation
 * Handles name, phone, delivery type, address (conditional), and notes
 * 
 * Features:
 * - Real-time validation with visual feedback (checkmark animation)
 * - Error shake animation using Framer Motion
 * - Conditional address field based on delivery type
 * - Accessibility: aria-invalid, aria-describedby, role="alert"
 * - Touch feedback: fields show status with animated checkmarks
 * - Mobile-friendly: 44px minimum touch targets
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [valid, setValid] = useState<Record<string, boolean>>({});

  // Validate individual field in real-time
  const validateField = (field: keyof CheckoutFormData, value: string) => {
    try {
      // Create a partial schema for single field validation
      const fieldSchemas: Record<string, z.ZodType> = {
        customerName: z.string()
          .min(2, 'El nombre debe tener al menos 2 caracteres')
          .max(100, 'El nombre es muy largo')
          .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
        
        customerPhone: z.string()
          .regex(/^3[0-9]{9}$/, 'Número de celular inválido (debe iniciar con 3 y tener 10 dígitos)'),
        
        address: z.string()
          .min(10, 'La dirección es muy corta (mínimo 10 caracteres)')
          .max(200, 'La dirección es muy larga'),
        
        notes: z.string()
          .max(500, 'Las notas son muy largas')
          .optional(),
      };
      
      const schema = fieldSchemas[field];
      if (schema) {
        schema.parse(value);
        setValid((prev) => ({ ...prev, [field]: true }));
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.issues[0];
        setValid((prev) => ({ ...prev, [field]: false }));
        setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
      }
    }
  };

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Real-time validation
    if (field !== 'notes' || value.length > 0) {
      validateField(field, value);
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
      setValid((prev) => {
        const newValid = { ...prev };
        delete newValid.address;
        return newValid;
      });
    }
  };

  const handleBlur = (field: keyof CheckoutFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    // Re-validate on blur to ensure consistency
    validateField(field, formData[field] ?? '');
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="customerName" className="block text-sm font-medium text-slate-700">
            Nombre completo *
          </label>
          <AnimatePresence mode="wait">
            {valid.customerName && touched.customerName && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-emerald-600 text-sm font-semibold"
              >
                ✓
              </motion.span>
            )}
          </AnimatePresence>
        </div>
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
      </motion.div>

      {/* Customer Phone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="customerPhone" className="block text-sm font-medium text-slate-700">
            Número de celular *
          </label>
          <AnimatePresence mode="wait">
            {valid.customerPhone && touched.customerPhone && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-emerald-600 text-sm font-semibold"
              >
                ✓
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <Input
          id="customerPhone"
          type="tel"
          value={formData.customerPhone}
          onChange={(e) => {
            // Only allow digits
            const value = e.target.value.replace(/\D/g, '');
            handleChange('customerPhone', value);
          }}
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
      </motion.div>

      {/* Delivery Type */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DeliverySelector
          value={formData.deliveryType}
          onChange={handleDeliveryTypeChange}
          disabled={isLoading}
        />
      </motion.div>

      {/* Address (conditional) */}
      <AnimatePresence mode="wait">
        {formData.deliveryType === 'delivery' && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="address" className="block text-sm font-medium text-slate-700">
                Dirección de entrega *
              </label>
              <AnimatePresence mode="wait">
                {valid.address && touched.address && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-emerald-600 text-sm font-semibold"
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes (optional) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
          Notas adicionales (opcional)
        </label>
        <motion.textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          onBlur={() => handleBlur('notes')}
          placeholder="Ej: Sin cebolla, llamar antes de entregar, etc."
          disabled={isLoading}
          rows={3}
          maxLength={500}
          className={`
            w-full px-4 py-3 border rounded-lg resize-none
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:bg-slate-100 disabled:cursor-not-allowed
            min-h-[88px]
            ${errors.notes && touched.notes 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
            }
          `}
          animate={errors.notes && touched.notes ? { x: [0, -5, 5, -5, 0] } : { x: 0 }}
          transition={errors.notes && touched.notes ? { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] } : { duration: 0 }}
        />
        {errors.notes && touched.notes && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red-600 mt-2"
            role="alert"
          >
            {errors.notes}
          </motion.p>
        )}
        <p className="text-xs text-slate-500 mt-1 text-right">
          {formData.notes?.length || 0} / 500
        </p>
      </motion.div>

      {/* Required fields note */}
      <p className="text-xs text-slate-500">
        * Campos requeridos
      </p>
    </form>
  );
}
