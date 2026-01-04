import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const PetSupplyPage = () => {
    const [loading, setLoading] = useState(true);
    const [recentList, setRecentList] = useState([]);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetch("https://assignment10-chi.vercel.app/addlist")
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

    // Filter by category AND name
    const filteredList = recentList.filter((item) => {
        const categoryMatch = category === "All" || item.category === category;
        const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        <div className="px-6 py-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-yellow-800 tracking-tight dark:text-amber-300">
                Available Pets & Supplies
            </h1>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 border rounded-lg 
                    bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <select
                    className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Pets">🐶 Pets (Adoption)</option>
                    <option value="Pet Food">🍖 Pet Food</option>
                    <option value="Accessories">🧸 Accessories</option>
                    <option value="Care Products">💊Care Products</option>
                </select>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="flex justify-center my-20">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            )}

            {/* List */}
            {!loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {filteredList.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.3, duration: 0.5 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* IMAGE */}
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                                {/* Tooltip target */}
                                <span
                                    data-tooltip-id={`tip-${item._id}`}
                                    data-tooltip-content={`Category: ${item.category}`}
                                    className="absolute bottom-4 right-4 px-3 py-1 text-sm font-semibold rounded-full shadow
                                    bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                                >
                                    {item.category}
                                </span>

                                {/* Tooltip Component */}
                                <ReactTooltip id={`tip-${item._id}`} place="top" effect="solid" />
                            </div>

                            {/* CONTENT */}
                            <div className="p-5 space-y-3">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition">
                                    {item.name}
                                </h2>

                                {item.price === 0 ? (
                                    <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
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
                                    className="block w-full mt-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-center text-white font-semibold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}

                    {filteredList.length === 0 && (
                        <p className="text-center col-span-full text-gray-600 dark:text-gray-300 text-lg">
                            No items found matching your search.
                        </p>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default PetSupplyPage;
