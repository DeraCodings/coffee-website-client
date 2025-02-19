"use client";

import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { useFetchHomePageData } from "@/hooks/useFetchHomePageData";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type NavLink = {
  href: string;
  text: string;
};

type NavLinks = {
  navLinks: NavLink[];
};

function Header() {
  const { user, profileImage } = useAuth();
  const { cartItemsCount } = useCart();
  const { navigation } = useFetchHomePageData();
  return (
    <header className="sticky top-0 flex items-center justify-around bg-[#171310] text-white py-5">
      <div>
        <h2 className="text-xl font-bold">Terra & Brews</h2>
      </div>
      <nav>
        <ul className="flex items-center gap-8">
          {navigation?.navLinks.map((navLink: NavLink, index: number) => (
            <li key={index}>
              <Link href={navLink.href} className="hover:text-[#bf925f] hover:underline transition-all duration-200">{navLink.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/cart" className="relative">
          <ShoppingBag size={20} />
          {user && cartItemsCount > 0 ? (
            <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {cartItemsCount}
            </span>
          ) : (
            ""
          )}
        </Link>
        {user ? (
          <Image alt={user.name} src={profileImage} height={50} width={50} />
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
export default Header;
