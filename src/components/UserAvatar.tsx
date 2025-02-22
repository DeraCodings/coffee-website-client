"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export function UserAvatar() {
  const { user, profileImage } = useAuth();
  const isAuthenticated = user && user.email;
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Avatar>
            <AvatarImage src={profileImage} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <Link href="/login" className="hover:text-[#bf925f]">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
