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
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-900">
        Tipo de entrega *
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pickup Option */}
        <label
          className={`
            relative flex flex-col p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200
            ${value === 'pickup'
              ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
              : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-3xl">🏪</span>
            <input
              type="radio"
              name="deliveryType"
              value="pickup"
              checked={value === 'pickup'}
              onChange={(e) => onChange(e.target.value as 'pickup' | 'delivery')}
              disabled={disabled}
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
          </div>
          <div>
            <span className="font-bold text-slate-900 block mb-1">Recoger en tienda</span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sector 1 Manzana D-1, Barrio Villa Consuelo, Bosconia - Cesar
            </p>
          </div>
        </label>

        {/* Delivery Option */}
        <label
          className={`
            relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
            ${value === 'delivery'
              ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
              : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-2xl">🚚</span>
            <input
              type="radio"
              name="deliveryType"
              value="delivery"
              checked={value === 'delivery'}
              onChange={(e) => onChange(e.target.value as 'pickup' | 'delivery')}
              disabled={disabled}
              className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
          </div>
          <div>
            <span className="font-bold text-slate-900 block mb-1">Domicilio gratis</span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Entrega gratuita en todo el casco urbano de Bosconia
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
