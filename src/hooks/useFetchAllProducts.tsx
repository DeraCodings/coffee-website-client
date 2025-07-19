import { BaseProductShape } from "@/app/products/page";
import { baseURL } from "@/functions/fetchHomePage";
import { allProductsQuery } from "@/utils/data";
import { useEffect, useState } from "react";

export const useFetchAllProducts = () => {
  const [products, setProducts] = useState<BaseProductShape[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: allProductsQuery }),
        });
        const data = await response.json();
        setProducts(data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
