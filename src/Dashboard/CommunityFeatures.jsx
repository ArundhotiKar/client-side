import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { AuthContext } from "../Provider/AuthProvider";

const CommunityFeatures = ({ userId: propUserId }) => {
    const { user } = useContext(AuthContext);
    const userId = user?.uid || propUserId;
    const userName = user?.displayName || (user?.email ? user.email.split("@")[0] : null);
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [reviewInput, setReviewInput] = useState({
        petOrProduct: "",
        rating: 5,
        comment: "",
        name: "",
    });

    const backendUrl = "https://assignment10-chi.vercel.app";

    // 🔹 Fetch all reviews
    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${backendUrl}/community/reviews`);
            setReviews(
                res.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // populate name if user is logged in
    useEffect(() => {
        if (userName) setReviewInput((s) => ({ ...s, name: userName }));
    }, [userName]);

    // 🔹 Submit review
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!reviewInput.petOrProduct || !reviewInput.comment) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            await axios.post(`${backendUrl}/community/review`, {
                ...reviewInput,
                userId,
                userName: userName || reviewInput.name || null,
            });

            toast.success("✅ Review submitted", {
                transition: Bounce,
            });

            setReviewInput({ petOrProduct: "", rating: 5, comment: "", name: userName || "" });
            setShowForm(false);
            fetchReviews();
        } catch (err) {
            toast.error("❌ Failed to submit review");
        }
    };

    return (
        <div className="space-y-6">

            {/* 🔹 Community Feed (UPPER PART) */}
            <section className="p-4  dark:bg-gray-900 rounded-lg shadow-md">
                <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Community Reviews</h3>

                {reviews.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to post!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reviews.map((r, i) => (
                            <div
                                key={i}
                                className="relative flex flex-col justify-between p-6 border rounded-2xl
             border-gray-200 dark:border-gray-700
              dark:bg-gray-900
             shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Item Title & Rating */}
                                <div className="mb-3">
                                    <p className="font-bold text-gray-900 dark:text-gray-100 text-lg truncate">
                                        {r.petOrProduct}
                                    </p>

                                    <div className="flex items-center mt-1 space-x-2">
                                        <span className={`text-yellow-500 font-semibold`}>
                                            {"⭐".repeat(r.rating)}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                                            ({r.rating}/5)
                                        </span>
                                    </div>
                                </div>

                                {/* Comment */}
                                <p className="text-gray-700 text-xl font-bold dark:text-gray-200 mb-4 line-clamp-4">
                                    {r.comment}
                                </p>

                                {/* User & Date */}
                                <div className="flex flex-wrap items-center justify-between text-md  dark:text-gray-400 gap-1">
                                    <span className=" text-md  dark:text-gray-300 font-medium truncate max-w-[70%]">
                                        {r.userName || r.userId}
                                    </span>
                                    <span className="italic whitespace-nowrap">
                                        {new Date(r.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                {/* Optional Rating Accent Border */}
                                <div
                                    className={`absolute top-0 left-0 h-full w-1 rounded-l-xl ${r.rating === 5
                                            ? "bg-green-500"
                                            : r.rating === 4
                                                ? "bg-lime-400"
                                                : r.rating === 3
                                                    ? "bg-yellow-400"
                                                    : r.rating === 2
                                                        ? "bg-orange-400"
                                                        : "bg-red-500"
                                        }`}
                                ></div>
                            </div>


                        ))}
                    </div>
                )}
            </section>

            {/* 🔹 Add Review Button */}
            <div className="text-center">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-6 py-2 rounded shadow-md hover:from-orange-600 hover:to-orange-500 transition"
                >
                    {showForm ? "Cancel" : "Add Review"}
                </button>
            </div>

            {/* 🔹 Review Form (SHOW ON CLICK) */}
            {showForm && (
                <section className="p-4  dark:bg-gray-900 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Write a Review</h3>

                    <form onSubmit={handleSubmitReview} className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Pet / Product ID"
                            value={reviewInput.petOrProduct}
                            onChange={(e) =>
                                setReviewInput({
                                    ...reviewInput,
                                    petOrProduct: e.target.value,
                                })
                            }
                            className="p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />

                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={reviewInput.rating}
                            onChange={(e) =>
                                setReviewInput({
                                    ...reviewInput,
                                    rating: parseInt(e.target.value) || 5,
                                })
                            }
                            className="p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />

                        <textarea
                            placeholder="Your review..."
                            value={reviewInput.comment}
                            onChange={(e) =>
                                setReviewInput({
                                    ...reviewInput,
                                    comment: e.target.value,
                                })
                            }
                            className="p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded shadow hover:from-green-600 hover:to-emerald-600 transition"
                        >
                            Submit
                        </button>
                    </form>
                </section>
            )}

            <ToastContainer />
        </div>
    );
};

export default CommunityFeatures;
