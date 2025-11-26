/**
 * Button Component
 * Botón reutilizable con múltiples variantes y tamaños
 * Implementa mejores prácticas de UI/UX y accesibilidad WCAG AA
 * 
 * Propiedades:
 * - variant: Estilo del botón (primary, secondary, danger, ghost, outline)
 * - size: Tamaño (xs, sm, md, lg) - mínimo 44px de altura para móvil
 * - fullWidth: Ancho completo del contenedor
 * - loading: Mostrar estado de carga
 * - disabled: Deshabilitar interacción
 * - icon: Ícono opcional (componente React)
 * - iconPosition: Posición del ícono (left, right)
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}: ButtonProps) {
  // Estilos base - aplican a todos los botones
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg 
    transition-all duration-200 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
    active:scale-98 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
    whitespace-nowrap select-none
  `;

  // Estilos de variante - definen color y comportamiento
  const variantStyles = {
    primary: `
      bg-primary text-white hover:bg-primary-700 shadow-sm hover:shadow-md
      focus-visible:ring-primary focus-visible:ring-offset-white
      active:bg-primary-700
    `,
    secondary: `
      bg-secondary text-white hover:bg-secondary-800 shadow-sm hover:shadow-md
      focus-visible:ring-secondary focus-visible:ring-offset-white
      active:bg-secondary-900
    `,
    danger: `
      bg-status-error text-white hover:bg-red-600 shadow-sm hover:shadow-md
      focus-visible:ring-status-error focus-visible:ring-offset-white
      active:bg-red-700
    `,
    ghost: `
      bg-transparent text-primary hover:bg-primary/10 border border-transparent
      focus-visible:ring-primary
      active:bg-primary/20
    `,
    outline: `
      bg-white text-primary border-2 border-primary hover:bg-primary/5 shadow-xs
      focus-visible:ring-primary focus-visible:ring-offset-white
      active:bg-primary/10
    `,
  };

  // Estilos de tamaño - altura mínima 44px para móvil (WCAG)
  const sizeStyles = {
    xs: 'px-2 py-1 text-xs min-h-8',
    sm: 'px-3 py-2 text-sm min-h-[44px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[44px]',
  };

  // Ancho completo
  const widthStyles = fullWidth ? 'w-full' : '';

  // Combinar todas las clases
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`.replace(/\n/g, ' ').trim();

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {/* Spinner de carga o ícono izquierdo */}
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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
        </svg>
      ) : (
        iconPosition === 'left' && icon && (
          <span className="flex-shrink-0">{icon}</span>
        )
      )}

      {/* Contenido del botón */}
      <span className="flex-1">{children}</span>

      {/* Ícono derecho */}
      {!loading && iconPosition === 'right' && icon && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
}
