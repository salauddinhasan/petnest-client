"use client";
import { authClient, signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.photoURL,
    });

    setLoading(false);

    if (error) {
      alert("Registration failed:");
      setErrorMessage(
        error.message || "Something went wrong. Please try again.",
      );
    } else {
      alert("User registered successfully:");

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
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-neutral-100 shadow-xl p-8 md:p-10 transition-all">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-[#0B1547] mt-2 tracking-tight">
            Create an Account
          </h2>
          <p className="text-xs font-bold text-neutral-400 mt-1">
            Join PetNest and find your new best friend
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider pl-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Salauddin Khan"
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
              placeholder="salauddinhasan244@gmail.com"
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

          {/*  Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 text-white font-black text-xs tracking-wider uppercase rounded-xl shadow-md transition-all duration-300 mt-2 ${
              loading
                ? "bg-sky-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700 hover:shadow-lg"
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
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
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/*   Footer Link to Login */}
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
