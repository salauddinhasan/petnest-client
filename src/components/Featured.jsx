import React from "react";
import Link from "next/link";
import AllPetsCard from "./AllPetsCard";
import { fetchFeaturedPets } from "@/lib/petnest/data";

const Featured = async () => {
  const petnest = await fetchFeaturedPets();

  return (
    <section className="bg-white py-16 md:py-18 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-neutral-100 pb-6 mb-10">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-black tracking-widest uppercase text-neutral-400">
              Find your companion
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              Featured Pets
            </h2>
          </div>

          <div className="shrink-0">
            <Link
              href="/all-pets"
              className="group inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase text-neutral-500 hover:text-neutral-950 transition-all duration-300"
            >
              <span>View all pets</span>

              <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-sm font-normal">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {petnest?.map((petnes) => (
            <AllPetsCard key={petnes?._id} petnes={petnes} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
