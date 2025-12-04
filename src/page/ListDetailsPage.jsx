import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const ListDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // ⭐ User info from context

  const [list, setList] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/addlist/${encodeURIComponent(id)}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Request failed: ${res.status} ${res.statusText} - ${text}`);
        }
        const data = await res.json();
        if (mounted) {
          if (!data || Object.keys(data).length === 0) {
            setError('No item found for this id.');
          } else {
            setList(data);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch list:', err);
        if (mounted) {
          setError(err.message || 'Failed to load item');
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
        <p className="text-sm text-gray-600 mt-2">Check the server/API and the console for details.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* IMAGE */}
      <img
        src={list.image}
        alt={list.name}
        className="w-full h-80 object-cover rounded-3xl shadow-lg"
      />

      {/* DETAILS */}
      <h1 className="text-4xl font-bold mt-6">{list.name}</h1>
      <p className="text-lg text-gray-600 mt-2">Category: {list.category}</p>
      <p className="text-lg text-gray-600">Owner Email: {list.email}</p>
      <p className="mt-4 text-gray-700 leading-relaxed">{list.description}</p>

      <p className="text-2xl font-semibold mt-4">
        {list.price === 0 ? (
          <span className="text-green-600">Free for Adoption</span>
        ) : (
          <>Price: ${list.price}</>
        )}
      </p>

      <p className="text-lg text-gray-700 mt-2">
        📍 Location: <span className="font-medium">{list.location}</span>
      </p>

      {/* BUTTON */}
      <button
        onClick={() => setOpenModal(true)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition"
      >
        🛒 Adopt / Order Now
      </button>

      {/* =========================
          ORDER MODAL
      ========================== */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

          <div className="relative bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl max-h-[85vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm Your Order</h2>

            <form className="space-y-5">

              {/* Buyer Name */}
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Buyer Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100"
                />
              </div>

              {/* Listing ID */}
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Listing ID</label>
                <input
                  type="text"
                  value={list._id}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100"
                />
              </div>

              {/* Product/Listing Name */}
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Listing Name</label>
                <input
                  type="text"
                  value={list.name}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100"
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Quantity</label>
                <input
                  type="number"
                  value={list.category?.toLowerCase() === "pet" ? 1 : ""}
                  readOnly={list.category?.toLowerCase() === "pet"}
                  placeholder="Enter quantity"
                  className="w-full border p-2.5 rounded-xl"
                />
              </div>

              {/* Price */}
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Price</label>
                <input
                  type="text"
                  value={list.price}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100"
                />
              </div>

              {/* Address */}
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full border p-2.5 rounded-xl"
                />
              </div>

              {/* Date */}
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Pickup Date</label>
                <input
                  type="date"
                  className="w-full border p-2.5 rounded-xl"
                />
              </div>

              {/* Phone */}
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Phone</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full border p-2.5 rounded-xl"
                />
              </div>

              {/* Notes */}
              <div className="flex items-start gap-5">
                <label className="w-40 font-semibold mt-1">Additional Notes</label>
                <textarea
                  placeholder="Write any notes (optional)"
                  rows={3}
                  className="w-full border p-2.5 rounded-xl"
                ></textarea>
              </div>

            </form>

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-2 bg-gray-300 rounded-xl hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Confirm Order
              </button>
            </div>

            {/* Close X Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default ListDetailsPage;
