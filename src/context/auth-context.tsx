"use client"

import { account, storage } from "@/utils/appwrite";
import { Models } from "appwrite";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  profileImage: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profileImage: "",
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await account.get();
        setUser(userData);
        const profileImageUrl = storage.getFileView(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
          userData.$id,
        );
        setProfileImage(profileImageUrl);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profileImage }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);