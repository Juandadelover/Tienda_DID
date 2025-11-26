# Implementation Plan: Sistema E-Commerce Tienda DID

**Branch**: `001-tienda-did-ecommerce-system` | **Date**: 2025-11-25 | **Spec**: [spec.md](./spec.md)
**Input**: Documento de requisitos completo de Tienda DID y paleta de colores oficial

**Note**: Este plan cubre la implementación completa del sistema de ventas en línea para Tienda DID, una tienda de barrio en Bosconia, Cesar, Colombia.

## Summary

Desarrollar un sistema web e-commerce completo para Tienda DID que permita a clientes visualizar productos organizados por categorías, buscar en tiempo real, gestionar un carrito de compras y enviar pedidos vía WhatsApp. Incluye panel de administración con autenticación para gestión completa de productos, categorías e imágenes. Implementado con Next.js 14+, React 19, TypeScript, Tailwind CSS 4 y Supabase, con diseño mobile-first responsive y paleta de colores Emerald/Slate definida.

## Technical Context

**Language/Version**: TypeScript 5.x con Next.js 14+ (App Router), React 19.2  
**Primary Dependencies**: 
  - Next.js 16.0.4 (Framework SSR/SSG)
  - React 19.2.0 (UI Library)
  - Tailwind CSS 4.x (Styling)
  - Supabase JS Client (Database & Auth)
  - Next.js Image Optimization (Image handling)

**Storage**: 
  - Supabase PostgreSQL (productos, categorías, variantes, configuración)
  - Supabase Storage (imágenes de productos)
  - localStorage (persistencia de carrito en cliente)

**Testing**: 
  - Manual testing en dispositivos móviles (requerimiento explícito)
  - Cross-browser testing (Chrome, Safari iOS, Firefox)
  - WhatsApp integration testing (Web y Mobile App)

**Target Platform**: 
  - Web responsive (mobile-first)
  - Navegadores modernos (Chrome 90+, Safari 14+, Firefox 88+)
  - Deployment en Vercel

**Project Type**: Web application (Next.js fullstack)

**Performance Goals**: 
  - Carga inicial <3s en 3G (req. RNF-03)
  - Búsqueda en tiempo real <500ms (req. RNF-03)
  - Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
  - Imágenes optimizadas con lazy loading

**Constraints**: 
  - Diseño mobile-first obligatorio (mayoría de usuarios en celular)
  - Touch targets ≥44x44px para usabilidad móvil
  - Contraste WCAG AA mínimo (paleta definida cumple AAA)
  - No pagos en línea (v1.0 - fuera de alcance)
  - Un solo administrador (sin multi-usuario)
  - Sin almacenamiento de datos personales de clientes

**Scale/Scope**: 
  - 50-200 productos en catálogo
  - 6 categorías principales predefinidas
  - Múltiples usuarios concurrentes navegando
  - Soporte para variantes de productos ilimitadas
  - Horario de atención hasta 22:00 (10 PM)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **I. Mobile-First Responsive Design**
   - ✅ Diseño mobile-first explícito en requisitos (RNF-05)
   - ✅ Touch targets ≥44px definidos en paleta de colores
   - ✅ Breakpoints estándar: <768px mobile, 768-1024px tablet, >1024px desktop
   - **Status**: COMPLIANT

✅ **II. User Experience for All Ages**
   - ✅ Fuentes ≥16px para texto, ≥20px para acciones (paleta definida)
   - ✅ Contraste WCAG AA requerido (paleta cumple AAA: Slate-900 sobre White = 18.7:1)
   - ✅ Etiquetas en español claro y simple
   - ✅ Interfaz intuitiva para usuarios de tienda de barrio (req. RNF-05)
   - **Status**: COMPLIANT

✅ **III. Performance & Optimization**
   - ✅ Carga <3s requerida (RNF-03)
   - ✅ Lazy loading y optimización de imágenes explícito (RNF-03)
   - ✅ Búsqueda <500ms (RNF-03)
   - ✅ Core Web Vitals targets definidos
   - **Status**: COMPLIANT

✅ **IV. Component Modularity & Reusability**
   - ✅ Componentes React reutilizables requeridos (RNF-09)
   - ✅ Código limpio y documentado (RNF-09)
   - ✅ TypeScript para type safety
   - ✅ Tailwind para estilos consistentes (paleta predefinida)
   - **Status**: COMPLIANT

✅ **V. Security & Data Privacy**
   - ✅ Supabase Auth para admin (RNF-01, RF-13)
   - ✅ RLS policies requeridas (RNF-07)
   - ✅ Validación cliente y servidor (RNF-07)
   - ✅ No almacenamiento de datos personales clientes (RNF-08)
   - ✅ Env variables para secrets
   - **Status**: COMPLIANT

✅ **Technology Stack Requirements**
   - ✅ Next.js 14+ con App Router (RNF-01, RNF-02)
   - ✅ TypeScript strict mode
   - ✅ Tailwind CSS 4.x (configurado en proyecto)
   - ✅ Supabase (PostgreSQL, Auth, Storage) (RNF-01)
   - ✅ Vercel deployment (RNF-01)
   - **Status**: COMPLIANT

✅ **Development Standards**
   - ✅ ESLint configurado (package.json)
   - ✅ TypeScript 5.x presente
   - ✅ Commits semánticos requeridos
   - ✅ Testing manual especificado (Fase 5 cronograma)
   - **Status**: COMPLIANT

**GATE RESULT**: ✅ **ALL GATES PASSED** - Proceder con Phase 0 Research

## Project Structure

### Documentation (this feature)

```text
specs/001-tienda-did-ecommerce-system/
├── plan.md              # This file (plan completo de implementación)
├── research.md          # Phase 0: Investigación de tecnologías y patrones
├── data-model.md        # Phase 1: Modelo de datos Supabase
├── quickstart.md        # Phase 1: Guía de inicio rápido
├── contracts/           # Phase 1: Contratos de API
│   ├── products-api.md
│   ├── categories-api.md
│   ├── cart-api.md
│   └── whatsapp-integration.md
└── tasks.md             # Phase 2: Lista de tareas (generado con /speckit.tasks)
```

### Source Code (repository root)

```text
tiendadid/                           # Next.js 14+ App Router Structure
├── app/                             # Next.js App Router
│   ├── (public)/                    # Public routes group
│   │   ├── page.tsx                 # Home/Catalog page
│   │   ├── layout.tsx               # Public layout (header, footer)
│   │   ├── carrito/                 # Cart page
│   │   │   └── page.tsx
│   │   └── checkout/                # Checkout flow
│   │       └── page.tsx
│   ├── (admin)/                     # Admin routes group
│   │   ├── admin/
│   │   │   ├── layout.tsx           # Admin layout (protected)
│   │   │   ├── page.tsx             # Admin dashboard
│   │   │   ├── productos/           # Products management
│   │   │   │   ├── page.tsx         # List products
│   │   │   │   ├── nuevo/page.tsx   # Create product
│   │   │   │   └── [id]/
│   │   │   │       └── editar/page.tsx  # Edit product
│   │   │   └── categorias/          # Categories management
│   │   │       └── page.tsx
│   │   └── login/
│   │       └── page.tsx             # Admin login
│   ├── api/                         # API Routes (Next.js Route Handlers)
│   │   ├── products/
│   │   │   ├── route.ts             # GET all, POST create
│   │   │   └── [id]/
│   │   │       └── route.ts         # GET, PATCH, DELETE
│   │   ├── categories/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── variants/
│   │   │   └── route.ts
│   │   └── settings/
│   │       └── route.ts
│   ├── globals.css                  # Tailwind base + custom CSS variables
│   └── layout.tsx                   # Root layout
│
├── components/                      # Reusable React components
│   ├── ui/                          # Base UI components
│   │   ├── Button.tsx               # Reusable button (primary, secondary, danger, ghost)
│   │   ├── Card.tsx                 # Product card, admin card
│   │   ├── Input.tsx                # Form input
│   │   ├── Badge.tsx                # Status badges (disponible, agotado, nuevo)
│   │   ├── Modal.tsx                # Modal dialogs
│   │   └── Spinner.tsx              # Loading spinner
│   ├── catalog/                     # Catalog-specific components
│   │   ├── ProductGrid.tsx          # Grid of products
│   │   ├── ProductCard.tsx          # Individual product card
│   │   ├── CategoryFilter.tsx       # Category filter buttons
│   │   ├── SearchBar.tsx            # Real-time search
│   │   └── ProductModal.tsx         # Product detail modal
│   ├── cart/                        # Cart components
│   │   ├── CartButton.tsx           # Header cart icon with count
│   │   ├── CartItem.tsx             # Cart item row
│   │   ├── CartSummary.tsx          # Cart totals
│   │   └── EmptyCart.tsx            # Empty state
│   ├── checkout/                    # Checkout components
│   │   ├── CheckoutForm.tsx         # Customer data form
│   │   ├── DeliverySelector.tsx     # Store pickup vs delivery
│   │   ├── OrderSummary.tsx         # Final order review
│   │   └── WhatsAppButton.tsx       # Send to WhatsApp button
│   ├── admin/                       # Admin-specific components
│   │   ├── ProductForm.tsx          # Create/Edit product form
│   │   ├── ProductTable.tsx         # Admin product list table
│   │   ├── VariantManager.tsx       # Manage product variants
│   │   ├── ImageUploader.tsx        # Supabase Storage image upload
│   │   └── CategoryManager.tsx      # CRUD categories
│   └── layout/                      # Layout components
│       ├── Header.tsx               # Public header (logo, search, cart)
│       ├── Footer.tsx               # Store info footer
│       ├── AdminNav.tsx             # Admin sidebar navigation
│       └── HorarioAlert.tsx         # Business hours alert
│
├── lib/                             # Utilities and configurations
│   ├── supabase/
│   │   ├── client.ts                # Supabase client (browser)
│   │   ├── server.ts                # Supabase client (server components)
│   │   └── types.ts                 # Database types (generated)
│   ├── utils/
│   │   ├── formatters.ts            # Currency, date formatters
│   │   ├── validators.ts            # Form validation
│   │   └── whatsapp.ts              # WhatsApp message generator
│   ├── hooks/
│   │   ├── useCart.ts               # Cart state management (localStorage)
│   │   ├── useProducts.ts           # Fetch products hook
│   │   └── useHorario.ts            # Business hours check
│   └── constants.ts                 # App constants (WhatsApp number, etc.)
│
├── types/                           # TypeScript type definitions
│   ├── product.ts                   # Product, Variant interfaces
│   ├── category.ts                  # Category interfaces
│   ├── cart.ts                      # Cart, CartItem interfaces
│   └── order.ts                     # Order, Customer interfaces
│
├── public/                          # Static assets
│   ├── images/
│   │   ├── logo.svg                 # Tienda DID logo
│   │   └── placeholder.png          # Product placeholder
│   └── favicon.ico
│
├── supabase/                        # Supabase configuration
│   ├── migrations/                  # SQL migrations
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_rls_policies.sql
│   │   └── 003_storage_buckets.sql
│   └── seed.sql                     # Seed data (categories, sample products)
│
├── .env.local                       # Environment variables (gitignored)
├── .env.example                     # Example env file
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind with custom colors (paleta)
├── tsconfig.json                    # TypeScript configuration (strict mode)
├── package.json                     # Dependencies
└── README.md                        # Project documentation
```

**Structure Decision**: Next.js 14 App Router fullstack architecture selected. Rationale:
- **App Router**: Server Components by default, better performance, built-in layouts
- **Route Groups**: `(public)` y `(admin)` separan lógicamente las áreas sin afectar URLs
- **Colocated API Routes**: `/app/api/*` routes para endpoints RESTful
- **Component Organization**: Separados por dominio (catalog, cart, admin) para escalabilidad
- **Supabase Integration**: Cliente separado para browser/server, types generados automáticamente
- **TypeScript Strict**: Types por dominio facilitan mantenimiento y refactoring
- **Tailwind Custom Config**: Paleta de colores Emerald/Slate predefinida en config

## Complexity Tracking

> No violations detected - Constitution fully compliant

N/A - Todos los gates de la constitución fueron aprobados. El diseño sigue las mejores prácticas establecidas sin requerir justificaciones de complejidad adicional.

---

## Deliverables Summary

### Phase 0: Research ✅ COMPLETED

**Output**: `research.md`

Documentación completa de decisiones tecnológicas:
- ✅ Next.js 14 App Router justificado vs alternativas
- ✅ Supabase como BaaS seleccionado
- ✅ State management strategy (localStorage + Server Components)
- ✅ Tailwind con paleta custom Emerald/Slate
- ✅ WhatsApp integration pattern documentado
- ✅ Image optimization strategy
- ✅ Real-time search implementation pattern
- ✅ Business hours validation approach
- ✅ Authentication strategy con Supabase Auth
- ✅ Form validation con Zod

### Phase 1: Design ✅ COMPLETED

**Outputs**: `data-model.md`, `contracts/`, `quickstart.md`

**Data Model**:
- ✅ 4 tablas definidas: categories, products, product_variants, settings
- ✅ Relaciones y constraints completos
- ✅ Índices de performance especificados
- ✅ RLS policies definidas para seguridad
- ✅ Storage bucket configuration (product-images)
- ✅ TypeScript types generados

**API Contracts**:
- ✅ Products API: CRUD completo con variantes
- ✅ Categories API: CRUD con validación de productos asociados
- ✅ WhatsApp Integration: Message generator y URL scheme

**Quickstart Guide**:
- ✅ Setup completo desde cero (prereqs, instalación, Supabase setup)
- ✅ Configuración de env variables
- ✅ Migraciones y seed data
- ✅ Creación de admin user
- ✅ Storage bucket setup
- ✅ Troubleshooting común
- ✅ Comandos útiles y recursos

### Phase 2: Tasks (NEXT STEP)

**Command**: `npx speckit tasks` o similar

Este comando generará `tasks.md` con lista detallada de tareas basada en:
- User stories priorizadas de `spec.md`
- Estructura de código definida en `plan.md`
- Entidades del `data-model.md`
- Endpoints de `contracts/`

---

## Implementation Roadmap

### Timeline (según cronograma original del doc de requisitos)

**Fase 1: Setup y Base de Datos** (3-5 días)
- Configuración inicial de Next.js con TypeScript y Tailwind
- Configuración de Supabase project
- Ejecución de migraciones (001, 002, 003)
- Seed de categorías y settings
- Configuración de autenticación básica

**Fase 2: Panel de Administración** (5-7 días)
- Login de administrador
- CRUD de productos (crear, editar, eliminar, activar/desactivar)
- CRUD de categorías
- Gestión de imágenes con Supabase Storage
- Gestión de variantes de productos

**Fase 3: Catálogo Cliente** (5-7 días)
- Diseño y maquetación responsiva mobile-first
- Listado de productos con Server Components
- Búsqueda en tiempo real con debounce
- Filtros por categoría
- Detalle de producto con variantes

**Fase 4: Carrito y Pedido** (4-6 días)
- Funcionalidad de carrito con localStorage
- Formulario de pedido con validación
- Integración con WhatsApp (message generator)
- Validación de horario de atención
- Flujo completo de checkout

**Fase 5: Testing y Ajustes** (3-5 días)
- Pruebas funcionales en móviles reales
- Optimización de rendimiento (Core Web Vitals)
- Ajustes de diseño responsive
- Corrección de bugs
- Pruebas cross-browser (Chrome, Safari, Firefox)
- Testing de WhatsApp en Web y Mobile

**Total Estimado**: 20-30 días hábiles

---

## Success Criteria (from spec.md)

El proyecto se considera completo cuando:

✅ El catálogo muestra todos los productos con imágenes y precios
✅ El administrador puede crear, editar y eliminar productos sin problemas
✅ El carrito funciona correctamente en móvil y desktop
✅ El pedido se envía correctamente formateado a WhatsApp (RF-11)
✅ El formulario valida todos los campos requeridos
✅ El sistema es responsive en todos los dispositivos
✅ El horario de atención se respeta (RF-12)
✅ No existen errores críticos en ninguna funcionalidad
✅ El rendimiento es óptimo (carga <3s, búsqueda <500ms)
✅ El código está documentado y es mantenible
✅ Todos los gates de la constitución están en cumplimiento

---

## Next Steps

1. **Generate Tasks**: Run `/speckit.tasks` to create detailed task breakdown
2. **Setup Environment**: Follow `quickstart.md` to configure local dev
3. **Begin Phase 1**: Start with database setup and migrations
4. **Iterative Development**: Implement user stories in priority order (P1 → P5)
5. **Continuous Testing**: Test on mobile devices as features are built
6. **Deployment Prep**: Configure Vercel once core features are stable

---

**Plan Status**: ✅ **COMPLETE AND READY FOR IMPLEMENTATION**

All phases documented:
- ✅ Phase 0: Research complete
- ✅ Phase 1: Design complete (data model, contracts, quickstart)
- ⏭️ Phase 2: Tasks generation (next step with `/speckit.tasks`)

**Branch**: `001-tienda-did-ecommerce-system`  
**Constitution Gates**: All passed ✅  
**Technical Stack**: Validated and documented  
**User Stories**: Prioritized and testable independently
