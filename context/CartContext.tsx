'use client';

import React, { createContext, useContext } from 'react';
import { useCart } from '@/lib/hooks/useCart';
import type { Cart, AddToCartInput, UpdateCartItemInput, RemoveFromCartInput } from '@/types/cart';

interface CartContextValue {
  cart: Cart;
  addItem: (item: AddToCartInput) => void;
  removeItem: (input: RemoveFromCartInput) => void;
  updateQuantity: (input: UpdateCartItemInput) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
