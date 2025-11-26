/**
 * Tienda DID - Animation Hook
 * Custom hook para manejar prefers-reduced-motion y configuración de animaciones
 * @version 1.0.0
 */

'use client';

import { useEffect, useState, useMemo } from 'react';
import { 
  durations, 
  transitions, 
  variants,
  reducedMotionConfig,
  type AnimationConfig 
} from '@/lib/config/animations';
import type { Transition, Variants } from 'framer-motion';

/**
 * Hook para detectar si el usuario prefiere movimiento reducido
 * @returns {boolean} true si el usuario prefiere movimiento reducido
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Establecer valor inicial
    setPrefersReducedMotion(mediaQuery.matches);

    // Escuchar cambios en la preferencia
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Usar addEventListener (moderno) o addListener (legacy)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Para navegadores más antiguos
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Configuración de animación adaptativa
 */
export interface AnimationSettings {
  /** Si las animaciones están habilitadas */
  enabled: boolean;
  /** Duraciones adaptadas */
  durations: typeof durations;
  /** Transiciones adaptadas */
  transitions: typeof transitions;
  /** Variantes de animación */
  variants: typeof variants;
  /** Obtener transición específica */
  getTransition: (key: keyof typeof transitions) => Transition;
  /** Obtener duración específica */
  getDuration: (key: keyof typeof durations) => number;
  /** Obtener variante específica */
  getVariant: (key: keyof typeof variants) => Variants;
}

/**
 * Hook principal para configuración de animaciones
 * Respeta automáticamente prefers-reduced-motion
 * 
 * @example
 * ```tsx
 * const { enabled, getTransition, getDuration } = useAnimation();
 * 
 * return (
 *   <motion.div
 *     initial={{ opacity: 0 }}
 *     animate={{ opacity: 1 }}
 *     transition={getTransition('normal')}
 *   >
 *     Content
 *   </motion.div>
 * );
 * ```
 */
export function useAnimation(): AnimationSettings {
  const prefersReducedMotion = usePrefersReducedMotion();

  const settings = useMemo<AnimationSettings>(() => {
    const enabled = !prefersReducedMotion;

    // Si reduced motion está activo, usar configuración reducida
    const adaptedDurations = enabled 
      ? durations 
      : reducedMotionConfig.durations;
    
    const adaptedTransitions = enabled 
      ? transitions 
      : reducedMotionConfig.transitions;

    return {
      enabled,
      durations: adaptedDurations as typeof durations,
      transitions: adaptedTransitions as typeof transitions,
      variants,
      
      getTransition: (key: keyof typeof transitions): Transition => {
        if (!enabled) {
          return { duration: 0 };
        }
        return transitions[key];
      },
      
      getDuration: (key: keyof typeof durations): number => {
        if (!enabled) {
          return 0;
        }
        return durations[key];
      },
      
      getVariant: (key: keyof typeof variants): Variants => {
        if (!enabled) {
          // Retornar variantes sin animación
          return {
            initial: {},
            animate: {},
            exit: {},
          };
        }
        return variants[key];
      },
    };
  }, [prefersReducedMotion]);

  return settings;
}

/**
 * Hook para animaciones de stagger en listas
 * 
 * @param itemCount - Número de items en la lista
 * @param baseDelay - Delay base entre items (en segundos)
 * @returns Configuración de stagger adaptada
 * 
 * @example
 * ```tsx
 * const { containerVariants, itemVariants } = useStaggerAnimation(products.length);
 * 
 * return (
 *   <motion.div variants={containerVariants} initial="initial" animate="animate">
 *     {products.map((product) => (
 *       <motion.div key={product.id} variants={itemVariants}>
 *         <ProductCard product={product} />
 *       </motion.div>
 *     ))}
 *   </motion.div>
 * );
 * ```
 */
export function useStaggerAnimation(itemCount: number, baseDelay: number = 0.05) {
  const { enabled } = useAnimation();

  return useMemo(() => {
    if (!enabled) {
      return {
        containerVariants: {
          initial: {},
          animate: {},
          exit: {},
        },
        itemVariants: {
          initial: {},
          animate: {},
          exit: {},
        },
      };
    }

    // Limitar el delay total para no hacer animaciones muy largas
    const maxTotalDelay = 0.5; // 500ms máximo
    const adjustedDelay = Math.min(baseDelay, maxTotalDelay / Math.max(itemCount, 1));

    return {
      containerVariants: {
        initial: {},
        animate: {
          transition: {
            staggerChildren: adjustedDelay,
            delayChildren: 0.1,
          },
        },
        exit: {
          transition: {
            staggerChildren: adjustedDelay / 2,
            staggerDirection: -1,
          },
        },
      },
      itemVariants: variants.staggerItem,
    };
  }, [enabled, itemCount, baseDelay]);
}

/**
 * Hook para animaciones de focus cards
 * 
 * @param activeIndex - Índice del card activo (null si ninguno)
 * @param currentIndex - Índice del card actual
 * @returns Estado de animación del card
 */
export function useFocusCardAnimation(
  activeIndex: number | null, 
  currentIndex: number
): 'initial' | 'blur' | 'focus' {
  const { enabled } = useAnimation();

  return useMemo(() => {
    if (!enabled || activeIndex === null) {
      return 'initial';
    }
    
    return currentIndex === activeIndex ? 'focus' : 'blur';
  }, [enabled, activeIndex, currentIndex]);
}

export default useAnimation;
