import { baseURL } from "@/functions/fetchHomePage";
import { productByNameQuery } from "@/utils/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getProductByName(name: string) {
  const variables = {
    filters: {
      name: {
        eq: name,
      },
    },
  };

  const res = await fetch(`${baseURL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: productByNameQuery, variables }),
    cache: "default",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const response = await res.json();
  return response.data.products[0];
}
