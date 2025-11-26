# Tasks: Mejoras de UI/UX para Tienda DID

**Feature**: `002-ui-ux-improvements` - Implementar componentes Aceternity UI con animaciones modernas  
**Branch**: `002-ui-ux-improvements`  
**Date**: 2025-11-25  
**Status**: Ready for Phase 0 Execution  
**Spec**: [spec.md](./spec.md) | [Plan](./plan.md) | [Research](./research.md)

---

## 📋 Task Format Guide

Cada tarea sigue el formato:
```
- [ ] [TaskID] [P?] [Story?] Descripción con ruta de archivo
```

- **TaskID**: T001, T002... (orden de ejecución)
- **[P]**: Marcar si es paralelizable (diferentes archivos, sin dependencias)
- **[Story]**: [US1], [US2]... (solo en tasks de user stories)
- **Descripción**: Acción clara + ruta exacta del archivo

---

## 🔧 Phase 0: Setup & Dependencies (2 días)

**Objetivo**: Preparar proyecto con todas las dependencias instaladas y configuración centralizada  
**Criterios de prueba**: Proyecto compila sin errores, Lighthouse metrics mantiene Performance ≥80 y Accessibility ≥90

### Installation & Verification

- [ ] T001 Instalar dependencias core: framer-motion, clsx, tailwind-merge, @tabler/icons-react
- [ ] T002 Ejecutar instalación de focus-cards component vía shadcn: `npx shadcn-ui@latest add focus-cards`
- [ ] T003 [P] Ejecutar instalación de floating-dock component: `npx shadcn-ui@latest add floating-dock`
- [ ] T004 [P] Ejecutar instalación de placeholder-and-vanish-input: `npx shadcn-ui@latest add placeholder-and-vanish-input`
- [ ] T005 [P] Ejecutar instalación de animated-tabs: `npx shadcn-ui@latest add tabs` (base para animated-tabs)
- [ ] T006 [P] Ejecutar instalación de loader component: `npx shadcn-ui@latest add loader`
- [ ] T007 [P] Ejecutar instalación de expandable-cards: `npx shadcn-ui@latest add expandable-cards`
- [ ] T008 [P] Ejecutar instalación de bento-grid: `npx shadcn-ui@latest add bento-grid`
- [ ] T009 [P] Ejecutar instalación de sidebar: `npx shadcn-ui@latest add sidebar`
- [ ] T010 [P] Ejecutar instalación de file-upload: `npx shadcn-ui@latest add file-upload`

### Theme & Configuration

- [ ] T011 Crear archivo de configuración de tema centralizado en `lib/config/theme.ts` con ThemeConfig type, ColorPalette (primary: Emerald-600, secondary: Slate-900, background: Slate-50), AnimationConfig (durations, easing functions)
- [ ] T012 [P] Crear archivo de configuración de animaciones en `lib/config/animations.ts` con AnimationDurations (fast: 150ms, normal: 300ms, slow: 500ms) y EasingConfig
- [ ] T013 [P] Crear custom hook para prefers-reduced-motion en `lib/hooks/useAnimation.ts` que detecte preferencia de usuario y retorne durations reducidas
- [ ] T014 [P] Actualizar `globals.css` con media query `@media (prefers-reduced-motion: reduce)` que establezca `--animation-duration: 0ms` para todos los elementos animados
- [ ] T015 [P] Actualizar `globals.css` con definiciones de custom properties para colores (--color-primary, --color-secondary, --color-background, --color-text, --color-status)

### Verification & Validation

- [ ] T016 Verificar compilación del proyecto: `npm run build` sin errores
- [ ] T017 Verificar que no hay errores de TypeScript: `npx tsc --noEmit`
- [ ] T018 [P] Ejecutar Lighthouse audit para Performance (meta: ≥80)
- [ ] T019 [P] Ejecutar Lighthouse audit para Accessibility (meta: ≥90)
- [ ] T020 [P] Verificar que prefers-reduced-motion está activo en DevTools y confirmar que las animaciones se desactivan
- [ ] T021 Documentar versiones instaladas en archivo `.specify/context/dependencies-installed.md`

---

## 🎨 Phase 1: Catalog Components (5 días)

**Objetivo**: Mejorar experiencia visual del catálogo con tarjetas con focus effect, búsqueda animada y categorías con tabs  
**Criterios de prueba**: 
- Tarjetas de productos muestran blur effect en hover/focus en desktop y mobile
- Búsqueda tiene placeholders rotativos y effect de vanish
- Categorías cambian con transición de tab y productos aparecen con stagger animation
- Todas las animaciones son 60fps
- Accesibilidad WCAG AA: keyboard navigation funciona, contraste ≥4.5:1

### User Story 1: Experiencia Visual Mejorada en Catálogo

- [ ] T022 [US1] Crear componente wrapper `components/catalog/FocusCardsWrapper.tsx` que envuelva focus-cards de Aceternity con personalización de Tienda DID (colores, espaciados, bordes redondeados según theme.ts)
- [ ] T023 [P] [US1] Crear componente `components/ui/LoaderSpinner.tsx` que reemplace spinner actual usando Aceternity loader con variant: 'pulse' y color: Emerald-600
- [ ] T024 [P] [US1] Actualizar `components/catalog/ProductCard.tsx` para integrar con FocusCardsWrapper, usando focus-visible pseudo-class para keyboard navigation
- [ ] T025 [P] [US1] Actualizar `components/catalog/ProductGrid.tsx` para usar FocusCardsWrapper en lugar de grid simple, aplicar blur effect en cards no seleccionadas
- [ ] T026 [US1] Agregar animación de fade-in a imágenes de productos en `components/catalog/ProductCard.tsx` usando Framer Motion motion.img con initial={{ opacity: 0 }}, animate={{ opacity: 1 }}, transition={{ duration: 0.3 }}
- [ ] T027 [P] [US1] Verificar contrastes de colores con Chrome DevTools Lighthouse (texto sobre backgrounds Emerald-600 y Slate-900)
- [ ] T028 [US1] Testear en Chrome DevTools móvil (375px, 768px, 1024px) que las tarjetas mantienen touch target ≥44x44px

### User Story 3: Búsqueda con Retroalimentación Visual Mejorada

- [ ] T029 [US3] Crear componente mejorado `components/catalog/SearchBar.tsx` integrando placeholder-and-vanish-input de Aceternity
- [ ] T030 [P] [US3] Configurar placeholders rotativos en SearchBar: ["Buscar productos", "Buscar categorías", "Buscar marcas"], interval: 3000ms
- [ ] T031 [P] [US3] Implementar vanish effect en SearchBar: cuando usuario hace submit, el texto desaparece con transición y resultados cargan
- [ ] T032 [P] [US3] Agregar estado "sin resultados" en `app/(public)/page.tsx` con ilustración animada e sugerencias de categorías
- [ ] T033 [P] [US3] Implementar clear button en SearchBar que borra texto con animación suave
- [ ] T034 [US3] Validar accesibilidad: atributo aria-label="Buscar productos", aria-expanded para estado, role="search" en contenedor
- [ ] T035 [US3] Testear en navegadores: Chrome, Firefox, Safari en desktop y mobile

### User Story 4: Filtrado por Categorías con Tabs Animados

- [ ] T036 [US4] Crear componente mejorado `components/catalog/CategoryFilter.tsx` integrando animated-tabs de Aceternity con underline animation
- [ ] T037 [P] [US4] Configurar underline animation en tabs: color: Emerald-600, duration: 300ms, easing: ease-out
- [ ] T038 [P] [US4] Implementar horizontal scroll en CategoryFilter para móvil (< 768px) con scroll-snap-type: x mandatory
- [ ] T039 [P] [US4] Implementar stagger animation en ProductGrid cuando categoría cambia: Motion.div con staggerContainer y motion.div children con staggerItem animation (duration: 150ms, delay: index * 50)
- [ ] T040 [P] [US4] Actualizar `app/(public)/page.tsx` para usar CategoryFilter mejorado con integración a ProductGrid
- [ ] T041 [US4] Validar accesibilidad: role="tablist", aria-label en cada tab, keyboard navigation (arrow keys, Tab)
- [ ] T042 [US4] Testear en dispositivos reales: iPhone SE (375px), iPad (768px), Desktop (1024px+)

### Verification & Validation (Phase 1)

- [ ] T043 [P] Ejecutar Lighthouse audit nuevamente: Performance ≥80, Accessibility ≥90
- [ ] T044 [P] Verificar 60fps en animaciones usando Chrome DevTools Performance tab
- [ ] T045 Capturar screenshots del catálogo mejorado para documentación
- [ ] T046 Realizar manual testing en navegadores múltiples: Chrome, Firefox, Safari (desktop y mobile)

---

## 📲 Phase 2: Navigation & Cart (3 días)

**Objetivo**: Implementar navegación flotante móvil y micro-interacciones en carrito  
**Criterios de prueba**: 
- Dock flotante visible solo en móvil (< 768px)
- Dock se oculta on scroll down, muestra on scroll up
- Carrito muestra contador animado, items se deslizan al eliminar
- Badge del carrito pulsa cuando hay items sin ver

### User Story 2: Navegación Flotante e Intuitiva

- [ ] T047 [US2] Crear componente wrapper `components/layout/FloatingDockWrapper.tsx` integrando floating-dock de Aceternity con items: Home, Categorías, Carrito, WhatsApp
- [ ] T048 [P] [US2] Configurar visibilidad condicional: mostrar solo en breakpoint mobile (< 768px) usando Tailwind `hidden md:flex`
- [ ] T049 [P] [US2] Implementar scroll-aware behavior: dock se oculta on scroll down, muestra on scroll up usando useEffect con scroll listener
- [ ] T050 [P] [US2] Configurar colores del dock: background: Slate-900/80, items: Emerald-600, hover: Emerald-700
- [ ] T051 [P] [US2] Agregar icono de WhatsApp al dock usando @tabler/icons-react, con link directo al número de WhatsApp
- [ ] T052 [US2] Integrar FloatingDockWrapper en `app/(public)/layout.tsx` al final del JSX, arriba del Footer
- [ ] T053 [P] [US2] Validar accesibilidad: role="navigation", aria-label="Navegación principal flotante", aria-current="page" en item activo
- [ ] T054 [US2] Testear en dispositivos múltiples: verificar que dock no se superpone a contenido importante

### User Story 6: Carrito con Micro-interacciones

- [ ] T055 [US6] Crear componente `components/cart/CartCounter.tsx` con contador animado para cantidad de items usando Framer Motion motion.div con scale animation
- [ ] T056 [P] [US6] Implementar animación de slide-out en `components/cart/CartItem.tsx` cuando usuario elimina un producto: motion.div exitLayout con transition: { duration: 0.2 }
- [ ] T057 [P] [US6] Agregar pulse animation al badge del carrito en `components/layout/Header.tsx` cuando hay items nuevos: motion.span con animate={{ scale: [1, 1.2, 1] }}, transition: { repeat: Infinity, duration: 2 }
- [ ] T058 [P] [US6] Crear componente `components/cart/EmptyCartIllustration.tsx` con animación suave de entrada (fade-in + slide-up)
- [ ] T059 [P] [US6] Actualizar `app/(public)/carrito/page.tsx` para usar CartCounter, CartItem mejorado, y EmptyCartIllustration
- [ ] T060 [US6] Validar accesibilidad: aria-live="polite" en contador, aria-label descriptivos en botones de +/-
- [ ] T061 [US6] Testear flujos: agregar producto, modificar cantidad, eliminar item, ver carrito vacío

### Verification & Validation (Phase 2)

- [ ] T062 [P] Ejecutar Lighthouse audit: Performance ≥80, Accessibility ≥90
- [ ] T063 Verificar que prefers-reduced-motion continúa funcionando (animaciones reducidas)
- [ ] T064 Realizar testing cross-device: móvil, tablet, desktop

---

## 🛒 Phase 3: Checkout & Modal (3 días)

**Objetivo**: Implementar modal expandible de producto y formulario de checkout mejorado  
**Criterios de prueba**: 
- Modal de producto se abre con transición expandible desde tarjeta
- Variantes del producto cambian con animación suave
- Formulario de checkout valida en tiempo real con feedback animado
- Todos los inputs tienen focus visible clear

### User Story 5: Modal de Producto Expandible

- [ ] T065 [US5] Integrar `expandable-cards` de Aceternity en `components/catalog/ProductModal.tsx` para abrir detalles del producto
- [ ] T066 [P] [US5] Implementar transición expandible: cuando usuario hace click en ProductCard, el modal se abre expandiendo desde la tarjeta original (layout animation)
- [ ] T067 [P] [US5] Actualizar `components/catalog/ProductCard.tsx` para pasar datos al ProductModal (ID, nombre, imagen, precio, variantes)
- [ ] T068 [P] [US5] Implementar animación de cambio de precio cuando usuario selecciona variante diferente: motion.span con animate={{ y: -10, opacity: 0.5 }} luego animate={{ y: 0, opacity: 1 }}
- [ ] T069 [P] [US5] Implementar cierre suave del modal: cuando usuario hace click fuera o en botón X, el modal se contrae de vuelta a tarjeta con animation inversa
- [ ] T070 [US5] Validar accesibilidad: role="dialog", aria-modal="true", aria-labelledby, keyboard close (Escape)
- [ ] T071 [US5] Testear en múltiples tamaños: móvil (375px), tablet (768px), desktop (1024px+)

### User Story 7: Formulario de Checkout Mejorado

- [ ] T072 [US7] Actualizar `components/checkout/CheckoutForm.tsx` para integrar validación animada: cuando input es válido, muestra checkmark con animate
- [ ] T073 [P] [US7] Implementar indicador de error animado en `components/ui/Input.tsx`: cuando hay error, el campo tiembla (shake animation) y muestra mensage
- [ ] T074 [P] [US7] Crear componente `components/checkout/CheckoutStep.tsx` con transición suave entre pasos (dirección, entrega, pago)
- [ ] T075 [P] [US7] Implementar animación en `components/checkout/DeliverySelector.tsx` cuando usuario cambia entre domicilio y recoger: campos adicionales aparecen/desaparecen con slide animation
- [ ] T076 [P] [US7] Agregar validación en tiempo real a emails, teléfonos y direcciones con feedback visual inmediato
- [ ] T077 [US7] Actualizar `app/(public)/checkout/page.tsx` con formulario mejorado y transiciones suaves
- [ ] T078 [US7] Validar accesibilidad: aria-required, aria-invalid, aria-describedby para mensajes de error
- [ ] T079 [US7] Testear flujo completo de checkout: llenar formulario, ver validaciones, cambiar tipo de entrega

### Verification & Validation (Phase 3)

- [ ] T080 [P] Ejecutar Lighthouse audit: Performance ≥80, Accessibility ≥90
- [ ] T081 Verificar animaciones son 60fps en Chrome DevTools
- [ ] T082 Realizar testing de accesibilidad: navegación por teclado (Tab, Enter, Escape), screen reader (NVDA, JAWS)

---

## 🎛️ Phase 4: Admin Panel (3 días)

**Objetivo**: Modernizar panel administrativo con Bento grid, sidebar expandible y file upload mejorado  
**Criterios de prueba**: 
- Dashboard carga con estadísticas en Bento grid con animaciones de entrada
- Sidebar se expande/contrae suavemente
- Drag & drop para subida de imágenes funciona con feedback visual

### User Story 8: Panel Admin con Diseño Moderno

- [ ] T083 [US8] Integrar `bento-grid` de Aceternity en `app/(admin)/admin/page.tsx` para mostrar estadísticas del negocio (total ventas, productos, clientes, pedidos recientes)
- [ ] T084 [P] [US8] Configurar animaciones de entrada en Bento grid: cada card entra con stagger animation, delay: index * 100ms
- [ ] T085 [P] [US8] Integrar `sidebar` de Aceternity en `app/(admin)/admin/layout.tsx` para navegación del admin
- [ ] T086 [P] [US8] Implementar expand/collapse animation en sidebar: cuando usuario hace click, se expande suavemente con width animation
- [ ] T087 [P] [US8] Actualizar `components/admin/ProductForm.tsx` para integrar file-upload de Aceternity con drag & drop
- [ ] T088 [P] [US8] Implementar validación visual en ProductForm: inputs válidos mostran checkmark, inválidos muestran error con shake
- [ ] T089 [P] [US8] Actualizar `components/admin/ProductTable.tsx` con hover animations en filas
- [ ] T090 [US8] Crear navegación rápida en sidebar: Home, Productos, Categorías, Variantes, Órdenes
- [ ] T091 [US8] Validar accesibilidad: aria-label en sidebar items, role="navigation", keyboard navigation (arrow keys)
- [ ] T092 [US8] Testear en desktop: verificar que sidebar no ocupa demasiado espacio en pantallas pequeñas

### Verification & Validation (Phase 4)

- [ ] T093 [P] Ejecutar Lighthouse audit: Performance ≥80, Accessibility ≥90
- [ ] T094 Verificar carga de dashboard con imágenes y datos reales
- [ ] T095 Realizar testing de admin workflows: agregar producto, editar, eliminar, cambiar categoría

---

## ✅ Phase 5: Testing & Optimization (2 días)

**Objetivo**: Validación completa de rendimiento, accesibilidad y funcionalidad en todos los dispositivos  
**Criterios de prueba**: 
- Lighthouse Performance ≥ 80 en todas las páginas
- Lighthouse Accessibility ≥ 90 en todas las páginas
- 60fps en animaciones comprobadas en múltiples dispositivos
- Prefers-reduced-motion funciona correctamente
- Todas las páginas funcionan sin JavaScript

### Cross-Device Testing

- [ ] T096 [P] Testear en iPhone SE (375px): catálogo, búsqueda, carrito, checkout
- [ ] T097 [P] Testear en iPad (768px): navegación flotante debe estar oculta, layout debe ser tablet-optimized
- [ ] T098 [P] Testear en Desktop (1024px+): floating dock oculta, navegación header visible
- [ ] T099 [P] Testear en navegadores: Chrome, Firefox, Safari, Edge (versiones actuales)
- [ ] T100 [P] Testear en conexiones lentas: 3G slow (DevTools) verificar LCP < 2.5s

### Accessibility Audit

- [ ] T101 [P] Ejecutar axe DevTools en todas las páginas principales: inicio, producto, carrito, checkout, admin
- [ ] T102 [P] Verificar contraste de colores: mínimo WCAG AA (4.5:1) en textos y botones
- [ ] T103 [P] Testear navegación por teclado: Tab, Shift+Tab, Enter, Escape en todas las interacciones
- [ ] T104 [P] Testear con screen reader: NVDA en Windows, VoiceOver en Mac/iOS, TalkBack en Android
- [ ] T105 [P] Verificar que prefers-reduced-motion se respeta en todas las animaciones

### Performance Optimization

- [ ] T106 [P] Ejecutar Lighthouse en cada página: inicio, producto detail, carrito, checkout, admin dashboard
- [ ] T107 [P] Analizar bundle size: framer-motion + componentes Aceternity + customizaciones
- [ ] T108 [P] Verificar Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] T109 [P] Optimizar imágenes: verificar que next/image lazy-loading está activo
- [ ] T110 [P] Code splitting validation: componentes se cargan lazy cuando es necesario

### Documentation & Handoff

- [ ] T111 Crear documentación en `README-UI-UX.md` con:
  - Guía de uso de componentes personalizados
  - Cómo extender tema (theme.ts)
  - Cómo agregar nuevas animaciones
  - Troubleshooting común
- [ ] T112 [P] Documentar componentes wrapper en JSDoc: FocusCardsWrapper, FloatingDockWrapper, SearchBar, CategoryFilter, ProductModal, CheckoutForm, BentoGridDashboard, AdminSidebar
- [ ] T113 Crear test scenarios checklist para futuros updates
- [ ] T114 Capturar screenshots de cada página mejorada para portfolio

### Final Validation

- [ ] T115 [P] Ejecutar build completo: `npm run build` sin warnings
- [ ] T116 [P] Ejecutar test suite: `npm run test` (si existen tests)
- [ ] T117 [P] Verificar que no hay console errors o warnings en todas las páginas
- [ ] T118 Realizar demo funcional: navegar por catálogo, buscar, agregar al carrito, checkout completo, admin panel
- [ ] T119 Commits finales con mensaje semántico: `feat(ui): complete Aceternity UI integration with animations`
- [ ] T120 Merge de rama `002-ui-ux-improvements` a main (si está aprobado)

---

## 📊 Task Summary

**Total Tasks**: 120  
**Phase 0 (Setup)**: T001-T021 (21 tasks)  
**Phase 1 (Catalog)**: T022-T046 (25 tasks)  
**Phase 2 (Navigation & Cart)**: T047-T064 (18 tasks)  
**Phase 3 (Checkout & Modal)**: T065-T082 (18 tasks)  
**Phase 4 (Admin)**: T083-T095 (13 tasks)  
**Phase 5 (Testing)**: T096-T120 (25 tasks)

**Parallelizable Tasks**: ~45 tasks (marcadas con [P])  
**Estimated Serial Time**: 18 días (si se hacen sequencialmente)  
**Estimated Parallel Time**: ~9 días (con múltiples desarrolladores)

---

## 🔗 Dependencies & Execution Order

```
Phase 0 (BLOCKING)
    ↓
Phase 1 → Phase 2 → Phase 3 → Phase 4 (puede ser paralelo si hay devs)
    ↓           ↓        ↓         ↓
Phase 5 (Testing & Validation)
    ↓
Phase 5 (Documentation & Merge)
```

**Critical Path**: T001 → T011-T015 → T022-T028 → T029-T035 → T036-T042 → T043-T046 → T047-T054 → T055-T064 → T065-T082 → T083-T095 → T096-T120

---

## 🎯 User Story to Task Mapping

| User Story | Priority | Tasks | Status |
|-----------|----------|-------|--------|
| US1: Catálogo Visual | P1 | T022-T028 | Ready |
| US2: Navegación Flotante | P1 | T047-T054 | Ready |
| US3: Búsqueda | P2 | T029-T035 | Ready |
| US4: Categorías Tabs | P2 | T036-T042 | Ready |
| US5: Modal Expandible | P2 | T065-T071 | Ready |
| US6: Carrito | P3 | T055-T061 | Ready |
| US7: Checkout | P3 | T072-T079 | Ready |
| US8: Admin Panel | P3 | T083-T095 | Ready |

---

## 🚀 Next Steps

1. ✅ **Phase 0 Ready**: Ejecutar T001-T021 para instalar dependencias
2. **Phase 1 Ready**: Comenzar T022+ cuando Phase 0 sea completado
3. **Parallel Execution**: T047+ pueden iniciar independientemente después de Phase 0
4. **Testing Gate**: Completar Phase 5 antes de merge a main

**Start Date**: 2025-11-26  
**Target Completion**: 2025-12-15 (18 días @ 8h/día = 144h total)

---

*Generated with `.specify` framework | Last Updated: 2025-11-25*
