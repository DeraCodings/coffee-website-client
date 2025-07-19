"use client";

import { account, storage } from "@/utils/appwrite";
import { Models } from "appwrite";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  profileImage: string;
  setUser: Dispatch<SetStateAction<Models.User<Models.Preferences> | null>>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profileImage: "",
  setUser: () => {},
  isLoading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [profileImage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await account.get();
        setUser(userData);

        // Only try to get profile image if user is not anonymous
        if (!userData.labels?.includes("anonymous")) {
          try {
            const profileImageUrl = storage.getFileView(
              process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
              userData.$id,
            );
            setProfileImage(profileImageUrl);
          } catch (imageError) {
            console.log("No profile image found:", imageError);
            setProfileImage("");
          }
        }
      } catch (error) {
        console.error(
          "User not authenticated. Creating an anonymous user...",
          error,
        );
        try {
          await account.createAnonymousSession();
          const anonymousUser = await account.get();
          setUser(anonymousUser);
        } catch (anonError) {
          console.log("Failed to create anonymous session:", anonError);
          setUser(null);
        }
      } finally {
        // ✅ CRITICAL FIX: Always set loading to false
        setIsLoading(false);
      }
    }

    fetchUser();
    return () => {
      // Cleanup function if needed
      account.deleteSessions().catch(() => {});
      setUser(null);
      setProfileImage("");
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profileImage, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
