# Research: Tienda DID E-Commerce System

**Feature**: Sistema completo de ventas en línea Tienda DID  
**Date**: 2025-11-25  
**Phase**: 0 - Technology Research & Decisions

---

## Overview

Este documento consolida las decisiones tecnológicas y patrones de diseño para el sistema e-commerce de Tienda DID. Todas las decisiones están basadas en los requisitos del proyecto, la constitución establecida y las mejores prácticas de la industria.

---

## 1. Next.js 14+ App Router Architecture

### Decision

Usar **Next.js 14+ con App Router** como framework principal para todo el stack (frontend y backend).

### Rationale

- **Server Components por defecto**: Mejor performance, menos JavaScript en cliente
- **SSR/SSG built-in**: SEO optimization requerido (RNF-02)
- **API Routes integradas**: No necesita backend separado
- **File-based routing**: Simplicidad y organización clara
- **Image Optimization**: Next/Image para lazy loading automático (RNF-03)
- **TypeScript first-class**: Integración nativa con TS

### Alternatives Considered

| Alternative | Why Rejected |
|-------------|--------------|
| **Create React App** | No SSR, no API routes, deprecated |
| **Vite + React Router** | Requiere backend separado, más configuración |
| **Remix** | Menor ecosistema, Vercel optimizado para Next.js |

### Implementation Notes

- Usar Server Components para listado de productos (performance)
- Client Components solo para interactividad (carrito, búsqueda)
- Route Groups: `(public)` y `(admin)` para separación lógica
- Metadata API para SEO por página

---

## 2. Supabase as Backend-as-a-Service

### Decision

Usar **Supabase** para PostgreSQL, Auth y Storage.

### Rationale

- **PostgreSQL managed**: No setup de DB requerido
- **Row Level Security**: Protección admin panel (RNF-07)
- **Auth built-in**: Supabase Auth para admin login (RF-13)
- **Storage**: Manejo de imágenes de productos (RF-16)
- **Real-time** (opcional): Actualiz aciones en tiempo real si se necesita
- **Type-safe**: Genera tipos TS automáticamente

### Alternatives Considered

| Alternative | Why Rejected |
|-------------|--------------|
| **Firebase** | NoSQL no ideal para relaciones productos-categorías-variantes |
| **MongoDB + Custom Auth** | Más complejo, requiere más infraestructura |
| **Self-hosted PostgreSQL** | Requiere DevOps, más costoso para MVP |

### Implementation Notes

```typescript
// Cliente separation: browser vs server
// lib/supabase/client.ts - para Client Components
// lib/supabase/server.ts - para Server Components/Actions

// RLS Policies obligatorias:
// - Admin: Solo usuarios autenticados pueden modificar productos
// - Public: Solo lectura en productos disponibles
// - Storage: Imágenes públicas en bucket 'product-images'
```

---

## 3. State Management Strategy

### Decision

**localStorage + React Context** para carrito, **Server State via Server Components** para productos.

### Rationale

- **No Redux needed**: Complejidad innecesaria para alcance actual
- **localStorage**: Persistencia de carrito sin registro (req. RNF-08)
- **Server Components**: Productos vienen del servidor (cache automático)
- **React Context**: Compartir estado de carrito entre componentes cliente

### Alternatives Considered

| Alternative | Why Rejected |
|-------------|--------------|
| **Redux Toolkit** | Overkill para estado simple de carrito |
| **Zustand** | Agrega dependencia innecesaria, localStorage suficiente |
| **SessionStorage** | Se pierde al cerrar tab, UX inferior |

### Implementation Pattern

```typescript
// hooks/useCart.ts
interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
}

// Sync con localStorage
useEffect(() => {
  localStorage.setItem('tienda-did-cart', JSON.stringify(cart));
}, [cart]);

// Inicializar desde localStorage
useEffect(() => {
  const saved = localStorage.getItem('tienda-did-cart');
  if (saved) setCart(JSON.parse(saved));
}, []);
```

---

## 4. Tailwind CSS con Custom Design System

### Decision

**Tailwind CSS 4.x** con paleta de colores personalizada (Emerald/Slate) definida en `tailwind.config.ts`.

### Rationale

- **Utility-first**: Desarrollo rápido, consistencia (const. IV)
- **Mobile-first**: Built-in responsive design (const. I)
- **Custom palette**: Paleta Emerald/Slate predefinida en doc
- **No CSS-in-JS**: Mejor performance, menos runtime
- **Purge**: Tamaño final minimalista

### Palette Implementation

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',  // Emerald-600
          hover: '#047857',    // Emerald-700
          light: '#10b981',    // Emerald-500
          bg: '#ecfdf5',       // Emerald-50
        },
        secondary: {
          DEFAULT: '#0f172a',  // Slate-900
          light: '#1e293b',    // Slate-800
        },
        text: {
          primary: '#0f172a',   // Slate-900
          secondary: '#64748b', // Slate-500
        },
        bg: {
          primary: '#f8fafc',   // Slate-50
          card: '#ffffff',
        },
        error: '#ef4444',       // Red-500
        warning: '#facc15',     // Yellow-400
        success: '#22c55e',     // Green-500
        info: '#3b82f6',        // Blue-500
      },
    },
  },
}
```

### Component Design Patterns

- **Buttons**: Variantes primary/secondary/danger/ghost predefinidas
- **Cards**: Sombra y hover effects consistentes
- **Forms**: Focus states con color primary
- **Badges**: Estados disponible/agotado/nuevo con colores semánticos

---

## 5. WhatsApp Integration Pattern

### Decision

Usar **WhatsApp URL Scheme** (`https://wa.me/`) con mensaje pre-formateado.

### Rationale

- **No API requerida**: WhatsApp no tiene API pública gratuita
- **Universal**: Funciona en Web y Mobile
- **UX simple**: Usuario confirma desde su WhatsApp (RF-11)
- **Sin almacenamiento**: Datos se envían directamente, no se guardan (RNF-08)

### Implementation Pattern

```typescript
// lib/utils/whatsapp.ts
export function generateWhatsAppMessage(order: Order): string {
  const items = order.items.map(item => 
    `• ${item.quantity}x ${item.name}${item.variant ? ` (${item.variant})` : ''} - $${item.price}\n  Subtotal: $${item.subtotal}`
  ).join('\n');

  const address = order.deliveryType === 'delivery' 
    ? `\n📍 *Dirección:* ${order.address}` 
    : '';

  const notes = order.notes 
    ? `\n\n📝 *Notas:* ${order.notes}` 
    : '';

  return encodeURIComponent(`
🛒 *NUEVO PEDIDO - TIENDA DID*

👤 *Cliente:* ${order.customerName}
📱 *Teléfono:* ${order.customerPhone}

📦 *PRODUCTOS:*
${items}

💰 *TOTAL: $${order.total}*

🚚 *Entrega:* ${order.deliveryType === 'pickup' ? 'Recoger en tienda' : 'Domicilio'}${address}${notes}

---
_Pedido realizado desde tiendadid.com_
  `.trim());
}

export function openWhatsApp(message: string) {
  const WHATSAPP_NUMBER = '573235725922'; // Constante del documento
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank');
}
```

---

## 6. Image Optimization Strategy

### Decision

**Supabase Storage + Next.js Image Component** con transformaciones automáticas.

### Rationale

- **Supabase Storage**: CDN incluido, transformaciones on-the-fly
- **next/image**: Lazy loading, responsive, WebP automático (RNF-03)
- **Upload directo**: Admin sube desde panel (RF-16)
- **Fallback**: Placeholder para productos sin imagen

### Implementation Pattern

```typescript
// components/catalog/ProductCard.tsx
import Image from 'next/image';

<Image
  src={product.image_url || '/images/placeholder.png'}
  alt={product.name}
  width={300}
  height={300}
  className="rounded-lg object-cover"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Supabase Storage Buckets

```sql
-- Bucket: product-images
-- Public: true
-- File size limit: 5MB
-- Allowed types: image/jpeg, image/png, image/webp
```

---

## 7. Real-Time Search Implementation

### Decision

**Client-side filtering** con debounce para búsqueda <500ms (RNF-03).

### Rationale

- **Simple**: 50-200 productos cargan rápido en memoria
- **No backend**: Evita queries adicionales a DB
- **Instant UX**: Sin latencia de red
- **Escalable**: Si crece >500 productos, migrar a full-text search de Supabase

### Implementation Pattern

```typescript
// components/catalog/SearchBar.tsx
import { useMemo, useState } from 'react';
import { useDebouncedValue } from '@/lib/hooks/useDebounce';

function SearchBar({ products }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300); // 300ms debounce

  const filtered = useMemo(() => {
    if (!debouncedQuery) return products;
    return products.filter(p => 
      p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [products, debouncedQuery]);

  return <input onChange={(e) => setQuery(e.target.value)} />;
}
```

---

## 8. Business Hours Validation

### Decision

**Client-side check + Server-side validation** para horario de atención (RF-12).

### Rationale

- **Client UX**: Disable botón y mostrar mensaje inmediato
- **Server Safety**: Validar en API para evitar bypass
- **Configurable**: Horario en tabla `settings` de Supabase

### Implementation Pattern

```typescript
// lib/hooks/useHorario.ts
export function useIsStoreOpen() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const hour = now.getHours();
      const CLOSING_HOUR = 22; // 10 PM
      setIsOpen(hour < CLOSING_HOUR);
    };

    check();
    const interval = setInterval(check, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return isOpen;
}
```

---

## 9. Authentication Strategy

### Decision

**Supabase Auth con email/password** para un solo admin (RF-13).

### Rationale

- **Simple**: Un usuario, no requiere roles complejos
- **Secure**: Supabase maneja hashing, sesiones (RNF-07)
- **Persistent sessions**: Cookie-based, cierre manual (RF-13)
- **RLS**: Row Level Security automático

### Implementation Pattern

```typescript
// app/login/page.tsx - Server Action
'use server'
export async function login(email: string, password: string) {
  const supabase = createServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  redirect('/admin');
}

// Middleware protection
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check Supabase session
    // Redirect to /login if not authenticated
  }
}
```

---

## 10. Form Validation Approach

### Decision

**Zod** para validación de schemas TypeScript-first.

### Rationale

- **Type-safe**: Genera tipos TS automáticamente
- **Client + Server**: Misma validación en ambos lados (RNF-07)
- **Composable**: Reusar schemas entre forms
- **Error messages**: Fácil i18n en español

### Implementation Pattern

```typescript
// types/product.ts
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(3, 'Nombre debe tener al menos 3 caracteres'),
  category_id: z.string().uuid('Categoría inválida'),
  base_price: z.number().positive('Precio debe ser positivo'),
  unit_type: z.enum(['unit', 'weight']),
  is_available: z.boolean().default(true),
  has_variants: z.boolean().default(false),
});

export type Product = z.infer<typeof ProductSchema>;

// Uso en form
const result = ProductSchema.safeParse(formData);
if (!result.success) {
  setErrors(result.error.flatten());
}
```

---

## Summary of Key Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.4 | Framework fullstack |
| **React** | 19.2.0 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Styling system |
| **Supabase Client** | Latest | Database, Auth, Storage |
| **Zod** | Latest | Validation schemas |
| **next/image** | Built-in | Image optimization |

---

## Best Practices Established

1. **Mobile-first Tailwind classes** en todos los componentes
2. **Server Components por defecto**, Client Components solo cuando necesario
3. **TypeScript strict mode** sin `any` types
4. **Validación dual** (cliente UX + servidor seguridad)
5. **Componentes atómicos** reutilizables en `/components/ui`
6. **Custom hooks** para lógica compartida
7. **Constantes centralizadas** en `/lib/constants.ts`
8. **Error boundaries** para manejo de errores graceful
9. **Loading states** con Suspense y Skeletons
10. **Accessible components** con aria-labels y keyboard navigation

---

**Status**: ✅ Research completado - Todas las decisiones técnicas documentadas y justificadas
