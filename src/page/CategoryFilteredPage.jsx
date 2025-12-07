import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip"; // ✅ named import
import "react-tooltip/dist/react-tooltip.css";

const CategoryFilteredPage = () => {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);
  const [recentList, setRecentList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/addlist")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) => item.category.toLowerCase() === categoryName.toLowerCase()
        );
        setRecentList(filtered);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-yellow-800 tracking-tight">
        Available <span className="text-blue-500">{categoryName}</span>
      </h1>

      {/* Tooltip wrapper */}
      <Tooltip id="tooltip" />

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-20">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {recentList.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            {/* IMAGE */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              <span
                data-tooltip-id="tooltip" // ✅ connect with Tooltip
                data-tooltip-content="Category Type"
                className="absolute bottom-4 right-4 px-3 py-1 text-sm font-semibold rounded-full shadow
                   bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
              >
                {item.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition">
                {item.name}
              </h2>

              {item.price === 0 ? (
                <p className="text-green-600 font-semibold text-lg">
                  Free for Adoption
                </p>
              ) : (
                <p className="text-gray-900 dark:text-gray-200 font-semibold text-lg">
                  ${item.price}
                </p>
              )}

              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                <span className="text-xl">📍</span>
                <span className="font-medium">{item.location}</span>
              </p>

              <Link
                to={`/listing/${item._id}`}
                className="block w-full mt-4 py-2.5 bg-blue-600 text-center text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilteredPage;
