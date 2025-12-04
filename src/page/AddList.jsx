import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const AddList = () => {
    const { user } = use(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const price = parseInt(form.price.value);
        const location = form.location.value;
        const description = form.description.value;
        const image = form.image.value;
        const date = form.date.value;
        const email = form.email.value;

        const formData={
            name,
            category,
            price,
            location,
            description,
            image,
            date,
            email
        }
        //console.log(formData);

        axios.post('http://localhost:5000/addlist', formData)
        .then(res => {

            //server the astise
            console.log(res);
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 py-10 px-4 flex items-center justify-center">

            <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/30 space-y-5 animate-fade-in">

                <h2 className="text-3xl text-white font-bold text-center mb-4 drop-shadow-lg">
                    Add New Item
                </h2>

                {/* Product / Pet Name */}
                <div>
                    <label className="block text-white font-semibold mb-1">Product / Pet Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border border-white/40 bg-white/30 text-white placeholder-white/70 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        placeholder="Enter name"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-white font-semibold mb-1">Category</label>
                    <select
                        name="category"
                        className="w-full border border-white/40 bg-white/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        required
                    >
                        <option className="text-black">Pets</option>
                        <option className="text-black">Food</option>
                        <option className="text-black">Accessories</option>
                        <option className="text-black">Care Products</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-white font-semibold mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="w-full border border-white/40 bg-white/30 text-white placeholder-white/70 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        placeholder="Enter price (0 for Pets)"
                        required
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-white font-semibold mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        className="w-full border border-white/40 bg-white/30 text-white placeholder-white/70 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        placeholder="City / Area"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-white font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        className="w-full border border-white/40 bg-white/30 text-white placeholder-white/70 h-24 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        placeholder="Write details..."
                        required
                    ></textarea>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-white font-semibold mb-1">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        className="w-full border border-white/40 bg-white/30 text-white placeholder-white/70 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>

                {/* Pick Up Date */}
                <div>
                    <label className="block text-white font-semibold mb-1">Pick Up Date</label>
                    <input
                        type="date"
                        name="date"
                        className="w-full border border-white/40 bg-white/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        required
                    />
                </div>

                {/* Email (Readonly) */}
                <div>
                    <label className="block text-white font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full border border-white/40 bg-white/40 text-white px-3 py-2 rounded-lg cursor-not-allowed"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-semibold py-3 rounded-lg shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                >
                    Add
                </button>

            </form>
        </div>
    );
};

export default AddList;
