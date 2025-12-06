import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PetSupplyPage = () => {
    const [loading, setLoading] = useState(false);
    const [recentList, setRecentList] = useState([]);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        setLoading(true); // start loading

        fetch("http://localhost:5000/addlist")
            .then((res) => res.json())
            .then((data) => {
                setRecentList(data);
                setLoading(false); // ⬅️ stop loading when data arrives
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Filter list by category
    const filteredList = recentList.filter(
        (item) => category === "All" || item.category === category
    );

    return (
        <div className="px-6 py-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-yellow-800 tracking-tight">
                Available Pets & Supplies
            </h1>

            {/* Filter */}
            <div className="flex justify-end mb-8">
                <select
                    className="px-4 py-2 border rounded-lg"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Pets">🐶 Pets (Adoption)</option>
                    <option value="Pet Food">🍖 Pet Food</option>
                    <option value="Accessories">🧸 Accessories</option>
                    <option value="Pet Care Products">💊 Pet Care Products</option>
                </select>
            </div>

            {/* 🔄 Loading Spinner */}
            {loading && (
                <div className="flex justify-center my-20">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            )}

            {/* Grid (Hide while loading) */}
            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredList.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* IMAGE */}
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-semibold rounded-full shadow">
                                    {item.category}
                                </span>
                            </div>

                            {/* CONTENT */}
                            <div className="p-5 space-y-3">
                                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                                    {item.name}
                                </h2>

                                {item.price === 0 ? (
                                    <p className="text-green-600 font-semibold text-lg">
                                        Free for Adoption
                                    </p>
                                ) : (
                                    <p className="text-gray-900 font-semibold text-lg">${item.price}</p>
                                )}

                                <p className="text-gray-600 flex items-center gap-1">
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PetSupplyPage;
