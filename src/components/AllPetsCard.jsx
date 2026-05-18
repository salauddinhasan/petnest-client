"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const AllPetsCard = ({ petnes }) => {
  const {
    _id,
    name,
    species,
    breed,
    age,
    gender,
    image,
    location,
    adoptionFee,
    status,
  } = petnes;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-200/60 hover:border-neutral-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 flex flex-col h-full relative p-4">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-neutral-50">
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1537151625747-768eb64269f5?w=500"
          }
          alt={name || "Pet Image"}
          fill
          sizes="(max-w-7xl) 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-neutral-800 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-neutral-100">
          <span className="capitalize">{species || "Dog"}</span>
        </div>

        <span className="absolute top-2 right-2 bg-[#05b074] text-white text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full shadow-sm">
          {status}
        </span>
      </div>

      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-black text-neutral-950 tracking-wide mb-1 px-1">
          {name || "Blizzard"}
        </h2>

        <p className="text-xs font-semibold text-neutral-400 mb-4 px-1">
          {breed || "Siberian Husky"} • {age || "2 years old"} •{" "}
          {gender || "Male"}
        </p>

        <div className="flex flex-col gap-2 mb-4 mt-auto px-1">
          <div className="flex items-center gap-2 text-xs text-neutral-600 font-medium">
            <FaMapMarkerAlt
              className="text-neutral-400 flex-shrink-0"
              size={12}
            />
            <span>{location || "Dhaka, Bangladesh"}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-600 font-medium">
            <span className="text-neutral-950 font-black">
              {adoptionFee === 0 || !adoptionFee
                ? "Free Adoption"
                : `$${adoptionFee} adoption fee`}
            </span>
          </div>
        </div>

        <div className="border-t border-neutral-100 my-3 w-full"></div>

        <div className="grid grid-cols-2 gap-3 w-full pt-1">
          <Link
            href={`/all-pets/${_id}`}
            className="w-full bg-neutral-100 hover:bg-neutral-200 inline-flex items-center justify-center text-neutral-700 font-bold text-xs tracking-wide h-9 rounded-xl transition-all border border-neutral-200/60"
          >
            View Details
          </Link>
          <Link
            href={`/all-pets/${_id}`}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white inline-flex items-center justify-center   font-bold text-xs tracking-wide h-9 rounded-xl transition-all border border-neutral-200/60"
          >
            Adopt Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPetsCard;
