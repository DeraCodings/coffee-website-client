import { Playfair_Display } from "next/font/google";
import type { ProductsResponse, ProductShape } from "@/utils/types";
import MenuContainer from "./components/MenuContainer";
import { baseURL } from "@/functions/fetchHomePage";
import { entireProductQuery } from "@/utils/data";
import Toaster from "./components/Toaster";

const playfair = Playfair_Display({ subsets: ["latin"] });

// This is a special Next.js function that runs on the server
async function getProducts(): Promise<ProductShape[]> {
  try {
    const result = await fetch(`${baseURL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: entireProductQuery }),
    });

    if (!result.ok) throw new Error("An error occurred while fetching data");

    const data: ProductsResponse = await result.json();
    return data?.data?.products || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Return an empty array if there's an error
  }
}

export default async function MenuPage() {
  // Get all products when the page loads
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1
        className={`${playfair.className} mb-12 text-center text-4xl text-[#443227] md:text-5xl`}
      >
        Our Menu
      </h1>
      <Toaster />
      <MenuContainer initialProducts={products} />
    </main>
  );
}
