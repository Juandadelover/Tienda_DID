import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration for Tienda DID
 * Mobile-first responsive design system with Emerald/Slate color palette
 * 
 * DESIGN SYSTEM DOCUMENTATION:
 * 
 * 1. BREAKPOINTS (Mobile-First Approach):
 *    - xs: 320px  (iPhone SE, small phones)
 *    - sm: 640px  (iPhone 12+, large phones)
 *    - md: 768px  (iPad, tablets)
 *    - lg: 1024px (Desktop, laptops)
 *    - xl: 1280px (Wide screens, 4K monitors)
 * 
 * 2. RESPONSIVE GRID PATTERNS:
 *    - ProductGrid: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
 *    - CardGrid: grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3
 *    - VariantGrid: grid-cols-1 sm:grid-cols-2 md:grid-cols-3
 * 
 * 3. TOUCH TARGETS (WCAG AA+ Compliance):
 *    - Minimum: 44x44px
 *    - Padding between targets: 8px
 *    - Applied to: buttons, links, form inputs
 * 
 * 4. MOTION FRAME TIMINGS:
 *    - Micro (150ms): hover states, focus rings
 *    - Short (200ms): button clicks, toggles, form feedback
 *    - Medium (300ms): modal open/close, drawer animations
 *    - Long (500ms): page transitions, complex animations
 * 
 * 5. ANIMATION PRINCIPLES:
 *    - Use ease-out for object entrance (fade-in, slide-up, scale-in)
 *    - Use ease-spring for interactive feedback (bouncy feel)
 *    - Respect prefers-reduced-motion (see app/globals.css)
 * 
 * 6. TYPOGRAPHY SCALE (Fluid, Responsive):
 *    - Uses clamp() for automatic scaling between breakpoints
 *    - Base font size: 16px (1rem)
 *    - Line height: 1.5 (default), varies by text size
 *    - see app/globals.css for CSS variables
 * 
 * 7. COLOR PALETTE:
 *    - Primary: #059669 (Emerald-600) - Actions, interactive elements
 *    - Secondary: #0f172a (Slate-900) - Body text, dark backgrounds
 *    - Functional: Error (#ef4444), Success (#22c55e), Warning (#facc15), Info (#3b82f6)
 *    - All colors meet WCAG AA contrast ratios (4.5:1)
 * 
 * USAGE EXAMPLES:
 * 
 * // Responsive grid - adjusts columns by breakpoint
 * <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
 * 
 * // Touch target button
 * <button class="min-h-[44px] min-w-[44px] px-4 py-3">Click me</button>
 * 
 * // Responsive text
 * <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold">
 * 
 * // Animation with Motion Frame timing
 * <div class="transition-all duration-200 ease-out hover:scale-105">
 * 
 * // Accessibility: focus visible
 * <button class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
 */

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
          tertiary: "#64748b",  // Slate-500 (Updated for WCAG AA)
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
      // Touch targets mínimos 44x44px (WCAG AA+ compliance)
      minWidth: {
        'touch': '44px',
      },
      minHeight: {
        'touch': '44px',
      },
      // Breakpoints mobile-first responsive (xs to xl)
      // Standard Tailwind naming for consistency
      screens: {
        'xs': '320px',   // Small mobile (iPhone SE)
        'sm': '640px',   // Large mobile
        'md': '768px',   // Tablet
        'lg': '1024px',  // Desktop
        'xl': '1280px',  // Wide desktop
        '2xl': '1536px', // Ultra-wide (optional)
      },
      // Sombras personalizadas
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'modal': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      // Motion Frame animation timings (micro to long)
      transitionDuration: {
        '150': '150ms',  // micro - hover, focus states
        '200': '200ms',  // short - button clicks, toggles
        '300': '300ms',  // medium - modal, drawer
        '400': '400ms',  // custom - existing
        '500': '500ms',  // long - page transitions
      },
      // Motion Frame easing functions
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      // Animation keyframes for Motion Frame
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-in-up': 'slide-in-up 300ms ease-out',
        'scale-in': 'scale-in 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
};

export default config;
