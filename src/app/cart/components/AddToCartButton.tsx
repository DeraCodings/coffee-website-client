"use client";

import { Plus } from "lucide-react";
import { useTransition } from "react";
import { useCart } from "@/context/cart-context";
import type { ProductShape } from "@/utils/types";

export default function AddToCartButton({ item }: { item: ProductShape }) {
  const [isPending, startTransition] = useTransition();
  const { addToCart } = useCart();

  return (
    <button
      className="rounded p-1 hover:bg-[#bf935f]/10 disabled:opacity-50"
      disabled={isPending}
      onClick={() => startTransition(() => addToCart(item))}
    >
      <Plus className="h-4 w-4 text-[#443227]" />
    </button>
  );
}
