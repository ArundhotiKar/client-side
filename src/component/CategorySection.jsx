import React from "react";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Pets (Adoption)", icon: "🐶", value: "pets" },
    { name: "Pet Food", icon: "🍖", value: "food" },
    { name: "Accessories", icon: "🧸", value: "accessories" },
    { name: "Pet Care Products", icon: "💊", value: "care-products" },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category-filtered-product/${category}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Shop by <span className="text-orange-600">Category</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.value}
            onClick={() => handleCategoryClick(cat.value)}
            className="cursor-pointer bg-white shadow-lg p-6 rounded-xl flex flex-col items-center hover:bg-orange-50 hover:shadow-xl transition"
          >
            <div className="text-5xl mb-3">{cat.icon}</div>
            <p className="text-lg font-semibold text-gray-700 text-center">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
