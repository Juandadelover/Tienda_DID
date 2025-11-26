'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/lib/hooks/useAnimation';

interface SearchBarProps {
  onSearchChange: (search: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

/**
 * SearchBar con diseño moderno y profesional
 * Input con icono integrado, sombras sutiles y estados de focus mejorados
 */
export function SearchBar({
  onSearchChange,
  placeholder = 'Buscar productos...',
  debounceMs = 300,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { enabled, getTransition } = useAnimation();

  // Debounce search
  const debouncedSearch = useCallback(
    (value: string) => {
      const timer = setTimeout(() => {
        onSearchChange(value);
      }, debounceMs);

      return () => clearTimeout(timer);
    },
    [onSearchChange, debounceMs]
  );

  useEffect(() => {
    const cleanup = debouncedSearch(searchValue);
    return cleanup;
  }, [searchValue, debouncedSearch]);

  const handleClear = () => {
    setSearchValue('');
    onSearchChange('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
      role="search"
    >
      <div className="relative">
        {/* Search icon container */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
          <motion.svg
            className={cn(
              "w-5 h-5 transition-colors duration-200",
              isFocused ? "text-emerald-600" : "text-gray-400"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            animate={enabled && isFocused ? { scale: [1, 1.1, 1] } : undefined}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </motion.svg>
        </div>

        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'w-full h-14 pl-14 pr-14 rounded-2xl',
            'text-gray-900 placeholder:text-gray-400',
            'bg-white border-2 transition-all duration-200',
            'text-base font-normal',
            'shadow-sm hover:shadow-md',
            isFocused
              ? 'border-emerald-500 shadow-lg shadow-emerald-500/10 ring-4 ring-emerald-500/10'
              : 'border-gray-200 hover:border-gray-300',
            'focus:outline-none'
          )}
          aria-label="Buscar productos"
          aria-expanded={searchValue.length > 0}
        />

        {/* Clear button */}
        <AnimatePresence>
          {searchValue && (
            <motion.button
              type="button"
              onClick={handleClear}
              initial={enabled ? { opacity: 0, scale: 0.8 } : false}
              animate={{ opacity: 1, scale: 1 }}
              exit={enabled ? { opacity: 0, scale: 0.8 } : undefined}
              transition={getTransition('fast')}
              className={cn(
                'absolute inset-y-0 right-0 flex items-center justify-center',
                'w-14 h-14',
                'text-gray-400 hover:text-gray-600',
                'transition-colors duration-150',
                'rounded-r-2xl',
                'hover:bg-gray-50'
              )}
              aria-label="Limpiar búsqueda"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
