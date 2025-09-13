"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
// import { FaGoogle } from "react-icons/fa6";
import { z } from "zod";
import { account } from "@/utils/appwrite";
import { cn } from "@/lib/utils";
import { fraunces, lato, playfairDisplay } from "@/utils/font-config";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    // Redirect to checkout if user is already signed in
    const checkAuth = async () => {
      try {
        const currentUser = await account.get();
        if (
          currentUser &&
          currentUser.email &&
          !currentUser.labels?.includes("anonymous")
        ) {
          const redirectTo = searchParams.get("redirect") || "/";
          router.replace(redirectTo);
        }
        setUser(currentUser);
      } catch (error) {
        // User not authenticated, stay on sign-in page
        console.log("Not authenticated:", error);
        setUser(null);
      }
    };
    checkAuth();
  }, [router, setUser, searchParams]);

  // async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const formData = new FormData(e.currentTarget);
  //   const rawFormData = {
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   };
  //   const validatedFields = userSchema.safeParse(rawFormData);
  //   if (!validatedFields.success) {
  //     const fieldErrors = validatedFields.error.flatten().fieldErrors;
  //     setErrors({
  //       email: fieldErrors.email ? fieldErrors.email[0] : "",
  //       password: fieldErrors.password ? fieldErrors.password[0] : "",
  //     });
  //     setIsLoading(false);
  //     return;
  //   }
  //   const { email, password } = validatedFields.data;
  //   // const prettifyError = z.
  //   try {
  //     await account.createEmailPasswordSession(email, password);
  //     const newUser = await account.get();
  //     console.log("User signed up:", newUser);
  //     setUser(newUser);
  //     // const redirectParam = new URLSearchParams(window.location.search).get(
  //     //   "redirect",
  //     // );
  //     // router.push(redirectParam ? redirectParam : "/");
  //     const redirectParam = searchParams.get("redirect");
  //     router.push(redirectParam || "/");
  //   } catch (error) {
  //     console.error("Error signing in:", error);
  //     let errorMessage = "Failed to sign in. Please try again.";
  //     if (error instanceof Error) {
  //       errorMessage = error.message;
  //     }
  //     setErrors({
  //       email: errorMessage,
  //       password: "",
  //     });
  //     setIsLoading(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const rawFormData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const validatedFields = userSchema.safeParse(rawFormData);
      if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email ? fieldErrors.email[0] : "",
          password: fieldErrors.password ? fieldErrors.password[0] : "",
        });
        return;
      }

      const { email, password } = validatedFields.data;

      // delete any existing sessions
      await account.deleteSessions();

      // Create session
      await account.createEmailPasswordSession(email, password);
      const newUser = await account.get();
      console.log("User signed in:", newUser);
      setUser(newUser);

      // Clear any existing errors
      setErrors({ email: "", password: "" });

      // Redirect to intended page
      const redirectParam = searchParams.get("redirect");
      router.push(
        `/auth-check?redirect=${encodeURIComponent(redirectParam || "/")}`,
      );
    } catch (error) {
      console.error("Error signing in:", error);
      let errorMessage = "Failed to sign in. Please try again.";

      if (error instanceof Error) {
        // Handle specific Appwrite errors
        if (error.message.includes("Invalid credentials")) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (error.message.includes("user_not_found")) {
          errorMessage =
            "No account found with this email. Please sign up first.";
        } else {
          errorMessage = error.message;
        }
      }

      setErrors({
        email: errorMessage,
        password: "",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // async function handleSignInWithProvider() {
  //   try {
  //     setIsLoading(true);
  //     await account.createOAuth2Session(
  //       OAuthProvider.Google,
  //       "https://terraandbrews.vercel.app/",
  //       "https://terraandbrews.vercel.app/fail",
  //     );
  //     const newUser = await account.get();
  //     setUser(newUser);
  //     console.log("User signed up with provider:", newUser);
  //     // router.push("/");
  //     const redirectParam = searchParams.get("redirect");
  //     router.push(redirectParam || "/");
  //   } catch (error) {
  //     console.error("Error signing up with provider:", error);
  //     setErrors({
  //       email: "Failed to create account. Please try again.",
  //       password: "",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2
            className={`mt-6 text-center text-3xl font-extrabold text-[#443227] ${playfairDisplay.className}`}
          >
            Sign in to your account
          </h2>
        </div>

        <form className="mx-auto max-w-sm" onSubmit={handleSignIn}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white ${lato.className}`}
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-xs dark:shadow-xs-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name@flowbite.com"
              required
            />
            {errors?.email && (
              <p className={`text-red-500 ${lato.className}`}>{errors.email}</p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className={`mb-2 block text-sm font-medium text-gray-900 dark:text-white ${lato.className}`}
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="shadow-xs dark:shadow-xs-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
            {errors?.password && (
              <p className={`text-red-500 ${lato.className}`}>
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
              isLoading
                ? "cursor-not-allowed bg-[#c8aa8d] opacity-50"
                : "cursor-pointer bg-[#9d7546] hover:bg-[#bf935f] focus:ring-[#bf935f]",
              fraunces.className,
            )}
          >
            {isLoading ? "Loading..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6">
          {/* <div className="">
            <div className="inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center text-sm">
              <span className={`bg-white px-2 text-gray-500 ${lato.className}`}>
                Or continue with
              </span>
            </div>
          </div> */}

          <div className="mt-6 flex items-center justify-center">
            {/* <div>
              <button
                onClick={handleSignInWithProvider}
                disabled={isLoading}
                className={cn(
                  "flex w-full items-center justify-between rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm",
                  isLoading
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-gray-50",
                )}
              >
                <span className={`text-black ${lato.className} pr-4`}>
                  Sign in with Google
                </span>
                <FaGoogle size={23} fill="red" />
              </button>
            </div> */}

            {/* <div>
              <button
                onClick={() => handleSignInWithProvider("Facebook")}
                disabled={isLoading}
                className={cn(
                  "flex w-full items-center justify-evenly rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm",
                  isLoading
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-gray-50",
                )}
              >
                <span className="text-black">Sign in with Google</span>
                <FaFacebook size={23} fill="blue" />
              </button>
            </div> */}
          </div>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            href="/signup"
            className={`font-medium text-[#bf935f] hover:text-[#bf935f]/90 ${lato.className}`}
          >
            sign up for an account
          </Link>
        </p>
      </div>
    </div>
  );
}
