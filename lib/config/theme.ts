/**
 * Tienda DID - Theme Configuration
 * Configuración centralizada de colores, tipografía, espaciado y diseño
 * Implementa mejores prácticas de UI/UX con accesibilidad WCAG AA
 * @version 2.0.0
 */

/**
 * Configuración de la paleta de colores
 * Sigue la paleta de Tienda DID con contraste WCAG AAA
 */
export const colors = {
  // Colores primarios - Emerald (Paleta Tienda DID)
  primary: {
    50: '#ecfdf5',   // Fondo suave para notificaciones de éxito
    500: '#10b981',  // Emerald-500 - Versión más clara
    600: '#059669',  // PRIMARY - Color de marca
    700: '#047857',  // HOVER - Estados interactivos
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  
  // Colores secundarios - Slate (Paleta Tienda DID)
  secondary: {
    50: '#f8fafc',   // BG PRIMARY - Fondo general suave
    100: '#f1f5f9',
    200: '#e2e8f0',  // Bordes de inputs
    300: '#cbd5e1',
    400: '#94a3b8',  // Slate-400 - Deshabilitado y placeholders
    500: '#64748b',  // TEXT SECONDARY - Descripciones y texto suave
    600: '#475569',  // Slate-600 - Textos secundarios importantes
    700: '#334155',  // Bordes y divisiones
    800: '#1e293b',  // Slate-800 - Textos importantes
    900: '#0f172a',  // SECONDARY - Estructura y títulos
    950: '#020617',
  },
  
  // Estados funcionales (Paleta Tienda DID)
  status: {
    success: '#22c55e',    // Verde de éxito
    error: '#ef4444',      // Rojo para alertas y errores
    warning: '#facc15',    // Amarillo para atención positiva
    info: '#3b82f6',       // Azul para información neutral
  },
  
  // Fondos con propósito (Paleta Tienda DID)
  background: {
    primary: '#f8fafc',         // Fondo general de la app
    secondary: '#f1f5f9',       // Fondos alternos
    card: '#ffffff',            // Cards y paneles elevados
    modal: '#ffffff',           // Modales
    overlay: 'rgba(0, 0, 0, 0.5)', // Overlay semi-transparente
    success: '#ecfdf5',         // Fondo de éxito (Emerald-50)
    error: '#fef2f2',           // Fondo de error (Red-50)
    warning: '#fef9c3',         // Fondo de aviso (Yellow-100)
    info: '#eff6ff',            // Fondo de información (Blue-50)
  },
  
  // Textos con propósito
  text: {
    primary: '#0f172a',    // Texto principal - Slate-900
    secondary: '#64748b',  // Texto secundario - Slate-500
    tertiary: '#94a3b8',   // Texto terciario - Slate-400
    disabled: '#cbd5e1',   // Texto deshabilitado
    inverse: '#ffffff',    // Texto inverso (sobre colores oscuros)
    success: '#047857',    // Texto de éxito - Emerald-700
    error: '#dc2626',      // Texto de error - Red-600
    warning: '#854d0e',    // Texto de aviso - Yellow-900
    info: '#1e40af',       // Texto de información - Blue-800
  },
  
  // Bordes y divisiones
  border: {
    light: '#e2e8f0',      // Slate-200 - Bordes suaves
    default: '#cbd5e1',    // Slate-300 - Bordes normales
    strong: '#94a3b8',     // Slate-400 - Bordes destacados
    focus: '#059669',      // Primary - Focus states
  },
} as const;

/**
 * Configuración de tipografía
 * System font stack para mejor rendimiento y legibilidad
 */
export const typography = {
  fontFamily: {
    // System font stack - optimizado para web
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },
  
  // Escala de tamaño de fuente (16px base = 1rem)
  fontSize: {
    xs: '0.75rem',    // 12px - Labels y ayudas pequeñas
    sm: '0.875rem',   // 14px - Texto secundario y descripción
    base: '1rem',     // 16px - Texto de cuerpo predeterminado
    lg: '1.125rem',   // 18px - Texto de cuerpo alternativo
    xl: '1.25rem',    // 20px - Heading pequeño
    '2xl': '1.5rem',  // 24px - Heading mediano
    '3xl': '1.875rem',// 30px - Heading grande
    '4xl': '2.25rem', // 36px - Heading muy grande
    '5xl': '3rem',    // 48px - Heading hero
  },
  
  // Pesos de fuente siguiendo variación estándar
  fontWeight: {
    light: '300',      // Texto decorativo
    normal: '400',     // Texto de cuerpo estándar
    medium: '500',     // Énfasis moderado
    semibold: '600',   // Énfasis fuerte (labels, subtítulos)
    bold: '700',       // Énfasis muy fuerte (headings)
  },
  
  // Altura de línea para mejor legibilidad
  lineHeight: {
    tight: '1.25',     // Headings
    snug: '1.375',     // Subtítulos
    normal: '1.5',     // Cuerpo de texto
    relaxed: '1.625',  // Contenido extenso
    loose: '2',        // Espaciado abierto
  },
  
  // Configuración de texto - tipografía semántica
  text: {
    heading: {
      weight: '600',
      lineHeight: '1.25',
    },
    body: {
      weight: '400',
      lineHeight: '1.5',
    },
    label: {
      weight: '500',
      fontSize: '0.875rem',
      lineHeight: '1.25',
    },
    caption: {
      weight: '400',
      fontSize: '0.75rem',
      lineHeight: '1',
    },
  },
} as const;

/**
 * Breakpoints responsivos (mobile-first)
 * Base: 16px (1rem)
 */
export const breakpoints = {
  xs: '320px',   // Móviles pequeños
  sm: '640px',   // Móviles medianos
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Escritorios
  '2xl': '1536px', // Escritorios grandes
} as const;

/**
 * Escala de espaciado (4px base = unidad fundamental)
 * Mantiene ritmo visual consistente
 */
export const spacing = {
  0: '0',        // Ninguno
  px: '1px',     // Bordes de 1px
  0.5: '0.125rem',  // 2px
  1: '0.25rem',  // 4px - Spacing mínimo
  1.5: '0.375rem',  // 6px
  2: '0.5rem',   // 8px - Spacing pequeño
  2.5: '0.625rem',  // 10px
  3: '0.75rem',  // 12px - Padding de button pequeño
  3.5: '0.875rem',  // 14px
  4: '1rem',     // 16px - Spacing estándar
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px - Padding de card mediano
  7: '1.75rem',  // 28px
  8: '2rem',     // 32px - Spacing grande
  9: '2.25rem',  // 36px
  10: '2.5rem',  // 40px - Gap entre secciones
  12: '3rem',    // 48px - Spacing muy grande
  14: '3.5rem',  // 56px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px - Spacing de layout
  28: '7rem',    // 112px
  32: '8rem',    // 128px
  36: '9rem',    // 144px
  40: '10rem',   // 160px
} as const;

/**
 * Radio de bordes (border-radius)
 * Crea consistencia visual y accesibilidad
 */
export const borderRadius = {
  none: '0',           // Sin radio
  sm: '0.125rem',      // 2px - Bordes muy sutiles
  xs: '0.25rem',       // 4px - Inputs y elementos pequeños
  DEFAULT: '0.5rem',   // 8px - Estándar de la app
  md: '0.625rem',      // 10px
  lg: '0.75rem',       // 12px - Cards y elementos medianos
  xl: '1rem',          // 16px - Elementos grandes
  '2xl': '1.5rem',     // 24px - Modales y elementos destacados
  '3xl': '2rem',       // 32px
  full: '9999px',      // Circular - Badges y pills
} as const;

/**
 * Sombras (box-shadow)
 * Crea profundidad y jerarquía visual
 * Optimizado para accesibilidad y contraste
 */
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 2px 0 rgb(0 0 0 / 0.04)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

/**
 * Capas Z-index
 * Control de profundidad sin conflictos de espacio
 */
export const zIndex = {
  hide: '-1',
  base: '0',
  dropdown: '10',
  sticky: '20',
  fixed: '30',
  backdrop: '35',     // Overlay transparente
  modal: '40',        // Diálogos modales
  popover: '50',      // Popovers y tooltips flotantes
  tooltip: '60',      // Tooltips simples
  notification: '70', // Notificaciones y toasts
  debug: '9999',      // Para debugging
} as const;

/**
 * Tipo de tema completo
 */
export interface ThemeConfig {
  colors: typeof colors;
  typography: typeof typography;
  breakpoints: typeof breakpoints;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  zIndex: typeof zIndex;
}

/**
 * Configuración de tema exportada
 */
export const theme: ThemeConfig = {
  colors,
  typography,
  breakpoints,
  spacing,
  borderRadius,
  shadows,
  zIndex,
};

export default theme;
