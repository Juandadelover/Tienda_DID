/**
 * ResponsiveGrid Component
 * Reusable responsive grid utility with consistent breakpoint columns
 * 
 * Usage:
 * <ResponsiveGrid cols={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
 *   {items.map(item => <div key={item.id}>{item.name}</div>)}
 * </ResponsiveGrid>
 */

'use client';

import React from 'react';

export interface ResponsiveGridProps {
  /**
   * Breakpoint-aware column counts
   * xs: 320px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px
   * 
   * Recommended patterns:
   * - Products: { xs: 1, sm: 2, md: 3, lg: 4 }
   * - Cards: { xs: 1, sm: 2, md: 2, lg: 3 }
   * - Admin tables: { xs: 1, sm: 1, md: 2, lg: 3 }
   */
  cols: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveGrid({
  cols,
  gap = 'md',
  children,
  className = '',
}: ResponsiveGridProps) {
  // Default column values for each breakpoint
  const defaultCols = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    ...cols,
  };

  // Gap utilities mapping
  const gapClasses = {
    sm: 'gap-2 sm:gap-3 md:gap-4',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8',
  };

  // Column classes mapping (pre-defined for Tailwind JIT to detect)
  const colsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  // Build responsive grid classes using Tailwind's responsive prefixes
  const gridClasses = [
    'grid',
    // Base and responsive column classes
    colsMap[defaultCols.xs] || 'grid-cols-1',
    `sm:${colsMap[defaultCols.sm] || 'grid-cols-1'}`,
    `md:${colsMap[defaultCols.md] || 'grid-cols-2'}`,
    `lg:${colsMap[defaultCols.lg] || 'grid-cols-3'}`,
    `xl:${colsMap[defaultCols.xl] || 'grid-cols-4'}`,
    // Gap
    gapClasses[gap],
  ].join(' ');

  return (
    <div className={`${gridClasses} ${className}`}>
      {children}
    </div>
  );
}
