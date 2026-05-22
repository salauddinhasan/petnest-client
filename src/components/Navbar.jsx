"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";  

const Navbar = () => {
  const { data } = authClient.useSession();
  const user = data?.user;

  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const linkStyle = (path) =>
    `transition-all duration-200 font-medium ${
      pathname === path
        ? "text-sky-600 font-bold border-b-2 border-sky-600 pb-1"
        : "text-gray-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400"
    }`;

  // logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setIsDropdownOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-sky-50 dark:border-neutral-800 shadow-sm transition-colors">
      <div className="px-10 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-sky-600 tracking-wide">
            PetNest
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={linkStyle("/")}>
            Home
          </Link>

          <Link href="/all-pets" className={linkStyle("/all-pets")}>
            All Pets
          </Link>

          {user && (
            <>
              <Link
                href="/dashboard/my-requests"
                className={linkStyle("/dashboard/my-requests")}
              >
                My Requests
              </Link>

              <Link
                href="/dashboard/add-pet"
                className={linkStyle("/dashboard/add-pet")}
              >
                Add Pet
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          
          <ThemeToggle />

          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2"
              >
                <Image
                  src={
                    user.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-sky-200 dark:border-neutral-700 object-cover"
                />

                <span className="text-sm font-medium text-gray-700 dark:text-neutral-200">
                  {user.name} ▾
                </span>
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-700 py-2 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-neutral-700">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                      {user.name}
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-neutral-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-neutral-200 hover:bg-sky-50 dark:hover:bg-neutral-700 hover:text-sky-600 transition-all"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/my-listings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-neutral-200 hover:bg-sky-50 dark:hover:bg-neutral-700 hover:text-sky-600 transition-all"
                  >
                    My Listings
                  </Link>

                  <Link
                    href="/dashboard/my-requests"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-neutral-200 hover:bg-sky-50 dark:hover:bg-neutral-700 hover:text-sky-600 transition-all"
                  >
                    My Requests
                  </Link>

                  <div className="border-t border-gray-100 dark:border-neutral-700 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-700 dark:text-neutral-200 hover:text-sky-600 text-sm font-semibold px-4 py-2 transition-all"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-sm transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          
          <ThemeToggle />

          {user && (
            <Image
              src={
                user.image ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt={user.name || "User"}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full border-2 border-sky-200 dark:border-neutral-700 object-cover"
            />
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-gray-700 dark:text-neutral-200"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800 shadow-lg px-5 py-5 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={linkStyle("/")}
          >
            Home
          </Link>

          <Link
            href="/all-pets"
            onClick={() => setIsMenuOpen(false)}
            className={linkStyle("/all-pets")}
          >
            All Pets
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={linkStyle("/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/my-listings"
                onClick={() => setIsMenuOpen(false)}
                className={linkStyle("/dashboard/my-listings")}
              >
                My Listings
              </Link>

              <Link
                href="/dashboard/my-requests"
                onClick={() => setIsMenuOpen(false)}
                className={linkStyle("/dashboard/my-requests")}
              >
                My Requests
              </Link>

              <Link
                href="/dashboard/add-pet"
                onClick={() => setIsMenuOpen(false)}
                className={linkStyle("/dashboard/add-pet")}
              >
                Add Pet
              </Link>

              <button
                onClick={handleLogout}
                className="w-full bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 py-2 rounded-lg font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-100 dark:border-neutral-800">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full border border-gray-200 dark:border-neutral-700 text-center py-2 rounded-lg font-medium text-gray-700 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white text-center py-2 rounded-lg font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;