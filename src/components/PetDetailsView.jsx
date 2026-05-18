"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaStar, FaHeart, FaPaw } from "react-icons/fa";
import Image from "next/image";

const PetDetailsView = ({ pet, id }) => {
  const images =
    pet?.images || [pet?.image, pet?.image, pet?.image].filter(Boolean);
  const [activeImage, setActiveImage] = useState(
    images[0] ||
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800",
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start py-16">
      <div className="lg:col-span-7 flex gap-4 w-full h-[400px]">
        <div className="flex flex-col gap-3 shrink-0 h-full overflow-y-auto no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 bg-neutral-50 shrink-0 transition-all ${
                activeImage === img
                  ? "border-emerald-500 scale-95 shadow-sm"
                  : "border-neutral-200/60 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt="thumbnail"
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
            </button>
          ))}
        </div>
        <div className="relative flex-1 h-full rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-50 shadow-md">
          <Image
            src={activeImage}
            alt={pet?.name || "Pet Image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover transition-all duration-500"
          />
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-5 w-full pt-2">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          Adopt {pet?.name || "Lovely Companion"}
        </h1>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={14}
                className={i < 4 ? "text-amber-400" : "text-neutral-200"}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-neutral-400">
            (4.8 / 5, 12 Reviews)
          </span>
        </div>

        <div className="flex items-baseline gap-3 mt-1">
          <span className="text-3xl font-black text-[#FF5A36]">
            {pet?.adoptionFee === 0 || !pet?.adoptionFee
              ? "Free"
              : `${pet.adoptionFee} BDT`}
          </span>
          {pet?.adoptionFee > 0 && (
            <span className="text-sm font-medium text-neutral-400 line-through">
              {(pet.adoptionFee * 1.5).toFixed(0)} BDT
            </span>
          )}
        </div>

        <p className="text-sm text-neutral-500 font-medium leading-relaxed max-w-sm">
          {pet?.description ||
            `A one of a kind friendly ${pet?.breed || "companion"}, including a healthy vaccine status and playful heartwarming feature.`}
          <span className="text-[#0B1547] font-bold cursor-pointer hover:underline ml-1">
            Read more
          </span>
        </p>

        <div className="flex flex-col gap-2 mt-2">
          <span className="text-xs font-bold text-neutral-500">
            Breed & Species:{" "}
            <span className="text-neutral-800 font-black">
              {pet?.breed || "Mixed"}
            </span>
          </span>
          <div className="flex gap-2 mt-1">
            <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-bold text-neutral-600">
              Age: {pet?.age || "N/A"}
            </span>
            <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-bold text-neutral-600">
              Gender: {pet?.gender || "Unknown"}
            </span>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-xs font-bold text-neutral-400">
              Location
            </label>
            <div className="border border-neutral-200 rounded-xl px-3 h-10 flex items-center text-xs font-bold text-neutral-700 bg-white truncate">
              {pet?.location || "Sylhet"}
            </div>
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-xs font-bold text-neutral-400">Status</label>
            <div className="border border-neutral-200 rounded-xl px-3 h-10 flex items-center text-xs font-bold text-emerald-600 bg-emerald-50/50">
              {pet?.status || "Available"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 w-full">
          <Link href={`/adopt-request/${id}`} className="w-full">
            <Button className="w-full bg-[#051242] hover:bg-[#0b1c5e] text-white font-black text-xs tracking-widest uppercase h-12 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2">
              <FaPaw size={14} />
              Bring {pet?.name || "Me"} Home
            </Button>
          </Link>

          <Button
            isIconOnly
            className="bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-400 hover:text-rose-500 h-12 w-12 min-w-12 rounded-2xl transition-all shadow-sm"
          >
            <FaHeart size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsView;
