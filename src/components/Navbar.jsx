"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = {
    name: "Salauddin",
    email: "salauddin@gmail.com",
    photoURL:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkStyle = (path) =>
    `transition-all duration-200 font-medium ${
      pathname === path
        ? "text-sky-600 font-bold border-b-2 border-sky-600 pb-1"
        : "text-gray-600 hover:text-sky-600"
    }`;

  const handleLogout = () => {
    console.log("Logout clicked");
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm px-5 py-3 md:px-10 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <span className="text-2xl"></span>
        <h1 className="text-xl font-bold text-gray-800 tracking-wider">
          PetNest
        </h1>
      </Link>

      {/* Desktop Nav Links */}
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

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <Image
                src={user.photoURL}
                alt={user.name}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full border-2 border-sky-200 object-cover"
              />
              <span className="text-sm font-medium text-gray-700">
                {user.name} ▾
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-all"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/my-listings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-all"
                >
                  My Listings
                </Link>
                <Link
                  href="/dashboard/my-requests"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-all"
                >
                  My Requests
                </Link>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-sky-600 text-white hover:bg-sky-700 px-5 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition-all"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Right Side */}
      <div className="md:hidden flex items-center gap-3">
        {user && (
          <Image
            src={user.photoURL}
            alt={user.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover border-2 border-sky-200"
          />
        )}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600 focus:outline-none text-2xl"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white border-b border-gray-200 p-5 flex flex-col gap-4 shadow-lg md:hidden">
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
              <hr className="border-gray-100" />
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-50 text-red-600 px-4 py-2 rounded-md font-medium text-sm"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center bg-sky-600 text-white py-2 rounded-md font-semibold text-sm"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
