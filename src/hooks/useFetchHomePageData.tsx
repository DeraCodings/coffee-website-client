"use client"

import { query } from "@/utils/data";
import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:1337";

interface HomePageData {
    Navigation: object[];
    layout: object[];
}

export function useFetchHomePageData() {
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHomePageData() {
        const data = JSON.stringify({ query });
        try {
        const res = await fetch(
          `${baseUrl}/graphql`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: data,
            "cache": "default"
          },
        );

        if (!res.ok) {
          throw new Error(
            "An error occurred while fetching data from the graphql endpoint",
          );
        }

        const result = await res.json();
        setHomePageData(result.data.homePage);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) setFetchError(error.message)
        setFetchError("An unknown error occurred")
      }
    };

    fetchHomePageData();
  }, []);

  return {
    success: homePageData ? true: false,
    navigation: homePageData?.Navigation[1],
    heroSection: homePageData?.layout[0],
    our_story: homePageData?.layout[1],
    featuredSection: homePageData?.layout[2],
    testimonialSection: homePageData?.layout[3],
    call_to_action: homePageData?.layout[4],
    footer: homePageData?.layout[5],
    fetchError: fetchError ? fetchError : null
  }
}
