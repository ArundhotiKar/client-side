import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentList = () => {
  const [recentList, setRecentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assignment10-chi.vercel.app/addlist?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setRecentList(data)
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto mt-6">
      <h1 className="text-5xl font-bold mb-10 text-orange-600 tracking-tight text-center">
        Recent Added
      </h1>

      {/* 🔄 Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-20">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {recentList.slice(-6).map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* IMAGE SECTION */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Category tag */}
              <span className="absolute bottom-4 right-4 px-3 py-1 text-sm font-semibold rounded-full shadow
  bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100">
                {item.category}
              </span>
            </div>

            {/* CONTENT SECTION */}
            <div className="p-5 space-y-3">
              {/* Name */}
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                {item.name}
              </h2>

              {/* Price */}
              {item.price === 0 ? (
                <p className="text-green-600 font-semibold text-lg">
                  Free for Adoption
                </p>
              ) : (
                <p className="text-gray-900 font-semibold text-lg">${item.price}</p>
              )}

              {/* Location */}
              <p className="text-gray-600 flex items-center gap-1">
                <span className="text-xl">📍</span>
                <span className="font-medium">{item.location}</span>
              </p>

              {/* BUTTON */}
              <button
                onClick={() => (window.location.href = `/listing/${item._id}`)}

                className="w-full mt-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
              >
                <Link to={`/listing/${item._id}`}>
                  See Details
                </Link>

              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentList;
