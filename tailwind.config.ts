import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Configuración de container con padding responsivo
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',    // Mobile
        sm: '1.5rem',       // Móviles medianos
        md: '2rem',         // Tablets
        lg: '2rem',         // Laptops
        xl: '2rem',         // Escritorios
        '2xl': '2rem',      // Escritorios grandes
      },
    },
    extend: {
      // Paleta de colores - Tienda DID
      colors: {
        // Color primario - Emerald
        primary: {
          50: "#ecfdf5",   // Fondo suave de éxito
          500: "#10b981",  // Emerald-500 versión clara
          600: "#059669",  // PRIMARY - Color de marca
          700: "#047857",  // HOVER - Estados interactivos
          DEFAULT: "#059669",
        },
        // Color secundario - Slate
        secondary: {
          50: "#f8fafc",   // BG PRIMARY
          100: "#f1f5f9",
          200: "#e2e8f0",  // Bordes normales
          300: "#cbd5e1",  // Bordes destacados
          400: "#94a3b8",  // Deshabilitado y placeholder
          500: "#64748b",  // TEXT SECONDARY
          600: "#475569",  // Textos secundarios importantes
          700: "#334155",  // Bordes y divisiones
          800: "#1e293b",  // Slate-800
          900: "#0f172a",  // SECONDARY - Estructura
          DEFAULT: "#0f172a",
        },
        // Fondos con propósito
        background: {
          primary: "#f8fafc",  // Fondo general
          secondary: "#f1f5f9", // Fondos alternos
          card: "#ffffff",      // Cards
          modal: "#ffffff",     // Modales
          success: "#ecfdf5",   // Fondo de éxito
          error: "#fef2f2",     // Fondo de error
          warning: "#fef9c3",   // Fondo de aviso
          info: "#eff6ff",      // Fondo de información
          DEFAULT: "#f8fafc",
        },
        // Textos con propósito
        text: {
          primary: "#0f172a",   // Slate-900
          secondary: "#64748b", // Slate-500
          tertiary: "#94a3b8",  // Slate-400
          disabled: "#cbd5e1",  // Slate-300
          inverse: "#ffffff",   // Blanco
          error: "#dc2626",     // Red-600
          success: "#047857",   // Emerald-700
          warning: "#854d0e",   // Yellow-900
          info: "#1e40af",      // Blue-800
        },
        // Estados funcionales
        status: {
          error: "#ef4444",      // Red-500
          success: "#22c55e",    // Green-500
          warning: "#facc15",    // Yellow-400
          info: "#3b82f6",       // Blue-500
        },
        // Colores de Slate completos
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      
      // Tipografía mejorada
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],         // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }],     // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],        // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }],     // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1' }],            // 48px
      },

      // Pesos de fuente
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      
      // Espaciado mejorado (4px base)
      spacing: {
        0.5: '0.125rem',   // 2px
        1.5: '0.375rem',   // 6px
        2.5: '0.625rem',   // 10px
        3.5: '0.875rem',   // 14px
        7: '1.75rem',      // 28px
        9: '2.25rem',      // 36px
        11: '2.75rem',     // 44px
        13: '3.25rem',     // 52px
        14: '3.5rem',      // 56px
        15: '3.75rem',     // 60px
      },
      
      // Touch targets mínimos 44x44px (WCAG)
      minWidth: {
        touch: '44px',
      },
      minHeight: {
        touch: '44px',
        input: '44px',
      },
      
      // Breakpoints mobile-first optimizados
      screens: {
        xs: '320px',    // Móviles muy pequeños
        sm: '640px',    // Móviles
        md: '768px',    // Tablets
        lg: '1024px',   // Laptops
        xl: '1280px',   // Escritorios
        '2xl': '1536px', // Escritorios grandes
      },
      
      // Max widths para contenedores
      maxWidth: {
        '7xl': '80rem',   // 1280px
        '8xl': '88rem',   // 1408px
        container: '100%',
      },
      
      // Sombras personalizadas
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      
      // Radio de bordes
      borderRadius: {
        sm: '0.125rem',   // 2px
        md: '0.375rem',   // 6px
        lg: '0.75rem',    // 12px
        xl: '1rem',       // 16px
        '2xl': '1.5rem',  // 24px
        '3xl': '2rem',    // 32px
      },
      
      // Transiciones mejoradas
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '700': '700ms',
      },
      
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
        'ease-in': 'cubic-bezier(0.4, 0.0, 1.0, 1.0)',
        'ease-in-out': 'cubic-bezier(0.4, 0.0, 0.2, 1.0)',
      },
      
      // Altura de línea personalizada
      lineHeight: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
    },
  },
  plugins: [],
};

export default config;
