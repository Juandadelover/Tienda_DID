# Contexto de Diseño UI/UX - Tienda DID

## Introducción

Este documento proporciona un contexto completo del diseño de interfaz de usuario (UI) y experiencia de usuario (UX) de la aplicación Tienda DID, una tienda en línea de productos premium. El enfoque está en la parte frontend, incluyendo páginas, componentes, sistema de diseño y patrones de interacción.

## Arquitectura de la UI

### Tecnologías Principales
- **Framework**: Next.js 14 con App Router
- **Styling**: Tailwind CSS con configuración personalizada
- **Animaciones**: Framer Motion para transiciones fluidas
- **Componentes**: React con TypeScript
- **Estado**: Context API para gestión de estado global

### Estructura de Archivos
```
app/
├── (public)/          # Páginas públicas
├── (admin)/           # Panel de administración
└── layout.tsx         # Layout raíz

components/
├── layout/            # Componentes de layout (Header, Footer)
├── catalog/           # Componentes del catálogo (ProductCard, ProductGrid)
├── cart/              # Componentes del carrito
├── checkout/          # Componentes de checkout
├── ui/                # Componentes base reutilizables
└── admin/             # Componentes de administración

lib/
├── config/            # Configuración centralizada (theme, animations)
├── hooks/             # Hooks personalizados
└── utils/             # Utilidades
```

## Sistema de Diseño

### Paleta de Colores

La aplicación utiliza una paleta de colores consistente basada en Emerald (verde) como color primario y Slate (gris) como secundario, siguiendo estándares de accesibilidad WCAG AA.

#### Colores Primarios (Emerald)
- **Primary 500**: `#10b981` - Color de marca principal
- **Primary 600**: `#059669` - Estados interactivos (hover)
- **Primary 700**: `#047857` - Énfasis fuerte

#### Colores Secundarios (Slate)
- **Secondary 50**: `#f8fafc` - Fondo general suave
- **Secondary 500**: `#64748b` - Texto secundario
- **Secondary 900**: `#0f172a` - Texto principal y estructura

#### Estados Funcionales
- **Success**: `#22c55e` - Verde para confirmaciones
- **Error**: `#ef4444` - Rojo para errores
- **Warning**: `#facc15` - Amarillo para atención
- **Info**: `#3b82f6` - Azul para información

### Tipografía

#### Fuente Principal
- **Familia**: System font stack optimizada para rendimiento
- **Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`

#### Escala Tipográfica
- **xs**: 0.75rem (12px) - Labels pequeños
- **sm**: 0.875rem (14px) - Texto secundario
- **base**: 1rem (16px) - Texto cuerpo estándar
- **lg**: 1.125rem (18px) - Texto cuerpo alternativo
- **xl**: 1.25rem (20px) - Headings pequeños
- **2xl**: 1.5rem (24px) - Headings medianos
- **3xl**: 1.875rem (30px) - Headings grandes
- **4xl**: 2.25rem (36px) - Headings muy grandes
- **5xl**: 3rem (48px) - Headings hero

#### Pesos de Fuente
- **Light**: 300 - Texto decorativo
- **Normal**: 400 - Texto cuerpo estándar
- **Medium**: 500 - Énfasis moderado
- **Semibold**: 600 - Énfasis fuerte (labels, subtítulos)
- **Bold**: 700 - Énfasis muy fuerte (headings)

### Espaciado

Sistema de espaciado consistente basado en múltiplos de 4px:

- **1**: 0.25rem (4px) - Spacing mínimo
- **2**: 0.5rem (8px) - Spacing pequeño
- **3**: 0.75rem (12px) - Padding de botones pequeños
- **4**: 1rem (16px) - Spacing estándar
- **6**: 1.5rem (24px) - Padding de cards medianos
- **8**: 2rem (32px) - Spacing grande
- **12**: 3rem (48px) - Spacing muy grande

### Breakpoints Responsivos

- **xs**: 320px - Móviles pequeños
- **sm**: 640px - Móviles medianos
- **md**: 768px - Tablets
- **lg**: 1024px - Laptops
- **xl**: 1280px - Escritorios
- **2xl**: 1536px - Escritorios grandes

## Páginas Principales

### 1. Página de Inicio (`app/(public)/page.tsx`)

**Estructura Principal:**
- **HorarioAlert**: Indicador de horarios de atención
- **Hero Section**: Sección principal con branding y CTAs
- **Search Section**: Barra de búsqueda y filtros
- **ProductGrid**: Grid de productos con filtros por categoría

**Características:**
- Hero section con gradiente emerald y elementos flotantes
- Estadísticas destacadas en card flotante
- Búsqueda en tiempo real
- Filtros por categorías
- Grid responsivo con efectos de focus

### 2. Páginas de Administración (`app/(admin)/`)

**Panel de Admin:**
- Dashboard principal
- Gestión de categorías
- Gestión de productos
- Gestión de variantes

**Características:**
- Layout dedicado con navegación lateral
- Formularios avanzados para CRUD
- Upload de imágenes
- Gestión de inventario

### 3. Carrito de Compras (`app/(public)/carrito/`)

**Funcionalidades:**
- Lista de productos en carrito
- Actualización de cantidades
- Cálculo de totales
- Integración con WhatsApp para pedidos

### 4. Checkout (`app/(public)/checkout/`)

**Pasos del Checkout:**
- Selección de productos
- Información de entrega
- Método de pago
- Confirmación final

## Componentes Principales

### Layout Components

#### Header (`components/layout/Header.tsx`)
- **Navegación principal** con logo y menú
- **Menú móvil** con animaciones
- **Botón del carrito** con contador
- **Indicadores de servicios** (envío gratis, horarios)
- **Efectos de scroll** (backdrop blur, cambio de opacidad)

#### Footer (`components/layout/Footer.tsx`)
- **Información de la tienda** (dirección, horarios)
- **Enlaces rápidos** y categorías
- **Servicios destacados**
- **CTA de contacto** (WhatsApp, teléfono)
- **Elementos flotantes** con animaciones

### Catalog Components

#### ProductCard (`components/catalog/ProductCard.tsx`)
- **Imagen del producto** con aspect ratio fijo
- **Información básica** (nombre, precio, descripción)
- **Estados visuales** (agotado, variantes)
- **Interacciones** (hover, click)
- **Animaciones** de escala y brillo

#### ProductGrid (`components/catalog/ProductGrid.tsx`)
- **Grid responsivo** (1-4 columnas según breakpoint)
- **Efectos de focus** opcionales (blur en cards no enfocadas)
- **Animaciones stagger** para entrada de elementos
- **Estado vacío** con ilustración animada

#### CategoryFilter (`components/catalog/CategoryFilter.tsx`)
- **Filtro por categorías** con scroll horizontal
- **Indicador visual** de categoría seleccionada
- **Animaciones** de selección

### UI Components Base

#### Button (`components/ui/Button.tsx`)
- **Variantes**: primary, secondary, outline, ghost
- **Estados**: hover, focus, disabled
- **Tamaños**: sm, md, lg
- **Iconos opcionales**

#### Input (`components/ui/Input.tsx`)
- **Validación visual** de estados
- **Labels y placeholders**
- **Iconos de ayuda**

#### Modal (`components/ui/Modal.tsx`)
- **Overlay con backdrop blur**
- **Animaciones de entrada/salida**
- **Accesibilidad completa** (focus trap, ESC)

#### Badge (`components/ui/Badge.tsx`)
- **Estados**: success, error, warning, info
- **Variantes**: solid, outline

### Cart Components

#### CartButton (`components/cart/CartButton.tsx`)
- **Contador de items**
- **Animaciones** de bounce en cambios
- **Dropdown preview** opcional

#### CartItem (`components/cart/CartItem.tsx`)
- **Vista compacta** del producto
- **Controles de cantidad**
- **Botón de eliminación**

#### EmptyCart (`components/cart/EmptyCart.tsx`)
- **Ilustración animada**
- **CTA para continuar comprando**

## Animaciones y Interacciones

### Sistema de Animaciones

#### Duraciones
- **fastest**: 0.1s - Micro-interacciones
- **fast**: 0.15s - Interacciones rápidas
- **normal**: 0.3s - Transiciones estándar
- **slow**: 0.5s - Modales y overlays
- **slowest**: 0.7s - Efectos especiales

#### Funciones de Easing
- **easeOut**: Desaceleración al final (entradas)
- **easeIn**: Aceleración al inicio (salidas)
- **easeInOut**: Suave en ambos extremos
- **spring**: Movimiento tipo resorte
- **bounce**: Efecto de rebote

### Variantes de Animación

#### Fade Variants
- `fadeIn`: Opacidad simple
- `fadeInUp`: Fade con slide hacia arriba
- `fadeInScale`: Fade con escala

#### Slide Variants
- `slideInRight/Left`: Entrada lateral
- `slideInUp/Down`: Entrada vertical

#### Special Effects
- `focusCard`: Blur en cards no enfocadas
- `staggerContainer/Item`: Animaciones secuenciales
- `pulse`: Efectos de atención
- `shake`: Feedback de error

### Hook de Animaciones (`lib/hooks/useAnimation.ts`)

```typescript
const { enabled, getTransition } = useAnimation();
```

- **enabled**: Booleano para activar/desactivar animaciones
- **getTransition**: Función para obtener transiciones con configuración de accesibilidad
- **Respetar prefers-reduced-motion**

## Layout y Navegación

### Layout Principal

#### Public Layout (`app/(public)/layout.tsx`)
- **Header fijo** con navegación
- **Footer completo** con información
- **CartProvider** para estado global del carrito

#### Admin Layout (`app/(admin)/admin/layout.tsx`)
- **AdminNav** lateral
- **Layout simplificado** sin footer público

### Navegación

#### Navegación Principal
- **Logo** con hover effects
- **Menú desktop** con indicador activo
- **Menú móvil** con animaciones slide
- **Botón de carrito** con contador

#### Navegación por Categorías
- **Scroll horizontal** en móvil
- **Filtros visuales** con estados activos
- **Animaciones** de selección

### Responsive Design

#### Mobile First Approach
- **Breakpoints ascendentes**
- **Grid flexible** (1 col móvil → 4 col desktop)
- **Menú móvil** con overlay
- **Touch-friendly** elementos (44px mínimo)

#### Desktop Enhancements
- **Hover states** avanzados
- **Animaciones complejas**
- **Layout multi-columna**

## Conclusión

La aplicación Tienda DID implementa un sistema de diseño moderno y coherente con:

- **Accesibilidad WCAG AA** en colores y contrastes
- **Responsive design** completo
- **Animaciones fluidas** respetando preferencias de usuario
- **Componentes reutilizables** y consistentes
- **Arquitectura escalable** para futuras expansiones

El enfoque en UX se centra en:
- Navegación intuitiva
- Feedback visual claro
- Performance optimizada
- Experiencia móvil excelente

Este contexto sirve como guía para desarrolladores y diseñadores que trabajen en la evolución de la plataforma.