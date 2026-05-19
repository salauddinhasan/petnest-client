"use client";

import React from "react";
import { Button } from "@heroui/react";
import { FaStar, FaPaw, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PetReviews = () => {
 
  const reviews = [
    {
      id: 1,
      name: "Mikkel M.",
      title: "Great value",
      comment:
        "The best value I could have imagined for the price paid. It's soft, big enough for my dog and the warming feature works well. My dog spends most of his day sleeping instead of tearing our furniture apart. Definitely would buy it again!",
      date: "15 December 2021",
      rating: 5,
    },
    {
      id: 2,
      name: "Lauren S.",
      title: "Totally love it!",
      comment: "Would buy again. 10/10 Everything seems to be good.",
      date: "15 December 2021",
      rating: 5,
    },
    {
      id: 3,
      name: "Mikkel M.",
      title: "Great value",
      comment:
        "The best value I could have imagined for the price paid. It's soft, big enough for my dog and the warming feature works well.",
      date: "15 December 2021",
      rating: 5,
    },
    {
      id: 4,
      name: "Lauren S.",
      title: "Totally love it!",
      comment: "Would buy again. 10/10 Everything seems to be good.",
      date: "15 December 2021",
      rating: 5,
    },
    {
      id: 5,
      name: "Lauren S.",
      title: "Totally love it!",
      comment:
        "I can't believe that we made Milos sleep in his own bed instead of ours. We are in love.",
      date: "15 December 2021",
      rating: 4,
    },
  ];

 
  const ratingStats = [
    { stars: 5, count: 22, percentage: 75 },
    { stars: 4, count: 7, percentage: 40 },
    { stars: 3, count: 2, percentage: 15 },
    { stars: 2, count: 1, percentage: 8 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  return (
    <div className="mt-30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full select-none">
   
      <div className="lg:col-span-4 flex flex-col gap-4 w-full">
        {/* Rating Title */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-neutral-100 shadow-sm flex items-center gap-2 w-fit">
          <FaPaw className="text-[#0B1547]" size={14} />
          <span className="text-sm font-black text-[#0B1547]">Rating</span>
        </div>

      
        <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-black text-[#0B1547]">
            4.8 <span className="text-xs text-neutral-400 font-bold">/ 5</span>
          </h2>
          <div className="flex gap-0.5 text-amber-400 mt-2 mb-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
          <span className="text-xs font-bold text-neutral-400 mb-6">
            32 ratings
          </span>

          {/* প্রোগ্রেস বার গ্রুপ */}
          <div className="w-full flex flex-col gap-2.5">
            {ratingStats.map((stat) => (
              <div
                key={stat.stars}
                className="flex items-center gap-3 text-xs font-bold text-neutral-600"
              >
                <span className="w-3 text-right">{stat.stars}★</span>
                <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF5A36] rounded-full"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
                <span className="w-3 text-neutral-400 text-left">
                  {stat.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ⚙️ ৩টি ক্লিন সিলেক্ট ড্রপডাউন */}
        <div className="flex flex-col gap-3 w-full">
          <select className="w-full h-12 px-4 bg-white border border-neutral-200/60 rounded-xl text-xs font-bold text-neutral-700 outline-none cursor-pointer">
            <option>Most Recent</option>
            <option>Highest Rating</option>
          </select>

          <select className="w-full h-12 px-4 bg-white border border-neutral-200/60 rounded-xl text-xs font-bold text-neutral-700 outline-none cursor-pointer">
            <option>All types (Images, text)</option>
            <option>Text Only</option>
          </select>

          <select className="w-full h-12 px-4 bg-white border border-neutral-200/60 rounded-xl text-xs font-bold text-neutral-700 outline-none cursor-pointer">
            <option>Specific star rating</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
          </select>
        </div>
      </div>
 
      <div className="lg:col-span-8 flex flex-col gap-4 w-full">
        {/* Reviews Header */}
        <div className="bg-white px-5 py-3 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <FaPaw className="text-[#0B1547]" size={14} />
            <span className="text-sm font-black text-[#0B1547]">Reviews</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-400">
            <button className="hover:text-[#0B1547]">
              <FaChevronLeft size={12} />
            </button>
            <button className="hover:text-[#0B1547]">
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
   
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold text-neutral-400">
                    {rev.name}
                  </span>
                  <h4 className="text-sm font-black text-[#0B1547] mt-0.5">
                    {rev.title}
                  </h4>
                </div>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} size={11} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                {rev.comment}
              </p>
              <span className="text-[10px] font-medium text-neutral-300 mt-1 block">
                {rev.date}
              </span>
            </div>
          ))}
        </div>

        {/* Load More Button */}
       
      </div>
    </div>
  );
};

export default PetReviews;
