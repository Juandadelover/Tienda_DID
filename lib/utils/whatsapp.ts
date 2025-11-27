/**
 * WhatsApp Utilities
 * Message generation and formatting for WhatsApp checkout (RF-11)
 */

import { formatCurrency } from './formatters';
import type { CartItem } from '@/types/cart';

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  phoneNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573235725922',
  storeName: process.env.NEXT_PUBLIC_STORE_NAME || 'Tienda DID',
  storeAddress: process.env.NEXT_PUBLIC_STORE_ADDRESS || 'Sector 1 Manzana D-1, Barrio Villa Consuelo, Bosconia - Cesar',
} as const;

export interface WhatsAppOrderData {
  customerName: string;
  customerPhone?: string;
  deliveryType: 'pickup' | 'delivery';
  address?: string;
  notes?: string;
  items: CartItem[];
  total: number;
}

/**
 * Generates a WhatsApp order message following RF-11 format specification
 * 
 * @param order - Order data with customer info, items, and delivery details
 * @returns Formatted message string ready for WhatsApp
 * 
 * @example
 * ```ts
 * const message = generateWhatsAppMessage({
 *   customerName: 'María González',
 *   customerPhone: '3001234567',
 *   deliveryType: 'delivery',
 *   address: 'Calle 10 # 15-20',
 *   items: cartItems,
 *   total: 25000
 * });
 * ```
 */
export function generateWhatsAppMessage(order: WhatsAppOrderData): string {
  // Format items
  const itemsText = order.items
    .map((item) => {
      const variant = item.variantName ? ` (${item.variantName})` : '';
      const formattedPrice = formatCurrency(item.price);
      const subtotal = item.price * item.quantity;
      const formattedSubtotal = formatCurrency(subtotal);
      
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

  // Build complete message per RF-11 format
  const phoneLine = order.customerPhone ? `
📱 *Teléfono:* ${order.customerPhone}` : '';
  
  const message = `
🛒 *NUEVO PEDIDO - ${WHATSAPP_CONFIG.storeName.toUpperCase()}*

👤 *Cliente:* ${order.customerName}${phoneLine}

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
 * Generates WhatsApp URL with pre-filled message
 * 
 * @param message - Message text to send
 * @returns WhatsApp web URL
 * 
 * @example
 * ```ts
 * const url = generateWhatsAppURL(message);
 * window.open(url, '_blank');
 * ```
 */
export function generateWhatsAppURL(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp with order message in new window/tab
 * 
 * @param order - Order data to send
 * 
 * @example
 * ```ts
 * sendOrderToWhatsApp({
 *   customerName: 'María',
 *   customerPhone: '3001234567',
 *   deliveryType: 'pickup',
 *   items: cartItems,
 *   total: 25000
 * });
 * ```
 */
export function sendOrderToWhatsApp(order: WhatsAppOrderData): void {
  const message = generateWhatsAppMessage(order);
  const url = generateWhatsAppURL(message);
  
  // Open in new window/tab
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Validates WhatsApp phone number format (Colombian mobile)
 * 
 * @param phone - Phone number to validate
 * @returns true if valid Colombian mobile number
 */
export function isValidWhatsAppNumber(phone: string): boolean {
  // Colombian mobile numbers: 10 digits starting with 3
  const regex = /^3[0-9]{9}$/;
  return regex.test(phone);
}

/**
 * Generates a simple contact message for general inquiries
 * 
 * @param customerName - Customer name
 * @param message - Message text
 * @returns Formatted message string
 */
export function generateContactMessage(
  customerName: string,
  message: string
): string {
  const formattedMessage = `
Hola, soy *${customerName}*

${message}

---
_Mensaje desde tiendadid.com_
  `.trim();
  
  return formattedMessage;
}

/**
 * Opens WhatsApp with a contact message
 * 
 * @param customerName - Customer name
 * @param message - Message text
 */
export function sendContactMessage(customerName: string, message: string): void {
  const formattedMessage = generateContactMessage(customerName, message);
  const url = generateWhatsAppURL(formattedMessage);
  window.open(url, '_blank', 'noopener,noreferrer');
}
