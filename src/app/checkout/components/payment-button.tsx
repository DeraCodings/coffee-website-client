"use client";

import { useCart } from "@/context/cart-context";
import { UserFormData } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { fraunces } from "@/utils/font-config";
import { FormEvent } from "react";
// import PaystackPop from "@paystack/inline-js";

interface PaymentButtonProps {
  disabled: boolean;
  formValues?: UserFormData;
  onStart?: () => boolean; // should return true if validation passes
  onComplete?: (success: boolean) => void;
  onClick?: (e: FormEvent) => Promise<void>;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ disabled, onClick }) => {
  const { cartItems } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <button
      // className="w-full bg-amber-600 hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg text-lg font-semibold shadow-sm transition-all duration-200 hover:shadow-xl flex items-center justify-center gap-2"
      className={cn(
        "group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
        fraunces.className,
        disabled
          ? "cursor-not-allowed bg-[#c8aa8d] opacity-50"
          : "cursor-pointer bg-[#9d7546] hover:bg-[#bf935f] focus:ring-[#bf935f]",
      )}
      onClick={onClick}
      aria-disabled={disabled}
      disabled={disabled || total < 0}
      type="submit"
    >
      Complete Order - ₦{total.toFixed(2)}
    </button>
  );
};

export default PaymentButton;
