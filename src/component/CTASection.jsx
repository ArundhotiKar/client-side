import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { value: "2500+", label: "Happy Pets" },
  { value: "1800+", label: "Families" },
  { value: "95%", label: "Success Stories" },
];

const CTASection = () => {
  return (
    <section className=" mt-5 py-20 px-4 bg-gradient-to-r from-orange-400 to-blue-500 dark:from-orange-700 dark:to-blue-800 text-white text-center transition-colors">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-md">
          Ready to Find Your Perfect Pet?
        </h2>
        <p className="text-lg mb-8 drop-shadow-sm">
          Join thousands of happy pet parents. Start your journey today!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
          <Link
            to="/pets"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600 transition"
          >
            Browse Pets
          </Link>
          <Link
            to="/add-listing"
            className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-orange-400 dark:hover:bg-gray-600 transition"
          >
            List Your Pet
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white dark:bg-gray-800 dark:text-white rounded-xl py-6 shadow-md hover:shadow-lg transition"
            >
              <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
