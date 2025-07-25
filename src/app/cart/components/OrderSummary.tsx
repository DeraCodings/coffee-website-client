"use client";

import { useCart } from "@/context/cart-context";
import CheckoutButton from "./CheckOutButton";
import { fraunces, lato } from "@/utils/font-config";

export default function OrderSummary() {
  const { cartItems, isLoading } = useCart();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = subtotal; // Add tax, shipping, etc. if needed

  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h2 className={`${fraunces.className} mb-4 text-lg font-medium text-[#443227]`}>Order Summary</h2>

      <div className="space-y-4">
        <div className={`flex justify-between text-[#443227] ${lato.className}`}>
          <span>Subtotal</span>
          <span>₦{subtotal.toFixed(2)}</span>
        </div>

        <div className={`flex justify-between text-[#443227] ${lato.className}`}>
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="border-t pt-4">
          <div className={`flex justify-between text-lg font-medium text-[#443227] ${lato.className}`}>
            <span>Total</span>
            <span>₦{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4">
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
}
