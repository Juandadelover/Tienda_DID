/**
 * Badge Component
 * Status indicators for products (disponible, agotado, nuevo)
 */

import React from 'react';

export type BadgeVariant = 'disponible' | 'agotado' | 'nuevo' | 'default' | 'success' | 'error' | 'warning' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  // Base styles - Responsive sizing with touch-friendly padding
  const baseStyles = 'inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150';
  
  // Variant styles - Enhanced contrast for WCAG AA compliance
  const variantStyles: Record<BadgeVariant, string> = {
    disponible: 'bg-[#065f46] text-white',
    agotado: 'bg-red-100 text-red-800',
    nuevo: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-[#065f46] text-white',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-[#a16207] text-white',
    info: 'bg-blue-100 text-blue-800',
  };
  
  // Combine classes
  const badgeClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  return (
    <span className={badgeClasses}>
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
