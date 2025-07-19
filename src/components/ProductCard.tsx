import { BaseProductShape } from "@/app/products/page";
import { baseURL } from "@/functions/fetchHomePage";
import Image from "next/image";
import React from "react";

function ProductCard({product}: {product: BaseProductShape}) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={`${baseURL}${product.images[0]?.url}`}
          alt={product.images[0]?.alternativeText || product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.availability === "limited" && (
          <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs text-white">
            Limited
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-gray-900 transition-colors group-hover:text-amber-700">
          {product.name}
        </h3>
        <p className="mb-2 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-900">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
