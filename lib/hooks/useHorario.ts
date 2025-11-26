/**
 * Business Hours Hook
 * Checks if the store is currently open (closes at 22:00)
 */

'use client';

import { useState, useEffect } from 'react';
import { STORE_INFO } from '@/lib/constants';

interface HorarioState {
  isOpen: boolean;
  closingHour: number;
  currentHour: number;
  minutesUntilClose: number;
}

/**
 * Hook to check if the store is open and get closing time info
 * 
 * @returns HorarioState with store status and timing info
 * 
 * @example
 * ```tsx
 * const { isOpen, minutesUntilClose } = useHorario();
 * 
 * if (!isOpen) {
 *   return <HorarioAlert />;
 * }
 * ```
 */
export function useHorario(): HorarioState {
  const [state, setState] = useState<HorarioState>({
    isOpen: true,
    closingHour: STORE_INFO.closingHour,
    currentHour: new Date().getHours(),
    minutesUntilClose: 0,
  });
  
  useEffect(() => {
    const checkHorario = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const closingHour = STORE_INFO.closingHour;
      
      // Store is open if current hour < closing hour
      const isOpen = currentHour < closingHour;
      
      // Calculate minutes until close
      let minutesUntilClose = 0;
      if (isOpen) {
        minutesUntilClose = (closingHour - currentHour - 1) * 60 + (60 - currentMinute);
      }
      
      setState({
        isOpen,
        closingHour,
        currentHour,
        minutesUntilClose,
      });
    };
    
    // Check immediately
    checkHorario();
    
    // Re-check every minute
    const interval = setInterval(checkHorario, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return state;
}

/**
 * Gets a human-readable closing time message
 * 
 * @param closingHour - Closing hour in 24-hour format
 * @returns Formatted closing time (e.g., "10:00 PM")
 */
export function getClosingTimeMessage(closingHour: number): string {
  const hour12 = closingHour > 12 ? closingHour - 12 : closingHour;
  const period = closingHour >= 12 ? 'PM' : 'AM';
  return `${hour12}:00 ${period}`;
}

/**
 * Checks if we're within warning window (e.g., 30 minutes before close)
 * 
 * @param minutesUntilClose - Minutes until store closes
 * @param warningThreshold - Warning threshold in minutes (default: 30)
 * @returns true if within warning window
 */
export function isNearClosing(minutesUntilClose: number, warningThreshold: number = 30): boolean {
  return minutesUntilClose > 0 && minutesUntilClose <= warningThreshold;
}
