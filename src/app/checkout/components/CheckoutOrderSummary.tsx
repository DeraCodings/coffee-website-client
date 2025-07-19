"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { X } from "lucide-react";
import { baseURL } from "@/functions/fetchHomePage";

export default function CheckoutOrderSummary() {
  const { cartItems, removeFromCart } = useCart();

  console.log("Cart Items:", cartItems);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="space-y-6 rounded-lg bg-white p-6">
      <h2 className="text-xl font-semibold text-[#443227]">Order Summary</h2>

      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.documentId} className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={`${baseURL}${item.images[0]?.url}` || "/placeholder.svg"}
                alt={item.name}
                // fill
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-[#443227]">{item.name}</h3>
              <p className="text-sm text-[#443227]/70">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-[#443227]">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.documentId)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between text-[#443227]">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#443227]">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-semibold text-[#443227]">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
