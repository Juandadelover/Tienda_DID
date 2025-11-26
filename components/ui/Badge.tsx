/**
 * Badge Component
 * Status indicators for products (disponible, agotado, nuevo)
 */

import React from 'react';

export type BadgeVariant = 'disponible' | 'agotado' | 'nuevo' | 'default';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  // Variant styles
  const variantStyles: Record<BadgeVariant, string> = {
    disponible: 'bg-green-100 text-green-800',
    agotado: 'bg-red-100 text-red-800',
    nuevo: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
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
