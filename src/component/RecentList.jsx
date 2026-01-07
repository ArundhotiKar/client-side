import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentList = () => {
  const [recentList, setRecentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assignment10-chi.vercel.app/addlist?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setRecentList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className=" py-10 max-w-7xl mx-auto mt-6">
      <h1 className="text-5xl font-bold mb-10 text-orange-600 tracking-tight text-center">
        Recent Added
      </h1>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-20">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentList.slice(-6).map((item) => (
            <div
              key={item._id}
              className="rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-52 md:h-56 lg:h-60 overflow-hidden rounded-t-3xl flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span className="absolute bottom-3 right-3 px-2 py-1 text-xs font-semibold rounded-full shadow
      bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100">
                  {item.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold  dark:text-white group-hover:text-blue-600 transition">
                    {item.name}
                  </h2>

                  {item.price === 0 ? (
                    <p className="text-green-600 dark:text-green-400 font-semibold text-base">
                      Free for Adoption
                    </p>
                  ) : (
                    <p className=" dark:text-gray-200 font-semibold text-base">
                      ${item.price}
                    </p>
                  )}

                  <p className=" dark:text-gray-300 flex items-center gap-1 text-sm mt-1">
                    <span className="text-lg">📍</span>
                    <span className="font-medium">{item.location}</span>
                  </p>
                </div>

                <Link
                  to={`/listing/${item._id}`}
                  className="block w-full mt-3 py-2 bg-blue-600 text-center text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                >
                  See Details
                </Link>
              </div>
            </div>

          ))}

          {recentList.length === 0 && (
            <p className="text-center col-span-full text-gray-600 dark:text-gray-300 text-lg">
              No recent items found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentList;
