"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ProductShape } from "@/utils/types";

interface AddToCartButtonProps {
  product: ProductShape;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const addItemToCart = async () => {
    setLoading(true);
    await addToCart(product);
    setLoading(false);
  };

  return (
    <Button onClick={addItemToCart} disabled={loading} className="w-full bg-amber-600">
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
