/**
 * Card Component
 * Container component with border, shadow, and padding
 */

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  // Base styles - Enhanced with hover animation
  const baseStyles = 'bg-white rounded-lg transition-all duration-150 ease-out hover:shadow-lg';
  
  // Variant styles
  const variantStyles = {
    default: 'shadow-sm border border-gray-200 hover:border-gray-300',
    elevated: 'shadow-md hover:shadow-xl hover:scale-[1.02]',
    bordered: 'border-2 border-gray-300 hover:border-gray-400',
  };
  
  // Padding styles - Responsive
  const paddingStyles = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5 md:p-6',
    lg: 'p-5 sm:p-6 md:p-8',
  };
  
  // Combine classes
  const cardClasses = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

/**
 * CardHeader - Optional header section
 */
export function CardHeader({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardTitle - Heading for card header
 */
export function CardTitle({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={`text-lg font-semibold text-text-primary ${className}`}>
      {children}
    </h3>
  );
}

/**
 * CardContent - Main content area
 */
export function CardContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

/**
 * CardFooter - Optional footer section
 */
export function CardFooter({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
