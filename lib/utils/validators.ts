/**
 * Validation Schemas
 * Zod schemas for runtime validation
 */

import { z } from 'zod';

/**
 * Product validation schemas
 */
export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200),
  description: z.string().max(500).optional(),
  category_id: z.string().uuid('Categoría inválida'),
  image_url: z.string().url('URL de imagen inválida').optional(),
  unit_type: z.enum(['unit', 'weight'], {
    message: 'Tipo de unidad inválido',
  }),
  is_available: z.boolean().default(true),
  has_variants: z.boolean().default(false),
  base_price: z.number().min(0, 'El precio debe ser mayor o igual a 0').optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const createProductVariantSchema = z.object({
  product_id: z.string().uuid('Producto inválido'),
  variant_name: z.string().min(1, 'El nombre de la variante es requerido').max(100),
  price: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
  is_available: z.boolean().default(true),
});

export const updateProductVariantSchema = createProductVariantSchema.partial().omit({ product_id: true });

/**
 * Category validation schemas
 */
export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  slug: z.string()
    .min(1, 'El slug es requerido')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
});

export const updateCategorySchema = createCategorySchema.partial();

/**
 * Cart validation schemas
 */
export const addToCartSchema = z.object({
  productId: z.string().uuid('Producto inválido'),
  variantId: z.string().uuid('Variante inválida').optional(),
  quantity: z.number().int().min(1, 'La cantidad debe ser al menos 1').max(100, 'Cantidad máxima: 100'),
});

export const updateCartItemSchema = z.object({
  productId: z.string().uuid('Producto inválido'),
  variantId: z.string().uuid('Variante inválida').optional(),
  quantity: z.number().int().min(0, 'La cantidad debe ser mayor o igual a 0').max(100, 'Cantidad máxima: 100'),
});

export const removeFromCartSchema = z.object({
  productId: z.string().uuid('Producto inválido'),
  variantId: z.string().uuid('Variante inválida').optional(),
});

/**
 * Customer validation schemas
 */
export const customerSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es muy largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  phone: z.string()
    .regex(/^[0-9]{10,12}$/, 'Número de teléfono inválido (10-12 dígitos)')
    .refine((val) => val.startsWith('3'), 'El número debe iniciar con 3 (celular)'),
  
  address: z.string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(200, 'La dirección es muy larga'),
});

/**
 * Checkout validation schema
 */
export const checkoutSchema = z.object({
  customer: customerSchema,
  deliveryType: z.enum(['delivery', 'pickup'], {
    message: 'Tipo de entrega inválido',
  }),
  paymentMethod: z.enum(['cash', 'transfer'], {
    message: 'Método de pago inválido',
  }),
  notes: z.string().max(500, 'Las notas son muy largas').optional(),
});

/**
 * Settings validation schema
 */
export const settingsSchema = z.object({
  key: z.string().min(1, 'La clave es requerida'),
  value: z.string().min(1, 'El valor es requerido'),
});

/**
 * Search query validation
 */
export const searchQuerySchema = z.object({
  q: z.string().min(1, 'La búsqueda debe tener al menos 1 caracter').max(100).optional(),
  category: z.string().uuid().optional(),
  available: z.boolean().optional(),
});

/**
 * Type exports for use in components
 */
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateProductVariantInput = z.infer<typeof createProductVariantSchema>;
export type UpdateProductVariantInput = z.infer<typeof updateProductVariantSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type RemoveFromCartInput = z.infer<typeof removeFromCartSchema>;
export type CustomerInput = z.infer<typeof customerSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
