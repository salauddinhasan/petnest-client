"use client";

import React from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

const stories = [
  {
    id: 1,
    name: "Rakib Hassan",
    location: "Dhaka",
    pet: "Bruno (Labrador)",
    comment:
      "Adopting Bruno was the best decision of my life. He brought so much joy and energy to our home. PetNest made the whole process so easy!",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Tasnim Akter",
    location: "Sylhet",
    pet: "Mimi (Persian Cat)",
    comment:
      "Mimi is now our little princess. She sleeps on my lap every evening. I never knew a cat could be this loving. Thank you PetNest!",
    image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=200",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Farhan Ahmed",
    location: "Chittagong",
    pet: "Tweety (Budgie)",
    comment:
      "Tweety fills our home with songs every morning. My kids absolutely love him. The adoption process was smooth and transparent.",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=200",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-neutral-50 py-16 md:py-24 px-6 md:px-8 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3 text-center items-center">
          <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
            Real stories
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
            Success Stories
          </h2>
          <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
          <p className="text-sm text-neutral-400 font-medium max-w-md leading-relaxed">
            Thousands of pets have found their forever homes through PetNest.
            Here are some of their stories.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <FaQuoteLeft className="text-neutral-200 text-3xl" />

              <p className="text-sm text-neutral-500 font-medium leading-relaxed flex-1">
                {story.comment}
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
                <Image
                  src={story.avatar}
                  alt={story.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <p className="text-sm font-black text-neutral-950">
                    {story.name}
                  </p>
                  <p className="text-xs text-neutral-400 font-medium">
                    Adopted {story.pet} · {story.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
