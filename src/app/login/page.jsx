"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // 💡 এখানে তোমার Better-Auth বা ইমেইল-পাসওয়ার্ড সাইন-ইন লজিক বসবে বস
  };

  const handleGoogleLogin = () => {
    console.log("Google login triggered");
    // 💡 এখানে তোমার Social Auth মেথড বসবে
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center !bg-[#FBF9F6] px-4 py-12 select-none">
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-neutral-100 shadow-xl p-8 md:p-10 transition-all">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-[#0B1547] mt-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs font-bold text-neutral-400 mt-1">
            Log in to manage your pets and requests
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider pl-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="salauddin@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-11 px-4 bg-neutral-50/50 border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:border-sky-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] font-bold text-sky-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-11 px-4 bg-neutral-50/50 border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:border-sky-500 focus:bg-white outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs tracking-wider uppercase rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-5 text-neutral-300">
          <div className="flex-1 h-[1px] bg-neutral-200/60"></div>
          <span className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            or
          </span>
          <div className="flex-1 h-[1px] bg-neutral-200/60"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full h-11 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 shadow-sm"
        >
          <FaGoogle className="text-red-500" size={14} />
          Continue with Google
        </button>

        <div className="text-center mt-6 pt-4 border-t border-neutral-100">
          <p className="text-xs font-semibold text-neutral-400">
            Don t have an account?{" "}
            <Link
              href="/register"
              className="text-sky-600 hover:text-sky-700 font-bold hover:underline transition-all"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
