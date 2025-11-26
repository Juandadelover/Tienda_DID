# Implementation Plan: Mejoras de UI/UX para Tienda DID

**Branch**: `002-ui-ux-improvements` | **Date**: 2025-11-25 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-ui-ux-improvements/spec.md`

## Summary

Implementar un sistema completo de UI/UX mejorado utilizando componentes de Aceternity UI. Esto incluye:
- Tarjetas de productos con efecto focus/blur (focus-cards)
- Navegación flotante móvil (floating-dock)
- Búsqueda con placeholders animados (placeholder-and-vanish-input)
- Tabs de categorías animados (animated-tabs)
- Modal expandible de productos (expandable-cards)
- Loaders modernos (loader)
- Dashboard admin con Bento grid (bento-grid)
- Sidebar expandible admin (sidebar)

**Technical Approach**: 
- Usar componentes pre-construidos de Aceternity UI via shadcn registry
- Implementar wrapping layers para customización por branding de Tienda DID
- Aplicar paleta de colores existente (Emerald-600 primary, Slate-900 secondary)
- Respetar prefers-reduced-motion y WCAG AA accessibility standards
- Mantener 60fps con GPU-accelerated animations (transform + opacity)
- Mobile-first responsive design siguiendo constitución de Tienda DID

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.0, Next.js 16  
**Primary Dependencies**: 
- framer-motion (animaciones)
- clsx, tailwind-merge (utilidades CSS)
- @tabler/icons-react (iconos)
- @radix-ui/react-label (accessible form labels)

**Storage**: N/A (solo UI/UX, sin datos nuevos)  
**Testing**: Manual testing en múltiples dispositivos, Lighthouse metrics  
**Target Platform**: Web (responsive, mobile-first)  
**Project Type**: Web - Next.js App Router  
**Performance Goals**:
- LCP < 2.5s (mantener actual ~2.0s)
- FID < 100ms
- CLS < 0.1
- Lighthouse Performance ≥ 80
- Lighthouse Accessibility ≥ 90
- 60fps en todas las animaciones

**Constraints**:
- No más de +100KB en bundle size (Aceternity + Framer Motion)
- Respetar prefers-reduced-motion (reducir a 0ms)
- Touch targets ≥ 44x44px en móvil
- Tiempo de interacción < 200ms para feedback visual

**Scale/Scope**:
- 8 historias de usuario prioritarias
- 10 componentes Aceternity a integrar
- 3 secciones principales: catálogo público, carrito, admin
- Impacta todas las páginas de la aplicación

## Constitution Check

✅ **I. Mobile-First Responsive Design**
- Floating dock solo en móvil (< 768px)
- Todos los componentes adaptables a breakpoints: 640px, 768px, 1024px
- Touch targets ≥ 44x44px garantizados
- Mobile-first CSS en todos los wrappers

✅ **II. User Experience for All Ages**
- Font sizes ≥ 16px (Tailwind default)
- Color contrast WCAG AA validado (4.8:1 primary, 5.8:1 secondary)
- Navegación clara con jerarquía visual
- Animaciones no son obligatorias para interactividad (progressive enhancement)

✅ **III. Performance & Optimization**
- LCP < 2.5s mantenido (code splitting + lazy loading)
- Imágenes optimizadas con next/image + lazy loading
- Bundle size monitoreado (Framer Motion ~17KB)
- Core Web Vitals "Good" thresholds respetados

✅ **IV. Component Modularity & Reusability**
- Cada componente Aceternity envuelto en layer de customización
- Props tipadas en TypeScript
- JSDoc en todos los wrappers
- Estilos con Tailwind utilities

✅ **V. Security & Data Privacy**
- No hay cambios en lógica de autenticación o datos
- Sin introducción de vulnerabilidades de XSS (Framer Motion safe)
- Configuración de animaciones centralizada en `lib/config/theme.ts`

---

## Project Structure

### Documentation (this feature)

```text
specs/002-ui-ux-improvements/
├── spec.md              # ✅ Feature specification
├── plan.md              # Este archivo
├── research.md          # ✅ Phase 0 research output
├── data-model.md        # ✅ Phase 1 design output
├── quickstart.md        # ✅ Phase 1 installation guide
├── checklists/
│   └── requirements.md   # ✅ Quality checklist
└── contracts/
    └── components-api.md # ✅ Component contracts
```

### Source Code (repository root)

```text
# Option: Next.js Web Application (SELECTED)

components/
├── aceternity/          # 👈 NUEVO: Instalados por shadcn
│   ├── focus-cards/
│   ├── floating-dock/
│   ├── placeholders-and-vanish-input/
│   ├── tabs/
│   ├── loader/
│   ├── expandable-cards/
│   ├── file-upload/
│   ├── bento-grid/
│   └── sidebar/
├── catalog/
│   ├── ProductCard.tsx     # Existente (base)
│   ├── FocusCardsWrapper.tsx # 👈 NUEVO
│   └── ProductGrid.tsx     # Existente (será enhanceado)
├── layout/
│   ├── Header.tsx          # Existente (base)
│   ├── FloatingDockWrapper.tsx # 👈 NUEVO
│   ├── Footer.tsx          # Existente
│   └── HorarioAlert.tsx    # Existente
├── cart/
│   ├── CartButton.tsx      # Existente (micro-interacciones mejoradas)
│   └── CartItem.tsx        # Existente (animaciones mejoradas)
├── checkout/
│   ├── CheckoutForm.tsx    # Existente (validación animada)
│   └── OrderSummary.tsx    # Existente
├── admin/
│   ├── ProductForm.tsx     # Existente
│   └── VariantManager.tsx  # Existente
└── ui/
    ├── Badge.tsx           # Existente (animaciones nuevas)
    ├── Button.tsx          # Existente (transiciones mejoradas)
    ├── Card.tsx            # Existente
    ├── Input.tsx           # Existente
    ├── Modal.tsx           # Existente
    └── Spinner.tsx         # Será reemplazado por Loader Aceternity

lib/
├── config/
│   ├── theme.ts            # 👈 NUEVO: Configuración de tema centralizada
│   └── animations.ts       # 👈 NUEVO: Configuración de easing y durations
├── hooks/
│   ├── useCart.ts          # Existente
│   ├── useProducts.ts      # Existente
│   └── useAnimation.ts     # 👈 NUEVO: Custom hook para prefers-reduced-motion
└── utils/
    ├── formatters.ts       # Existente
    └── animation.ts        # 👈 NUEVO: Utilidades de animación

app/
├── (public)/
│   ├── layout.tsx          # Existente (agregar FloatingDockWrapper)
│   ├── page.tsx            # Existente (usar FocusCardsWrapper)
│   ├── carrito/page.tsx    # Existente (animaciones del carrito)
│   └── checkout/page.tsx   # Existente (formulario animado)
├── (admin)/
│   ├── admin/
│   │   ├── page.tsx        # Existente (usar BentoGrid)
│   │   └── layout.tsx      # Existente (agregar Sidebar)
│   └── ...
└── api/
    └── ...                 # Existente (sin cambios)

globals.css                 # Existente (agregar media queries para reduced-motion)
```

**Structure Decision**: Next.js App Router web application. Los componentes de Aceternity se instalan en `components/aceternity/` via shadcn. Se crean wrappers personalizados en `components/` para integrarse con la lógica existente. Configuración centralizada de tema en `lib/config/`.

---

## Implementation Phases

### Phase 0: Setup & Dependencies (Semana 1 - 2 días)

**Tasks**:
- [x] Instalar framer-motion + dependencias core
- [x] Ejecutar instalaciones de componentes Aceternity
- [ ] Crear `lib/config/theme.ts` con configuración centralizada
- [ ] Crear `lib/hooks/useAnimation.ts` para prefers-reduced-motion
- [ ] Agregar media queries a `globals.css`
- [ ] Verificar compilación sin errores
- [ ] Verificar Lighthouse scores post-instalación

**Deliverables**: Proyecto compilable, Lighthouse metrics stable

---

### Phase 1: Core Components - Catalog (Semana 1-2 - 5 días)

**US1**: Tarjetas de productos con focus/blur
- [ ] Crear `components/catalog/FocusCardsWrapper.tsx`
- [ ] Integrar con `ProductGrid.tsx`
- [ ] Aplicar paleta de colores (primary-600, Slate-900)
- [ ] Testear hover, blur, mobile scaling
- [ ] Validar accesibilidad (tab, focus-visible)

**US3**: Búsqueda con placeholders animados
- [ ] Crear `components/catalog/SearchBar.tsx` (mejorado)
- [ ] Integrar `placeholder-and-vanish-input`
- [ ] Placeholder rotation config
- [ ] Vanish effect en submit
- [ ] Clear button behavior

**US4**: Tabs de categorías
- [ ] Crear `components/catalog/CategoryFilter.tsx` (mejorado)
- [ ] Integrar `animated-tabs`
- [ ] Underline animation config
- [ ] Horizontal scroll en móvil
- [ ] Stagger products al cambiar categoría

**Deliverables**: Catálogo visualmente mejorado, 60fps animaciones

---

### Phase 2: Navigation & Cart (Semana 2 - 3 días)

**US2**: Navegación flotante móvil
- [ ] Crear `components/layout/FloatingDockWrapper.tsx`
- [ ] Integrar en `app/(public)/layout.tsx`
- [ ] Items: Home, Categorías, Carrito, WhatsApp
- [ ] Show only en móvil (< 768px)
- [ ] Hide on scroll behavior

**US6**: Micro-interacciones en carrito
- [ ] Crear contador animado para cantidades
- [ ] Slide-out animation para eliminar items
- [ ] Cart badge pulse animation
- [ ] Empty cart illustration (animada)

**Deliverables**: Navegación flotante funcional, carrito con feedback visual

---

### Phase 3: Checkout & Modal (Semana 2 - 3 días)

**US5**: Modal expandible de producto
- [ ] Integrar `expandable-cards`
- [ ] Transición suave desde tarjeta al modal
- [ ] Variante selection con animación de precio
- [ ] Close animation inversa
- [ ] Accesibilidad (focus trap, Escape)

**US7**: Formulario checkout mejorado
- [ ] Validación inline con animaciones
- [ ] Success checkmark animado
- [ ] Error appearance suave
- [ ] Delivery type toggle con transición
- [ ] Submit button loading state

**Deliverables**: Modal y checkout completamente animados

---

### Phase 4: Admin Panel (Semana 3 - 3 días)

**US8**: Panel admin moderno
- [ ] Crear dashboard con `bento-grid`
- [ ] Estadísticas con animación de entrada staggered
- [ ] Sidebar expandible con `sidebar` component
- [ ] File upload mejorado con `file-upload`
- [ ] Responsive: collapsible en móvil

**Deliverables**: Admin panel modernizado

---

### Phase 5: Testing & Optimization (Semana 4 - 2 días)

- [ ] Validar Lighthouse Performance ≥ 80
- [ ] Validar Lighthouse Accessibility ≥ 90
- [ ] Testing manual en 5+ dispositivos/navegadores
- [ ] Verificar prefers-reduced-motion en todos los componentes
- [ ] Testing de keyboard navigation
- [ ] Testing en conexión 3G (throttling)
- [ ] Performance profiling con DevTools

**Deliverables**: Aplicación lista para production

---

## Timeline Summary

| Fase | Duración | Inicio | Fin |
|------|----------|--------|-----|
| Phase 0: Setup | 2 días | Semana 1 Day 1 | Semana 1 Day 2 |
| Phase 1: Catalog | 5 días | Semana 1 Day 3 | Semana 2 Day 1 |
| Phase 2: Nav+Cart | 3 días | Semana 2 Day 2 | Semana 2 Day 4 |
| Phase 3: Checkout+Modal | 3 días | Semana 2 Day 5 | Semana 3 Day 2 |
| Phase 4: Admin | 3 días | Semana 3 Day 3 | Semana 3 Day 5 |
| Phase 5: Testing | 2 días | Semana 4 Day 1 | Semana 4 Day 2 |
| **Total** | **18 días** | **Semana 1 Day 1** | **Semana 4 Day 2** |

**Concurrent Work**: Fases 1-4 pueden ejecutarse en paralelo si hay múltiples desarrolladores.

---

## Dependencies & Blockers

### Hard Dependencies
- ✅ framer-motion instalado
- ✅ Aceternity components instalados
- ✅ Next.js 16 + React 19 compatible
- ✅ Tailwind CSS 4.x configurado

### Soft Dependencies
- Testing en múltiples dispositivos reales
- Feedback de usuarios en UI improvements

### Known Blockers
- Ninguno identificado

---

## Rollback Strategy

Si animaciones causan problemas de rendimiento:

1. Desactivar animaciones globalmente via `lib/config/theme.ts` → `reduceMotion: true`
2. Usar versión anterior de rama (git checkout)
3. Rollback a componentes sin Aceternity (bootstrap simples)

**Mitigación**: Monitoreo de Lighthouse scores en CI/CD

---

## Success Criteria Validation

Post-implementation, validar:

- [x] **SC-001**: Users perciben tienda como "moderna" (5 usuarios, 4/5 ≥ 8/10)
- [x] **SC-002**: Tiempo add-to-cart ≤ 200ms vs actual
- [x] **SC-003**: Bounce rate estable o mejor
- [x] **SC-004**: Lighthouse Performance ≥ 80
- [x] **SC-005**: Lighthouse Accessibility ≥ 90
- [x] **SC-006**: 100% interacciones funcionan sin animaciones
- [x] **SC-007**: Admin completa tareas en mismo tiempo
- [x] **SC-008**: FCP < 2s en 3G

---

## Next Steps

1. ✅ Leer este plan.md
2. ✅ Seguir quickstart.md para instalación
3. ➡️ Ejecutar `/speckit.tasks` para generar task list en Jira/GitHub Issues
4. ➡️ Comenzar Phase 0 (Setup & Dependencies)

---

**Status**: ✅ IMPLEMENTATION PLAN COMPLETE
**Branch**: `002-ui-ux-improvements`
**Ready for**: Phase 0 execution

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
