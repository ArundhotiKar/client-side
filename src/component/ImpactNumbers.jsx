import React, { useEffect, useState } from "react";

const stats = [
  { icon: "🐾", value: 2500, label: "Happy Pets" },
  { icon: "❤️", value: 1800, label: "Loving Families" },
  { icon: "⭐", value: 95, label: "Success Stories", suffix: "%" },
  { icon: "🛍️", value: 500, label: "Pet Supplies" },
];

const ImpactNumbers = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < stat.value) {
            newCounts[index] += Math.ceil(stat.value / 50); // speed
          }
          if (newCounts[index] > stat.value) newCounts[index] = stat.value;
          return newCounts;
        });
      }, 50);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
        <p className="text-lg mb-12">
          Join thousands of happy pet parents who found their perfect companion through PawMart
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-black/20 transition-transform hover:scale-105">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">
                {counts[index]}
                {stat.suffix || ""}
              </div>
              <div className="text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbers;
