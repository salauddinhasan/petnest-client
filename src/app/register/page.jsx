"use client";

import React, { useState } from "react";
import Link from "next/link";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user with:", formData);
    
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center !bg-[#FBF9F6] px-4 py-12 select-none">
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-neutral-100 shadow-xl p-8 md:p-10 transition-all">
        {/* 🐾 Header Logo & Title */}
        <div className="text-center mb-8">
          <span className="text-3xl">🐾</span>
          <h2 className="text-2xl font-black text-[#0B1547] mt-2 tracking-tight">
            Create an Account
          </h2>
          <p className="text-xs font-bold text-neutral-400 mt-1">
            Join PetNest and find your new best friend
          </p>
        </div>
 
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider pl-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-11 px-4 bg-neutral-50/50 border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:border-sky-500 focus:bg-white outline-none transition-all"
            />
          </div>

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

          {/* Profile Photo URL Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider pl-1">
              Profile Image URL
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full h-11 px-4 bg-neutral-50/50 border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:border-sky-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider pl-1">
              Password
            </label>
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
            Sign Up
          </button>
        </form>

        {/* 🔗 Footer Link to Login */}
        <div className="text-center mt-6 pt-4 border-t border-neutral-100">
          <p className="text-xs font-semibold text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-sky-600 hover:text-sky-700 font-bold hover:underline transition-all"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
