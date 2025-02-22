"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { ProductShape, CartItem } from "@/utils/types";
import { useAuth } from "./auth-context";
import { databases } from "@/utils/appwrite";
import { ID } from "appwrite";
import { clearLocalCart, getLocalCart, setLocalCart } from "@/utils/functions";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductShape) => Promise<void>;
  cartItemsCount: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: async () => {},
  cartItemsCount: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // When the user logs in (authenticated user has an email), merge local storage cart items
  useEffect(() => {
    async function mergeCart() {
      if (user && user.email) {
        const localCart = getLocalCart();
        if (localCart.length > 0) {
          for (const item of localCart) {
            try {
              await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
                process.env
                  .NEXT_PUBLIC_APPWRITE_CART_ITEMS_COLLECTION_ID as string,
                ID.unique(),
                {
                  userId: user.$id,
                  product: item,
                  quantity: item.quantity,
                  price: item?.price,
                  productName: item?.productN,
                },
              );
            } catch (error) {
              console.error("Error merging cart item", error);
            }
          }
          clearLocalCart();
        }
      }
    }
    mergeCart();
  }, [user]);

  // addToCart function
  const addToCart = async (product: ProductShape) => {
    const isAuthenticated = user && user.email;
    if (isAuthenticated) {
      try {
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DB_ID as string,
          process.env.NEXT_PUBLIC_APPWRITE_CART_COLLECTION_ID as string,
          ID.unique(),
          {
            userId: user.$id,
            productId: product?.documentId,
            productName: product?.name,
            price: product?.price,
            productDescription: product?.description,
            quantity: 1,
            createdAt: new Date().toISOString(),
          },
        );
        // Update local state as well
        setCartItems(prev => {
          const existingIndex = prev.findIndex(
            item => item.name === product.name,
          );
          if (existingIndex > -1) {
            const updated = [...prev];
            updated[existingIndex].quantity += 1;
            return updated;
          }
          return [...prev, { ...product, quantity: 1 }];
        });
      } catch (error) {
        console.error("Error adding product to cart in database", error);
      }
    } else {
      // For anonymous users, update local state and local storage
      setCartItems(prev => {
        const existingIndex = prev.findIndex(
          item => item.name === product.name,
        );
        let newCart;
        if (existingIndex > -1) {
          newCart = [...prev];
          newCart[existingIndex].quantity += 1;
        } else {
          newCart = [...prev, { ...product, quantity: 1 }];
        }
        setLocalCart(newCart);
        return newCart;
      });
    }
  };

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
