/**
 * Tienda DID - Animation Configuration
 * Configuración centralizada de duraciones, easing y variantes de animación
 * Compatible con prefers-reduced-motion
 * @version 1.0.0
 */

import type { Transition, Variants } from 'framer-motion';

/**
 * Duraciones de animación (en milisegundos)
 * Respeta prefers-reduced-motion cuando se usa con useAnimation hook
 */
export const durations = {
  /** Animaciones muy rápidas - 100ms */
  fastest: 0.1,
  /** Animaciones rápidas - 150ms (micro-interacciones) */
  fast: 0.15,
  /** Animaciones normales - 300ms (transiciones estándar) */
  normal: 0.3,
  /** Animaciones lentas - 500ms (modales, overlays) */
  slow: 0.5,
  /** Animaciones muy lentas - 700ms (efectos especiales) */
  slowest: 0.7,
} as const;

/**
 * Funciones de easing para animaciones
 * Basadas en curvas Bézier para movimiento natural
 */
export const easing = {
  /** Ease out - desacelera al final (entrada de elementos) */
  easeOut: [0.0, 0.0, 0.2, 1.0] as const,
  /** Ease in - acelera al inicio (salida de elementos) */
  easeIn: [0.4, 0.0, 1.0, 1.0] as const,
  /** Ease in-out - suave en ambos extremos */
  easeInOut: [0.4, 0.0, 0.2, 1.0] as const,
  /** Bounce - efecto de rebote suave */
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  /** Spring - movimiento tipo resorte */
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
  /** Spring suave - movimiento tipo resorte más suave */
  springSoft: { type: 'spring', stiffness: 200, damping: 25 } as const,
} as const;

/**
 * Transiciones predefinidas
 */
export const transitions = {
  /** Transición rápida para micro-interacciones */
  fast: {
    duration: durations.fast,
    ease: easing.easeOut,
  } satisfies Transition,
  
  /** Transición normal para elementos de UI */
  normal: {
    duration: durations.normal,
    ease: easing.easeOut,
  } satisfies Transition,
  
  /** Transición lenta para modales y overlays */
  slow: {
    duration: durations.slow,
    ease: easing.easeInOut,
  } satisfies Transition,
  
  /** Transición spring para movimientos naturales */
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } satisfies Transition,
  
  /** Transición spring suave para elementos grandes */
  springSoft: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
  } satisfies Transition,
} as const;

/**
 * Variantes de animación para Framer Motion
 */
export const variants = {
  /** Fade in/out simple */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } satisfies Variants,
  
  /** Fade in con slide hacia arriba */
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } satisfies Variants,
  
  /** Fade in con slide hacia abajo */
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  } satisfies Variants,
  
  /** Fade in con scale */
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  } satisfies Variants,
  
  /** Slide desde la derecha */
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  } satisfies Variants,
  
  /** Slide desde la izquierda */
  slideInLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  } satisfies Variants,
  
  /** Contenedor para stagger children */
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  } satisfies Variants,
  
  /** Item hijo para stagger */
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.fast,
        ease: easing.easeOut,
      },
    },
    exit: { opacity: 0, y: -10 },
  } satisfies Variants,
  
  /** Animación de pulse para badges/notificaciones */
  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  } satisfies Variants,
  
  /** Animación de shake para errores */
  shake: {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.4,
      },
    },
  } satisfies Variants,
  
  /** Focus card - blur en cards no activas */
  focusCard: {
    initial: { filter: 'blur(0px)', scale: 1 },
    blur: { 
      filter: 'blur(4px)', 
      scale: 0.98,
      transition: transitions.fast,
    },
    focus: { 
      filter: 'blur(0px)', 
      scale: 1.02,
      transition: transitions.spring,
    },
  } satisfies Variants,
} as const;

/**
 * Configuración para animaciones reducidas (prefers-reduced-motion)
 */
export const reducedMotionConfig = {
  durations: {
    fastest: 0,
    fast: 0,
    normal: 0,
    slow: 0,
    slowest: 0,
  },
  transitions: {
    fast: { duration: 0 },
    normal: { duration: 0 },
    slow: { duration: 0 },
    spring: { duration: 0 },
    springSoft: { duration: 0 },
  },
} as const;

/**
 * Tipo de configuración de animaciones completa
 */
export interface AnimationConfig {
  durations: typeof durations;
  easing: typeof easing;
  transitions: typeof transitions;
  variants: typeof variants;
  reducedMotionConfig: typeof reducedMotionConfig;
}

/**
 * Exportar configuración completa
 */
export const animationConfig: AnimationConfig = {
  durations,
  easing,
  transitions,
  variants,
  reducedMotionConfig,
};

export default animationConfig;
