"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  key: string;
  quantity: number;
  item: any;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any, key: string) => void;
  updateQuantity: (key: string, delta: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      let parsed = JSON.parse(storedCart);
      // Check if old format (array of items)
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title) {
        // Migrate old format: group by key and count
        const grouped = parsed.reduce((acc: any, item: any) => {
          const key = `${item.title}-${item.number - 1}`;
          if (!acc[key]) {
            acc[key] = { count: 0, item };
          }
          acc[key].count += 1;
          return acc;
        }, {});
        parsed = Object.entries(grouped).map(([key, { count, item }]: [string, any]) => ({
          key,
          quantity: count,
          item
        }));
      }
      setCart(parsed);
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: any, key: string) => {
    setCart(prev => {
      const existing = prev.find(c => c.key === key);
      if (existing) {
        return prev.map(c => c.key === key ? { ...c, quantity: c.quantity + 1 } : c);
      } else {
        return [...prev, { key, quantity: 1, item }];
      }
    });
  };

  const updateQuantity = (key: string, delta: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.key === key);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return prev.filter(c => c.key !== key);
        } else {
          return prev.map(c => c.key === key ? { ...c, quantity: newQuantity } : c);
        }
      }
      return prev;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}