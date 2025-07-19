"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  onChange?: (value: number) => void;
}


export default function QuantitySelector({ onChange }: QuantitySelectorProps) {
  // State to manage the quantity
  const [quantity, setQuantity] = useState(1);
  const update = (value: number) => {
    setQuantity(value);
    onChange?.(value);
  };
  return (
    <div className="flex items-center rounded-md border">
      <button
        disabled={quantity <= 1}
        onClick={() => update(quantity - 1)}
        className="p-2 hover:bg-gray-100"
      >
        <Minus />
      </button>
      <span className="px-4">{quantity}</span>
      <button onClick={() => update(quantity + 1)} className="p-2 hover:bg-gray-100">
        <Plus />
      </button>
    </div>
  );
}
