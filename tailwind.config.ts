import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Principal - Tienda DID
        primary: {
          DEFAULT: "#059669", // Emerald-600
          hover: "#047857",   // Emerald-700
          light: "#10b981",   // Emerald-500
          lightest: "#ecfdf5", // Emerald-50
        },
        secondary: {
          DEFAULT: "#0f172a", // Slate-900
          800: "#1e293b",     // Slate-800
          700: "#334155",     // Slate-700
        },
        // Fondos
        background: {
          DEFAULT: "#f8fafc", // Slate-50
          card: "#ffffff",
          modal: "#ffffff",
        },
        // Textos
        text: {
          primary: "#0f172a",   // Slate-900
          secondary: "#64748b", // Slate-500
          tertiary: "#94a3b8",  // Slate-400
          disabled: "#94a3b8",  // Slate-400
        },
        // Colores Funcionales
        error: {
          DEFAULT: "#ef4444", // Red-500
          hover: "#dc2626",   // Red-600
          light: "#fef2f2",   // Red-50
        },
        success: {
          DEFAULT: "#22c55e", // Green-500
          light: "#f0fdf4",   // Green-50
        },
        warning: {
          DEFAULT: "#facc15", // Yellow-400
          light: "#fde047",   // Yellow-300
          hover: "#eab308",   // Yellow-500
        },
        info: {
          DEFAULT: "#3b82f6", // Blue-500
          light: "#eff6ff",   // Blue-50
        },
        // Grises adicionales de Slate
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
      // Tamaños de fuente (mínimo 16px para body)
      fontSize: {
        'body': ['16px', { lineHeight: '24px' }],
        'action': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'small': ['14px', { lineHeight: '20px' }],
        'tiny': ['12px', { lineHeight: '16px' }],
      },
      // Touch targets mínimos 44x44px
      minWidth: {
        'touch': '44px',
      },
      minHeight: {
        'touch': '44px',
      },
      // Breakpoints mobile-first
      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1280px',
      },
      // Sombras personalizadas
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'modal': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      // Transiciones
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
