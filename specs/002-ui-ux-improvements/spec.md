# Feature Specification: Mejoras de UI/UX para Tienda DID

**Feature Branch**: `002-ui-ux-improvements`  
**Created**: 2025-11-25  
**Status**: Draft  
**Input**: User description: "Implementar mejoras del diseño UI y UX de todas las páginas y componentes de la tienda"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Experiencia Visual Mejorada en Catálogo (Priority: P1)

Como cliente de Tienda DID, quiero una experiencia visual atractiva y moderna al navegar el catálogo de productos, con animaciones sutiles y efectos visuales que hagan la navegación más placentera sin afectar el rendimiento.

**Why this priority**: El catálogo es la página principal y el punto de entrada de todos los clientes. Mejorar su experiencia visual impacta directamente en la primera impresión y la retención de usuarios.

**Independent Test**: Puede probarse navegando el catálogo en móvil y desktop, verificando que las tarjetas de productos tengan animaciones fluidas al hover/focus y que la experiencia sea visualmente atractiva.

**Acceptance Scenarios**:

1. **Given** un cliente visita la página principal, **When** pasa el cursor sobre una tarjeta de producto, **Then** la tarjeta muestra un efecto visual de elevación con sombra y las demás tarjetas se atenúan sutilmente.
2. **Given** un cliente en móvil toca una tarjeta de producto, **When** la tarjeta recibe el foco, **Then** se muestra un feedback visual inmediato (escala o brillo).
3. **Given** un cliente navega el catálogo, **When** las imágenes se cargan, **Then** aparecen con una animación suave de fade-in.
4. **Given** un cliente con conexión lenta, **When** los productos se están cargando, **Then** ve un loader animado atractivo en lugar de un spinner básico.

---

### User Story 2 - Navegación Flotante e Intuitiva (Priority: P1)

Como cliente de Tienda DID, quiero una barra de navegación moderna y accesible que me permita acceder rápidamente a las acciones principales (inicio, carrito, categorías) desde cualquier parte de la página.

**Why this priority**: La navegación es fundamental para la usabilidad. Una navegación clara y siempre accesible reduce la fricción y mejora la conversión.

**Independent Test**: Verificar que la navegación sea visible y funcional en todas las páginas, con transiciones suaves y acceso rápido a las acciones principales.

**Acceptance Scenarios**:

1. **Given** un cliente navega cualquier página, **When** hace scroll hacia abajo, **Then** la navegación permanece visible (sticky) o aparece un dock flotante con las acciones principales.
2. **Given** un cliente en móvil, **When** necesita acceder al carrito, **Then** puede hacerlo con un solo toque desde cualquier posición de scroll.
3. **Given** un cliente agrega un producto al carrito, **When** la acción se completa, **Then** el icono del carrito muestra una animación de confirmación visual.

---

### User Story 3 - Búsqueda con Retroalimentación Visual Mejorada (Priority: P2)

Como cliente de Tienda DID, quiero que la barra de búsqueda tenga una experiencia interactiva que me indique claramente cuando estoy buscando y me guíe hacia los productos.

**Why this priority**: La búsqueda es una funcionalidad clave que permite encontrar productos rápidamente. Una UX mejorada aumenta su uso efectivo.

**Independent Test**: Probar la búsqueda escribiendo términos y verificando que las animaciones y transiciones sean fluidas.

**Acceptance Scenarios**:

1. **Given** un cliente hace clic en la barra de búsqueda, **When** el input recibe el foco, **Then** muestra una animación de expansión y placeholders rotativos con sugerencias.
2. **Given** un cliente escribe en la búsqueda, **When** envía la consulta, **Then** el texto desaparece con un efecto visual de "vanish" y los resultados aparecen.
3. **Given** un cliente busca un producto, **When** no hay resultados, **Then** se muestra un estado vacío atractivo con sugerencias de categorías populares.

---

### User Story 4 - Filtrado por Categorías con Tabs Animados (Priority: P2)

Como cliente de Tienda DID, quiero que el filtro de categorías sea visualmente atractivo y fácil de usar, con indicadores claros de la categoría seleccionada.

**Why this priority**: El filtrado ayuda a los usuarios a encontrar productos específicos. Tabs animados mejoran la usabilidad y el engagement.

**Independent Test**: Navegar entre categorías y verificar que las transiciones sean suaves y el estado seleccionado sea claro.

**Acceptance Scenarios**:

1. **Given** un cliente ve las categorías, **When** hace clic en una categoría, **Then** la pestaña seleccionada muestra una animación de transición con fondo destacado.
2. **Given** un cliente cambia de categoría, **When** los productos se actualizan, **Then** las tarjetas aparecen con una animación de entrada escalonada (staggered).
3. **Given** un cliente en móvil, **When** hay muchas categorías, **Then** puede deslizar horizontalmente con un scroll suave.

---

### User Story 5 - Modal de Producto Expandible (Priority: P2)

Como cliente de Tienda DID, quiero que al ver los detalles de un producto, la experiencia sea inmersiva con una transición suave desde la tarjeta.

**Why this priority**: El modal de producto es donde el cliente toma la decisión de compra. Una experiencia premium aumenta la confianza.

**Independent Test**: Abrir varios modales de productos y verificar que las animaciones sean fluidas y la información sea clara.

**Acceptance Scenarios**:

1. **Given** un cliente hace clic en un producto, **When** el modal se abre, **Then** la transición expande la tarjeta de forma fluida hacia el modal completo.
2. **Given** un cliente ve el modal, **When** navega por las variantes, **Then** los cambios de precio se animan suavemente.
3. **Given** un cliente cierra el modal, **When** hace clic fuera o en X, **Then** el modal se contrae de vuelta a la tarjeta original.

---

### User Story 6 - Carrito con Micro-interacciones (Priority: P3)

Como cliente de Tienda DID, quiero que las acciones en el carrito tengan feedback visual inmediato que confirme mis acciones.

**Why this priority**: Las micro-interacciones en el carrito reducen la ansiedad del usuario y confirman que sus acciones fueron procesadas.

**Independent Test**: Agregar, modificar y eliminar productos del carrito verificando las animaciones de confirmación.

**Acceptance Scenarios**:

1. **Given** un cliente modifica la cantidad de un producto, **When** usa los botones +/-, **Then** el número se anima con un efecto de contador.
2. **Given** un cliente elimina un producto, **When** confirma la acción, **Then** el item se desliza fuera con una animación de salida.
3. **Given** un carrito vacío, **When** el cliente lo visita, **Then** ve una ilustración animada invitándolo a explorar productos.

---

### User Story 7 - Formulario de Checkout Mejorado (Priority: P3)

Como cliente de Tienda DID, quiero que el proceso de checkout sea visualmente guiado con validación en tiempo real y feedback claro.

**Why this priority**: Un checkout confuso causa abandonos. Un formulario bien diseñado con retroalimentación clara aumenta las conversiones.

**Independent Test**: Completar el formulario de checkout verificando que las validaciones y transiciones sean claras.

**Acceptance Scenarios**:

1. **Given** un cliente completa un campo correctamente, **When** sale del campo, **Then** aparece un indicador de éxito animado (check verde).
2. **Given** un cliente ingresa datos inválidos, **When** el campo pierde el foco, **Then** el error aparece con una animación suave, no abrupta.
3. **Given** un cliente selecciona el tipo de entrega, **When** cambia entre domicilio y recoger, **Then** los campos adicionales aparecen/desaparecen con transición suave.

---

### User Story 8 - Panel Admin con Diseño Moderno (Priority: P3)

Como administrador de Tienda DID, quiero un panel de administración con una interfaz moderna que facilite la gestión de productos y categorías.

**Why this priority**: Aunque es interno, un admin bien diseñado aumenta la productividad y reduce errores.

**Independent Test**: Navegar el panel admin verificando que las estadísticas y formularios sean claros y funcionales.

**Acceptance Scenarios**:

1. **Given** un admin accede al dashboard, **When** la página carga, **Then** las estadísticas se muestran en un grid tipo Bento con animaciones de entrada.
2. **Given** un admin sube una imagen de producto, **When** arrastra el archivo, **Then** ve una zona de drop con indicadores visuales claros.
3. **Given** un admin navega entre secciones, **When** usa el sidebar, **Then** este se expande/contrae con animaciones suaves.

---

### Edge Cases

- ¿Qué pasa cuando las animaciones causan mareo? → Se respeta `prefers-reduced-motion` del sistema.
- ¿Qué pasa en dispositivos de bajo rendimiento? → Las animaciones se simplifican o desactivan automáticamente.
- ¿Qué pasa si JavaScript está deshabilitado? → El sitio funciona sin animaciones (progressive enhancement).
- ¿Qué pasa en navegadores antiguos? → Fallback a estilos estáticos sin romper la funcionalidad.

## Requirements *(mandatory)*

### Functional Requirements

**Componentes Aceternity UI a Implementar:**

- **FR-001**: Sistema DEBE implementar `focus-cards` para las tarjetas de productos con efecto de blur en tarjetas no seleccionadas.
- **FR-002**: Sistema DEBE implementar `floating-dock` como navegación flotante en móvil con accesos a inicio, categorías, carrito y WhatsApp.
- **FR-003**: Sistema DEBE implementar `placeholder-and-vanish-input` para la barra de búsqueda con placeholders rotativos.
- **FR-004**: Sistema DEBE implementar `animated-tabs` para el filtro de categorías con transiciones de fondo.
- **FR-005**: Sistema DEBE implementar `loader` de Aceternity para estados de carga en lugar del spinner actual.
- **FR-006**: Sistema DEBE implementar `expandable-cards` para el modal de producto con transición desde la tarjeta.
- **FR-007**: Sistema DEBE implementar `file-upload` de Aceternity para la subida de imágenes en el admin.
- **FR-008**: Sistema DEBE implementar `bento-grid` para el dashboard del admin con estadísticas.
- **FR-009**: Sistema DEBE implementar `sidebar` de Aceternity para la navegación del panel admin.
- **FR-010**: Sistema DEBE implementar `signup-form` como base para los formularios (checkout, login).

**Requisitos de Diseño Visual:**

- **FR-011**: Sistema DEBE aplicar la paleta de colores definida en `paleta-colores-tienda-did.md` consistentemente.
- **FR-012**: Sistema DEBE usar gradientes sutiles en backgrounds según la guía de colores.
- **FR-013**: Sistema DEBE implementar sombras con múltiples capas para efecto de profundidad.
- **FR-014**: Sistema DEBE usar tipografía con jerarquía clara (headings con Slate-900, body con Slate-600).
- **FR-015**: Sistema DEBE implementar badges animados para estados (Disponible, Agotado, Nuevo).

**Requisitos de Accesibilidad:**

- **FR-016**: Sistema DEBE respetar `prefers-reduced-motion` desactivando animaciones cuando el usuario lo prefiera.
- **FR-017**: Sistema DEBE mantener contraste WCAG AA mínimo en todos los textos.
- **FR-018**: Sistema DEBE permitir navegación completa por teclado con indicadores de foco visibles.
- **FR-019**: Sistema DEBE incluir atributos ARIA apropiados en componentes interactivos.

**Requisitos de Rendimiento:**

- **FR-020**: Sistema DEBE cargar animaciones de forma lazy para no afectar LCP.
- **FR-021**: Sistema DEBE usar CSS transforms y opacity para animaciones (GPU-accelerated).
- **FR-022**: Sistema DEBE mantener 60fps en todas las animaciones.

**Requisitos de Responsividad:**

- **FR-023**: Sistema DEBE adaptar componentes para móvil-first (breakpoints: 640px, 768px, 1024px).
- **FR-024**: Sistema DEBE usar touch targets mínimos de 44x44px en móvil.
- **FR-025**: Sistema DEBE adaptar el dock flotante solo para pantallas < 768px.

### Key Entities

- **Component Theme**: Configuración de tokens de diseño (colores, espaciados, sombras) aplicable a todos los componentes.
- **Animation Config**: Configuración de duración, easing y comportamiento de animaciones por tipo de componente.
- **Responsive Breakpoints**: Definición de puntos de quiebre y comportamientos específicos por tamaño de pantalla.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Los usuarios perciben la tienda como "moderna y profesional" (validar con 5 usuarios de prueba, 4/5 deben calificar ≥8/10).
- **SC-002**: El tiempo para agregar un producto al carrito no aumenta más de 200ms respecto al estado actual.
- **SC-003**: La tasa de rebote en móvil se mantiene igual o mejora después de implementar las mejoras.
- **SC-004**: El puntaje de Lighthouse en Performance se mantiene ≥ 80 después de implementar animaciones.
- **SC-005**: El puntaje de Lighthouse en Accessibility se mantiene ≥ 90.
- **SC-006**: El 100% de las interacciones principales funcionan sin animaciones cuando `prefers-reduced-motion` está activo.
- **SC-007**: Los administradores completan tareas de gestión de productos en el mismo tiempo o menos que antes.
- **SC-008**: El First Contentful Paint (FCP) se mantiene < 2 segundos en conexiones 3G.

## Assumptions

- Los usuarios tienen dispositivos con capacidad para ejecutar animaciones CSS/JS modernas (últimas 2 versiones de navegadores principales).
- El servidor de Supabase tiene suficiente ancho de banda para servir imágenes de productos sin degradar la experiencia.
- Las dependencias de Aceternity UI (framer-motion, clsx, tailwind-merge) son compatibles con Next.js 16 y React 19.
- El proyecto ya tiene TailwindCSS 4.x configurado correctamente.
- Se mantiene el diseño móvil-first como prioridad principal.

## Dependencies

- **Aceternity UI**: Biblioteca de componentes con animaciones (via shadcn registry).
- **Framer Motion**: Librería de animaciones requerida por Aceternity.
- **clsx** y **tailwind-merge**: Utilidades para manejo de clases CSS.
- **@radix-ui/react-label**: Requerido para componentes de formulario.
- **@tabler/icons-react**: Iconos opcionales para componentes.

## Out of Scope

- Modo oscuro (se menciona en la paleta pero es para implementación futura).
- Cambios en la lógica de negocio o flujos de la aplicación.
- Nuevas funcionalidades (solo mejoras visuales a funcionalidades existentes).
- Cambios en la estructura de datos o API.
- Internacionalización o multi-idioma.
