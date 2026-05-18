"use client";

import React from "react";
import { FaHeart, FaDog, FaUsers, FaAward } from "react-icons/fa";

const Stats = () => {
  const statsData = [
    {
      id: 1,
      count: "1,250+",
      label: "Pets Adopted",
      icon: <FaHeart className="text-neutral-700" />,
      description: "Furry friends found homes",
    },
    {
      id: 2,
      count: "450+",
      label: "Active Rescues",
      icon: <FaDog className="text-neutral-700" />,
      description: "Waiting for a family",
    },
    {
      id: 3,
      count: "8,800+",
      label: "Happy Users",
      icon: <FaUsers className="text-neutral-700" />,
      description: "Community members",
    },
    {
      id: 4,
      count: "15+",
      label: "City Partners",
      icon: <FaAward className="text-neutral-700" />,
      description: "Rescue organizations",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-8 border-y border-neutral-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-200/60 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200/60 flex items-center justify-center text-xl mb-4 shadow-sm">
              {stat.icon}
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight mb-1">
              {stat.count}
            </h2>

            <p className="text-[11px] font-bold text-neutral-800 tracking-widest uppercase mb-1">
              {stat.label}
            </p>

            <p className="text-xs text-neutral-400 font-medium">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
