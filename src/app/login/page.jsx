"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { authClient, signIn } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/",
    });

    setLoading(false);

    if (error) {
      alert("Invalid email or password.");
    } else {
      alert("Logged in successfully:");
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    };

  return (
    <div className="min-h-[85vh] flex items-center justify-center !bg-[#FBF9F6] px-4 py-12 select-none">
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-neutral-100 shadow-xl p-8 md:p-10">
        <div className="text-center mb-8">
          <span className="text-3xl">🐾</span>
          <h2 className="text-2xl font-black text-[#0B1547] mt-2">
            Welcome Back
          </h2>
          <p className="text-xs font-bold text-neutral-400 mt-1">
            Log in to manage your pets
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase pl-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="salauddin@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-11 px-4 bg-neutral-50/50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 outline-none focus:border-sky-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase pl-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-11 px-4 bg-neutral-50/50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 outline-none focus:border-sky-500 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 text-white font-black text-xs uppercase rounded-xl shadow-md transition-all mt-2 ${
              loading
                ? "bg-sky-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-5 text-neutral-300">
          <div className="flex-1 h-[1px] bg-neutral-200/60"></div>
          <span className="px-3 text-[10px] font-bold text-neutral-400 uppercase">
            or
          </span>
          <div className="flex-1 h-[1px] bg-neutral-200/60"></div>
        </div>

        <button
        onClick={handleGoogleLogin}
          type="button"
          className="w-full h-11 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-sm"
        >
          <FcGoogle size={16} />
          Continue with Google
        </button>

        <div className="text-center mt-6 pt-4 border-t border-neutral-100">
          <p className="text-xs font-semibold text-neutral-400">
            Don t have an account?{" "}
            <Link
              href="/register"
              className="text-sky-600 font-bold hover:underline"
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
