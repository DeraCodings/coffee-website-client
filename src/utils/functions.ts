import { databases } from "./appwrite";
import { CartItem } from "./types";
import { ID, Models } from "appwrite";

const CART_LOCAL_STORAGE_KEY = "cartItems";

// Utility functions for local storage
const getLocalCart = () => {
  if (typeof window !== "undefined") {
    const cartData = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  }
  return [];
};

const setLocalCart = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }
};

const clearLocalCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
  }
};

async function mergeLocalCartWithDatabase(authenticatedUserId: Models.User<Models.Preferences>) {
  const localCart = getLocalCart();
  if (!localCart.length) return; // Nothing to merge

  // Iterate over each local cart item and add it to the database.
  for (const item of localCart) {
    // Optionally, you can check for duplicate items for the same product and update quantity.
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_CART_ITEMS_COLLECTION_ID as string,
      ID.unique(),
      {
        userId: authenticatedUserId?.$id,
        product: item,
        quantity: item.quantity,
        price: item?.price,
        productName: item?.productN,
      },
    );
  }
  // Clear the local storage cart once merged.
  clearLocalCart();
}

export {
  setLocalCart,
  getLocalCart,
  clearLocalCart,
  mergeLocalCartWithDatabase,
};
