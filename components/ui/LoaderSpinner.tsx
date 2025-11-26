/**
 * LoaderSpinner - Componente de carga con animaciones modernas
 * Basado en Aceternity UI Loader con colores de Tienda DID
 * 
 * @version 1.0.0
 */

'use client';

import { motion } from 'motion/react';
import React from 'react';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/lib/hooks/useAnimation';

interface LoaderSpinnerProps {
  /** Tamaño del loader */
  size?: 'sm' | 'md' | 'lg';
  /** Variante visual del loader */
  variant?: 'dots' | 'pulse' | 'spinner';
  /** Color del loader (usa colores de Tienda DID) */
  color?: 'primary' | 'secondary' | 'white';
  /** Texto de carga opcional */
  label?: string;
  /** Clase CSS adicional */
  className?: string;
}

const sizeConfig = {
  sm: { dot: 'h-2 w-2', gap: 'gap-1', text: 'text-xs' },
  md: { dot: 'h-3 w-3', gap: 'gap-2', text: 'text-sm' },
  lg: { dot: 'h-4 w-4', gap: 'gap-3', text: 'text-base' },
};

const colorConfig = {
  primary: 'bg-emerald-600 border-emerald-500',
  secondary: 'bg-slate-700 border-slate-600',
  white: 'bg-white border-slate-200',
};

/**
 * Loader con puntos animados (estilo Aceternity)
 */
function DotsLoader({ 
  size = 'md', 
  color = 'primary' 
}: Pick<LoaderSpinnerProps, 'size' | 'color'>) {
  const { enabled } = useAnimation();
  
  const transition = (delay: number) => ({
    duration: enabled ? 1 : 0,
    repeat: enabled ? Infinity : 0,
    repeatType: 'loop' as const,
    delay: enabled ? delay * 0.2 : 0,
  });

  return (
    <div className={cn('flex items-center', sizeConfig[size].gap)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: enabled ? [0, -8, 0] : 0 }}
          transition={transition(i)}
          className={cn(
            'rounded-full border',
            sizeConfig[size].dot,
            colorConfig[color]
          )}
        />
      ))}
    </div>
  );
}

/**
 * Loader con efecto de pulso
 */
function PulseLoader({ 
  size = 'md', 
  color = 'primary' 
}: Pick<LoaderSpinnerProps, 'size' | 'color'>) {
  const { enabled } = useAnimation();
  
  const pulseSize = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className={cn(
          'rounded-full',
          pulseSize[size],
          colorConfig[color]
        )}
        animate={{
          scale: enabled ? [1, 1.2, 1] : 1,
          opacity: enabled ? [1, 0.5, 1] : 1,
        }}
        transition={{
          duration: enabled ? 1.5 : 0,
          repeat: enabled ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={cn(
          'absolute rounded-full border-2 border-emerald-600',
          pulseSize[size]
        )}
        animate={{
          scale: enabled ? [1, 1.5] : 1,
          opacity: enabled ? [0.8, 0] : 0,
        }}
        transition={{
          duration: enabled ? 1.5 : 0,
          repeat: enabled ? Infinity : 0,
          ease: 'easeOut',
        }}
      />
    </div>
  );
}

/**
 * Loader con spinner clásico mejorado
 */
function SpinnerLoader({ 
  size = 'md', 
  color = 'primary' 
}: Pick<LoaderSpinnerProps, 'size' | 'color'>) {
  const { enabled } = useAnimation();
  
  const spinnerSize = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const strokeColor = {
    primary: 'text-emerald-600',
    secondary: 'text-slate-700',
    white: 'text-white',
  };

  return (
    <motion.svg
      className={cn(spinnerSize[size], strokeColor[color])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      animate={{ rotate: enabled ? 360 : 0 }}
      transition={{
        duration: enabled ? 1 : 0,
        repeat: enabled ? Infinity : 0,
        ease: 'linear',
      }}
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </motion.svg>
  );
}

/**
 * Componente principal LoaderSpinner
 * 
 * @example
 * ```tsx
 * // Loader con puntos
 * <LoaderSpinner variant="dots" size="md" color="primary" />
 * 
 * // Loader con pulso y texto
 * <LoaderSpinner variant="pulse" label="Cargando productos..." />
 * 
 * // Spinner clásico
 * <LoaderSpinner variant="spinner" size="lg" />
 * ```
 */
export function LoaderSpinner({
  size = 'md',
  variant = 'dots',
  color = 'primary',
  label,
  className,
}: LoaderSpinnerProps) {
  const LoaderComponent = {
    dots: DotsLoader,
    pulse: PulseLoader,
    spinner: SpinnerLoader,
  }[variant];

  return (
    <div 
      className={cn('flex flex-col items-center justify-center gap-3', className)}
      role="status"
      aria-live="polite"
      aria-label={label || 'Cargando...'}
    >
      <LoaderComponent size={size} color={color} />
      {label && (
        <span className={cn('text-slate-600', sizeConfig[size].text)}>
          {label}
        </span>
      )}
      <span className="sr-only">{label || 'Cargando...'}</span>
    </div>
  );
}

/**
 * Loader de página completa
 */
export function FullPageLoader({ label = 'Cargando...' }: { label?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <LoaderSpinner variant="pulse" size="lg" label={label} />
    </div>
  );
}

/**
 * Loader inline para botones
 */
export function InlineLoader({ 
  className,
  color = 'white' 
}: { 
  className?: string;
  color?: 'primary' | 'secondary' | 'white';
}) {
  return (
    <LoaderSpinner 
      variant="spinner" 
      size="sm" 
      color={color}
      className={className} 
    />
  );
}

export default LoaderSpinner;
