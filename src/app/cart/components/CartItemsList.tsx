"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import RemoveFromCartButton from "./RemoveCartButton";
import UpdateQuantityButton from "./UpdateQuantityButton";
import { fraunces, lato } from "@/utils/font-config";

export default function CartItemList() {
  const { cartItems, isLoading } = useCart();

  console.log(cartItems);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="rounded-lg bg-white shadow-sm">
        <div className={`${lato.className} py-12 text-center text-[#443227]`}>
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="hidden gap-4 border-b p-4 text-sm font-medium text-[#443227]/70 md:grid md:grid-cols-[2fr,1fr,1fr,1fr,auto]">
        <div>PRODUCT</div>
        <div>PRICE</div>
        <div>QUANTITY</div>
        <div>TOTAL</div>
        <div></div>
      </div>

      <div className="divide-y">
        {cartItems.map((item, index: number) => {
          // console.log(item?.documentId, item?.name);
          return (
            <div
              key={item.documentId || `${item.name}-${index}`}
              className="grid items-center gap-4 p-4 md:grid-cols-[2fr,1fr,1fr,1fr,auto]"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={
                      item.images?.[0]?.url
                        ? `${item.images[0].url}`
                        : "/placeholder.svg"
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className={`${fraunces.className} font-medium text-[#443227]`}>{item.name}</h3>
                  <p className={`${lato.className} text-sm text-[#443227]/70`}>
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="text-[#443227]">₦{item.price.toFixed(2)}</div>

              <div className="flex items-center gap-2">
                <UpdateQuantityButton item={item} increment={false} />
                <span className="w-8 text-center text-[#443227]">
                  {item.quantity}
                </span>
                <UpdateQuantityButton item={item} increment={true} />
              </div>

              <div className="font-medium text-[#443227]">
                ₦{(item.price * item.quantity).toFixed(2)}
              </div>

              <RemoveFromCartButton item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
