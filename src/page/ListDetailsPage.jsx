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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

            {/* FORM */}
            <form className="space-y-4">
              <div>
                <label className="font-medium">Buyer Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full border px-3 py-2 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full border px-3 py-2 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="font-medium">Product ID</label>
                <input
                  type="text"
                  value={list._id}
                  readOnly
                  className="w-full border px-3 py-2 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="font-medium">Product Name</label>
                <input
                  type="text"
                  value={list.name}
                  readOnly
                  className="w-full border px-3 py-2 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="font-medium">Quantity</label>
                <input
                  type="number"
                  value={list.category.toLowerCase() === "pet" ? 1 : 1}
                  readOnly={list.category.toLowerCase() === "pet"}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium">Price</label>
                <input
                  type="text"
                  value={list.price}
                  readOnly
                  className="w-full border px-3 py-2 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium">Pickup Date</label>
                <input
                  type="date"
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium">Additional Notes</label>
                <textarea
                  placeholder="Write any notes (optional)"
                  className="w-full border px-3 py-2 rounded-lg"
                ></textarea>
              </div>
            </form>

            {/* BUTTONS */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-2 bg-gray-300 rounded-xl hover:bg-gray-400"
              >
                Cancel
              </button>

              <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListDetailsPage;
