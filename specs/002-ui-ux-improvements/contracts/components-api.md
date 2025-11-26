# Component Contracts - Focus Cards

**Component**: Focus Cards (Tarjetas de Productos)  
**Aceternity Base**: `focus-cards.json`  
**Purpose**: Mostrar grid de tarjetas de productos con efecto de enfoque y blur  
**User Stories**: US1 (Catálogo Visual Mejorada)  

## API Contract

### Input Props

```typescript
export interface FocusCardsProps {
  // Datos
  cards: ProductCard[];
  
  // Callbacks
  onCardClick?: (cardId: string) => void;
  onCardHover?: (cardId: string | null) => void;
  
  // Layout
  columns?: 'auto' | 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  
  // Visual
  blurAmount?: 0 | 1 | 2 | 3;  // 0-3 (responsive)
  animationDuration?: number;   // ms (default 200)
  
  // Loading
  isLoading?: boolean;
  skeletonCount?: number;
}

export interface ProductCard {
  id: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description?: string;
  price: string;
  badge?: {
    text: string;
    variant: 'disponible' | 'agotado' | 'nuevo';
    icon?: React.ReactNode;
  };
  metadata?: {
    rating?: number;
    reviews?: number;
    inStock?: boolean;
  };
}
```

### Behavior

| Estado | Comportamiento | Duración | Easing |
|--------|-----------------|----------|--------|
| Default | Tarjetas visibles normales | - | - |
| Hover | Tarjeta: scale 1.05 + shadow elevado | 200ms | smooth |
| Hover (otros) | Blur opacity 0.5, brightness reduce | 200ms | smooth |
| Click | Modal se abre con transición | 300ms | enter |
| Loading | Skeleton loaders con pulse animation | 1500ms | loop |
| Mobile | Sin blur effect (solo scale) | 150ms | smooth |

### Output Events

```typescript
// Eventos emitidos
'cardClick': (cardId: string) => void
'cardHover': (cardId: string | null) => void
'cardFocus': (cardId: string) => void
'cardBlur': (cardId: string) => void
```

### Accessibility

- [x] Keyboard navigation (Tab, Arrow keys, Enter)
- [x] Focus visible ring: `focus-visible:ring-2 ring-primary-600`
- [x] ARIA labels: `aria-label`, `aria-pressed`
- [x] Role: `role="button"` para tarjeta clickeable
- [x] Alt text en imágenes

---

# Component Contracts - Floating Dock

**Component**: Floating Dock (Navegación Móvil)  
**Aceternity Base**: `floating-dock.json`  
**Purpose**: Navegación flotante tipo Mac OS Dock para móvil  
**User Stories**: US2 (Navegación Flotante)  

## API Contract

### Input Props

```typescript
export interface FloatingDockProps {
  // Items
  items: DockItem[];
  
  // Callbacks
  onItemClick?: (itemId: string) => void;
  
  // Layout
  position?: 'bottom' | 'top';
  hideOnScroll?: boolean;
  sticky?: boolean;
  
  // Visual
  gap?: 'sm' | 'md' | 'lg';
  iconSize?: number;  // px (default 24)
  animationDuration?: number;  // ms (default 200)
  
  // Responsive
  showOnlyMobile?: boolean;  // default true (< 768px)
  
  // Cart badge
  cartBadge?: number;
}

export interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: number;  // Para carrito
  color?: string;  // Tint color (default primary-600)
}
```

### Behavior

| Estado | Comportamiento | Duración | Easing |
|--------|-----------------|----------|--------|
| Default | Dock visible en bottom, items en fila | - | - |
| Hover (item) | Icon scale 1.2, label appear | 150ms | bounce |
| Click (item) | Item pulse + navigate/callback | 200ms | smooth |
| Scroll down | Dock fade out (si hideOnScroll=true) | 300ms | exit |
| Scroll up | Dock fade in | 300ms | enter |
| Cart update | Badge pulse animation | 300ms | bounce |
| Mobile | Siempre visible (< 768px) | - | - |
| Desktop | Oculto (>= 768px) | - | - |

### Output Events

```typescript
'itemClick': (itemId: string) => void
'itemHover': (itemId: string | null) => void
'cartUpdate': (count: number) => void
```

### Accessibility

- [x] Keyboard navigation (Tab, Enter, Arrow keys)
- [x] Focus visible en cada item
- [x] ARIA labels: `aria-label="Navegación"`
- [x] Role: `role="navigation"`
- [x] Alt text en iconos

---

# Component Contracts - Placeholder Vanish Input

**Component**: Placeholder Vanish Input (Búsqueda)  
**Aceternity Base**: `placeholder-and-vanish-input.json`  
**Purpose**: Input de búsqueda con placeholders animados y efecto vanish  
**User Stories**: US3 (Búsqueda Mejorada)  

## API Contract

### Input Props

```typescript
export interface PlaceholderVanishInputProps {
  // Contenido
  placeholders: string[];
  value?: string;
  
  // Callbacks
  onSubmit: (value: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  
  // Visual
  animationDuration?: number;  // ms placeholder rotation (default 800)
  vanishDuration?: number;     // ms vanish effect (default 400)
  
  // Layout
  fullWidth?: boolean;  // default true
  showClear?: boolean;  // default true
  
  // Accessibility
  ariaLabel?: string;
  placeholder?: string;
}
```

### Behavior

| Estado | Comportamiento | Duración | Easing |
|--------|-----------------|----------|--------|
| Default | Placeholder rotativo | 800ms | smooth |
| Focus | Input expands, placeholder destaca | 200ms | enter |
| Type | Placeholder desaparece, input visible | - | - |
| Submit | Texto vanish out, fade to results | 400ms | exit |
| Clear | Clear button aparece/desaparece | 150ms | smooth |
| Mobile | Full width, solo 1 placeholder | - | - |

### Output Events

```typescript
'submit': (value: string) => void
'change': (value: string) => void
'clear': () => void
'focus': () => void
'blur': () => void
```

### Accessibility

- [x] Keyboard: Enter para submit, Escape para clear
- [x] ARIA labels: `aria-label="Buscar productos"`
- [x] Role: `role="searchbox"`
- [x] Focus visible ring

---

# Component Contracts - Animated Tabs

**Component**: Animated Tabs (Filtro Categorías)  
**Aceternity Base**: `animated-tabs.json`  
**Purpose**: Tabs con animaciones para filtro de categorías  
**User Stories**: US4 (Tabs Animados)  

## API Contract

### Input Props

```typescript
export interface AnimatedTabsProps {
  // Items
  tabs: TabItem[];
  activeTabId: string;
  
  // Callbacks
  onTabChange: (tabId: string) => void;
  
  // Visual
  variant?: 'underline' | 'pill' | 'default';
  animationDuration?: number;  // ms (default 300)
  
  // Layout
  scrollable?: boolean;  // Para móvil (default true)
  gap?: string;
  
  // Loading
  isLoading?: boolean;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
}
```

### Behavior

| Estado | Comportamiento | Duración | Easing |
|--------|-----------------|----------|--------|
| Default | Tabs visible, underline en active | - | - |
| Click (tab) | Underline slides to tab, content fade | 300ms | smooth |
| Hover | Tab texto/fondo destaca | 150ms | smooth |
| Mobile scroll | Scroll horizontal suave | - | - |
| Disabled (tab) | Tab gris, no clickeable | - | - |
| Loading | Tab content animado | 1500ms | loop |

### Output Events

```typescript
'tabChange': (tabId: string) => void
'tabHover': (tabId: string | null) => void
```

### Accessibility

- [x] Keyboard: Tab, Arrow keys left/right para navegación
- [x] ARIA: `role="tablist"`, `role="tab"`, `aria-selected`
- [x] Focus visible ring en tabs
- [x] Semantic HTML: `<button>` en cada tab

---

# Component Contracts - Expandable Cards

**Component**: Expandable Cards (Modal Producto)  
**Aceternity Base**: `expandable-cards.json`  
**Purpose**: Modal expandible para detalles de producto  
**User Stories**: US5 (Modal Expandible)  

## API Contract

### Input Props

```typescript
export interface ExpandableCardsProps {
  // State
  isOpen: boolean;
  product: ProductDetail | null;
  
  // Callbacks
  onClose: () => void;
  onAddToCart?: (productId: string, variantId?: string, quantity?: number) => void;
  
  // Visual
  animationDuration?: number;  // ms (default 300)
  
  // Layout
  triggerCard?: React.ReactNode;  // Referencia para animación
}

export interface ProductDetail {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: string | { min: string; max: string };
  rating?: number;
  reviews?: number;
  badge?: string;
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: string;
  isAvailable: boolean;
}
```

### Behavior

| Estado | Comportamiento | Duración | Easing |
|--------|-----------------|----------|--------|
| Closed | Modal invisible, scale 0 | - | - |
| Opening | Expande desde tarjeta, fade in | 300ms | enter |
| Open | Modal fully visible, content ready | - | - |
| Close | Contrae hacia tarjeta, fade out | 200ms | exit |
| Select variant | Precio anima, color destaca | 200ms | smooth |
| Add to cart | Button pulse, confirmation toast | 300ms | bounce |

### Output Events

```typescript
'close': () => void
'addToCart': (productId: string, variantId?: string, quantity?: number) => void
'variantSelect': (variantId: string) => void
'openExternal': () => void  // Ver detalles completos
```

### Accessibility

- [x] Keyboard: Escape para cerrar, Tab para navegación
- [x] Focus trap dentro del modal
- [x] ARIA: `role="dialog"`, `aria-modal="true"`
- [x] Close button accesible

---

# Component Contracts - Loader

**Component**: Loader (Estados de Carga)  
**Aceternity Base**: `loader.json`  
**Purpose**: Loaders animados para estados de carga  
**User Stories**: US1 (Feedback visual durante carga)  

## API Contract

### Input Props

```typescript
export interface LoaderProps {
  // Tipo
  variant?: 'default' | 'circle' | 'pulse' | 'dots' | 'bars';
  
  // Tamaño
  size?: 'sm' | 'md' | 'lg';
  
  // Color
  color?: 'primary' | 'secondary' | 'success' | 'error';
  
  // Texto
  text?: string;
  showText?: boolean;
  
  // Duración
  duration?: number;  // ms para completar ciclo
}
```

### Behavior

| Variante | Comportamiento |
|----------|-----------------|
| default | Rotación circular con gradient |
| circle | Progreso circular (0-100%) |
| pulse | Opacity pulse suave |
| dots | 3 puntos animados (bouncing) |
| bars | Barras horizontales animadas |

### Output Events

```typescript
// No emite eventos (presentacional)
```

---

# Component Contracts - Bento Grid

**Component**: Bento Grid (Dashboard Admin)  
**Aceternity Base**: `bento-grid.json`  
**Purpose**: Grid tipo Bento para mostrar estadísticas  
**User Stories**: US8 (Admin moderno)  

## API Contract

### Input Props

```typescript
export interface BentoGridProps {
  // Datos
  items: BentoGridItem[];
  
  // Layout
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  
  // Visual
  animationDuration?: number;  // ms (default 300)
  animateOnLoad?: boolean;     // default true
}

export interface BentoGridItem {
  id: string;
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  description?: string;
  footer?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  onClick?: () => void;
}
```

### Behavior

| Estado | Comportamiento | Duración | Easing |
|--------|-----------------|----------|--------|
| Load | Items aparecen staggered | 300ms | enter |
| Hover | Item elevation + scale slight | 200ms | smooth |
| Click | Navigate o expand detail | - | - |
| Mobile | 2 columnas, gap reduce | - | - |

---

**Contract Status**: ✅ All components defined
