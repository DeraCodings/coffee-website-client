"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { account } from "@/utils/appwrite";
import { fraunces } from "@/utils/font-config";
import Link from "next/link";
import { useEffect } from "react";

export function UserAvatar() {
  const { profileImage, setUser, user } = useAuth();
  useEffect(() => {
    // Check if user is authenticated
    // If not, set user to null
    const checkUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        console.error("User not authenticated:", error);
        setUser(null);
      }
    };
    checkUser();
  }, [setUser]);
  async function handleLogOut() {
    await account.deleteSession("current");
    setUser(null);
  }
  return (
    <div>
      {user && user.email ? (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={profileImage} alt="@shadcn" />
            <AvatarFallback className="bg-[#bf925f] font-semibold text-white">
              {user?.name
                ? user.name
                    .split(" ")
                    .map(word => word[0])
                    .join("")
                    .toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={handleLogOut}
            className={`cursor-pointer font-semibold text-gray-300 hover:text-[#9d7546] active:cursor-not-allowed ${fraunces.className}`}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-[#bf925f] font-semibold text-white">
              AU
            </AvatarFallback>
          </Avatar>
          <Link href="/login" className={`hover:text-[#bf925f] ${fraunces.className}`}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
