import { Metadata } from "next";
import { ogImageUrl, websiteUrl } from "@/utils/configurations";

import type { ProductShape, GraphQLResponse } from "@/utils/types";
import MenuContainer from "./components/MenuContainer";
import { baseURL } from "@/functions/fetchHomePage";
import { allProductsByCategoryQuery } from "@/utils/data";
import Toaster from "./components/Toaster";
import { playfairDisplay } from "@/utils/font-config";

export const metadata: Metadata = {
  title: "Our Coffee Menu | Terra & Brews",
  description: "Explore our premium selection of artisan coffee beans and expertly crafted coffee drinks. Single origin, blends, and seasonal specials.",
  openGraph: {
    title: "Our Coffee Menu | Terra & Brews",
    description: "Explore our premium selection of artisan coffee beans and expertly crafted coffee drinks.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Beans & Brews Coffee Menu",
      },
    ],
  },
  twitter: {
    title: "Our Coffee Menu | Terra & Brews",
    description: "Explore our premium selection of artisan coffee beans and expertly crafted coffee drinks.",
    images: [ogImageUrl],
  },
  alternates: {
    canonical: websiteUrl,
  },
};


async function getProducts(): Promise<ProductShape[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

  try {
    const result = await fetch(`${baseURL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: allProductsByCategoryQuery }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!result.ok) {
      const errorBody = await result.text();
      throw new Error(`HTTP ${result.status}: ${errorBody}`);
    }

    // const data: ProductsResponse = await result.json();
    const data: GraphQLResponse = await result.json();
    
    // Added validation for response structure
    if (!data?.data?.categories) {
      throw new Error("Invalid response structure");
    }

    return data.data.categories.flatMap((category) => category.products);
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Fetch failed:", {
      error: error instanceof Error ? error.message : String(error),
      type: error instanceof Error ? error.name : 'UnknownError',
      isAborted: error instanceof DOMException && error.name === 'AbortError'
    });
    return [];
  }
}


export default async function MenuPage() {
  // Get all products when the page loads
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-12">
      <h2
        className={`${playfairDisplay.className} mb-12 text-center text-4xl font-bold text-[#443227] md:text-5xl`}
      >
        Our Menu
      </h2>
      <Toaster />
      <MenuContainer initialProducts={products} />
    </main>
  );
}
