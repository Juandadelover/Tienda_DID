/**
 * Input Component
 * Campo de entrada de texto con soporte para label, estados de error y mensajes de ayuda
 * Implementa mejores prácticas de accesibilidad WCAG AA y UX
 * 
 * Características:
 * - Label accesible con asociación correcta
 * - Estados visuales claros (focus, error, disabled)
 * - Mensajes de error semánticos con role="alert"
 * - Altura mínima de 44px para móvil (WCAG)
 * - Contraste de colores WCAG AAA
 * - Soporte para helperText adicional
 */

'use client';

import React from 'react';
import { motion } from 'motion/react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    className = '', 
    id, 
    icon,
    iconPosition = 'left',
    ...props 
  }, ref) => {
    // Generar ID estable si no se proporciona
    const generatedId = React.useId();
    const inputId = id || generatedId;
    
    // Estilos base - aplican a todos los inputs
    const baseInputStyles = `
      w-full px-4 py-3 border rounded-lg text-base 
      transition-all duration-200 
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:bg-secondary-50 disabled:text-text-disabled disabled:cursor-not-allowed disabled:border-secondary-200
      placeholder:text-text-disabled
      min-h-[44px]
      appearance-none
    `;
    
    // Estilos según estado de error
    const errorInputStyles = error
      ? 'border-status-error bg-status-error/5 focus:border-status-error focus:ring-status-error'
      : 'border-secondary-200 focus:border-primary focus:ring-primary';
    
    // Estilos de ancho
    const widthStyles = fullWidth ? 'w-full' : '';
    
    // Combinar clases
    const inputClasses = `${baseInputStyles} ${errorInputStyles} ${widthStyles} ${className}`.replace(/\n/g, ' ').trim();
    
    const containerClasses = `${fullWidth ? 'w-full' : ''}`;
    
    return (
      <div className={containerClasses}>
        {/* Label accesible */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {label}
            {props.required && (
              <span className="text-status-error ml-1" aria-label="requerido">*</span>
            )}
          </label>
        )}
        
        {/* Contenedor del input con soporte para ícono */}
        <motion.div 
          className="relative"
          animate={error ? { x: [0, -5, 5, -5, 0] } : { x: 0 }}
          transition={error ? { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] } : { duration: 0 }}
        >
          {/* Input con animación de shake en caso de error */}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error 
                ? `${inputId}-error` 
                : helperText 
                  ? `${inputId}-helper` 
                  : undefined
            }
            {...props}
          />
          
          {/* Ícono */}
          {icon && (
            <span 
              className={`
                absolute top-1/2 -translate-y-1/2 
                text-text-secondary pointer-events-none
                ${iconPosition === 'left' ? 'left-3' : 'right-3'}
              `}
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
        </motion.div>
        
        {/* Mensaje de error */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-status-error font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {/* Mensaje de ayuda (solo si no hay error) */}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea Component
 * Área de texto multilínea con mismo estilo que Input
 * Optimizado para accesibilidad y UX
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, fullWidth = false, className = '', id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    
    // Estilos base para textarea
    const baseTextareaStyles = `
      w-full px-4 py-3 border rounded-lg text-base 
      transition-all duration-200 
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:bg-secondary-50 disabled:text-text-disabled disabled:cursor-not-allowed disabled:border-secondary-200
      placeholder:text-text-disabled
      min-h-[88px] resize-y
      appearance-none
    `;
    
    // Estilos según estado de error
    const errorTextareaStyles = error
      ? 'border-status-error bg-status-error/5 focus:border-status-error focus:ring-status-error'
      : 'border-secondary-200 focus:border-primary focus:ring-primary';
    
    // Estilos de ancho
    const widthStyles = fullWidth ? 'w-full' : '';
    
    // Combinar clases
    const textareaClasses = `${baseTextareaStyles} ${errorTextareaStyles} ${widthStyles} ${className}`.replace(/\n/g, ' ').trim();
    
    const containerClasses = `${fullWidth ? 'w-full' : ''}`;
    
    return (
      <div className={containerClasses}>
        {/* Label accesible */}
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {label}
            {props.required && (
              <span className="text-status-error ml-1" aria-label="requerido">*</span>
            )}
          </label>
        )}
        
        {/* Textarea */}
        <motion.div
          animate={error ? { x: [0, -5, 5, -5, 0] } : { x: 0 }}
          transition={error ? { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] } : { duration: 0 }}
        >
          <textarea
            ref={ref}
            id={textareaId}
            className={textareaClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error 
                ? `${textareaId}-error` 
                : helperText 
                  ? `${textareaId}-helper` 
                  : undefined
            }
            {...props}
          />
        </motion.div>
        
        {/* Mensaje de error */}
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-2 text-sm text-status-error font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {/* Mensaje de ayuda (solo si no hay error) */}
        {!error && helperText && (
          <p
            id={`${textareaId}-helper`}
            className="mt-2 text-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
