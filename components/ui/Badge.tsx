/**
 * Badge Component
 * Indicadores de estado para productos (disponible, agotado, nuevo)
 * Implementa la paleta de colores de Tienda DID con accesibilidad WCAG AAA
 */

import React from 'react';

export type BadgeVariant = 
  | 'disponible' 
  | 'agotado' 
  | 'nuevo' 
  | 'default' 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ 
  variant = 'default', 
  size = 'md',
  children, 
  className = '' 
}: BadgeProps) {
  // Estilos base con mejor accesibilidad
  const baseStyles = 'inline-flex items-center font-medium rounded-full whitespace-nowrap';
  
  // Estilos de tamaño
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  // Estilos de variante usando paleta Tienda DID
  // Colores de fondo suave con textos suficientemente oscuros para contraste WCAG AAA
  const variantStyles: Record<BadgeVariant, string> = {
    // Semánticos de producto
    disponible: 'bg-primary-50 text-primary-700 border border-primary-200',
    agotado: 'bg-status-error/10 text-text-error border border-status-error/30',
    nuevo: 'bg-status-warning/20 text-text-warning border border-status-warning/50',
    
    // Estándar
    default: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
    success: 'bg-status-success/10 text-primary-700 border border-primary-200',
    error: 'bg-status-error/10 text-text-error border border-status-error/30',
    warning: 'bg-status-warning/20 text-text-warning border border-status-warning/50',
    info: 'bg-status-info/10 text-text-info border border-status-info/30',
  };
  
  // Combinar clases
  const badgeClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();
  
  return (
    <span className={badgeClasses} role="status">
      {children}
    </span>
  );
}

/**
 * Helper function to get badge variant from availability status
 */
export function getAvailabilityBadge(isAvailable: boolean, isNew: boolean = false): {
  variant: BadgeVariant;
  text: string;
} {
  if (!isAvailable) {
    return { variant: 'agotado', text: 'Agotado' };
  }
  
  if (isNew) {
    return { variant: 'nuevo', text: 'Nuevo' };
  }
  
  return { variant: 'disponible', text: 'Disponible' };
}
