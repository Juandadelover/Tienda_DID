# Feature Specification: Sistema E-Commerce Tienda DID

**Feature Branch**: `001-tienda-did-ecommerce-system`  
**Created**: 2025-11-25  
**Status**: Ready for Implementation  
**Input**: Documento completo de requisitos Tienda DID

---

## User Scenarios & Testing *(mandatory)*

Las historias de usuario están priorizadas según flujo de valor y dependencias técnicas.

---

### User Story 1 - Configuración Base y Catálogo Público (Priority: P1) 🎯 MVP Core

Cliente puede ver productos organizados por categorías con búsqueda en tiempo real, desde cualquier dispositivo móvil o desktop.

**Why this priority**: Es el núcleo funcional del sistema. Sin catálogo, no hay e-commerce. Incluye toda la infraestructura base (Next.js, Supabase, Tailwind, diseño responsive).

**Independent Test**: Se puede probar navegando a `/`, viendo productos agrupados por categorías, usando el buscador en tiempo real, y verificando que funciona perfectamente en móvil (touch, responsive). No requiere carrito ni admin para demostrar valor.

**Acceptance Scenarios**:

1. **Given** un nuevo usuario visita la página principal, **When** la página carga, **Then** ve un catálogo de productos organizado por categorías con imágenes, nombres, precios y estados de disponibilidad
2. **Given** el usuario está en el catálogo, **When** hace clic en un filtro de categoría, **Then** solo se muestran productos de esa categoría
3. **Given** el usuario tiene el catálogo abierto, **When** escribe "coca" en la barra de búsqueda, **Then** los resultados se filtran en tiempo real (<500ms) mostrando solo productos con "coca" en el nombre
4. **Given** un producto tiene variantes (ej: Coca-Cola 250ml, 1.5L), **When** el usuario ve el producto, **Then** puede ver todas las variantes con sus respectivos precios
5. **Given** un producto está agotado, **When** el usuario ve el producto, **Then** muestra claramente un badge "Agotado" y el botón "Agregar" está deshabilitado
6. **Given** el usuario accede desde un móvil, **When** navega el catálogo, **Then** el diseño es responsive, touch-friendly (botones ≥44px) y las imágenes cargan con lazy loading
7. **Given** la tienda está cerrada (después de 10 PM), **When** el usuario visita el catálogo, **Then** puede ver productos pero ve un mensaje informativo sobre el horario

---

### User Story 2 - Carrito de Compras (Priority: P2)

Cliente puede agregar productos al carrito, modificar cantidades, eliminar items y ver el total actualizado, con persistencia en localStorage.

**Why this priority**: El carrito es esencial para el flujo de compra. Depende del catálogo (US1) pero es independiente del checkout (US3).

**Independent Test**: Se puede probar agregando varios productos al carrito, modificando cantidades, eliminando items, cerrando el navegador y verificando que el carrito persiste al volver. No requiere WhatsApp para demostrar valor.

**Acceptance Scenarios**:

1. **Given** el usuario está viendo un producto disponible, **When** hace clic en "Agregar al carrito", **Then** el producto se agrega con cantidad 1 y el contador del carrito se actualiza
2. **Given** el usuario agrega un producto con variantes, **When** selecciona una variante específica y agrega al carrito, **Then** el carrito guarda correctamente la variante elegida
3. **Given** el usuario tiene productos en el carrito, **When** navega a `/carrito`, **Then** ve la lista completa con nombre, variante, cantidad, precio unitario y subtotal de cada item
4. **Given** el usuario está en la página del carrito, **When** modifica la cantidad de un producto (+ o -), **Then** el subtotal y total se recalculan automáticamente
5. **Given** el usuario tiene items en el carrito, **When** hace clic en el botón de eliminar de un item, **Then** el item se remueve y el total se actualiza
6. **Given** el usuario tiene un carrito con productos, **When** cierra el navegador y vuelve más tarde, **Then** el carrito persiste con todos los items (localStorage)
7. **Given** el carrito está vacío, **When** el usuario accede a `/carrito`, **Then** ve un estado vacío con mensaje "Tu carrito está vacío" y botón para volver al catálogo
8. **Given** el usuario intenta agregar un producto agotado, **When** hace clic en "Agregar", **Then** el sistema muestra un mensaje de error y no permite agregarlo

---

### User Story 3 - Checkout y Envío por WhatsApp (Priority: P3)

Cliente puede completar formulario de pedido, seleccionar tipo de entrega (pickup/delivery) y enviar pedido formateado a WhatsApp de la tienda.

**Why this priority**: Completa el flujo de compra. Requiere carrito funcional (US2) pero entrega valor solo cuando está completo.

**Independent Test**: Se puede probar llenando el formulario de checkout, seleccionando domicilio o pickup, y verificando que al hacer clic en "Enviar por WhatsApp" se abre WhatsApp con el mensaje correctamente formateado. No requiere admin panel.

**Acceptance Scenarios**:

1. **Given** el usuario tiene items en el carrito, **When** hace clic en "Realizar Pedido", **Then** es redirigido a `/checkout` con resumen del pedido
2. **Given** el usuario está en checkout, **When** selecciona tipo de entrega "Recoger en tienda", **Then** el campo de dirección queda oculto/opcional
3. **Given** el usuario está en checkout, **When** selecciona "Domicilio gratis", **Then** el campo de dirección aparece como obligatorio
4. **Given** el usuario intenta enviar pedido sin completar campos obligatorios, **When** hace clic en "Enviar", **Then** ve mensajes de validación en español indicando los campos faltantes
5. **Given** el usuario completa todos los datos correctamente, **When** hace clic en "Enviar por WhatsApp", **Then** se abre WhatsApp Web/App con mensaje pre-cargado en el formato RFC-11 (emoji, nombre, teléfono, productos, total, entrega, dirección, notas)
6. **Given** el usuario confirma el mensaje en WhatsApp, **When** envía el mensaje, **Then** el pedido llega al número 3235725922 de la tienda
7. **Given** el horario es después de las 10 PM, **When** el usuario intenta hacer checkout, **Then** el botón de "Enviar por WhatsApp" está deshabilitado con mensaje sobre horario de atención
8. **Given** el usuario envía el pedido exitosamente, **When** vuelve al catálogo, **Then** el carrito se limpia automáticamente

---

### User Story 4 - Panel Admin: Gestión de Productos (Priority: P4)

Administrador puede crear, editar, eliminar y cambiar disponibilidad de productos desde panel protegido con autenticación.

**Why this priority**: El admin necesita catálogo existente (US1) para hacer sentido. Es fundamental para operaciones pero no bloquea el flujo de cliente.

**Independent Test**: Se puede probar haciendo login en `/login`, accediendo a `/admin`, creando un producto nuevo con imagen, editándolo, cambiando su disponibilidad a "Agotado" y verificando que se refleja en el catálogo público. No requiere checkout.

**Acceptance Scenarios**:

1. **Given** el admin visita `/login`, **When** ingresa credenciales correctas, **Then** es redirigido a `/admin` con sesión activa
2. **Given** un usuario no autenticado intenta acceder a `/admin`, **When** navega a la URL, **Then** es redirigido automáticamente a `/login`
3. **Given** el admin está en el dashboard, **When** hace clic en "Agregar Producto", **Then** ve formulario con campos: nombre, descripción, categoría, tipo de unidad, precio base, opción de variantes, imagen
4. **Given** el admin crea producto sin variantes, **When** completa nombre, categoría, precio base y guarda, **Then** el producto aparece en el dashboard y en el catálogo público
5. **Given** el admin crea producto con variantes, **When** activa "Tiene variantes", agrega 2+ variantes con nombre y precio cada una, y guarda, **Then** el producto y sus variantes aparecen correctamente
6. **Given** el admin está editando un producto, **When** sube una imagen desde su computadora, **Then** la imagen se sube a Supabase Storage y se asocia al producto
7. **Given** el admin tiene un producto existente, **When** hace clic en "Editar", modifica el precio y guarda, **Then** el cambio se refleja inmediatamente en el catálogo público
8. **Given** el admin quiere eliminar un producto, **When** hace clic en "Eliminar", confirma en el modal, **Then** el producto se elimina permanentemente de la base de datos
9. **Given** el admin quiere marcar producto como agotado, **When** cambia el toggle de disponibilidad a "Agotado", **Then** el producto muestra badge "Agotado" en catálogo y no se puede agregar al carrito
10. **Given** el admin cierra sesión, **When** intenta acceder a rutas admin, **Then** es redirigido a login (sesión expirada)

---

### User Story 5 - Panel Admin: Gestión de Categorías (Priority: P5)

Administrador puede crear, editar y eliminar categorías de productos (con validación de productos asociados).

**Why this priority**: Categorías son importantes pero las 6 predefinidas cubren el 90% de casos. Funcionalidad de gestión es conveniente pero no crítica para MVP.

**Independent Test**: Se puede probar creando una nueva categoría "Productos congelados", editando su nombre, intentando eliminar una categoría con productos (debe fallar con mensaje claro), y eliminando una categoría vacía exitosamente.

**Acceptance Scenarios**:

1. **Given** el admin está en `/admin/categorias`, **When** hace clic en "Nueva Categoría", **Then** ve formulario con campos nombre y slug
2. **Given** el admin crea nueva categoría, **When** ingresa nombre "Productos congelados", genera slug automático "productos-congelados" y guarda, **Then** la categoría aparece en la lista y en filtros del catálogo
3. **Given** el admin edita una categoría, **When** cambia el nombre y guarda, **Then** los productos de esa categoría se actualizan automáticamente
4. **Given** una categoría tiene 5 productos asociados, **When** el admin intenta eliminarla, **Then** el sistema muestra error "No se puede eliminar categoría con productos" y sugiere reasignar primero
5. **Given** una categoría está vacía (0 productos), **When** el admin la elimina, **Then** se elimina exitosamente y desaparece de todos los filtros

---

### Edge Cases

- **Conexión perdida durante checkout**: ¿Qué pasa si el usuario pierde internet al llenar el formulario? → Carrito persiste en localStorage, puede retomar al reconectar
- **Múltiples variantes del mismo precio**: ¿Se permite? → Sí, son válidas (ej: Coca-Cola 400ml Regular y Light pueden costar igual)
- **Producto sin imagen**: ¿Cómo se muestra? → Usa placeholder image definido en `/public/images/placeholder.png`
- **Usuario edita cantidad a 0 en carrito**: ¿Qué sucede? → El item se elimina automáticamente (equivalente a botón delete)
- **WhatsApp no instalado en dispositivo**: ¿Funciona? → Sí, abre WhatsApp Web en navegador
- **Admin elimina categoría mientras cliente navega**: ¿Qué ve el cliente? → El catálogo se refresca, productos de categoría eliminada pueden mostrar error temporal hasta reasignación
- **Dos admins editan mismo producto simultáneamente**: ¿Conflicto? → Último en guardar gana (no hay locking, acceptable para 1 admin según req.)
- **Imagen muy pesada (>5MB)**: ¿Sube? → Supabase Storage rechaza con error, admin debe optimizar antes
- **Búsqueda con tildes "Cafe" vs "Café"**: ¿Encuentra ambos? → Sí, búsqueda es case-insensitive y normaliza caracteres

---

## Requirements *(mandatory)*

### Functional Requirements

**Módulo de Catálogo**:
- **FR-001**: Sistema MUST mostrar catálogo de productos con imagen, nombre, precio, unidad de medida y estado de disponibilidad (RF-01)
- **FR-002**: Productos MUST estar organizados en 6 categorías: Abarrotes, Bebidas, Productos de aseo, Snacks y dulces, Lácteos y refrigerados, Otros (RF-02)
- **FR-003**: Sistema MUST proveer búsqueda en tiempo real por nombre de producto (<500ms de respuesta) (RF-03)
- **FR-004**: Productos MUST soportar variantes (ej: tamaños) con precio independiente por variante (RF-04)
- **FR-005**: Productos agotados MUST mostrarse claramente y NO permitir agregar al carrito (RF-05)

**Módulo de Carrito**:
- **FR-006**: Usuarios MUST poder agregar productos disponibles al carrito seleccionando cantidad (RF-06)
- **FR-007**: Usuarios MUST poder ver, modificar cantidades y eliminar productos del carrito (RF-07)
- **FR-008**: Sistema MUST calcular y mostrar subtotales por producto y total general (RF-07)
- **FR-009**: Carrito MUST persistir en localStorage para no perder contenido al navegar (implied by RNF-08, mitigación de riesgo)

**Módulo de Checkout**:
- **FR-010**: Sistema MUST ofrecer dos tipos de entrega: "Recoger en tienda" y "Domicilio gratis" (RF-09)
- **FR-011**: Sistema MUST capturar nombre y teléfono obligatoriamente, dirección solo si es domicilio, y notas opcionales (RF-10)
- **FR-012**: Sistema MUST generar mensaje WhatsApp formateado con: nombre, teléfono, lista productos, total, tipo entrega, dirección y notas (RF-11)
- **FR-013**: Sistema MUST abrir WhatsApp Web/App con mensaje pre-cargado al número 3235725922 (RF-11)
- **FR-014**: Sistema MUST mostrar horario "Abierto hasta 10:00 PM" y deshabilitar pedidos fuera de horario (RF-12)

**Módulo de Administración**:
- **FR-015**: Panel admin MUST estar protegido con Supabase Auth (email/password), un solo usuario (RF-13)
- **FR-016**: Admin MUST poder crear productos con: nombre, imagen, categoría, unidad, precio, variantes opcionales (RF-14)
- **FR-017**: Admin MUST poder editar todos los campos de un producto existente (RF-14)
- **FR-018**: Admin MUST poder eliminar productos con confirmación previa (RF-14)
- **FR-019**: Admin MUST poder activar/desactivar disponibilidad de productos sin eliminar (RF-14)
- **FR-020**: Admin MUST poder crear, editar nombres de categorías (RF-15)
- **FR-021**: Sistema MUST validar que categorías con productos NO se puedan eliminar (RF-15)
- **FR-022**: Admin MUST poder subir imágenes (JPG/PNG/WebP) a Supabase Storage (RF-16)

### Key Entities

- **Category**: Representa categorías de productos (Bebidas, Abarrotes, etc.)
  - Atributos clave: `name`, `slug`, `product_count`
  - Reglas: No eliminar si tiene productos asociados
  
- **Product**: Producto de la tienda
  - Atributos clave: `name`, `description`, `category_id`, `image_url`, `unit_type`, `is_available`, `has_variants`, `base_price`
  - Relaciones: Pertenece a 1 Category, puede tener N ProductVariants
  - Reglas: Si `has_variants = false`, `base_price` es obligatorio

- **ProductVariant**: Variante de producto (tamaños, presentaciones)
  - Atributos clave: `variant_name`, `price`, `is_available`
  - Relaciones: Pertenece a 1 Product
  - Reglas: `variant_name` único por producto

- **Setting**: Configuraciones del sistema
  - Atributos clave: `key`, `value`
  - Ejemplos: `whatsapp_number`, `closing_hour`, `store_address`

- **CartItem** (client-side only, no DB):
  - Atributos: `productId`, `variantId`, `quantity`, `price`, `name`
  - Storage: localStorage del navegador

- **Order** (transient, no DB storage):
  - Atributos: `customerName`, `customerPhone`, `deliveryType`, `address`, `notes`, `items`, `total`
  - Flujo: Se genera al hacer checkout, se envía a WhatsApp, NO se almacena

### Non-Functional Requirements

**Performance**:
- **NFR-001**: Carga inicial MUST ser <3 segundos en conexión 3G (RNF-03)
- **NFR-002**: Búsqueda MUST responder en <500ms (RNF-03)
- **NFR-003**: Imágenes MUST usar lazy loading y formato WebP optimizado (RNF-03)
- **NFR-004**: Sistema MUST soportar 50-200 productos sin degradación (RNF-04)

**Usability**:
- **NFR-005**: Diseño MUST ser mobile-first con breakpoints <768px (mobile), 768-1024px (tablet), >1024px (desktop) (RNF-05)
- **NFR-006**: Touch targets MUST ser ≥44x44px para usabilidad móvil (RNF-06, Constitution I)
- **NFR-007**: Contraste de texto MUST cumplir WCAG AA (mínimo 4.5:1), paleta cumple AAA (RNF-06)
- **NFR-008**: Fuentes MUST ser ≥16px para texto body, ≥20px para acciones importantes (Constitution II)

**Security**:
- **NFR-009**: Panel admin MUST usar Supabase Auth con sesiones seguras (RNF-07)
- **NFR-010**: Todas las mutaciones MUST validar en servidor con Row Level Security (RNF-07)
- **NFR-011**: Variables sensibles MUST estar en env variables, nunca en código (RNF-07, Constitution V)
- **NFR-012**: Datos de clientes NO MUST almacenarse en base de datos, solo envío a WhatsApp (RNF-08)

**Code Quality**:
- **NFR-013**: Código MUST usar TypeScript strict mode sin `any` types (RNF-09, Constitution)
- **NFR-014**: Componentes MUST ser modulares y reutilizables (RNF-09, Constitution IV)
- **NFR-015**: ESLint MUST pasar sin errores antes de commits (Constitution)

---

## Out of Scope (v1.0)

Explícitamente NO incluido en esta versión:

- ❌ Pagos en línea integrados (Nequi, Daviplata)
- ❌ Registro de usuarios / cuentas de cliente
- ❌ Historial de pedidos / tracking
- ❌ Gestión de inventario con stock/cantidades
- ❌ Múltiples usuarios admin / roles
- ❌ Reportes de ventas / dashboard analítico
- ❌ Notificaciones push / emails automáticos
- ❌ Sistema de cupones / descuentos
- ❌ Programa de puntos / fidelización
- ❌ Modo oscuro

---

## Technical Architecture Summary

**Stack**:
- Frontend: Next.js 14 App Router + React 19 + TypeScript 5
- Styling: Tailwind CSS 4 con paleta Emerald/Slate custom
- Database: Supabase PostgreSQL con RLS
- Auth: Supabase Auth (email/password)
- Storage: Supabase Storage para imágenes
- Deployment: Vercel

**Key Patterns**:
- Server Components por defecto para performance
- Client Components solo para interactividad (carrito, búsqueda)
- localStorage para persistencia de carrito
- Zod para validación TypeScript-first
- Route Groups para organización lógica ((public), (admin))

---

**Status**: ✅ Specification completa y alineada con requisitos, constitución y plan técnico
