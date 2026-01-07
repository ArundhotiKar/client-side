import React from "react";

const features = [
  {
    icon: "🏠",
    title: "Find Your Perfect Match",
    description: "Browse through hundreds of adorable pets waiting for their forever home",
  },
  {
    icon: "✅",
    title: "Verified Listings",
    description: "All pet listings are verified to ensure safety and authenticity",
  },
  {
    icon: "💬",
    title: "Direct Communication",
    description: "Connect directly with pet owners and sellers instantly",
  },
  {
    icon: "🛡️",
    title: "Safe & Secure",
    description: "Your data and transactions are protected with top-level security",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description: "Access PawMart anytime, anywhere from any device",
  },
  {
    icon: "🎯",
    title: "Smart Filters",
    description: "Find exactly what you're looking for with advanced search options",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
        <p className="text-lg mb-12">Discover the features that make PawMart the perfect platform for pet lovers</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-black/20 transition-transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
