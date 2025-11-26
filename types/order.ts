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
  total: number;
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
  phoneNumber: string;
  message: string;
  url: string;
}
