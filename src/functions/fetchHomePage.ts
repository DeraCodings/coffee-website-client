import { productsQuery } from "@/utils/data";


export const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:1337";

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

export async function fetchProducts() {
  const variables = {
    pagination: {
      limit: 4,
    },
  };
  const data = JSON.stringify({ query: productsQuery, variables });

  const res = await fetch(`${baseURL}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
    cache: "default",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("GraphQL error: ", errorText)
    throw new Error(errorText);
  } 

  const result = await res.json();
  return result?.data;
}
