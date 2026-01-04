import React, { useEffect, useState, useContext } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateList = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [list, setList] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://assignment10-chi.vercel.app/addlist/${id}`)
            .then(res => setList(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!list) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white text-2xl">
                Loading...
            </div>
        );
    }

    const handleUpdate = (e) => {
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
            email: user?.email,
            createdAt: list?.createdAt
        };

        //console.log("UPDATED DATA →", formData);

        axios.put(`https://assignment10-chi.vercel.app/update/${id}`, formData)
            .then(res => {
                console.log(res.data);
                // Show success toast
                toast.success("✅ Update Successful!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition: Bounce,
                    theme: "light",
                });

                // Delay redirect so toast is visible
                setTimeout(() => {
                    navigate('/my-lists');
                }, 1000);

            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 py-10 px-4 flex items-center justify-center">
            <form onSubmit={handleUpdate} className="w-full max-w-xl bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/30 space-y-5 animate-fade-in">
                <h2 className="text-3xl text-white font-bold text-center mb-4 drop-shadow-lg">
                    Update Item
                </h2>

                {/* Product Name */}
                <div>
                    <label className="block text-white font-semibold mb-1">Product / Pet Name</label>
                    <input
                        defaultValue={list.name}
                        type="text"
                        name="name"
                        className="w-full border border-white/40 bg-white/30 text-white px-3 py-2 rounded-lg"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-white font-semibold mb-1">Category</label>
                    <select
                        name="category"
                        defaultValue={list.category}
                        className="w-full border border-white/40 bg-white/30 text-white px-3 py-2 rounded-lg"
                        required
                    >
                        <option value="Pets" className="text-black">Pets</option>
                        <option value="Pet Food" className="text-black">Pet Food</option>
                        <option value="Accessories" className="text-black">Accessories</option>
                        <option value="Care Products" className="text-black">Care Products</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-white font-semibold mb-1">Price</label>
                    <input
                        defaultValue={list.price}
                        type="number"
                        name="price"
                        className="w-full border border-white/40 bg-white/30 text-white px-3 py-2 rounded-lg"
                        required
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-white font-semibold mb-1">Location</label>
                    <input
                        defaultValue={list.location}
                        type="text"
                        name="location"
                        className="w-full border border-white/40 bg-white/30 text-white px-3 py-2 rounded-lg"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-white font-semibold mb-1">Description</label>
                    <textarea
                        defaultValue={list.description}
                        name="description"
                        className="w-full border border-white/40 bg-white/30 text-white h-24 px-3 py-2 rounded-lg"
                        required
                    ></textarea>
                </div>

                {/* Image */}
                <div>
                    <label className="block text-white font-semibold mb-1">Image URL</label>
                    <input
                        defaultValue={list.image}
                        type="url"
                        name="image"
                        className="w-full border border-white/40 bg-white/30 text-white px-3 py-2 rounded-lg"
                        required
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-white font-semibold mb-1">Pick Up Date</label>
                    <input
                        defaultValue={list.date}
                        type="date"
                        name="date"
                        className="w-full border border-white/40 bg-white/30 text-white px-3 py-2 rounded-lg"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-white font-semibold mb-1">Email</label>
                    <input
                        value={user?.email}
                        readOnly
                        className="w-full border border-white/40 bg-white/40 text-white px-3 py-2 rounded-lg"
                    />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-semibold py-3 rounded-lg shadow-md">
                    Update
                </button>

               
            </form>

            {/* ToastContainer */}
                        <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={true}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition={Bounce}
                        />
        </div>
    );
};

export default UpdateList;
