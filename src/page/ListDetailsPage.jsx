import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ListDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [list, setList] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://assignment10-chi.vercel.app/addlist/${encodeURIComponent(id)}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Request failed: ${res.status} ${res.statusText} - ${text}`);
        }
        const data = await res.json();
        if (mounted) {
          if (!data || Object.keys(data).length === 0) {
            setError("No item found for this id.");
          } else {
            setList(data);
            setQuantity(data.category?.toLowerCase() === "pets" ? 1 : 1);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch list:", err);
        if (mounted) {
          setError(err.message || "Failed to load item");
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="flex justify-center my-20">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
  </div>;
  if (error)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
        <p className="text-sm text-gray-600 mt-2">Check the server/API and the console for details.</p>
      </div>
    );

  const handleOrder = async (e) => {
    e.preventDefault();
    const form = e.target;
    const qty = parseInt(quantity) || 1;

    const orderData = {
      buyerName: user?.displayName || "",
      email: user?.email || "",
      listingId: list._id,
      listingName: list.name,
      quantity: list.category?.toLowerCase() === "pets" ? 1 : qty,
      price: list.price * (list.category?.toLowerCase() === "pets" ? 1 : qty),
      address: form.address?.value || "",
      pickupDate: form.date?.value || "",
      phone: form.phone?.value || "",
      notes: form.notes?.value || "",
    };

    try {
      await axios.post("https://assignment10-chi.vercel.app/addoder", orderData);

      toast.success("✅ Order successfully confirm", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        theme: "light",
      });

      setTimeout(() => setOpenModal(false), 1500);
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        transition: Bounce,
        theme: "light",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* MAIN WRAPPER */}
      <div className="mt-6  dark:from-[#101010] dark:to-[#0A0A0A] 
              p-6 rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/50">

        {/* IMAGE WITH BORDER & HOVER */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <img
            src={list.image}
            alt={list.name}
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold mt-5  dark:text-amber-200 tracking-tight">
          {list?.name}
        </h1>

        {/* CATEGORY ROW */}
        <div className="mt-2 flex items-center gap-2  dark:text-amber-200">
          <span className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-800 font-medium">
            {list?.category}
          </span>
        </div>

        {/* OWNER EMAIL */}
        <div className="mt-4 flex items-center gap-3  dark:text-amber-200">
          <span className="text-xl">👤</span>
          <p className="text-lg font-medium">Owner: {list?.email}</p>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-4  dark:text-amber-200 leading-relaxed">
          {list?.description}
        </p>

        {/* PRICE BOX */}
        <div className="mt-6 p-5 rounded-2xl  dark:bg-gray-800 border border-gray-300/40 dark:border-gray-600/40 shadow-inner">
          {list?.price === 0 ? (
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 text-center">
              Free for Adoption
            </p>
          ) : (
            <p className="text-3xl font-extrabold text-center">
              <span className="text-blue-600 dark:text-blue-400">${list?.price}</span>
            </p>
          )}
        </div>

        {/* LOCATION */}
        <div className="mt-4 flex items-center gap-3 text-lg  dark:text-amber-200">
          <span className="text-xl">📍</span>
          <span className="font-semibold">{list?.location}</span>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => {
            setQuantity(1);
            setOpenModal(true);
          }}
          className="w-full mt-6 py-3 text-lg font-semibold rounded-xl
               bg-gradient-to-r from-indigo-600 to-blue-600
               hover:from-indigo-700 hover:to-blue-700
               text-white shadow-lg hover:shadow-xl
               transition duration-300 transform hover:scale-[1.03]"
        >
          🛒 Adopt / Order Now
        </button>
      </div>

      {/* ORDER MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="relative bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto">

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-200 hover:text-black dark:hover:text-white text-2xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Confirm Your Order
            </h2>

            <form onSubmit={handleOrder} className="space-y-4 sm:space-y-5">
              {/* Buyer Name */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200">Buyer Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Listing ID */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200">Listing ID</label>
                <input
                  type="text"
                  value={list._id}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Listing Name */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200">Listing Name</label>
                <input
                  type="text"
                  value={list.name}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  readOnly={list.category?.toLowerCase() === "pets"}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  className="w-full border p-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200">Price</label>
                <input
                  type="text"
                  value={list.price * quantity}
                  readOnly
                  className="w-full border p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="w-full border p-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Pickup Date */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200">Pickup Date</label>
                <input
                  type="date"
                  name="date"
                  className="w-full border p-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full border p-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Additional Notes */}
              <div className="flex flex-col sm:flex-row items-start sm:items-start gap-3 sm:gap-5">
                <label className="w-40 font-semibold text-gray-700 dark:text-gray-200 mt-1">Additional Notes</label>
                <textarea
                  name="notes"
                  placeholder="Write any notes (optional)"
                  rows={3}
                  className="w-full border p-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-5">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-5 py-2 bg-gray-300 dark:bg-gray-700 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Confirm Order
                </button>
              </div>
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
        </div>
      )}

    </div>
  );
};

export default ListDetailsPage;