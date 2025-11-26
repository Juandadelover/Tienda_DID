// Order & Customer Types

export interface Customer {
  name: string;
  phone: string;
  deliveryType: 'pickup' | 'delivery';
  address?: string;
  notes?: string;
}

export interface Order {
  customer: Customer;
  items: OrderItem[];
  deliveryType: 'pickup' | 'delivery';
  paymentMethod: 'cash' | 'transfer';
  notes?: string;
  total: number;
  storeWhatsAppNumber: string;
  createdAt: Date;
}

export interface OrderItem {
  productName: string;
  variantName?: string | null;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  deliveryType: 'pickup' | 'delivery';
  address?: string;
  notes?: string;
}

export interface WhatsAppMessage {
  text: string;
  phone: string;
}
