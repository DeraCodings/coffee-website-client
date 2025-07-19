"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { fraunces } from "@/utils/font-config";

export default function CheckoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (user && user?.email) {
      // Redirect to checkout page for authenticated users
      router.push("/checkout");
    } else {
      // Redirect to login/registration page for anonymous users
      router.push("/login?redirect=checkout");
    }
  };

  return (
    <button
      className={`w-full rounded-md bg-[#bf935f] px-4 py-3 text-white transition-colors hover:bg-[#bf935f]/90 ${fraunces.className} disabled:opacity-50`}
      disabled={isPending}
      onClick={() => startTransition(handleCheckout)}
    >
      {isPending ? "Processing..." : "Checkout"}
    </button>
  );
}
