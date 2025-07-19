"use client";

import { playfairDisplay } from "@/utils/font-config";
import CheckoutForm from "./components/CheckOutForm";
// import { useEffect } from "react";
// import { account } from "@/utils/appwrite";
// import { useRouter } from "next/navigation";


export default function CheckoutPage() {
  // const router = useRouter();
  // // Check if the user is authenticated
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       // Simulate an API call to check authentication
  //       const user = await account.get();
  //       if (!user || !user.email) {
  //         // If user is not authenticated, redirect to login
  //         console.log("User not authenticated, redirecting to login");
  //         // window.location.href = "/login?redirect=/checkout";
  //         router.push("/login?redirect=/checkout"); // Use router for client-side navigation
  //       } else {
  //         // User is authenticated, proceed with checkout
  //         console.log("User authenticated:", user);
  //       }
  //     } catch (error) {
  //       console.error("Authentication check failed:", error);
  //       router.push("/login?redirect=/checkout"); // Redirect to login if not authenticated
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1
        className={`${playfairDisplay.className} font-semibold mb-12 text-center text-4xl text-[#443227]`}
      >
        Checkout
      </h1>

      <CheckoutForm />
    </main>
  );
}
