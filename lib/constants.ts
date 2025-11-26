// Application Constants

// WhatsApp
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573235725922';

// Store Information
export const STORE_INFO = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || 'Tienda DID',
  address: process.env.NEXT_PUBLIC_STORE_ADDRESS || 'Sector 1 Manzana D-1, Barrio Villa Consuelo, Bosconia - Cesar',
  phone: WHATSAPP_NUMBER,
  closingHour: parseInt(process.env.NEXT_PUBLIC_CLOSING_HOUR || '22', 10), // 10 PM
} as const;

// Breakpoints (mobile-first)
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

// Touch target minimum size (pixels)
export const TOUCH_TARGET_MIN_SIZE = 44;

// Performance thresholds
export const PERFORMANCE = {
  maxLoadTime: 3000, // 3 seconds on 3G
  maxSearchTime: 500, // 500ms for search
  imageLazyThreshold: 200, // 200px before viewport
} as const;

// Image constraints
export const IMAGE_CONSTRAINTS = {
  maxSizeMB: 5,
  allowedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

// Supabase Storage
export const STORAGE = {
  bucketName: 'product-images',
  publicUrl: process.env.NEXT_PUBLIC_SUPABASE_URL 
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`
    : '',
} as const;

// Debounce times (milliseconds)
export const DEBOUNCE = {
  search: 300,
  input: 500,
} as const;

// Default product placeholder
export const DEFAULT_PRODUCT_IMAGE = '/images/placeholder.png';

// Currency formatting
export const CURRENCY = {
  code: 'COP',
  symbol: '$',
  locale: 'es-CO',
} as const;

// Default categories (as per RF-02)
export const DEFAULT_CATEGORIES = [
  'Abarrotes',
  'Bebidas',
  'Productos de aseo',
  'Snacks y dulces',
  'Lácteos y refrigerados',
  'Otros',
] as const;

// Unit types
export const UNIT_TYPES = {
  unit: 'Unidad',
  weight: 'Peso',
} as const;

// Delivery types
export const DELIVERY_TYPES = {
  pickup: 'Recoger en tienda',
  delivery: 'Domicilio gratis',
} as const;
