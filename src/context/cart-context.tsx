"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { ProductShape, CartItem } from "@/utils/types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductShape) => void;
  cartItemsCount: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  cartItemsCount: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: ProductShape) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.name === product.name);
      if (existingItemIndex > -1) {
        // If the item is already in the cart, increase its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // If it's a new item, add it to the cart with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);