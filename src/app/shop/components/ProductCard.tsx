"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { ProductShape } from "@/utils/types";
import { toast } from "react-toastify";
import { fraunces, lato } from "@/utils/font-config";

export default function ProductCard({ product }: { product: ProductShape }) {
  const { addToCart } = useCart();

  // console.log(cartItems, cartItemsCount);
  const handleAddToCart = async () => {
    try {
      await addToCart(product);
      toast.success("Added item to cart");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't add item to cart");
    }
  };

  return (
    <div className="group w-4/5 shadow-sm shadow-[#f7d9b6]">
      <div className="mb-4 aspect-square w-full overflow-hidden rounded-md bg-white">
        <Image
          src={`${product.images[0].url}` || "/placeholder.svg"}
          alt={product.images[0].alternativeText}
          width={500}
          height={500}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <div className="px-3 py-6 text-center">
        {/* <Link href={`/products/${product.name}`} className="hover:underline">
          <h3 className={`${fraunces.className} mb-1 text-lg font-semibold text-[#443227]`}>
            {product.name}
          </h3>
        </Link> */}
        <h3
          className={`${fraunces.className} mb-1 text-lg font-semibold text-[#443227]`}
        >
          {product.name}
        </h3>
        <p
          className={`${lato.className} mb-2 min-h-[40px] text-sm text-[#443227]/70`}
        >
          {product.description || "No description available"}
        </p>
        <div className="flex flex-col items-center gap-3">
          <span className={`${lato.className} font-medium text-[#bf935f]`}>
            ₦{product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className={`${fraunces.className} rounded-sm bg-[#bf935f] px-4 py-1 text-base font-semibold text-[#443227] transition-colors duration-300 hover:bg-[#443227] hover:text-white`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
