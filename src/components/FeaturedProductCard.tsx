"use client";

import { useCart } from "@/context/cart-context";
import { fraunces, lato } from "@/utils/font-config";
import { ProductShape } from "@/utils/types";
import Image from "next/image";

interface FeaturedProductCardProps {
  image: string;
  name: string;
  price: number;
  altText: string;
  product: ProductShape;
}

function FeaturedProductCard({
  image,
  name,
  price,
  altText,
  product,
}: FeaturedProductCardProps) {
  const { addToCart } = useCart();
  return (
    <div className="flex h-full w-[150px] flex-col justify-center gap-3 text-center shadow-lg">
      <div className="h-4/5 w-full md:h-4/5 md:w-full">
        <Image
          alt={altText}
          src={image}
          height={200}
          width={200}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className={`text-wrap font-semibold ${lato.className}`}>{name}</h3>
      <h3>{product?.category?.name === "Coffee beans" ? `₦${price}/kg` : `₦${price}`}</h3>
      <button
        onClick={() => addToCart(product)}
        className={`inline-block rounded-sm bg-[#bf935f] px-4 py-2 font-semibold transition-colors hover:bg-[#443227] hover:text-white md:px-7 md:py-3 ${fraunces.className} text-sm md:text-base`}
      >
        Add to cart
      </button>
    </div>
  );
}

export default FeaturedProductCard;
