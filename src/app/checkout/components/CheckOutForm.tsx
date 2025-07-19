"use client";

import { ToastContainer } from "react-toastify";
// import { useRef, useActionState } from "react";
// import { checkoutAction } from "@/actions/checkout";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import PaymentForm from "./PaymentForm2";
// import { ToastContainer } from "react-toastify";

export default function CheckoutForm() {
  // const [state, formAction] = useActionState(checkoutAction, initialState);
  // const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <PaymentForm />
      </div>
      <div className="lg:col-span-1">
        <CheckoutOrderSummary />
      </div>
      <ToastContainer />
    </div>
  );
}