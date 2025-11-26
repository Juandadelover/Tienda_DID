'use client';

/**
 * WhatsAppButton Component
 * Button to send order via WhatsApp with business hours validation
 */

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useHorario } from '@/lib/hooks/useHorario';

interface WhatsAppButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function WhatsAppButton({ onClick, disabled = false, isLoading = false }: WhatsAppButtonProps) {
  const { isOpen } = useHorario();

  const isDisabled = disabled || !isOpen || isLoading;

  return (
    <div className="space-y-3">
      <Button
        onClick={onClick}
        disabled={isDisabled}
        className="w-full py-4 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <span className="text-xl">📱</span>
            <span>Enviar pedido por WhatsApp</span>
          </>
        )}
      </Button>

      {/* Business Hours Warning */}
      {!isOpen && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-800 text-center">
            🕙 La tienda está cerrada. Solo puedes hacer pedidos hasta las 10:00 PM
          </p>
        </div>
      )}

      {/* Info Text */}
      <p className="text-xs text-slate-500 text-center">
        Al hacer clic, se abrirá WhatsApp con tu pedido pre-cargado.
        <br />
        Solo debes confirmar y enviar el mensaje.
      </p>
    </div>
  );
}
