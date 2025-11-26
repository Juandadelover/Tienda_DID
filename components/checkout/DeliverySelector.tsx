'use client';

/**
 * DeliverySelector Component
 * Radio buttons for selecting delivery type (Pickup vs Delivery)
 */

import React from 'react';

interface DeliverySelectorProps {
  value: 'pickup' | 'delivery';
  onChange: (value: 'pickup' | 'delivery') => void;
  disabled?: boolean;
}

export function DeliverySelector({ value, onChange, disabled = false }: DeliverySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Tipo de entrega *
      </label>

      <div className="space-y-2">
        {/* Pickup Option */}
        <label
          className={`
            flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all
            ${value === 'pickup' 
              ? 'border-emerald-500 bg-emerald-50' 
              : 'border-slate-200 hover:border-slate-300 bg-white'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            type="radio"
            name="deliveryType"
            value="pickup"
            checked={value === 'pickup'}
            onChange={(e) => onChange(e.target.value as 'pickup' | 'delivery')}
            disabled={disabled}
            className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏪</span>
              <span className="font-medium text-slate-900">Recoger en tienda</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Sector 1 Manzana D-1, Barrio Villa Consuelo, Bosconia - Cesar
            </p>
          </div>
        </label>

        {/* Delivery Option */}
        <label
          className={`
            flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all
            ${value === 'delivery' 
              ? 'border-emerald-500 bg-emerald-50' 
              : 'border-slate-200 hover:border-slate-300 bg-white'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            type="radio"
            name="deliveryType"
            value="delivery"
            checked={value === 'delivery'}
            onChange={(e) => onChange(e.target.value as 'pickup' | 'delivery')}
            disabled={disabled}
            className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚚</span>
              <span className="font-medium text-slate-900">Domicilio gratis</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Entrega gratuita en Bosconia
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
