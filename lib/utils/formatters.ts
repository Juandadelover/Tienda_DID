/**
 * Formatting Utilities
 * Currency, date, and time formatters for Colombian locale
 */

/**
 * Formats a number as Colombian Pesos (COP)
 * @param amount - Amount in pesos
 * @returns Formatted string: "$1.200" or "$0"
 */
export function formatCurrency(amount: number): string {
  if (!amount || amount === 0) return '$0';
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a date as "dd/mm/aaaa"
 * @param date - Date object or ISO string
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/**
 * Formats a time as "HH:MM AM/PM"
 * @param date - Date object or ISO string
 * @returns Formatted time string
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(d);
}

/**
 * Formats a date and time as "dd/mm/aaaa HH:MM AM/PM"
 * @param date - Date object or ISO string
 * @returns Formatted datetime string
 */
export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

/**
 * Formats a product unit type for display
 * @param unitType - 'unit' or 'weight'
 * @returns Display string
 */
export function formatUnitType(unitType: string): string {
  const units: Record<string, string> = {
    unit: 'Unidad',
    weight: 'Peso',
  };
  
  return units[unitType] || unitType;
}

/**
 * Truncates text to a maximum length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Formats a phone number for display (Colombian format)
 * @param phone - Phone number (e.g., "573235725922")
 * @returns Formatted phone: "+57 323 572 5922"
 */
export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Colombian format: +57 XXX XXX XXXX
  if (digits.startsWith('57') && digits.length === 12) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  
  // Fallback: just add +
  return `+${digits}`;
}

/**
 * Pluralizes a word based on count
 * @param count - Number of items
 * @param singular - Singular form
 * @param plural - Plural form (optional, adds 's' by default)
 * @returns Pluralized word
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular;
  return plural || `${singular}s`;
}
