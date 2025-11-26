/**
 * Card Component
 * Contenedor reutilizable con borde, sombra y espaciado
 * Implementa mejores prácticas de UI/UX con jerarquía visual clara
 */

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  children,
  ...props
}: CardProps) {
  // Estilos base
  const baseStyles = 'bg-background-card rounded-lg transition-all duration-200';
  
  // Estilos de variante con paleta Tienda DID
  const variantStyles = {
    default: 'border border-secondary-200 shadow-sm',
    elevated: 'border border-secondary-200 shadow-lg',
    bordered: 'border-2 border-secondary-300 shadow-none',
    interactive: 'border border-secondary-200 shadow-sm hover:shadow-md hover:border-primary',
  };
  
  // Estilos de espaciado interior
  const paddingStyles = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };
  
  // Efecto hover adicional
  const hoverStyles = hover && variant !== 'interactive' 
    ? 'hover:shadow-md hover:border-secondary-300 cursor-pointer' 
    : '';
  
  // Combinar clases
  const cardClasses = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`.trim();
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

/**
 * CardHeader - Sección de encabezado opcional
 */
export function CardHeader({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`pb-4 border-b border-secondary-200 ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardTitle - Encabezado de card
 */
export function CardTitle({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={`text-lg font-semibold text-text-primary ${className}`}>
      {children}
    </h3>
  );
}

/**
 * CardDescription - Descripción o subtítulo
 */
export function CardDescription({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={`text-sm text-text-secondary ${className}`}>
      {children}
    </p>
  );
}

/**
 * CardContent - Área de contenido principal
 */
export function CardContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`py-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardFooter - Sección de pie de página
 */
export function CardFooter({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`pt-4 border-t border-secondary-200 ${className}`}>
      {children}
    </div>
  );
}
