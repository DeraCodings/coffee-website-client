"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "./AddtoCart";
import { ProductShape } from "@/utils/types";

interface CartProductCardProps {
  product: ProductShape;
}

export default function CartProductCard({ product }: CartProductCardProps) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
          <Image
            src={`${product?.images[0]?.url}`}
            alt={`${product?.images[0]?.alternativeText}`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {product?.name}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-amber-900">
            ₦{product?.price}
          </span>
          {product?.price && (
            <span className="text-xl text-gray-500 line-through">
              ₦{product?.price}
            </span>
          )}
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            In Stock
          </Badge>
        </div>

        <p className="leading-relaxed text-gray-600">{product?.description}</p>

        {/* Add to Cart */}
        <div className="space-y-4">
          <div className="flex space-x-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
