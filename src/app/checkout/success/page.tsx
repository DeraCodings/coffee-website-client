"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { toast } from "react-toastify";

export default function PaymentSuccessPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const orderId = searchParams.get("order_id");
  const reference = searchParams.get("reference");

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (!orderId || !reference) {
        toast.error("Invalid payment details");
        return;
      }

      try {
        // Verify payment
        const verificationResponse = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reference: reference,
            order_id: orderId,
          }),
        });

        const verificationData = await verificationResponse.json();

        if (verificationResponse.ok && verificationData.success) {
          // Clear cart after successful verification
          await clearCart();
          toast.success("Payment successful! Your order has been placed.");
        } else {
          toast.error("Payment verification failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Payment verification failed");
      } finally {
        setIsProcessing(false);
      }
    };

    handlePaymentSuccess();
  }, [orderId, reference, clearCart]);

  if (isProcessing) {
    return <div>Verifying payment...</div>;
  }

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your order has been placed successfully.</p>
      {/* Add your success page content here */}
    </div>
  );
}
