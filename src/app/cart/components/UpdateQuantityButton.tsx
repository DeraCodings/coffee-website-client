"use client";

import { Plus, Minus } from "lucide-react";
import { useTransition } from "react";
import { useCart } from "@/context/cart-context";
import type { CartItem } from "@/utils/types";

interface UpdateQuantityButtonProps {
  item: CartItem;
  increment: boolean;
}

export default function UpdateQuantityButton({
  item,
  increment,
}: UpdateQuantityButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { updateQuantity } = useCart();

  const handleClick = () => {
    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    startTransition(() => updateQuantity(item.documentId, newQuantity));
  };

  return (
    <button
      className="rounded p-1 hover:bg-[#bf935f]/10 disabled:opacity-50"
      disabled={isPending}
      onClick={handleClick}
    >
      {increment ? (
        <Plus className="h-4 w-4 text-[#443227]" />
      ) : (
        <Minus className="h-4 w-4 text-[#443227]" />
      )}
    </button>
  );
}
