import { useEffect, useState } from "react";

export function useFetchCatFacts() {
  const [catFact, setCatFacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCatFacts() {
      try {
        setLoading(true);
        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();
        setCatFacts(data.fact);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCatFacts();
  }, []);

  return {
    catFacts: catFact,
    loading,
  };
}
