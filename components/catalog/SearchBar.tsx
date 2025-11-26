'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/Input';

interface SearchBarProps {
  onSearchChange: (search: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({
  onSearchChange,
  placeholder = 'Buscar productos...',
  debounceMs = 300,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');

  // Debounce search with useCallback to memoize
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
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <Input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 min-h-[44px]"
        aria-label="Buscar productos"
      />

      {searchValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 min-w-[44px] min-h-[44px]"
          aria-label="Limpiar búsqueda"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
