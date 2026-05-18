"use client";

import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaPaw } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-white text-neutral-900 py-16 md:py-24 px-6 md:px-8  grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col  mx-auto gap-6 text-center md:text-left items-center md:items-start ">
        <div className="inline-flex items-center gap-2 bg-neutral-50 border border-neutral-200/60 px-3 py-1.5 rounded-full w-fit">
          <FaPaw size={12} className="text-neutral-800" />
          <span className="text-xs font-semibold tracking-wider text-neutral-600 uppercase">
            Welcome to PetNest
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 leading-tight">
          Find your perfect <br />
          <span className="underline decoration-neutral-300 decoration-wavy underline-offset-8">
            furry companion
          </span>
        </h1>

        <p className="text-sm md:text-base text-neutral-500 max-w-md leading-relaxed font-medium">
          Adopting a pet is an act of pure love. Browse through hundreds of
          lovely pets waiting for a home and give them a second chance at
          happiness today.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
          <Button
            as={Link}
            href="/all-pets"
            endContent={<FaArrowRight size={14} />}
            className="w-full sm:w-auto bg-neutral-950 text-white font-bold tracking-wide text-sm px-8 h-12 rounded-xl shadow-md hover:bg-neutral-800 transition-all"
          >
            Adopt Now
          </Button>

          <Button
            as={Link}
            href="/dashboard/add-pet"
            variant="bordered"
            className="w-full sm:w-auto border-neutral-200 text-neutral-800 font-bold tracking-wide text-sm px-8 h-12 rounded-xl hover:bg-neutral-50 transition-all"
          >
            Rehome a Pet
          </Button>
        </div>
      </div>

      <div className="relative flex justify-center items-center w-full">
        <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-neutral-100 rounded-full filter blur-3xl -z-10 opacity-60"></div>

        <div className="overflow-hidden rounded-2xl border border-neutral-100/50 shadow-xl w-full max-w-md h-[350px] md:h-[450px] relative">
          <Image
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80"
            alt="Cute happy dog on PetNest"
            fill
            priority
            sizes="(max-w-7xl) 100vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
