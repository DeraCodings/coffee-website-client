// "use client";

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { account } from "@/utils/appwrite";

// export default function AuthCheck() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const checkUserAuthentication = async () => {
//       try {
//         const currentUser = await account.get();
//         console.log("Current user: ", currentUser);
//         if (currentUser && currentUser.email) {
//           const redirectPath = searchParams.get("redirect") || "/";
//           console.log("Redirecting to: ", redirectPath);
//           router.replace(redirectPath); // ✅ direct and safe
//         } else {
//           const redirectPath = searchParams.get("redirect") || "";
//           console.log("User not authenticated, redirecting to login");
//           router.push(`/login?redirect=${redirectPath}`);
//         }
//       } catch (error) {
//         console.error("Error checking auth status: ", error);
//         const redirectPath = searchParams.get("redirect") || "";
//         router.push(`/login?redirect=${redirectPath}`);
//       }
//     };

//     checkUserAuthentication();
//   }, [router, searchParams]);

//   return <div className="h-full md:h-screen flex items-center justify-center">Checking authentication...</div>;
// }

// app/auth-check/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { account } from "@/utils/appwrite";
import { useAuth } from "@/context/auth-context";

export default function AuthCheckPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Add small delay to ensure the router is ready
        await new Promise(resolve => setTimeout(resolve, 300));

        const user = await account.get();
        // Check if user is properly authenticated (not anonymous and has email)
        // const isAnonymous = user.labels?.includes('anonymous') || !user.email;

        if (user && user?.email) {
          // User is properly authenticated, redirect to intended page
          setUser(user);
          const redirectTo = decodeURIComponent(
            searchParams.get("redirect") || "/",
          );

          // Additional verification
          try {
            const sessions = await account.listSessions();
            if (sessions.sessions.length > 0) {
              console.log("✅ Valid session found, redirecting to", redirectTo);
              window.location.href = redirectTo; // Hard redirect
              return;
            }
          } catch (error) {
            console.error("Error verifying user:", error);
            // If verification fails, redirect to sign in
            const signInUrl = `/login?redirect=${encodeURIComponent(redirectTo)}`;
            console.log(
              "🐛 AUTH-CHECK - Verification failed, redirecting to sign in:",
              signInUrl,
            );
            router.replace(signInUrl);
            return;
          }

          console.log(
            "🐛 AUTH-CHECK - Redirecting authenticated user to:",
            redirectTo,
          );
          router.replace(redirectTo);
        } else {
          // User is anonymous or not authenticated, redirect to sign in
          const redirectTo = searchParams.get("redirect");
          const signInUrl = redirectTo
            ? `/login?redirect=${encodeURIComponent(redirectTo)}`
            : "/login";
          console.log("🐛 AUTH-CHECK - Redirecting to sign in:", signInUrl);
          router.replace(signInUrl);
        }
      } catch (error) {
        // User is not authenticated, redirect to sign in
        console.error("Authentication check failed:", error);
        setUser(null);
        const redirectTo = searchParams.get("redirect");
        const signInUrl = redirectTo
          ? `/login?redirect=${encodeURIComponent(redirectTo)}`
          : "/login";
        console.log(
          "🐛 AUTH-CHECK - Error, redirecting to sign in:",
          signInUrl,
        );
        router.replace(signInUrl);
      }
    };

    checkAuth();
  }, [router, searchParams, setUser]);

  // Show loading state while checking auth
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#9d7546]"></div>
        <p className="mt-4 text-gray-600">Checking authentication...</p>
      </div>
    </div>
  );
}
