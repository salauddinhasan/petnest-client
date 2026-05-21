"use client";

import React, { useState, useEffect } from "react";
import AllPetsCard from "@/components/AllPetsCard";
import { IoSearchOutline } from "react-icons/io5"; // 👈 সুন্দর সার্চ আইকন

const AllPets = () => {
  const [allPets, setAllPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. পেজ লোড হলে ডাটাবেজ থেকে সব পেট নিয়ে আসা
  useEffect(() => {
    const loadPets = async () => {
      try {
        const baseUrl = "http://localhost:5000"; // তোমার ডাইরেক্ট ব্যাকএন্ড ইউআরএল
        const res = await fetch(`${baseUrl}/all-pets`, { cache: "no-store" });
        const data = await res.json();

        // ব্যাকএন্ড অ্যারে দিলে সরাসরি data, অবজেক্ট দিলে data.data
        const petsData = Array.isArray(data) ? data : data.data || [];

        setAllPets(petsData);
        setFilteredPets(petsData); // শুরুতে সব পেটই দেখাবে
      } catch (error) {
        console.error("Error loading pets:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPets();
  }, []);

  // 🎯 ২. সার্চ বাটনে ক্লিক করলে বা ইনপুটে লিখে এন্টার দিলে ফিল্টার হবে
  const handleSearch = (e) => {
    if (e) e.preventDefault(); // পেজ রিলোড বন্ধ করবে

    const query = searchQuery.toLowerCase().trim();

    if (query === "") {
      setFilteredPets(allPets); // সার্চ খালি থাকলে সব দেখাবে
    } else {
      const filtered = allPets.filter((pet) => {
        return (
          pet.name?.toLowerCase().includes(query) ||
          pet.breed?.toLowerCase().includes(query) ||
          pet.species?.toLowerCase().includes(query) ||
          pet.category?.toLowerCase().includes(query)
        );
      });
      setFilteredPets(filtered);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-neutral-50/90">
        <span className="loading loading-spinner loading-lg text-neutral-950"></span>
      </div>
    );
  }

  return (
    <section className="bg-neutral-50/90 min-h-screen py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* 🔍 ৩. আল্ট্রা-প্রফেশনাল সার্চ বার এবং বাটন সেকশন */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 w-full md:w-96 mx-auto mb-4"
        >
          <div className="relative flex-grow">
            <IoSearchOutline
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search pets by name, breed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-neutral-200 focus:border-neutral-950 text-sm font-medium rounded-xl outline-none transition-all shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-sm"
          >
            Search
          </button>
        </form>

        {/* ৪. যদি কোনো পেট সার্চের সাথে ম্যাচ না করে */}
        {filteredPets.length === 0 ? (
          <div className="bg-white border border-neutral-200/60 p-12 rounded-2xl text-center text-neutral-400 font-medium text-base shadow-sm">
            No pets found matching your search! 🐶
          </div>
        ) : (
          /* 🐾 ৫. তোমার সেই অরিজিনাল কার্ড গ্রিড */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPets.map((petnes) => (
              <AllPetsCard key={petnes._id} petnes={petnes} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPets;
