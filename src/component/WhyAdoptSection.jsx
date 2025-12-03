import React from "react";
import { Heart, ShieldCheck, Home, PawPrint } from "lucide-react";

const WhyAdoptSection = () => {
  return (
    <div className="w-full bg-orange-50 py-16 mt-14">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-orange-700 mb-10">
          🐾 Why Adopt from PawMart?
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <PawPrint size={48} className="text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Give Pets a Second Chance</h3>
            <p className="text-gray-600">
              Many pets are abandoned or homeless—your adoption gives them a loving home.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <Home size={48} className="text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Safe & Verified Homes</h3>
            <p className="text-gray-600">
              PawMart ensures responsible adoption so pets go to caring families.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <ShieldCheck size={48} className="text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Health & Safety First</h3>
            <p className="text-gray-600">
              We list only pets that are vaccinated, healthy, and checked by owners.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <Heart size={48} className="text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Spread Love, Save Lives</h3>
            <p className="text-gray-600">
              Adopting instead of buying reduces pet cruelty and supports animal welfare.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyAdoptSection;
