import React from "react";
import { FaSearch, FaHeart, FaFileAlt, FaHome } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch />,
    title: "Browse Pets",
    description:
      "Search through hundreds of pets available for adoption near you.",
  },
  {
    id: 2,
    icon: <FaHeart />,
    title: "Choose Your Pet",
    description:
      "Find the perfect companion that matches your lifestyle and home.",
  },
  {
    id: 3,
    icon: <FaFileAlt />,
    title: "Submit Request",
    description: "Fill out a simple adoption request form with your details.",
  },
  {
    id: 4,
    icon: <FaHome />,
    title: "Welcome Home",
    description: "Once approved, bring your new furry family member home!",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3 text-center items-center">
          <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
            Simple process
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
            How It Works
          </h2>
          <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
          <p className="text-sm text-neutral-400 font-medium max-w-md leading-relaxed">
            Adopting a pet through PetNest is simple, transparent, and
            completely free to use.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center gap-4 p-6 bg-neutral-50 border border-neutral-200/60 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center text-lg">
                {step.icon}
              </div>
              <div className="w-7 h-7 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-black text-neutral-600">
                {step.id}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-neutral-950 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
