"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthFailurePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect back to sign-in page after a short delay
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In Failed</h1>
        <p className="text-gray-600 mb-4">
          There was an error signing you in. You&apos;ll be redirected to try again.
        </p>
        <button
          onClick={() => router.replace("/login")}
          className="bg-[#9d7546] hover:bg-[#bf935f] text-white px-4 py-2 rounded-md"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}