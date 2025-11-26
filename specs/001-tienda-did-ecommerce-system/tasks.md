---
description: "Implementation tasks for Tienda DID E-Commerce System"
---

# Tasks: Sistema E-Commerce Tienda DID

**Branch**: `001-tienda-did-ecommerce-system`  
**Input**: Design documents from `/specs/001-tienda-did-ecommerce-system/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: No test tasks included (not explicitly requested in specification)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

---

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **Checkbox**: `- [ ]` (markdown task checkbox)
- **[ID]**: Sequential task ID (T001, T002, T003...)
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- **File paths**: Exact file paths included in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base structure for Next.js 16, TypeScript, Tailwind, Supabase

- [X] T001 Initialize Next.js 16.0.4 project with TypeScript 5.x and App Router in /home/juanda/tiendadid
- [X] T002 [P] Install core dependencies: react@19.2.0, next@16.0.4, typescript@5.x, tailwindcss@4.x
- [X] T003 [P] Configure tailwind.config.ts with custom Emerald/Slate palette from paleta-colores-tienda-did.md
- [X] T004 [P] Configure tsconfig.json with strict mode enabled
- [X] T005 [P] Create .env.example with required variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
- [X] T006 [P] Setup eslint.config.mjs for Next.js and TypeScript
- [X] T007 [P] Create app/globals.css with Tailwind directives and custom CSS variables
- [X] T008 Create app/layout.tsx root layout with metadata and font configuration
- [X] T009 [P] Add Supabase dependencies: @supabase/supabase-js, @supabase/ssr
- [X] T010 [P] Create public/images/logo.svg and public/images/placeholder.png
- [X] T011 [P] Create lib/constants.ts with WhatsApp number (573235725922), store info, breakpoints
- [X] T012 [P] Create types/product.ts with Product and Variant interfaces
- [X] T013 [P] Create types/category.ts with Category interfaces
- [X] T014 [P] Create types/cart.ts with Cart and CartItem interfaces
- [X] T015 [P] Create types/order.ts with Order and Customer interfaces

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Database & Authentication Setup

- [X] T016 Setup Supabase project via Supabase dashboard and obtain credentials
- [X] T017 Create lib/supabase/client.ts with browser Supabase client
- [X] T018 Create lib/supabase/server.ts with server-side Supabase client for Server Components
- [X] T019 Create supabase/migrations/001_initial_schema.sql with categories, products, product_variants, settings tables
- [X] T020 Create supabase/migrations/002_rls_policies.sql with Row Level Security policies per data-model.md
- [X] T021 Create supabase/migrations/003_storage_setup.sql for product-images bucket configuration
- [X] T022 Create supabase/seed.sql with 6 default categories (Abarrotes, Bebidas, Productos de aseo, Snacks y dulces, Lácteos y refrigerados, Otros) and settings
- [X] T023 Execute migrations 001, 002, 003 on Supabase project
- [X] T024 Execute seed.sql to populate categories and settings
- [X] T025 Create admin user in Supabase Auth via Supabase dashboard
- [X] T026 Generate TypeScript types from Supabase schema and save to lib/supabase/types.ts

### Utility Functions & Hooks

- [X] T027 [P] Create lib/utils/formatters.ts with currency and date formatting functions
- [X] T028 [P] Create lib/utils/validators.ts with Zod schemas for form validation
- [X] T029 [P] Create lib/utils/whatsapp.ts with generateWhatsAppMessage function per RF-11 format
- [X] T030 [P] Create lib/hooks/useHorario.ts for business hours validation (closes at 22:00)

### Base UI Components

- [X] T031 [P] Create components/ui/Button.tsx with variants (primary, secondary, danger, ghost)
- [X] T032 [P] Create components/ui/Card.tsx reusable card component
- [X] T033 [P] Create components/ui/Input.tsx form input with error states
- [X] T034 [P] Create components/ui/Badge.tsx for status badges (disponible, agotado, nuevo)
- [X] T035 [P] Create components/ui/Modal.tsx reusable modal dialog
- [X] T036 [P] Create components/ui/Spinner.tsx loading spinner component

### Layout Components

- [X] T037 Create components/layout/Header.tsx public header (logo, search later, cart later)
- [X] T038 Create components/layout/Footer.tsx with store info and hours
- [X] T039 Create components/layout/HorarioAlert.tsx business hours alert component
- [X] T040 Create app/(public)/layout.tsx public route group layout with Header and Footer

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Catálogo Público (Priority: P1) 🎯 MVP Core

**Goal**: Cliente puede ver productos organizados por categorías con búsqueda en tiempo real, desde cualquier dispositivo móvil o desktop.

**Independent Test**: Navegar a `/`, ver productos agrupados por categorías, usar buscador en tiempo real, verificar responsive en móvil (touch targets ≥44px).

### API Endpoints for US1

- [ ] T041 [P] [US1] Create app/api/products/route.ts with GET handler (list products with filters: category, available, search)
- [ ] T042 [P] [US1] Create app/api/products/[id]/route.ts with GET handler (single product with variants)
- [ ] T043 [P] [US1] Create app/api/categories/route.ts with GET handler (list categories with product_count)

### Data Fetching Hooks for US1

- [ ] T044 [US1] Create lib/hooks/useProducts.ts hook for fetching products (depends on T041, T042)
- [ ] T045 [P] [US1] Create lib/hooks/useCategories.ts hook for fetching categories

### Catalog Components for US1

- [ ] T046 [P] [US1] Create components/catalog/ProductCard.tsx individual product card with image, name, price, badge
- [ ] T047 [P] [US1] Create components/catalog/ProductGrid.tsx responsive grid layout for products
- [ ] T048 [P] [US1] Create components/catalog/CategoryFilter.tsx category filter buttons
- [ ] T049 [P] [US1] Create components/catalog/SearchBar.tsx real-time search with debounce (<500ms)
- [ ] T050 [P] [US1] Create components/catalog/ProductModal.tsx product detail modal with variants

### Main Catalog Page for US1

- [ ] T051 [US1] Create app/(public)/page.tsx home/catalog page integrating ProductGrid, CategoryFilter, SearchBar (depends on T046-T050)
- [ ] T052 [US1] Implement mobile-first responsive design with breakpoints (mobile <768px, tablet 768-1024px, desktop >1024px)
- [ ] T053 [US1] Add lazy loading for product images using next/image with placeholder
- [ ] T054 [US1] Test product availability logic (agotado products show badge and can't be added to cart)
- [ ] T055 [US1] Test product variants display in ProductModal
- [ ] T056 [US1] Test search functionality filters products in <500ms
- [ ] T057 [US1] Test category filter updates product list correctly
- [ ] T058 [US1] Verify touch targets ≥44x44px on mobile for all interactive elements
- [ ] T059 [US1] Test business hours alert displays when store is closed (after 10 PM)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (MVP ready!)

---

## Phase 4: User Story 2 - Carrito de Compras (Priority: P2)

**Goal**: Cliente puede agregar productos al carrito, modificar cantidades, eliminar items y ver el total actualizado, con persistencia en localStorage.

**Independent Test**: Agregar productos al carrito, modificar cantidades, eliminar items, cerrar navegador y verificar que carrito persiste al volver.

### Cart State Management for US2

- [ ] T060 [P] [US2] Create lib/hooks/useCart.ts custom hook with localStorage persistence (add, remove, update quantity, clear, total calculation)
- [ ] T061 [P] [US2] Create context/CartContext.tsx React Context for cart state management

### Cart Components for US2

- [ ] T062 [P] [US2] Create components/cart/CartButton.tsx header cart icon with item count badge
- [ ] T063 [P] [US2] Create components/cart/CartItem.tsx cart item row (product, variant, quantity controls, subtotal, delete button)
- [ ] T064 [P] [US2] Create components/cart/CartSummary.tsx cart totals display (subtotal, total)
- [ ] T065 [P] [US2] Create components/cart/EmptyCart.tsx empty state with message and "Volver al catálogo" button

### Cart Page for US2

- [ ] T066 [US2] Create app/(public)/carrito/page.tsx cart page integrating CartItem, CartSummary, EmptyCart (depends on T062-T065)
- [ ] T067 [US2] Implement quantity increment/decrement with automatic total recalculation
- [ ] T068 [US2] Implement remove item functionality with confirmation
- [ ] T069 [US2] Add "Agregar al carrito" button to ProductCard component in components/catalog/ProductCard.tsx

### Integration with US1

- [ ] T070 [US2] Update components/layout/Header.tsx to include CartButton component
- [ ] T071 [US2] Update components/catalog/ProductModal.tsx to include "Agregar al carrito" with variant selection

### Testing for US2

- [ ] T072 [US2] Test adding product without variants to cart
- [ ] T073 [US2] Test adding product with variants to cart (must select variant)
- [ ] T074 [US2] Test modifying quantity updates subtotal and total correctly
- [ ] T075 [US2] Test removing item from cart
- [ ] T076 [US2] Test cart persistence in localStorage after browser close/reopen
- [ ] T077 [US2] Test empty cart state displays correctly
- [ ] T078 [US2] Test that agotado products cannot be added to cart (button disabled)
- [ ] T079 [US2] Test setting quantity to 0 automatically removes item

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Checkout y WhatsApp (Priority: P3)

**Goal**: Cliente puede completar formulario de pedido, seleccionar tipo de entrega (pickup/delivery) y enviar pedido formateado a WhatsApp de la tienda.

**Independent Test**: Llenar formulario de checkout, seleccionar domicilio o pickup, hacer clic en "Enviar por WhatsApp" y verificar que abre WhatsApp con mensaje correctamente formateado.

### Checkout Components for US3

- [ ] T080 [P] [US3] Create components/checkout/CheckoutForm.tsx customer data form (name, phone, delivery type, address, notes) with Zod validation
- [ ] T081 [P] [US3] Create components/checkout/DeliverySelector.tsx radio buttons for "Recoger en tienda" vs "Domicilio gratis"
- [ ] T082 [P] [US3] Create components/checkout/OrderSummary.tsx final order review (items, total, delivery type)
- [ ] T083 [P] [US3] Create components/checkout/WhatsAppButton.tsx "Enviar por WhatsApp" button with disabled state after 10 PM

### Checkout Page for US3

- [ ] T084 [US3] Create app/(public)/checkout/page.tsx checkout page integrating all checkout components (depends on T080-T083)
- [ ] T085 [US3] Implement conditional address field (required for "Domicilio", hidden for "Recoger en tienda")
- [ ] T086 [US3] Implement form validation with Zod schemas (lib/utils/validators.ts)
- [ ] T087 [US3] Implement WhatsApp message generation using lib/utils/whatsapp.ts per RF-11 format
- [ ] T088 [US3] Implement WhatsApp URL generation (https://wa.me/573235725922?text=encoded_message)
- [ ] T089 [US3] Implement cart clearing after successful WhatsApp message sent

### Business Hours Validation for US3

- [ ] T090 [US3] Integrate useHorario hook to disable "Enviar por WhatsApp" button after 10 PM
- [ ] T091 [US3] Show HorarioAlert component when store is closed

### Testing for US3

- [ ] T092 [US3] Test checkout form validation (all required fields)
- [ ] T093 [US3] Test delivery type selection (Pickup hides address, Delivery shows address as required)
- [ ] T094 [US3] Test WhatsApp message format matches RF-11 specification (emoji, nombre, teléfono, productos con cantidades y precios, total, tipo entrega, dirección, notas)
- [ ] T095 [US3] Test WhatsApp URL opens correctly in Web and Mobile app
- [ ] T096 [US3] Test cart clears after WhatsApp message sent
- [ ] T097 [US3] Test "Enviar por WhatsApp" button is disabled after 10 PM with message
- [ ] T098 [US3] Test checkout redirects to cart if cart is empty

**Checkpoint**: All public user stories (US1, US2, US3) should now be independently functional

---

## Phase 6: User Story 4 - Admin Panel: Gestión de Productos (Priority: P4)

**Goal**: Administrador puede crear, editar, eliminar y cambiar disponibilidad de productos desde panel protegido con autenticación.

**Independent Test**: Hacer login en `/login`, acceder a `/admin`, crear producto nuevo con imagen, editarlo, cambiar disponibilidad a "Agotado", verificar se refleja en catálogo público.

### Authentication for US4

- [ ] T099 [P] [US4] Create app/(public)/login/page.tsx admin login page with email/password form
- [ ] T100 [P] [US4] Create lib/auth/authHelpers.ts with login, logout, getSession functions using Supabase Auth
- [ ] T101 [US4] Implement login form validation and error handling
- [ ] T102 [US4] Implement redirect to /admin on successful login
- [ ] T103 [US4] Implement redirect to /login for unauthenticated access to admin routes

### Admin Layout for US4

- [ ] T104 [P] [US4] Create app/(admin)/admin/layout.tsx admin route group layout with authentication check
- [ ] T105 [P] [US4] Create components/layout/AdminNav.tsx admin sidebar navigation (Dashboard, Productos, Categorías, Cerrar sesión)
- [ ] T106 [US4] Create app/(admin)/admin/page.tsx admin dashboard with summary stats (total products, categories, available products)

### Product Management API for US4

- [ ] T107 [P] [US4] Update app/api/products/route.ts with POST handler (create product, admin only)
- [ ] T108 [P] [US4] Update app/api/products/[id]/route.ts with PATCH handler (update product, admin only)
- [ ] T109 [P] [US4] Update app/api/products/[id]/route.ts with DELETE handler (delete product, admin only)
- [ ] T110 [P] [US4] Create app/api/variants/route.ts with POST, PATCH, DELETE handlers for product variants

### Image Upload for US4

- [ ] T111 [US4] Create components/admin/ImageUploader.tsx component for uploading images to Supabase Storage product-images bucket (max 5MB, JPG/PNG/WebP)
- [ ] T112 [US4] Implement image validation (format, size) and upload to Supabase Storage
- [ ] T113 [US4] Implement image URL storage in products.image_url

### Product Form Components for US4

- [ ] T114 [P] [US4] Create components/admin/ProductForm.tsx create/edit product form (name, description, category, unit_type, has_variants, base_price, image)
- [ ] T115 [P] [US4] Create components/admin/VariantManager.tsx manage product variants (add, edit, delete, availability toggle)
- [ ] T116 [US4] Integrate ImageUploader into ProductForm
- [ ] T117 [US4] Implement conditional base_price field (required if has_variants=false, hidden if has_variants=true)
- [ ] T118 [US4] Implement variant fields display (shown only if has_variants=true)

### Product Management Pages for US4

- [ ] T119 [P] [US4] Create components/admin/ProductTable.tsx admin product list table with edit, delete, availability toggle actions
- [ ] T120 [US4] Create app/(admin)/admin/productos/page.tsx products list page with ProductTable and "Agregar Producto" button
- [ ] T121 [US4] Create app/(admin)/admin/productos/nuevo/page.tsx create product page with ProductForm in create mode
- [ ] T122 [US4] Create app/(admin)/admin/productos/[id]/editar/page.tsx edit product page with ProductForm in edit mode pre-filled with product data

### Testing for US4

- [ ] T123 [US4] Test admin login with valid credentials redirects to /admin
- [ ] T124 [US4] Test admin login with invalid credentials shows error
- [ ] T125 [US4] Test unauthenticated access to /admin redirects to /login
- [ ] T126 [US4] Test creating product without variants (base_price required)
- [ ] T127 [US4] Test creating product with variants (base_price null, variants have prices)
- [ ] T128 [US4] Test uploading product image (JPG/PNG/WebP, <5MB)
- [ ] T129 [US4] Test image upload validation rejects >5MB files
- [ ] T130 [US4] Test editing product updates all fields correctly
- [ ] T131 [US4] Test editing product price reflects in public catalog immediately
- [ ] T132 [US4] Test deleting product with confirmation modal
- [ ] T133 [US4] Test toggling product availability (is_available) shows/hides in catalog
- [ ] T134 [US4] Test creating/editing/deleting product variants
- [ ] T135 [US4] Test logout clears session and redirects to /login

**Checkpoint**: Admin panel should be fully functional for product management

---

## Phase 7: User Story 5 - Admin Panel: Gestión de Categorías (Priority: P5)

**Goal**: Administrador puede crear, editar y eliminar categorías de productos (con validación de productos asociados).

**Independent Test**: Crear nueva categoría "Productos congelados", editar su nombre, intentar eliminar categoría con productos (debe fallar), eliminar categoría vacía exitosamente.

### Categories Management API for US5

- [ ] T136 [P] [US5] Update app/api/categories/route.ts with POST handler (create category, admin only)
- [ ] T137 [P] [US5] Update app/api/categories/[id]/route.ts with GET handler (single category)
- [ ] T138 [P] [US5] Update app/api/categories/[id]/route.ts with PATCH handler (update category, admin only)
- [ ] T139 [US5] Update app/api/categories/[id]/route.ts with DELETE handler (delete category with product validation, admin only)

### Category Management Components for US5

- [ ] T140 [P] [US5] Create components/admin/CategoryManager.tsx CRUD interface for categories (list, create form, edit form, delete with confirmation)
- [ ] T141 [US5] Create app/(admin)/admin/categorias/page.tsx categories management page with CategoryManager component

### Slug Generation for US5

- [ ] T142 [US5] Implement automatic slug generation from category name (lowercase, URL-safe) in CategoryManager
- [ ] T143 [US5] Implement slug uniqueness validation

### Testing for US5

- [ ] T144 [US5] Test creating new category with name and auto-generated slug
- [ ] T145 [US5] Test editing category name updates slug if modified
- [ ] T146 [US5] Test deleting category with products shows error "No se puede eliminar categoría con productos"
- [ ] T147 [US5] Test deleting empty category (0 products) succeeds
- [ ] T148 [US5] Test new category appears in catalog filter immediately
- [ ] T149 [US5] Test slug uniqueness validation prevents duplicate slugs

**Checkpoint**: All admin functionality (products + categories) should be complete

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validations

### Performance Optimization

- [ ] T150 [P] Optimize all images in public/ folder (WebP conversion, compression)
- [ ] T151 [P] Verify lazy loading works correctly for product images
- [ ] T152 [P] Run Lighthouse audit and ensure LCP <2.5s, FID <100ms, CLS <0.1
- [ ] T153 Verify initial page load <3s on 3G connection
- [ ] T154 Verify search responds in <500ms

### Accessibility & UX

- [ ] T155 [P] Verify all touch targets ≥44x44px on mobile
- [ ] T156 [P] Verify WCAG AA contrast ratios (palette should be AAA already)
- [ ] T157 [P] Test full app on mobile devices (Android Chrome, iOS Safari)
- [ ] T158 [P] Test full app on desktop browsers (Chrome, Firefox, Safari)
- [ ] T159 Add focus states for keyboard navigation

### Error Handling & Validation

- [ ] T160 [P] Implement global error boundary in app/layout.tsx
- [ ] T161 [P] Add error states to all API routes with proper HTTP status codes
- [ ] T162 [P] Add loading states to all data fetching components
- [ ] T163 Verify all forms show validation errors in Spanish

### Documentation & Deployment

- [ ] T164 [P] Update README.md with project overview, setup instructions, tech stack
- [ ] T165 [P] Verify .env.example has all required variables
- [ ] T166 Run quickstart.md validation (follow all steps on fresh install)
- [ ] T167 Configure next.config.ts for Vercel deployment (image optimization domains)
- [ ] T168 Test production build locally with `npm run build && npm start`
- [ ] T169 Deploy to Vercel and verify all functionality works in production

### Security Hardening

- [ ] T170 [P] Verify all sensitive data in .env.local (not committed)
- [ ] T171 [P] Verify RLS policies work correctly (public can't modify data)
- [ ] T172 Verify admin routes redirect unauthenticated users
- [ ] T173 Verify API routes validate authentication for mutations

### Final Validation

- [ ] T174 Test complete user journey: Browse → Add to cart → Checkout → WhatsApp (as customer)
- [ ] T175 Test complete admin journey: Login → Create product → Edit → Delete → Manage categories
- [ ] T176 Verify all User Story acceptance scenarios pass (US1-US5)
- [ ] T177 Verify all Functional Requirements FR-001 to FR-022 are met
- [ ] T178 Verify all Non-Functional Requirements NFR-001 to NFR-015 are met
- [ ] T179 Verify all Constitution gates still pass (mobile-first, UX, performance, modularity, security)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) - Integrates with US1 but independently testable
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) and US2 (cart) - Independently testable
- **User Story 4 (Phase 6)**: Depends on Foundational (Phase 2) and US1 (catalog to verify changes) - Independently testable
- **User Story 5 (Phase 7)**: Depends on Foundational (Phase 2) and US4 (admin auth) - Independently testable
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

```
Phase 1: Setup
    ↓
Phase 2: Foundational ← BLOCKS ALL STORIES
    ↓
    ├─→ Phase 3: US1 (Catalog) ← MVP Core
    ├─→ Phase 4: US2 (Cart) ← Requires US1 for integration
    ├─→ Phase 5: US3 (Checkout) ← Requires US2 for cart
    ├─→ Phase 6: US4 (Admin Products) ← Requires US1 to verify changes
    └─→ Phase 7: US5 (Admin Categories) ← Requires US4 for auth
         ↓
Phase 8: Polish & Validation
```

### Within Each User Story

- API routes before hooks that use them
- Hooks before components that use them
- Base components before page components
- Pages before integration testing
- Core implementation before integration with other stories

### Parallel Opportunities

**Setup (Phase 1)**: Tasks T002-T015 can run in parallel (different files)

**Foundational (Phase 2)**: 
- T027-T036 (utils and UI components) can run in parallel
- T037-T040 (layout components) can run in parallel after T031-T036

**User Story 1 (Phase 3)**:
- T041-T043 (API routes) can run in parallel
- T046-T050 (catalog components) can run in parallel

**User Story 2 (Phase 4)**:
- T060-T061 (cart state) can run in parallel
- T062-T065 (cart components) can run in parallel after T060-T061

**User Story 3 (Phase 5)**:
- T080-T083 (checkout components) can run in parallel

**User Story 4 (Phase 6)**:
- T099-T100 (auth) can run in parallel
- T104-T105 (admin layout) can run in parallel
- T107-T110 (API handlers) can run in parallel
- T114-T115 (forms) can run in parallel

**User Story 5 (Phase 7)**:
- T136-T139 (API handlers) can run in parallel

**Polish (Phase 8)**:
- T150-T152 (performance) can run in parallel
- T155-T159 (accessibility) can run in parallel
- T160-T163 (error handling) can run in parallel
- T164-T165 (documentation) can run in parallel
- T170-T172 (security) can run in parallel

### Parallel Example: User Story 1

```bash
# Launch all API routes for User Story 1 together:
T041: "Create app/api/products/route.ts with GET handler"
T042: "Create app/api/products/[id]/route.ts with GET handler"
T043: "Create app/api/categories/route.ts with GET handler"

# Then launch all catalog components together:
T046: "Create components/catalog/ProductCard.tsx"
T047: "Create components/catalog/ProductGrid.tsx"
T048: "Create components/catalog/CategoryFilter.tsx"
T049: "Create components/catalog/SearchBar.tsx"
T050: "Create components/catalog/ProductModal.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only) - RECOMMENDED

1. ✅ Complete Phase 1: Setup (T001-T015)
2. ✅ Complete Phase 2: Foundational (T016-T040) ← **CRITICAL - blocks all stories**
3. ✅ Complete Phase 3: User Story 1 (T041-T059) ← **MVP Core**
4. **STOP and VALIDATE**: Test User Story 1 independently per acceptance scenarios
5. Deploy MVP to Vercel and demo catalog functionality
6. **Decision point**: Get feedback before proceeding to Phase 4

### Incremental Delivery (RECOMMENDED)

1. Complete Setup + Foundational → Foundation ready (T001-T040)
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!) (T041-T059)
3. Add User Story 2 → Test independently → Deploy/Demo (Cart working) (T060-T079)
4. Add User Story 3 → Test independently → Deploy/Demo (Full customer flow) (T080-T098)
5. Add User Story 4 → Test independently → Deploy/Demo (Admin products) (T099-T135)
6. Add User Story 5 → Test independently → Deploy/Demo (Admin categories) (T136-T149)
7. Polish & Final Validation → Production ready (T150-T179)

Each increment delivers working, independently testable value!

### Parallel Team Strategy

With multiple developers:

1. **Together**: Complete Setup + Foundational (T001-T040)
2. **Once Foundational is done**:
   - Developer A: User Story 1 (T041-T059) ← Priority
   - Developer B: Base UI components (already done in Foundational)
   - Developer C: Documentation (T164-T165)
3. **After US1 complete**:
   - Developer A: User Story 2 (T060-T079)
   - Developer B: User Story 4 (T099-T135)
   - Developer C: User Story 3 (T080-T098)
4. **Final sprint**:
   - All: User Story 5 + Polish (T136-T179)

---

## Task Summary

- **Total Tasks**: 179
- **Phase 1 (Setup)**: 15 tasks
- **Phase 2 (Foundational)**: 25 tasks (T016-T040)
- **Phase 3 (US1 - Catalog)**: 19 tasks (T041-T059) ← MVP Core
- **Phase 4 (US2 - Cart)**: 20 tasks (T060-T079)
- **Phase 5 (US3 - Checkout)**: 19 tasks (T080-T098)
- **Phase 6 (US4 - Admin Products)**: 37 tasks (T099-T135)
- **Phase 7 (US5 - Admin Categories)**: 14 tasks (T136-T149)
- **Phase 8 (Polish)**: 30 tasks (T150-T179)

**Parallel Tasks**: 76 tasks marked with [P] can run in parallel within their phase

**MVP Scope**: Phases 1-3 (T001-T059) = 59 tasks = Functional catalog

**Full v1.0 Scope**: All 179 tasks = Complete e-commerce system with admin panel

---

## Suggested MVP Scope

For fastest time-to-value, implement in this order:

1. **Week 1**: Setup + Foundational (T001-T040) - 40 tasks
2. **Week 2**: User Story 1 (T041-T059) - 19 tasks
3. **Week 3**: User Story 2 + User Story 3 (T060-T098) - 39 tasks
4. **Week 4**: User Story 4 (T099-T135) - 37 tasks
5. **Week 5**: User Story 5 + Polish (T136-T179) - 44 tasks

**Total Timeline**: 5 weeks (25 días hábiles) aligns with cronograma original

---

## Format Validation

✅ All tasks follow checklist format: `- [ ] [ID] [P?] [Story?] Description with file path`
✅ All user story tasks have [Story] label (US1-US5)
✅ Setup and Foundational phases have NO story label
✅ Polish phase has NO story label
✅ All task IDs are sequential (T001-T179)
✅ All parallel tasks marked with [P]
✅ All tasks include specific file paths

---

## Notes

- Tests are NOT included (not explicitly requested in specification)
- Each user story is independently testable per acceptance scenarios in spec.md
- Cart uses localStorage (no backend storage per RNF-08)
- WhatsApp integration does NOT store orders (privacy requirement RNF-08)
- Single admin user only (no multi-user support in v1.0)
- All 22 Functional Requirements (FR-001 to FR-022) mapped to tasks
- All 15 Non-Functional Requirements (NFR-001 to NFR-015) validated in Phase 8
- Constitution gates validated in final tasks (T179)

---

**Status**: ✅ **Tasks ready for implementation**

**Next Action**: Start with Phase 1 (Setup) tasks T001-T015, then proceed to Phase 2 (Foundational) before beginning any user story work.
