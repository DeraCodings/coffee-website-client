"use client";

// import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { functions } from "@/utils/appwrite";
import { generateTransactionReference } from "@/utils/functions";
import { FunctionCallResponse } from "@/utils/types";
import { useRouter } from "next/navigation";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
// import { json } from "stream/consumers";

function PaymentButton({loading}: {loading: boolean}) {
  // const { user } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = 0; // Free shipping
  const amount = subtotal + shipping;

  console.log(amount);

  const reference = generateTransactionReference();

  const componentProps = {
    reference,
    email: "chisco@gmail.com",
    amount: 10000 * 100,
    metadata: {
      custom_fields: [
        {
          display_name: "Dera",
          variable_name: "customer_phone",
          value: "+2349016554213",
        },
      ],
    },
    publicKey: "pk_test_53656b340888906f2258eca0c54ca0f80a2654e0",
    text: "Pay Now",
    onSuccess: async () => {
      const verifyFunctionCall: FunctionCallResponse =
        await functions.createExecution(
          process.env.APPWRITE_FUNCTION_ID as string,
          JSON.stringify({ reference }),
        );
      if (verifyFunctionCall.error) {
        toast.error("An error occurred. Please try again");
        router.push("/checkout");
      }
      toast.success("Payment successful");
      router.push("/successful-payment");
    },
    onClose: () =>
      toast.warning("Don't leave unless you won't drink a hot cup of coffee"),
  };

  return (
    <PaystackButton
      {...componentProps}
      className="inline-block w-full rounded-md bg-[#bf935f] px-4 py-3 font-semibold text-[#443227] transition-colors duration-200 hover:bg-[#443227] hover:text-white"
      disabled={loading}
    />
  );
}

export default PaymentButton;
