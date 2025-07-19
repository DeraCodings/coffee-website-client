"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useAuth } from "./auth-context";
import { databases } from "@/utils/appwrite";
import { ID, Query } from "appwrite";
import type { ProductShape, CartItem } from "@/utils/types";
import { toast } from "react-toastify";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductShape) => Promise<void>;
  removeFromCart: (documentId: string) => Promise<void>;
  updateQuantity: (documentId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartItemsCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  cartItemsCount: 0,
  isLoading: true,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const isAuthenticated =
    user && user?.email && !user?.labels?.includes("anonymous");

  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated) {
        try {
          // Transfer local cart to database
          const local = JSON.parse(
            localStorage.getItem("cartItems") || "[]",
          ) as CartItem[];

          if (local.length > 0) {
            await Promise.all(
              local.map(item =>
                databases.createDocument(
                  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
                  process.env
                    .NEXT_PUBLIC_APPWRITE_CART_ITEMS_COLLECTION_ID as string,
                  ID.unique(),
                  {
                    userId: user.$id,
                    productId: item?.documentId,
                    productName: item?.name,
                    productDescription: item?.description,
                    quantity: item.quantity,
                    price: item.price,
                    image_url: item.images[0].url || "",
                    category: item?.category || "",
                    // Add other product fields as needed
                    // images: item.images ? JSON.stringify(item.images) : "[]",
                    // category: item.category || "",
                    createdAt: new Date().toISOString(),
                  },
                ),
              ),
            );
            localStorage.removeItem("cartItems");
          }

          // Fetch cart items from database
          const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_CART_ITEMS_COLLECTION_ID as string,
            [
              Query.equal("userId", user.$id), // Only get current user's cart items
            ],
          );

          // ✅ FIX: Map the document fields correctly
          const mappedCartItems = response.documents.map(doc => {
            return {
              documentId: doc.$id,
              name: doc.productName || doc.name || "Unknown Product",
              price: doc.price || 0,
              description: doc.productDescription || doc.description || "",
              images: doc.images
                ? JSON.parse(doc.images)
                : doc.image_url
                  ? [{ url: doc.image_url }]
                  : [],
              category: doc.category || "",
              quantity: doc.quantity || 1,
              image_url:
                doc.image_url ||
                (doc.images && Array.isArray(doc.images) && doc.images[0]?.url
                  ? doc.images[0].url
                  : ""),
              // Add any other fields from your ProductShape type if needed
            };
          }) as CartItem[];

          setCartItems(mappedCartItems);
        } catch (error) {
          console.error("Error fetching cart items:", error);
          // Fallback to local storage if database fails
          const storedCart = localStorage.getItem("cart");
          if (storedCart) {
            setCartItems(JSON.parse(storedCart));
          }
        }
      } else {
        // Load cart items from local storage for non-authenticated users
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      }
      setIsLoading(false);
    };

    loadCart();
  }, [isAuthenticated, user?.$id]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = async (product: ProductShape) => {
    if (isAuthenticated) {
      try {
        const existingItem = cartItems.find(
          item => item.documentId === product.documentId,
        );

        if (existingItem) {
          await updateQuantity(
            existingItem.documentId,
            existingItem.quantity + 1,
          );
        } else {
          const newItem = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_CART_ITEMS_COLLECTION_ID as string,
            ID.unique(), // Always use unique ID for cart items
            {
              userId: user.$id,
              productId: product?.documentId,
              productName: product?.name,
              productDescription: product?.description,
              price: product?.price,
              image_url: product?.images[0]?.url || "",
              // images: product.images ? JSON.stringify(product.images) : "[]",
              // category: product.category || "",
              quantity: 1,
              createdAt: new Date().toISOString(),
            },
          );

          setCartItems(prev => [
            ...prev,
            {
              ...product,
              quantity: 1,
              documentId: newItem.$id,
            },
          ]);
        }
        toast.success("Item added to cart successfully!");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart. Please try again.");
      }
    } else {
      // Handle local storage for non-authenticated users
      setCartItems(prev => {
        const existingItem = prev.find(
          item => item.documentId === product.documentId,
        );
        if (existingItem) {
          return prev.map(item =>
            item.documentId === product.documentId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          return [
            ...prev,
            {
              ...product,
              quantity: 1,
              documentId: product.documentId || ID.unique(),
            },
          ];
        }
      });
      toast.success("Item added to cart!");
    }
  };

  const removeFromCart = async (documentId: string) => {
    if (isAuthenticated) {
      try {
        await databases.deleteDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
          process.env.NEXT_PUBLIC_APPWRITE_CART_ITEMS_COLLECTION_ID as string,
          documentId,
        );
        setCartItems(prev =>
          prev.filter(item => item.documentId !== documentId),
        );
        toast.success("Item removed from cart!");
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Failed to remove item from cart.");
      }
    } else {
      setCartItems(prev => prev.filter(item => item.documentId !== documentId));
      toast.success("Item removed from cart!");
    }
  };

  const updateQuantity = async (documentId: string, quantity: number) => {
    console.log(
      "Updating quantity for documentId:",
      documentId,
      "to",
      quantity,
    );

    if (isAuthenticated) {
      try {
        if (quantity > 0) {
          await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_CART_ITEMS_COLLECTION_ID as string,
            documentId,
            { quantity },
          );
          setCartItems(prev =>
            prev.map(item =>
              item.documentId === documentId ? { ...item, quantity } : item,
            ),
          );
        } else {
          await removeFromCart(documentId);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity.");
      }
    } else {
      setCartItems(prev => {
        if (quantity > 0) {
          return prev.map(item =>
            item.documentId === documentId ? { ...item, quantity } : item,
          );
        } else {
          return prev.filter(item => item.documentId !== documentId);
        }
      });
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        // Get all cart items for the current user
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
          process.env.NEXT_PUBLIC_APPWRITE_CART_ITEMS_COLLECTION_ID as string,
          [Query.equal("userId", user.$id)],
        );

        // Delete all cart items from database
        await Promise.all(
          response.documents.map(doc =>
            databases.deleteDocument(
              process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
              process.env
                .NEXT_PUBLIC_APPWRITE_CART_ITEMS_COLLECTION_ID as string,
              doc.$id,
            ),
          ),
        );

        // Clear local state
        setCartItems([]);
        toast.success("Cart cleared successfully!");
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart.");
      }
    } else {
      // Clear local storage for non-authenticated users
      setCartItems([]);
      localStorage.removeItem("cart");
      toast.success("Cart cleared!");
    }
  };

  const cartItemsCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemsCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
