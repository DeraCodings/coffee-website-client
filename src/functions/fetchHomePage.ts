import { productsQuery } from "@/utils/data";
import { ProductShape } from "@/utils/types";


export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:1337";

console.log(baseURL, "Base URL for GraphQL API"); // Debugging line to check baseURL

export async function fetchData(query: string) {
  const data = JSON.stringify({ query });

  const res = await fetch(`${baseURL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
    cache: "default",
  });

  if (!res.ok) throw new Error("Failed to fetch home page data");

  const result = await res.json();
  console.log("GraphQL response: ", result?.data);
  return result.data;
}

// export async function fetchCategories() {
//   const data = JSON.stringify({ query: categoryQuery });

//   const res = await fetch(`${baseURL}/graphql`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: data,
//     cache: "default",
//   });

//   if (!res.ok) throw new Error("Failed to fetch categories");

//   const result = await res.json();
//   return result.data?.categories;
// }

export async function fetchProducts(limit: number | null = null) {
  const variables = {
    pagination: {
      limit,
    },
  };
  const data = JSON.stringify({ query: productsQuery, variables });

  const res = await fetch(`${baseURL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
    cache: "default",
    next: {
      revalidate: 60,
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("GraphQL error: ", errorText)
    throw new Error(errorText);
  } 

  const result = await res.json();
  return result?.data;
}

export async function fetchAboutPageData(query: string) {
  const data = JSON.stringify({ query });

  const res = await fetch(`${baseURL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
    cache: "default",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("GraphQL error: ", errorText);
    throw new Error(errorText);
  };

  const result = await res.json();
  return result?.data;
}

export async function getProductByName(name:string) {
  const allProducts = await fetchProducts();
  const product = allProducts?.products?.find((product: ProductShape) => product?.name === name);
  return product;
}

export async function getRelatedProducts(categoryId:string, excludedId:string) {
  const allProducts = await fetchProducts();
  const relatedProducts = allProducts?.products?.filter((product: ProductShape) => product?.category?.documentId === categoryId && product?.documentId !== excludedId);
  return relatedProducts;
}