'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Cart, CartItem, AddToCartInput, UpdateCartItemInput, RemoveFromCartInput } from '@/types/cart';

const CART_STORAGE_KEY = 'tienda-did-cart';

interface UseCartReturn {
  cart: Cart;
  addItem: (item: AddToCartInput) => void;
  removeItem: (input: RemoveFromCartInput) => void;
  updateQuantity: (input: UpdateCartItemInput) => void;
  clearCart: () => void;
  isLoading: boolean;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        setCart(parsed);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isLoading]);

  // Calculate totals
  const calculateTotals = useCallback((items: CartItem[]): { total: number; itemCount: number } => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
  }, []);

  // Add item to cart
  const addItem = useCallback((input: AddToCartInput) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) =>
          item.productId === input.productId &&
          item.variantId === input.variantId
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + input.quantity,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          productId: input.productId,
          productName: input.productName,
          variantId: input.variantId,
          variantName: input.variantName,
          quantity: input.quantity,
          price: input.price,
          imageUrl: input.imageUrl,
          unitType: input.unitType,
        };
        newItems = [...prevCart.items, newItem];
      }

      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  }, [calculateTotals]);

  // Remove item from cart
  const removeItem = useCallback((input: RemoveFromCartInput) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter(
        (item) =>
          !(item.productId === input.productId && item.variantId === input.variantId)
      );

      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  }, [calculateTotals]);

  // Update item quantity
  const updateQuantity = useCallback((input: UpdateCartItemInput) => {
    setCart((prevCart) => {
      let newItems: CartItem[];

      if (input.quantity <= 0) {
        // Remove item if quantity is 0 or less
        newItems = prevCart.items.filter(
          (item) =>
            !(item.productId === input.productId && item.variantId === input.variantId)
        );
      } else {
        // Update quantity
        newItems = prevCart.items.map((item) => {
          if (item.productId === input.productId && item.variantId === input.variantId) {
            return { ...item, quantity: input.quantity };
          }
          return item;
        });
      }

      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  }, [calculateTotals]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
  }, []);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading,
  };
}
