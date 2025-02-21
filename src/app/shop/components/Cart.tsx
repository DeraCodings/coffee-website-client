"use client";

import { useCart } from "@/context/cart-context";
import { CartItem } from "@/utils/types";

export default function Cart() {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center text-[#443227]/70">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      <ul className="space-y-2">
        {cartItems.map((item: CartItem) => (
          <li
            key={item.name}
            className="flex items-center justify-between text-[#443227]"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-[#bf935f]/20 pt-4">
        <div className="flex items-center justify-between font-semibold text-[#443227]">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button className="mt-4 w-full rounded-md bg-[#bf935f] px-4 py-2 text-white transition-colors hover:bg-[#bf935f]/90">
        Checkout
      </button>
    </div>
  );
}
