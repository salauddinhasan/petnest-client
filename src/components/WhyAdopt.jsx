"use client";

import React from "react";
import Image from "next/image";
import { FaHeart, FaHome, FaCheckCircle, FaSmile } from "react-icons/fa";

const WhyAdopt = () => {
  const reasons = [
    {
      id: 1,
      icon: <FaHeart className="text-neutral-800" />,
      title: "Save a Precious Life",
      description:
        "Every year, millions of healthy animals are euthanized or left homeless. By adopting, you give a deserving pet a second chance at life.",
    },
    {
      id: 2,
      icon: <FaHome className="text-neutral-800" />,
      title: "Fight Puppy Mills",
      description:
        "Buying from commercial pet stores often supports cruel breeding facilities. Adoption directly breaks this cycle of exploitation.",
    },
    {
      id: 3,
      icon: <FaSmile className="text-neutral-800" />,
      title: "Unconditional Companionship",
      description:
        "Rescue pets are incredibly grateful and loyal. They bring immense joy, lower stress, and fill your home with boundless love.",
    },
    {
      id: 4,
      icon: <FaCheckCircle className="text-neutral-800" />,
      title: "Healthy & Vaccinated",
      description:
        "Most shelter pets are already behavior-assessed, vaccinated, and spayed/neutered, saving you initial veterinary steps and costs.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
            Why Adopt a Pet?
          </h2>
          <div className="w-12 h-1 bg-neutral-950 mx-auto rounded-full"></div>
          <p className="text-xs md:text-sm text-neutral-400 font-medium leading-relaxed">
            Choosing adoption over buying isn&apos;t just a decision; it’s a
            compassionate choice that creates beautiful life-saving stories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center relative w-full">
            <div className="absolute inset-0 bg-neutral-50/70 -rotate-3 rounded-2xl -z-10 border border-neutral-200/50"></div>

            <div className="overflow-hidden rounded-2xl border border-neutral-100 shadow-lg relative w-full h-[350px] md:h-[450px]">
              <Image
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80"
                alt="Person holding a rescue cat"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="p-6 bg-white border border-neutral-200/60 rounded-2xl shadow-sm hover:shadow-md hover:border-neutral-400 transition-all duration-300 flex flex-col gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-center text-sm shadow-inner transition-colors duration-300">
                  {reason.icon}
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-bold text-neutral-950 tracking-wide uppercase text-[13px]">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-normal leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
