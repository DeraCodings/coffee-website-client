"use client";

import React, { FormEvent, useState } from "react";
import { z } from "zod";
import PaymentButton from "../components/payment-button";
// import PaystackPop from "@paystack/inline-js";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { toast } from "react-toastify";
import { fraunces, lato } from "@/utils/font-config";
// import Image from "next/image";

const userFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  orderNotes: z.string().optional(),
  newsletter: z.boolean().optional(),
});

type FormData = z.infer<typeof userFormSchema>;

const PaymentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    shippingAddress: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zipCode: "",
    orderNotes: "",
    newsletter: false,
  });

  console.log("Current form data: ", formData);

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 3.99;
  const tax = 8.09;
  const total = subtotal + shipping + tax;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});

    const validation = userFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      validation.error.errors.forEach(error => {
        const field = error.path[0] as keyof FormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      setIsProcessing(false);
      return;
    }

    console.log("Payment initiated...");
    try {
      if (typeof window === "undefined") {
        throw new Error("This function must run in the browser.");
      }
      const itemMap = new Map<string, { price: number; count: number }>();

      cartItems.forEach(item => {
        if (!item?.documentId) return;
        const existing = itemMap.get(item.documentId);

        if (existing) {
          itemMap.set(item.documentId, {
            price: existing.price,
            count: existing.count + 1,
          });
        } else {
          itemMap.set(item.documentId, {
            price: item.price,
            count: 1,
          });
        }
      });
      const items = Array.from(itemMap.entries()).map(
        ([product_id, { price, count }]) => ({
          product_id,
          quantity: count,
          price: Math.round(price * 100), // Include price in cents
        }),
      );
      const itemsString = JSON.stringify(items);
      console.log("Stringified items:", itemsString, typeof itemsString);
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const popup = new PaystackPop();
      const response = await fetch("/api/initialize-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          amount: Math.round(total * 100), // Convert to kobo/cents
          shipping_address: formData.shippingAddress,
          user_id: user?.$id,
          // items,
        }),
      });

      const data = await response.json();
      console.log("Payment response:", data);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`API Error: ${response.status}`);
      }

      if (data.status) {
        popup.resumeTransaction(data.data.access_code);
        await clearCart();

        setFormData({
          email: "",
          phone: "",
          shippingAddress: "",
          firstName: "",
          lastName: "",
          city: "",
          state: "",
          zipCode: "",
          orderNotes: "",
          newsletter: false,
        });
      } else {
        throw new Error(data.message || "Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-10 px-4 py-12 lg:px-8 lg:py-16">
      {/* Header */}
      <p className="text-lg text-gray-600">Complete your order below</p>

      <form onSubmit={handlePayment}>
        <div className="">
          {/* Left Column - Forms */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact Information */}
            <div className="rounded-lg border-0 bg-white p-6">
              <div className="mb-6">
                <h3
                  className={`mb-2 flex items-center gap-2 text-xl font-semibold text-gray-900 ${fraunces.className}`}
                >
                  <svg
                    className="h-5 w-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact information
                </h3>
                <p className={`text-sm text-gray-600 ${lato.className}`}>
                  We&apos;ll use this to send you order updates.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium text-gray-700 ${fraunces.className}`}
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <div
                      className={`flex items-center gap-1 text-sm text-red-600 ${lato.className}`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className={`block text-sm font-medium text-gray-700 ${fraunces.className}`}
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (363) 123.4567"
                    className={`w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <div
                      className={`flex items-center gap-1 text-sm text-red-600 ${lato.className}`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-amber-600 focus:ring-2 focus:ring-amber-500"
                  />
                  <label
                    htmlFor="newsletter"
                    className={`text-sm text-gray-700 ${lato.className}`}
                  >
                    Subscribe to our newsletter for coffee tips and exclusive
                    offers
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="rounded-lg border-0 bg-white p-6">
              <div className="mb-6">
                <h3
                  className={`mb-2 flex items-center gap-2 text-xl font-semibold text-gray-900 ${fraunces.className}`}
                >
                  <svg
                    className="h-5 w-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Shipping Information
                </h3>
                <p className={`text-sm text-gray-600 ${lato.className}`}>
                  Where should we deliver your coffee?
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className={`block text-sm font-medium text-gray-700 ${fraunces.className}`}
                    >
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={`w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <div
                        className={`flex items-center gap-1 text-sm text-red-600 ${lato.className}`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className={`block text-sm font-medium text-gray-700 ${fraunces.className}`}
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="shippingAddress"
                    className={`block text-sm font-medium text-gray-700 ${fraunces.className}`}
                  >
                    Street Address *
                  </label>
                  <input
                    id="shippingAddress"
                    name="shippingAddress"
                    type="text"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    placeholder="133 Main Street, Apt 4B"
                    className={`w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.shippingAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.shippingAddress && (
                    <div
                      className={`flex items-center gap-1 text-sm text-red-600 ${lato.className}`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      {errors.shippingAddress}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="city"
                      className={`block text-sm font-medium text-gray-700 ${fraunces.className}`}
                    >
                      City *
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className={`w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <div
                        className={`flex items-center gap-1 text-sm text-red-600 ${lato.className}`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        {errors.city}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="state"
                      className={`block text-sm font-medium text-gray-700 ${fraunces.className}`}
                    >
                      State *
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full rounded-md border bg-white px-3 py-2 shadow-sm transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      } ${lato.className}`}
                    >
                      <option value="">Select state</option>
                      <option value="ny">New York</option>
                      <option value="ca">California</option>
                      <option value="tx">Texas</option>
                      <option value="fl">Florida</option>
                    </select>
                    {errors.state && (
                      <div
                        className={`flex items-center gap-1 text-sm text-red-600 ${lato.className}`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        {errors.state}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="zipCode"
                    className={`block text-sm font-medium text-gray-700 ${fraunces.className}`}
                  >
                    ZIP Code *
                  </label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className={`w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.zipCode ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.zipCode && (
                    <div
                      className={`flex items-center gap-1 text-sm text-red-600 ${lato.className}`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      {errors.zipCode}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="orderNotes"
                    className={`block text-sm font-medium text-gray-700 ${fraunces.className}`}
                  >
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="orderNotes"
                    name="orderNotes"
                    rows={4}
                    value={formData.orderNotes}
                    onChange={handleChange}
                    placeholder="Any special instructions for your order..."
                    className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 shadow-sm transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Complete Order Button */}
            <PaymentButton onClick={handlePayment} disabled={isProcessing} />

            {/* Secure Footer */}
            <div
              className={`flex items-center justify-center gap-2 rounded-lg bg-white p-4 text-sm text-gray-600 shadow-sm ${lato.className}`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure checkout powered by Paystack
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
