"use client";

import Image from "next/image";

interface FeaturedProductCardProps {
  image: string;
  name: string;
  price: number;
  altText: string;
  description: string | null;
}

function FeaturedProductCard({
  image,
  name,
  price,
  altText,
  description,
}: FeaturedProductCardProps) {
  return (
    <div className="flex flex-col w-[150px] h-full justify-center gap-3 text-center shadow-lg">
      <div className="h-4/5 w-full md:h-4/5 md:w-full">
        <Image
          alt={altText}
          src={image}
          height={200}
          width={200}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-wrap font-semibold">{name}</h3>
      <h3>{description ? `$${price}/12oz` : `$${price}`}</h3>
      <button
        onClick={() => console.log(name, price)}
        className="inline-block rounded-sm bg-[#bf935f] px-4 py-2 font-semibold transition-colors hover:bg-[#443227] hover:text-white md:px-7 md:py-3"
      >
        Add to cart
      </button>
    </div>
  );
}

export default FeaturedProductCard;
