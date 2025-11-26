# WhatsApp Integration: Order Submission

**Purpose**: Generate formatted WhatsApp message and open WhatsApp to send order  
**Platform**: Client-side only (no API endpoint)  
**Integration Method**: WhatsApp URL Scheme

---

## Overview

El sistema genera un mensaje formateado con los detalles del pedido y abre WhatsApp Web/App con el mensaje pre-cargado. El cliente confirma y envía desde su WhatsApp. No se almacenan datos personales del cliente (RNF-08).

---

## Constants

```typescript
// lib/constants.ts
export const WHATSAPP_CONFIG = {
  phoneNumber: '573235725922', // Formato internacional sin + ni espacios
  storeAddress: 'Sector 1 Manzana D-1, Barrio Villa Consuelo, Bosconia - Cesar',
  storeName: 'Tienda DID',
} as const;
```

---

## Data Types

### Order Interface

```typescript
interface Order {
  customerName: string;
  customerPhone: string;
  deliveryType: 'pickup' | 'delivery';
  address?: string; // Required if deliveryType === 'delivery'
  notes?: string;
  items: OrderItem[];
  total: number;
}

interface OrderItem {
  productName: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
```

---

## Message Format

### Template (RF-11)

```
🛒 *NUEVO PEDIDO - TIENDA DID*

👤 *Cliente:* [Nombre]
📱 *Teléfono:* [Teléfono]

📦 *PRODUCTOS:*
• [Cantidad]x [Nombre Producto] ([Variante]) - $[Precio c/u]
  Subtotal: $[Subtotal]
• [Cantidad]x [Nombre Producto] - $[Precio c/u]
  Subtotal: $[Subtotal]

💰 *TOTAL: $[Total]*

🚚 *Entrega:* [Recoger en tienda / Domicilio]
📍 *Dirección:* [Dirección si es domicilio]

📝 *Notas:* [Notas adicionales si hay]

---
_Pedido realizado desde tiendadid.com_
```

---

## Implementation

### Message Generator Function

```typescript
// lib/utils/whatsapp.ts

import { WHATSAPP_CONFIG } from '@/lib/constants';

/**
 * Genera mensaje formateado para WhatsApp según RF-11
 */
export function generateWhatsAppMessage(order: Order): string {
  // Formatear items
  const itemsText = order.items
    .map((item) => {
      const variant = item.variantName ? ` (${item.variantName})` : '';
      const formattedPrice = formatCurrency(item.unitPrice);
      const formattedSubtotal = formatCurrency(item.subtotal);
      
      return `• ${item.quantity}x ${item.productName}${variant} - ${formattedPrice}\n  Subtotal: ${formattedSubtotal}`;
    })
    .join('\n');

  // Delivery info
  const deliveryText = order.deliveryType === 'pickup' 
    ? 'Recoger en tienda' 
    : 'Domicilio';
  
  const addressLine = order.deliveryType === 'delivery' && order.address
    ? `\n📍 *Dirección:* ${order.address}`
    : '';

  // Optional notes
  const notesLine = order.notes
    ? `\n\n📝 *Notas:* ${order.notes}`
    : '';

  // Build complete message
  const message = `
🛒 *NUEVO PEDIDO - ${WHATSAPP_CONFIG.storeName.toUpperCase()}*

👤 *Cliente:* ${order.customerName}
📱 *Teléfono:* ${order.customerPhone}

📦 *PRODUCTOS:*
${itemsText}

💰 *TOTAL: ${formatCurrency(order.total)}*

🚚 *Entrega:* ${deliveryText}${addressLine}${notesLine}

---
_Pedido realizado desde tiendadid.com_
  `.trim();

  return message;
}

/**
 * Formatea números como moneda colombiana
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
}
```

### WhatsApp URL Generator

```typescript
/**
 * Genera URL de WhatsApp con mensaje pre-cargado
 */
export function generateWhatsAppURL(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
}
```

### Open WhatsApp Function

```typescript
/**
 * Abre WhatsApp Web/App con mensaje pre-cargado
 * @param order - Datos completos del pedido
 */
export function sendOrderToWhatsApp(order: Order): void {
  const message = generateWhatsAppMessage(order);
  const url = generateWhatsAppURL(message);
  
  // Abrir en nueva ventana/tab
  window.open(url, '_blank');
}
```

---

## React Component Example

```typescript
// components/checkout/WhatsAppButton.tsx
'use client';

import { useState } from 'react';
import { sendOrderToWhatsApp } from '@/lib/utils/whatsapp';
import { Button } from '@/components/ui/Button';

interface WhatsAppButtonProps {
  order: Order;
  disabled?: boolean;
}

export function WhatsAppButton({ order, disabled }: WhatsAppButtonProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    try {
      setIsSending(true);
      sendOrderToWhatsApp(order);
      
      // Optional: Clear cart after sending
      // clearCart();
      
      // Optional: Show success message
      // toast.success('Pedido enviado a WhatsApp');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      // toast.error('Error al abrir WhatsApp');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Button
      onClick={handleSend}
      disabled={disabled || isSending}
      variant="primary"
      size="lg"
      className="w-full"
    >
      <WhatsAppIcon className="mr-2" />
      {isSending ? 'Abriendo WhatsApp...' : 'Enviar Pedido por WhatsApp'}
    </Button>
  );
}
```

---

## Validation Before Sending

```typescript
// Validar datos completos antes de permitir envío
function validateOrderForWhatsApp(order: Order): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validaciones obligatorias
  if (!order.customerName || order.customerName.trim().length < 2) {
    errors.push('El nombre es requerido (mínimo 2 caracteres)');
  }

  if (!order.customerPhone || !/^\d{10}$/.test(order.customerPhone)) {
    errors.push('El teléfono debe tener 10 dígitos');
  }

  if (order.deliveryType === 'delivery' && !order.address?.trim()) {
    errors.push('La dirección es requerida para domicilio');
  }

  if (!order.items || order.items.length === 0) {
    errors.push('El carrito está vacío');
  }

  if (order.total <= 0) {
    errors.push('El total debe ser mayor a cero');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

---

## Business Hours Check (RF-12)

```typescript
// Verificar horario antes de enviar
import { useIsStoreOpen } from '@/lib/hooks/useHorario';

function CheckoutPage() {
  const isStoreOpen = useIsStoreOpen();

  if (!isStoreOpen) {
    return (
      <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 p-4 rounded">
        <p className="font-semibold">🕙 Tienda cerrada</p>
        <p>Nuestro horario de atención es hasta las 10:00 PM.</p>
        <p>Puedes ver el catálogo, pero el envío de pedidos está deshabilitado.</p>
      </div>
    );
  }

  return (
    // ... formulario de checkout
    <WhatsAppButton order={order} disabled={!isStoreOpen} />
  );
}
```

---

## Example Complete Flow

```typescript
// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/lib/hooks/useCart';
import { WhatsAppButton } from '@/components/checkout/WhatsAppButton';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryType: 'pickup' as 'pickup' | 'delivery',
    address: '',
    notes: '',
  });

  const order: Order = {
    ...formData,
    items: cart.map(item => ({
      productName: item.name,
      variantName: item.variantName,
      quantity: item.quantity,
      unitPrice: item.price,
      subtotal: item.price * item.quantity,
    })),
    total,
  };

  const validation = validateOrderForWhatsApp(order);

  return (
    <div>
      <form>
        {/* Form fields */}
      </form>

      {/* Validation errors */}
      {!validation.isValid && (
        <div className="text-red-600">
          {validation.errors.map(err => <p key={err}>{err}</p>)}
        </div>
      )}

      {/* Order summary */}
      <OrderSummary order={order} />

      {/* WhatsApp button */}
      <WhatsAppButton 
        order={order} 
        disabled={!validation.isValid}
      />
    </div>
  );
}
```

---

## Testing Checklist

- [ ] Message format matches RF-11 exactly
- [ ] WhatsApp opens in new window/tab
- [ ] Works on WhatsApp Web (desktop)
- [ ] Works on WhatsApp Mobile App (iOS/Android)
- [ ] Phone number format is correct (international)
- [ ] Special characters are properly encoded
- [ ] Delivery vs Pickup shows correct text
- [ ] Address only shows for delivery orders
- [ ] Notes only show when provided
- [ ] Currency formatting is correct (COP)
- [ ] Store hours validation works
- [ ] Validation prevents incomplete orders

---

## Security & Privacy

1. **No Data Storage**: Datos del cliente NO se guardan en BD (RNF-08)
2. **Client-Side Only**: Todo se procesa en el navegador
3. **No API Calls**: No se envía data a servidor
4. **User Confirmation**: Cliente confirma en WhatsApp antes de enviar
5. **Cart Persistence**: Solo en localStorage del navegador

---

**Status**: ✅ WhatsApp integration contract complete
