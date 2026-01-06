import React from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const AddList = () => {
    const { user } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = {
            name: form.name.value,
            category: form.category.value,
            price: parseInt(form.price.value),
            location: form.location.value,
            description: form.description.value,
            image: form.image.value,
            date: form.date.value,
            email: form.email.value
        };

        axios.post('https://assignment10-chi.vercel.app/addlist', formData)
            .then(() => {
                toast.success("✅ Adding Successful!", {
                    icon: false,
                    className:
                        "border-l-4 border-green-500 " +
                        "bg-white dark:bg-gray-800 " +
                        "text-gray-800 dark:text-gray-100 " +
                        "shadow-lg rounded-lg",
                });
                setTimeout(() => navigate('/'), 1000);
            })
            .catch(() => {
                toast.error("❌ Something went wrong!", {
                    icon: false,
                    className:
                        "border-l-4 border-red-500 " +
                        "bg-white dark:bg-gray-800 " +
                        "text-gray-800 dark:text-gray-100 " +
                        "shadow-lg rounded-lg",
                });
            });

    };

    return (
        <div className="min-h-screen py-12 px-4 flex items-center justify-center
 bg-gradient-to-br from-orange-50 via-yellow-50 to-white
 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-800
 transition-colors duration-300">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl p-8 rounded-2xl
                bg-white dark:bg-gray-800
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                dark:shadow-xl
                border border-orange-100 dark:border-gray-700
                space-y-5 transition-all"
            >
                <h2 className="text-3xl font-bold text-center mb-6
                    text-gray-800 dark:text-gray-100">
                    Add New Item
                </h2>

                {/* Product / Pet Name */}
                <div>
                    <label className="block font-semibold mb-1
                        text-gray-700 dark:text-gray-300">
                        Product / Pet Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter name"
                        className="w-full px-4 py-2.5 rounded-lg
                        bg-white dark:bg-gray-700
                        border border-gray-300 dark:border-gray-600
                        text-gray-800 dark:text-gray-100
                        placeholder-gray-400
                        focus:outline-none focus:ring-2
                        focus:ring-orange-400 transition"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-semibold mb-1
                        text-gray-700 dark:text-gray-300">
                        Category
                    </label>
                    <select
                        name="category"
                        required
                        className="w-full px-4 py-2.5 rounded-lg
                        bg-white dark:bg-gray-700
                        border border-gray-300 dark:border-gray-600
                        text-gray-800 dark:text-gray-100
                        focus:outline-none focus:ring-2
                        focus:ring-orange-400 transition"
                    >
                        <option className="text-black">Pets</option>
                        <option className="text-black">Pet Food</option>
                        <option className="text-black">Accessories</option>
                        <option className="text-black">Care Products</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block font-semibold mb-1
                        text-gray-700 dark:text-gray-300">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        required
                        placeholder="Enter price (0 for Pets)"
                        className="w-full px-4 py-2.5 rounded-lg
                        bg-white dark:bg-gray-700
                        border border-gray-300 dark:border-gray-600
                        text-gray-800 dark:text-gray-100
                        placeholder-gray-400
                        focus:outline-none focus:ring-2
                        focus:ring-orange-400 transition"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold mb-1
                        text-gray-700 dark:text-gray-300">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        required
                        placeholder="City / Area"
                        className="w-full px-4 py-2.5 rounded-lg
                        bg-white dark:bg-gray-700
                        border border-gray-300 dark:border-gray-600
                        text-gray-800 dark:text-gray-100
                        placeholder-gray-400
                        focus:outline-none focus:ring-2
                        focus:ring-orange-400 transition"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1
                        text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea
                        name="description"
                        required
                        placeholder="Write details..."
                        className="w-full h-28 px-4 py-2.5 rounded-lg
                        bg-white dark:bg-gray-700
                        border border-gray-300 dark:border-gray-600
                        text-gray-800 dark:text-gray-100
                        placeholder-gray-400
                        focus:outline-none focus:ring-2
                        focus:ring-orange-400 transition"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block font-semibold mb-1
                        text-gray-700 dark:text-gray-300">
                        Image URL
                    </label>
                    <input
                        type="url"
                        name="image"
                        required
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2.5 rounded-lg
                        bg-white dark:bg-gray-700
                        border border-gray-300 dark:border-gray-600
                        text-gray-800 dark:text-gray-100
                        placeholder-gray-400
                        focus:outline-none focus:ring-2
                        focus:ring-orange-400 transition"
                    />
                </div>

                {/* Pick Up Date */}
                <div>
                    <label className="block font-semibold mb-1
                        text-gray-700 dark:text-gray-300">
                        Pick Up Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        required
                        className="w-full px-4 py-2.5 rounded-lg
                        bg-white dark:bg-gray-700
                        border border-gray-300 dark:border-gray-600
                        text-gray-800 dark:text-gray-100
                        focus:outline-none focus:ring-2
                        focus:ring-orange-400 transition"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-semibold mb-1
                        text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full px-4 py-2.5 rounded-lg
                        bg-orange-50 dark:bg-gray-600
                        text-gray-700 dark:text-gray-200
                        cursor-not-allowed"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 mt-4 rounded-lg font-semibold
                    bg-gradient-to-r from-orange-400 to-yellow-400
                    text-black shadow-lg
                    hover:shadow-xl hover:scale-[1.02]
                    active:scale-95 transition-all"
                >
                    Add
                </button>
            </form>


        </div>
    );
};

export default AddList;
