"use client";

import React from "react";
import Link from "next/link";
 
import { FaHome, FaQuestionCircle, FaSearch } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-[50vh] py-16 space-y-5 bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden select-none">
      <h1 className="text-4xl sm:text-5xl font-black text-neutral-500 tracking-tighter leading-none mb-4 font-sans py-2">
        404
      </h1>

      <div className="w-full max-w-xl text-center flex flex-col items-center gap-6 z-10 -mt-10 sm:-mt-16">
        <div className="w-full max-w-md relative">
          <FaSearch
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300"
            size={14}
          />
        </div>

        <div className="flex flex-col gap-2 mt-2 space-y-5">
          <h2 className="text-4xl font-extrabold text-neutral-900 tracking-tight">
            Sorry, Page Not Found
          </h2>
          <p className="text-lg sm:text-sm text-neutral-500 font-medium leading-relaxed max-w-sm mx-auto">
            The page you requested could not be found
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-4">
          <Link
             
            href="/"
            className="w-full bg-white hover:bg-neutral-50 text-neutral-600 border border-neutral-300 hover:border-neutral-400 font-bold text-xs tracking-widest uppercase h-10 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 py-3 px-10"
          >
            <FaQuestionCircle size={12} className="text-neutral-400" />
            Home
          </Link>

          <Link
            
            href="/contact"
            className="w-full bg-white hover:bg-neutral-50 text-neutral-600 border border-neutral-300 hover:border-neutral-400 font-bold text-xs tracking-widest uppercase h-10 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 py-3 px-10"
          >
            <FaQuestionCircle size={12} className="text-neutral-400" />
            Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
