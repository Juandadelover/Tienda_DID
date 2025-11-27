# Implementation Plan: Mejoras de Diseño y Responsividad

**Branch**: `003-improve-ui-responsiveness` | **Date**: November 26, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-improve-ui-responsiveness/spec.md`

## Summary

Auditoría integral de diseño y responsividad del proyecto Tienda DID, con prioridad en dispositivos móviles pequeños (320px+). Se implementarán microinteracciones con Framer Motion, optimización de performance (Lighthouse ≥90), y un sistema de breakpoints consistente. Se mantiene la paleta de colores actual (Emerald/Slate).

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.0  
**Framework**: Next.js 16.0.4 (App Router)  
**Styling**: Tailwind CSS 4.x  
**Animation Library**: Framer Motion (a instalar)  
**Primary Dependencies**: @supabase/ssr, @supabase/supabase-js, zod  
**Storage**: Supabase (PostgreSQL)  
**Testing**: Manual testing + Lighthouse audits  
**Target Platform**: Web (Mobile-first: iOS 14+, Android 10+, Desktop browsers)  
**Project Type**: Web application (Next.js monolith)  
**Performance Goals**: Lighthouse ≥90/95/90, FCP ≤2s, LCP ≤4s, CLS ≤0.1  
**Constraints**: Bundle <300KB gzipped, 0 scroll horizontal en 320px  
**Scale/Scope**: ~30 componentes, 8 páginas públicas + admin

## Constitution Check

✅ **Single Project**: Ya existe estructura monolítica Next.js - mantener  
✅ **No Over-engineering**: Usar Tailwind existente + Framer Motion (mínimo overhead)  
✅ **Mobile-first**: Breakpoints comenzando en 320px  
✅ **Accessibility**: WCAG 2.1 AA como mínimo  

## Project Structure

### Documentation (this feature)

```text
specs/003-improve-ui-responsiveness/
├── plan.md              # This file
├── spec.md              # User stories y requirements
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (existing structure - to be enhanced)

```text
app/
├── (admin)/             # Admin layouts y páginas
│   └── admin/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── categorias/
│       └── productos/
├── (public)/            # Public layouts y páginas
│   ├── layout.tsx
│   ├── page.tsx         # Home/Catálogo
│   ├── carrito/
│   ├── checkout/
│   └── login/
├── api/                 # API routes
├── globals.css          # Global styles (enhance)
├── layout.tsx           # Root layout
└── error.tsx, loading.tsx, not-found.tsx

components/
├── admin/               # Admin components (enhance)
│   ├── CategoryManager.tsx
│   ├── ImageUploader.tsx
│   ├── ProductForm.tsx
│   ├── ProductTable.tsx
│   └── VariantManager.tsx
├── cart/                # Cart components (enhance)
│   ├── CartButton.tsx
│   ├── CartItem.tsx
│   ├── CartSummary.tsx
│   └── EmptyCart.tsx
├── catalog/             # Catalog components (enhance)
│   ├── CategoryFilter.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductModal.tsx
│   └── SearchBar.tsx
├── checkout/            # Checkout components (enhance)
│   ├── CheckoutForm.tsx
│   ├── DeliverySelector.tsx
│   ├── OrderSummary.tsx
│   └── WhatsAppButton.tsx
├── layout/              # Layout components (enhance)
│   ├── AdminNav.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── HorarioAlert.tsx
└── ui/                  # UI primitives (enhance with animations)
    ├── Badge.tsx
    ├── Button.tsx
    ├── Card.tsx
    ├── CartNotification.tsx
    ├── Input.tsx
    ├── Modal.tsx
    └── Spinner.tsx

lib/
├── constants.ts
├── hooks/               # Custom hooks
├── utils/               # Utility functions
└── supabase/            # Supabase client

contex/
└── paleta-colores-tienda-did.md  # Color reference (maintain)
```

**Structure Decision**: Mantener estructura existente. Agregar únicamente:
1. Framer Motion como dependencia
2. Nuevos archivos de utilidades para animaciones en `lib/`
3. Actualización de `globals.css` con CSS custom properties para breakpoints

## Tech Stack Decisions

### Animation Library: Framer Motion

**Justificación**:
- Compatibilidad nativa con React 19 y Next.js 16
- API declarativa simple para microinteracciones
- Soporte built-in para `prefers-reduced-motion`
- Tree-shakeable (solo importar lo usado)
- Comunidad activa y bien documentada

**Instalación**:
```bash
npm install framer-motion
```

### Breakpoints System

Usar Tailwind CSS defaults extendidos:
```text
xs: 320px   (móviles pequeños - iPhone SE)
sm: 640px   (móviles medianos)
md: 768px   (tablets)
lg: 1024px  (desktop pequeño)
xl: 1280px  (desktop)
2xl: 1536px (desktop grande)
```

### Color Palette (mantener actual)

Reference: `/contex/paleta-colores-tienda-did.md`
- **Primary**: Emerald-600 (#059669)
- **Secondary**: Slate-900 (#0f172a)
- **Background**: Slate-50 (#f8fafc)
- **Text Secondary**: Slate-500 (#64748b)
- **Error**: Red-500 (#ef4444)
- **Success**: Green-500 (#22c55e)

## Implementation Phases

### Phase 1: Setup & Foundation (US4 - P3)
1. Instalar Framer Motion
2. Configurar breakpoint `xs` en Tailwind
3. Crear utilidades de animación base
4. Auditar componentes UI existentes

### Phase 2: Mobile Responsiveness (US1 - P1)
1. Auditar y corregir todos los componentes para 320px
2. Eliminar scroll horizontal
3. Ajustar touch targets (≥44x44px)
4. Verificar layouts en cada breakpoint

### Phase 3: Animations & Design (US2 - P2)
1. Implementar microinteracciones en botones (hover, tap)
2. Agregar transiciones a modales y drawers
3. Animaciones de validación en inputs
4. Feedback visual en acciones (add to cart, submit)

### Phase 4: Performance & Accessibility (US3 - P2)
1. Optimizar lazy loading de imágenes
2. Implementar skeleton loaders donde falten
3. Auditar y corregir aria-labels
4. Validar color contrast ratios
5. Ejecutar Lighthouse y corregir issues

## Dependencies to Add

```json
{
  "dependencies": {
    "framer-motion": "^11.x"
  }
}
```

## Files to Create/Modify

### New Files
- `lib/animations/motion-variants.ts` - Variantes de animación reutilizables
- `lib/animations/use-reduced-motion.ts` - Hook para prefers-reduced-motion

### Files to Modify (all components)
- **UI Components** (7): Badge, Button, Card, CartNotification, Input, Modal, Spinner
- **Layout Components** (4): AdminNav, Footer, Header, HorarioAlert
- **Catalog Components** (5): CategoryFilter, ProductCard, ProductGrid, ProductModal, SearchBar
- **Cart Components** (4): CartButton, CartItem, CartSummary, EmptyCart
- **Checkout Components** (4): CheckoutForm, DeliverySelector, OrderSummary, WhatsAppButton
- **Admin Components** (5): CategoryManager, ImageUploader, ProductForm, ProductTable, VariantManager
- **Pages** (8+): All pages in (public) and (admin)

**Total**: ~30 componentes + 8 páginas = ~38 archivos a auditar/modificar

## Success Validation

```bash
# Performance audit
npx lighthouse http://localhost:3000 --view --preset=desktop
npx lighthouse http://localhost:3000 --view --preset=mobile

# Manual testing checklist
# 1. Open in Chrome DevTools → Device Mode → iPhone SE (320px)
# 2. Navigate all pages - verify no horizontal scroll
# 3. Test all interactive elements - verify animations
# 4. Check accessibility with axe DevTools extension
```

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Framer Motion bundle size | Tree-shake, solo importar `motion` y variantes usadas |
| Animation jank en mobile | Usar `will-change`, GPU-accelerated properties |
| Breaking existing styles | Cambios incrementales, test visual en cada PR |
| `prefers-reduced-motion` | Hook dedicado, fallback sin animación |
