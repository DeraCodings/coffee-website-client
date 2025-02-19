"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface CartContextType {
  cartItems: object[];
  addToCart: (product: object) => void;
  cartItemsCount: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: ({}) => {},
  cartItemsCount: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<object[]>([]);

  const addToCart = (product: object) => {
    setCartItems(prevItems => [...prevItems, product]);
  };

  const cartItemsCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
