import React from "react";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Pets (Adoption)", icon: "🐶", value: "pets", nav: "pets" },
    { name: "Pet Food", icon: "🍖", value: "food", nav: "Pet Food" },
    { name: "Accessories", icon: "🧸", value: "accessories", nav: "Accessories" },
    { name: "Pet Care Products", icon: "💊", value: "care-products", nav: "Care Products" },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category-filtered-product/${category}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-12">
      <h2 className="text-5xl font-bold mb-12 text-center">
        Shop by <span className="text-orange-600">Category</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategoryClick(cat.nav)}
            className="cursor-pointer relative bg-gradient-to-br from-orange-100 to-orange-50 shadow-2xl rounded-3xl p-8 flex flex-col items-center justify-center transition duration-500 hover:scale-105 hover:shadow-3xl h-96"
          >
            {/* Icon circle */}
            <div className="bg-white w-28 h-28 rounded-full flex items-center justify-center text-9xl mb-6 shadow-lg">
              {cat.icon}
            </div>

            {/* Card title */}
            <p className="text-2xl font-bold text-gray-800 text-center">
              {cat.name}
            </p>

            {/* Animated underline on hover */}
            <span className="block w-16 h-1 bg-orange-500 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
