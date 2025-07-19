// components/ClientLayout.tsx
"use client";

import Header from "@/components/ResponsiveMenu";
import Footer from "@/components/homepage/Footer";
import React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
