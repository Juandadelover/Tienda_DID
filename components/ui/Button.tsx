/**
 * Button Component
 * Reusable button with multiple variants and sizes
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  // Base styles (always applied) - Enhanced with Motion Frame and hover animations
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 hover:scale-[1.02]';
  
  // Variant styles - Fixed color contrast for WCAG AA compliance
  const variantStyles = {
    primary: 'bg-[#047857] text-white hover:bg-[#065f46] hover:shadow-lg focus-visible:ring-[#047857]',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 hover:shadow-lg focus-visible:ring-secondary',
    danger: 'bg-[#dc2626] text-white hover:bg-[#b91c1c] hover:shadow-lg focus-visible:ring-[#dc2626]',
    ghost: 'bg-transparent text-[#047857] hover:bg-[#047857]/10 focus-visible:ring-[#047857]',
  };
  
  // Size styles - Responsive padding with 44px minimum touch target
  const sizeStyles = {
    sm: 'px-3 sm:px-4 py-2 text-sm sm:text-base min-h-[44px]',
    md: 'px-4 sm:px-5 py-3 text-base min-h-[44px]',
    lg: 'px-5 sm:px-6 py-3 sm:py-4 text-base sm:text-lg min-h-[44px]',
  };
  
  // Full width
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
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
      )}
      {children}
    </button>
  );
}
