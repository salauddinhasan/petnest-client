import AllPetsCard from "@/components/AllPetsCard";
import { fetchPets } from "@/lib/petnest/data";
import React from "react";

const AllPets = async () => {
  const petnest = await fetchPets();
  return (
    <section className="bg-neutral-50/90 min-h-screen py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {petnest.map((petnes) => (
            <AllPetsCard key={petnes._id} petnes={petnes} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPets;
