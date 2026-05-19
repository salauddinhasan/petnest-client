import React from "react";
import {
  FaAppleAlt,
  FaShower,
  FaHospital,
  FaRunning,
  FaMoon,
  FaHeart,
} from "react-icons/fa";

const tips = [
  {
    id: 1,
    icon: <FaAppleAlt />,
    title: "Balanced Diet",
    description:
      "Feed your pet nutritious, age-appropriate food. Avoid human food that can be harmful to animals.",
  },
  {
    id: 2,
    icon: <FaShower />,
    title: "Regular Grooming",
    description:
      "Bathe and brush your pet regularly to keep their coat clean and healthy.",
  },
  {
    id: 3,
    icon: <FaHospital />,
    title: "Vet Checkups",
    description:
      "Schedule regular vet visits for vaccinations and health checkups to prevent illness.",
  },
  {
    id: 4,
    icon: <FaRunning />,
    title: "Daily Exercise",
    description:
      "Keep your pet active with daily walks, play sessions, and mental stimulation.",
  },
  {
    id: 5,
    icon: <FaMoon />,
    title: "Proper Rest",
    description:
      "Ensure your pet has a comfortable, quiet place to sleep and rest every day.",
  },
  {
    id: 6,
    icon: <FaHeart />,
    title: "Love & Attention",
    description:
      "Spend quality time with your pet every day. They thrive on your love and companionship.",
  },
];

const PetCareTips = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3 text-center items-center">
          <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
            Be a good owner
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
            Pet Care Tips
          </h2>
          <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
          <p className="text-sm text-neutral-400 font-medium max-w-md leading-relaxed">
            A happy pet starts with a responsible owner. Follow these simple
            tips to keep your furry friend healthy and joyful.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="flex gap-4 p-6 bg-neutral-50 border border-neutral-200/60 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center text-sm flex-shrink-0">
                {tip.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-neutral-950 tracking-wide">
                  {tip.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCareTips;
