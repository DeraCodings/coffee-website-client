"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
// import { userSchema } from "@/actions/auth-actions";
// import { FaGoogle } from "react-icons/fa6";
import { account } from "@/utils/appwrite";
import { ID } from "appwrite";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { fraunces, lato, playfairDisplay } from "@/utils/font-config";

// const initialState = {
//   success: false,
//   errors: {
//     email: "",
//     password: "",
//   },
// };

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  fullName: z.string().min(1, "Full name is required"),
});

export default function SignUpPage() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [state, formAction] = useActionState(signUp, initialState);

  useEffect(() => {
    if (user && user?.email) {
      router.push("/checkout");
    }
  }, [user, router]);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
      fullName: formData.get("full-name"),
    };
    const validatedFields = userSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email ? fieldErrors.email[0] : "",
        password: fieldErrors.password ? fieldErrors.password[0] : "",
        fullName: fieldErrors.fullName ? fieldErrors.fullName[0] : "",
      });
      return;
    }
    const { email, password, fullName } = validatedFields.data;
    try {
      await account.create(ID.unique(), email, password, fullName);
      await account.createEmailPasswordSession(email, password);
      const newUser = await account.get();
      console.log("User signed up:", newUser);
      setUser(newUser);
      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      let errorMessage = "Failed to create account. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setErrors({
        email: errorMessage,
        password: "",
        fullName: "",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // async function handleSignUpWithProvider(provider: "Google" | "Facebook") {
  //   try {
  //     setIsLoading(true);
  //     await account.createOAuth2Session(
  //       OAuthProvider[provider],
  //       "http://localhost:3000/",
  //       "http://localhost:3000/fail",
  //     );
  //     const newUser = await account.get();
  //     setUser(newUser);
  //     console.log("User signed up with provider:", newUser);
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Error signing up with provider:", error);
  //     setErrors({
  //       email: "Failed to create account. Please try again.",
  //       password: "",
  //       fullName: "",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold text-[#443227] ${playfairDisplay.className}`}>
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <input type="hidden" name="remember" value="true" />
          <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="full-name" className={`sr-only ${lato.className}`}>
                Full name
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#bf935f] focus:outline-none focus:ring-[#bf935f] sm:text-sm"
                placeholder="Full name"
              />
              {errors?.fullName && (
                <p className={`mt-1 text-xs text-red-500 ${lato.className}`}>{errors.fullName}</p>
              )}
            </div>
            <div>
              <label htmlFor="email-address" className={`sr-only ${lato.className}`}>
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#bf935f] focus:outline-none focus:ring-[#bf935f] sm:text-sm"
                placeholder="Email address"
              />
              {errors?.email && (
                <p className={`mt-1 text-xs text-red-500 ${lato.className}`}>{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className={`sr-only ${lato.className}`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-5 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#bf935f] focus:outline-none focus:ring-[#bf935f] sm:text-sm"
                placeholder="Password"
              />
              {errors?.password && (
                <p className={`mt-1 text-xs text-red-500 ${lato.className}`}>{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2",
                isLoading
                  ? "cursor-not-allowed bg-[#c8aa8d] opacity-50"
                  : "cursor-pointer bg-[#9d7546] hover:bg-[#bf935f] focus:ring-[#bf935f]",
                fraunces.className
              )}
            >
              {isLoading ? "Loading..." : "Sign up"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`bg-white px-2 text-gray-500 ${lato.className}`}>
                Or continue with
              </span>
            </div>
          </div> */}

          <div className="mt-6 grid grid-cols-2 gap-3">
            {/* <div>
              <button
                onClick={() => handleSignUpWithProvider("Google")}
                disabled={isLoading}
                className={cn(
                  "flex w-full items-center justify-evenly rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm",
                  isLoading
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-gray-50",
                  fraunces.className,
                )}
              >
                <span className="text-black">Sign up with Google</span>
                <FaGoogle size={23} fill="red" />
              </button>
            </div> */}

            {/* <div>
              <button
                onClick={() => handleSignUpWithProvider("Facebook")}
                disabled={isLoading}
                className={cn(
                  "flex w-full items-center justify-evenly rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm",
                  isLoading
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-gray-50",
                )}
              >
                <span className="text-black">Sign up with Facebook</span>
                <FaFacebook size={25} fill="blue" />
              </button>
            </div> */}
          </div>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className={`font-medium text-[#bf935f] hover:text-[#bf935f]/90 ${lato.className}`}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
