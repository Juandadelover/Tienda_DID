/**
 * HorarioAlert Component
 * Alert banner shown when store is closed or near closing time
 */

'use client';

import React from 'react';
import { useHorario, getClosingTimeMessage, isNearClosing } from '@/lib/hooks/useHorario';

export function HorarioAlert() {
  const { isOpen, closingHour, minutesUntilClose } = useHorario();
  
  // Don't show alert if more than 30 minutes until close
  if (isOpen && !isNearClosing(minutesUntilClose, 30)) {
    return null;
  }
  
  // Store is closed
  if (!isOpen) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-3">
          <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-semibold">Tienda cerrada</p>
            <p className="text-sm">
              Nuestro horario de atención es hasta las {getClosingTimeMessage(closingHour)}. 
              Vuelve mañana para realizar tu pedido.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Near closing time (warning)
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-3">
        <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div>
          <p className="font-semibold">Cerramos pronto</p>
          <p className="text-sm">
            La tienda cierra a las {getClosingTimeMessage(closingHour)} ({minutesUntilClose} minutos restantes). 
            Completa tu pedido pronto.
          </p>
        </div>
      </div>
    </div>
  );
}
