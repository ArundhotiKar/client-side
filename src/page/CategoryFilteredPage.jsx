import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryFilteredPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter category
        const filtered = data.filter(
          (item) =>
            item.category.toLowerCase() === categoryName.toLowerCase()
        );
        setProducts(filtered);
      });
  }, [categoryName]);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Explore our selection of
        <span className="text-orange-600"> {categoryName}</span>
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600 font-semibold">{item.price} USD</p>
              <p className="text-sm mt-2 text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilteredPage;
