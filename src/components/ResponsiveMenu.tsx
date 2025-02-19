"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { useFetchHomePageData } from "@/hooks/useFetchHomePageData";
import { ShoppingBag, Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-[#171310] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex-1">
          <h2 className="text-xl font-bold">Terra & Brews</h2>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-8">
            {navigation?.navLinks.map((navLink: NavLink, index: number) => (
              <li key={index}>
                <Link
                  href={navLink.href}
                  className="transition-all duration-200 hover:text-[#bf925f] hover:underline"
                >
                  {navLink.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section with Mobile Menu Button */}
        <div className="flex flex-1 items-center justify-end gap-6">
          {/* Mobile Menu Button */}

          <Link href="/cart" className="relative">
            <ShoppingBag size={20} />
            {user && cartItemsCount > 0 ? (
              <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartItemsCount}
              </span>
            ) : null}
          </Link>

          {user ? (
            <Image
              alt={user.name}
              src={profileImage}
              height={50}
              width={50}
              className="rounded-full"
            />
          ) : (
            <Link href="/login" className="hover:text-[#bf925f]">
              Login
            </Link>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:text-[#bf925f] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden ${
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`absolute right-0 h-full w-64 transform bg-[#171310] transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:text-[#bf925f]"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="p-4">
              <ul className="flex flex-col gap-4">
                {navigation?.navLinks.map((navLink: NavLink, index: number) => (
                  <li key={index}>
                    <Link
                      href={navLink.href}
                      className="block py-2 hover:text-[#bf925f] hover:underline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {navLink.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
