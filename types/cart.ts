// Cart Types

export interface CartItem {
  productId: string;
  productName: string;
  variantId?: string | null;
  variantName?: string | null;
  quantity: number;
  price: number;
  imageUrl?: string | null;
  unitType: 'unit' | 'weight';
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface AddToCartInput {
  productId: string;
  productName: string;
  variantId?: string | null;
  variantName?: string | null;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  unitType: 'unit' | 'weight';
}

export interface UpdateCartItemInput {
  productId: string;
  variantId?: string | null;
  quantity: number;
}

export interface RemoveFromCartInput {
  productId: string;
  variantId?: string | null;
}
