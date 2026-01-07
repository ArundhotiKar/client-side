import React from "react";
import { Heart, ShieldCheck, Home, PawPrint } from "lucide-react";

const WhyAdoptSection = () => {
  return (
    <div className="w-full py-10   transition-colors">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-orange-700 dark:text-orange-400 mb-10">
          🐾 Why Adopt from PawMart?
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card */}
          {[
            {
              icon: <PawPrint size={48} />,
              title: "Give Pets a Second Chance",
              text: "Many pets are abandoned or homeless—your adoption gives them a loving home.",
            },
            {
              icon: <Home size={48} />,
              title: "Safe & Verified Homes",
              text: "PawMart ensures responsible adoption so pets go to caring families.",
            },
            {
              icon: <ShieldCheck size={48} />,
              title: "Health & Safety First",
              text: "We list only pets that are vaccinated, healthy, and checked by owners.",
            },
            {
              icon: <Heart size={48} />,
              title: "Spread Love, Save Lives",
              text: "Adopting instead of buying reduces pet cruelty and supports animal welfare.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className=" p-6 rounded-2xl
                shadow-md hover:shadow-xl
                text-center transition-all duration-300"
            >
              <div className="flex justify-center mb-4 text-orange-600">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-2  dark:text-amber-200">
                {item.title}
              </h3>

              <p className=" dark:text-gray-300">
                {item.text}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default WhyAdoptSection;
