"use client";

import { X } from "lucide-react";
import { useTransition } from "react";
import { useCart } from "@/context/cart-context";
import type { CartItem } from "@/utils/types";

export default function RemoveFromCartButton({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition();
  const { removeFromCart } = useCart();

  return (
    <button
      className="rounded p-1 hover:bg-[#bf935f]/10 disabled:opacity-50"
      disabled={isPending}
      onClick={() => startTransition(() => removeFromCart(item.documentId))}
    >
      <X className="h-4 w-4 text-[#443227]" />
    </button>
  );
}
