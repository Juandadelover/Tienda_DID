/**
 * WhatsApp Utilities
 * Message generation and formatting for WhatsApp checkout (RF-11)
 */

import { formatCurrency, formatPhoneNumber } from './formatters';
import type { Order, WhatsAppMessage } from '@/types/order';

/**
 * Generates a WhatsApp order message following RF-11 format
 * 
 * @param order - Order object with customer, items, and delivery info
 * @returns WhatsAppMessage with formatted text and recipient number
 * 
 * @example
 * ```ts
 * const message = generateOrderMessage(order);
 * sendToWhatsApp(message);
 * ```
 */
export function generateOrderMessage(order: Order): WhatsAppMessage {
  const { customer, items, deliveryType, paymentMethod, notes, total } = order;
  
  // Build product list
  const productLines = items.map((item) => {
    const variantInfo = item.variantName ? ` - ${item.variantName}` : '';
    const price = formatCurrency(item.price);
    return `• ${item.quantity}x ${item.productName}${variantInfo} - ${price}`;
  });
  
  // Delivery type text
  const deliveryText = deliveryType === 'delivery' 
    ? `📍 *Dirección:* ${customer.address}`
    : '🏪 *Retiro en tienda*';
  
  // Payment method text
  const paymentText = paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia';
  
  // Notes (optional)
  const notesText = notes ? `\n📝 *Notas:* ${notes}` : '';
  
  // Build final message
  const message = `
🛒 *NUEVO PEDIDO - TIENDA DID*

👤 *Cliente:*
Nombre: ${customer.name}
Teléfono: ${formatPhoneNumber(customer.phone)}

📦 *Productos:*
${productLines.join('\n')}

💰 *Total:* ${formatCurrency(total)}

${deliveryText}

💳 *Método de pago:* ${paymentText}${notesText}

---
_Pedido generado desde tiendadid.com_
  `.trim();
  
  return {
    text: message,
    phone: order.storeWhatsAppNumber,
  };
}

/**
 * Generates WhatsApp URL for web browser redirect
 * 
 * @param message - WhatsApp message object
 * @returns WhatsApp web URL with pre-filled message
 * 
 * @example
 * ```ts
 * const url = getWhatsAppUrl(message);
 * window.open(url, '_blank');
 * ```
 */
export function getWhatsAppUrl(message: WhatsAppMessage): string {
  const encodedMessage = encodeURIComponent(message.text);
  return `https://wa.me/${message.phone}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp chat in new window/tab
 * 
 * @param message - WhatsApp message object
 * 
 * @example
 * ```ts
 * openWhatsApp(generateOrderMessage(order));
 * ```
 */
export function openWhatsApp(message: WhatsAppMessage): void {
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Validates WhatsApp phone number format
 * 
 * @param phone - Phone number to validate
 * @returns true if valid Colombian mobile number
 * 
 * @example
 * ```ts
 * isValidWhatsAppNumber('573235725922') // true
 * isValidWhatsAppNumber('12345') // false
 * ```
 */
export function isValidWhatsAppNumber(phone: string): boolean {
  // Colombian mobile numbers: 57 + 10 digits starting with 3
  const regex = /^57[3][0-9]{9}$/;
  return regex.test(phone);
}

/**
 * Generates a simple contact message (for general inquiries)
 * 
 * @param customerName - Customer name
 * @param message - Message text
 * @param storeNumber - Store WhatsApp number
 * @returns WhatsAppMessage object
 */
export function generateContactMessage(
  customerName: string,
  message: string,
  storeNumber: string
): WhatsAppMessage {
  const formattedMessage = `
Hola, soy *${customerName}*

${message}

---
_Mensaje desde tiendadid.com_
  `.trim();
  
  return {
    text: formattedMessage,
    phone: storeNumber,
  };
}
