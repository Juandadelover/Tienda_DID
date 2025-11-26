# Data Model & Design Specifications - Mejoras de UI/UX

**Phase**: 1 - Design & Contracts  
**Created**: 2025-11-25  
**Status**: In Progress  

## Overview

Este documento define los modelos de datos, estructura de componentes y configuraciones de diseño que soportarán las mejoras de UI/UX.

---

## 1. Component Theme Configuration

### ThemeConfig Type

```typescript
// lib/config/theme.ts

export interface ThemeConfig {
  colors: ColorPalette;
  animations: AnimationConfig;
  spacing: SpacingScale;
  typography: TypographyConfig;
  responsive: ResponsiveBreakpoints;
}

export interface ColorPalette {
  primary: {
    50: string;   // #ecfdf5 - Emerald-50
    500: string;  // #10b981 - Emerald-500
    600: string;  // #059669 - PRIMARY
    700: string;  // #047857 - HOVER
  };
  secondary: {
    800: string;  // #1e293b - Slate-800
    900: string;  // #0f172a - Slate-900 - SECONDARY
  };
  background: {
    50: string;   // #f8fafc - Slate-50 - BG PRIMARY
  };
  text: {
    primary: string;   // #0f172a - Slate-900
    secondary: string; // #64748b - Slate-500
    tertiary: string;  // #94a3b8 - Slate-400
  };
  status: {
    success: string;  // #22c55e - Green-500
    error: string;    // #ef4444 - Red-500
    warning: string;  // #facc15 - Yellow-400
    info: string;     // #3b82f6 - Blue-500
  };
  surface: {
    card: string;     // #ffffff - White
    modal: string;    // #ffffff - White
    border: string;   // #e2e8f0 - Slate-200
  };
}

export interface AnimationConfig {
  durations: {
    fast: number;      // 150ms - Micro-interactions
    normal: number;    // 300ms - Standard animations
    slow: number;      // 500ms - Entrance/exit animations
  };
  easing: {
    smooth: string;    // cubic-bezier(0.4, 0, 0.2, 1)
    bounce: string;    // cubic-bezier(0.68, -0.55, 0.265, 1.55)
    enter: string;     // cubic-bezier(0, 0, 0.2, 1)
    exit: string;      // cubic-bezier(0.4, 0, 1, 1)
  };
  reduceMotion: boolean; // Respeta prefers-reduced-motion
}

export interface SpacingScale {
  xs: string;  // 0.25rem (4px)
  sm: string;  // 0.5rem (8px)
  md: string;  // 1rem (16px)
  lg: string;  // 1.5rem (24px)
  xl: string;  // 2rem (32px)
  '2xl': string; // 3rem (48px)
}

export interface TypographyConfig {
  fontFamily: {
    sans: string;  // Sistema default (Tailwind)
    mono: string;  // Monoespaciada
  };
  sizes: {
    xs: { size: string; lineHeight: string };      // 12px
    sm: { size: string; lineHeight: string };      // 14px
    base: { size: string; lineHeight: string };    // 16px
    lg: { size: string; lineHeight: string };      // 18px
    xl: { size: string; lineHeight: string };      // 20px
    '2xl': { size: string; lineHeight: string };   // 24px
    '3xl': { size: string; lineHeight: string };   // 30px
    '4xl': { size: string; lineHeight: string };   // 36px
  };
  weights: {
    normal: number;   // 400
    medium: number;   // 500
    semibold: number; // 600
    bold: number;     // 700
  };
}

export interface ResponsiveBreakpoints {
  mobile: number;    // 0px (default)
  tablet: number;    // 768px (md)
  desktop: number;   // 1024px (lg)
  wide: number;      // 1280px (xl)
}
```

### Default Theme Instance

```typescript
// lib/config/theme.default.ts

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: {
      50: '#ecfdf5',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },
    secondary: {
      800: '#1e293b',
      900: '#0f172a',
    },
    background: {
      50: '#f8fafc',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
      tertiary: '#94a3b8',
    },
    status: {
      success: '#22c55e',
      error: '#ef4444',
      warning: '#facc15',
      info: '#3b82f6',
    },
    surface: {
      card: '#ffffff',
      modal: '#ffffff',
      border: '#e2e8f0',
    },
  },
  animations: {
    durations: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      enter: 'cubic-bezier(0, 0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
    },
    reduceMotion: false,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, sans-serif',
      mono: '"Menlo", "Monaco", monospace',
    },
    sizes: {
      xs: { size: '12px', lineHeight: '16px' },
      sm: { size: '14px', lineHeight: '20px' },
      base: { size: '16px', lineHeight: '24px' },
      lg: { size: '18px', lineHeight: '28px' },
      xl: { size: '20px', lineHeight: '28px' },
      '2xl': { size: '24px', lineHeight: '32px' },
      '3xl': { size: '30px', lineHeight: '36px' },
      '4xl': { size: '36px', lineHeight: '40px' },
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  responsive: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
    wide: 1280,
  },
};
```

---

## 2. Component Architecture

### Focus Cards Component

**Purpose**: Mostrar tarjetas de productos con efecto de enfoque/blur

```typescript
// components/aceternity/FocusCardsWrapper.tsx

export interface FocusCard {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  badge?: {
    text: string;
    variant: 'disponible' | 'agotado' | 'nuevo';
  };
  onClick?: () => void;
}

export interface FocusCardsWrapperProps {
  cards: FocusCard[];
  onCardClick?: (cardId: string) => void;
  columns?: 'auto' | 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}
```

### Floating Dock Component

**Purpose**: Navegación flotante en móvil

```typescript
// components/aceternity/FloatingDockWrapper.tsx

export interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: number;
}

export interface FloatingDockWrapperProps {
  items: DockItem[];
  position?: 'bottom' | 'top';
  showOnlyMobile?: boolean;
}
```

### Placeholder Vanish Input Component

**Purpose**: Búsqueda con placeholders animados

```typescript
// components/aceternity/PlaceholderVanishInputWrapper.tsx

export interface PlaceholderVanishInputProps {
  placeholders: string[];
  onSubmit: (value: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
}
```

### Animated Tabs Component

**Purpose**: Filtro de categorías con tabs animados

```typescript
// components/aceternity/AnimatedTabsWrapper.tsx

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  count?: number;
}

export interface AnimatedTabsWrapperProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'underline' | 'pill' | 'default';
}
```

### Loader Component

**Purpose**: Estados de carga mejorados

```typescript
// components/aceternity/LoaderWrapper.tsx

export type LoaderVariant = 'default' | 'circle' | 'pulse' | 'dots' | 'bars';

export interface LoaderWrapperProps {
  variant?: LoaderVariant;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}
```

### Bento Grid Component

**Purpose**: Dashboard admin con grid tipo Bento

```typescript
// components/aceternity/BentoGridWrapper.tsx

export interface BentoGridItem {
  id: string;
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  description?: string;
  footer?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export interface BentoGridWrapperProps {
  items: BentoGridItem[];
  columns?: 2 | 3 | 4;
}
```

---

## 3. Animation Specifications

### Trigger Points

| Evento | Duración | Easing | Propiedades |
|--------|----------|--------|-------------|
| Hover en tarjeta | 200ms | smooth | scale(1.05), shadow increase |
| Blur de tarjetas adyacentes | 200ms | smooth | opacity 0.5 |
| Entrada de modal | 300ms | enter | scale 0→1, opacity 0→1 |
| Salida de modal | 200ms | exit | scale 1→0.95, opacity 1→0 |
| Tab selection | 300ms | smooth | underline, background |
| Dock icon hover | 150ms | bounce | scale 1.2 |
| Search vanish | 400ms | smooth | opacity 1→0, translateX |
| Loading pulse | 1500ms | loop | opacity pulse |

### Stagger Pattern

Para listas de elementos (tarjetas de productos), usar stagger:

```typescript
// Cada tarjeta entra con 50ms de delay
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 50ms entre cada hijo
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
```

---

## 4. Responsive Layout Rules

### Breakpoints de Tienda DID

| Dispositivo | Ancho | Componentes |
|-------------|-------|------------|
| Móvil | < 768px | Mobile-optimized, Floating Dock visible |
| Tablet | 768-1024px | 2-3 columnas, Dock opcional |
| Desktop | > 1024px | 4+ columnas, Header normal |

### Component Layout por Breakpoint

**ProductGrid**:
```
Mobile (< 768px):  2 columnas, gap-3
Tablet (768px):    3 columnas, gap-4
Desktop (1024px):  4 columnas, gap-4
```

**CategoryFilter**:
```
Mobile (< 768px):  Horizontal scroll, categorías en linha
Tablet (768px):    Grid 2-3 items
Desktop (1024px):  Todos los items visibles
```

**AdminSidebar**:
```
Mobile (< 768px):  Collapsible, hamburger icon
Tablet (768px):    Collapsible, ícono + texto
Desktop (1024px):  Siempre expandido
```

---

## 5. Accessibility Data

### ARIA Attributes Mapping

```typescript
// components/utils/a11y.ts

export const a11yConfig = {
  // Focus management
  focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600',
  
  // Button states
  buttonPressed: (isPressed: boolean) => ({
    'aria-pressed': isPressed,
    className: isPressed ? 'ring-2 ring-offset-2 ring-primary-600' : '',
  }),
  
  // Loading states
  loadingRegion: {
    'aria-live': 'polite',
    'aria-busy': true,
    role: 'status',
  },
  
  // Search input
  searchInput: {
    'aria-label': 'Buscar productos',
    'aria-autocomplete': 'list',
    'aria-controls': 'search-results',
  },
};
```

---

## 6. Token de Diseño por Componente

### Button Component Tokens

```typescript
export const buttonTokens = {
  height: {
    sm: '32px',
    md: '44px',  // Min touch target
    lg: '48px',
  },
  padding: {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  },
  radius: '8px',
  transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
};
```

### Card Component Tokens

```typescript
export const cardTokens = {
  padding: {
    sm: '12px',
    md: '16px',
    lg: '24px',
  },
  radius: '8px',
  shadow: {
    default: '0 1px 3px rgba(0, 0, 0, 0.1)',
    hover: '0 10px 15px rgba(0, 0, 0, 0.1)',
    elevated: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  border: '1px solid #e2e8f0',
};
```

### Form Input Tokens

```typescript
export const inputTokens = {
  height: '44px',  // Min touch target
  padding: 'px-3 py-3',
  radius: '8px',
  border: '1px solid #cbd5e1',
  focus: 'border-primary-600 ring-2 ring-primary-100',
  disabled: 'bg-slate-100 text-slate-400 cursor-not-allowed',
};
```

---

## 7. Image Optimization Data

### Product Image Specifications

```typescript
export interface ProductImage {
  src: string;
  alt: string;
  placeholder?: 'blur' | 'empty';
  width: number;
  height: number;
  priority?: boolean;  // Para LCP
  sizes?: string;      // Responsive sizes
}

// Configuración recomendada:
export const productImageConfig = {
  aspectRatio: '1:1',
  placeholder: 'blur' as const,
  sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  quality: 80,  // WebP compression
};
```

---

## 8. Conclusiones del Data Model

✅ **Definido**: ThemeConfig type con todas las variables de diseño  
✅ **Definido**: Component interfaces para cada Aceternity component  
✅ **Definido**: Animation specifications con trigger points  
✅ **Definido**: Responsive layout rules por breakpoint  
✅ **Definido**: ARIA attributes para accesibilidad  
✅ **Definido**: Token de diseño por componente  

➡️ **Próximo**: Generar contracts/ y quickstart.md

---

**Status**: ✅ DATA MODEL COMPLETE
