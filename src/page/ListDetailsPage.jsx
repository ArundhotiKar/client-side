import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ListDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
        const res = await fetch(`http://localhost:5000/addlist/${encodeURIComponent(id)}`);
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

  if (loading) return <div className="text-center text-xl py-10">Loading...</div>;
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
      await axios.post("http://localhost:5000/addoder", orderData);

      toast.success("✅ Oder successfully confirm", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
        theme: "light",
      });

      setTimeout(() => setOpenModal(false), 1000);
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
      {/* IMAGE */}
      <img src={list.image} alt={list.name} className="w-full h-80 object-cover rounded-3xl shadow-lg" />

      {/* DETAILS */}
      <h1 className="text-4xl font-bold mt-6">{list.name}</h1>
      <p className="text-lg text-gray-600 mt-2">Category: {list.category}</p>
      <p className="text-lg text-gray-600">Owner Email: {list.email}</p>
      <p className="mt-4 text-gray-700 leading-relaxed">{list.description}</p>
      <p className="text-2xl font-semibold mt-4">
        {list.price === 0 ? <span className="text-green-600">Free for Adoption</span> : <>Price: ${list.price}</>}
      </p>
      <p className="text-lg text-gray-700 mt-2">
        📍 Location: <span className="font-medium">{list.location}</span>
      </p>

      {/* ORDER BUTTON */}
      <button
        onClick={() => {
          setQuantity(list.category?.toLowerCase() === "pets" ? 1 : 1);
          setOpenModal(true);
        }}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition"
      >
        🛒 Adopt / Order Now
      </button>

      {/* ORDER MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="relative bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm Your Order</h2>

            <form onSubmit={handleOrder} className="space-y-5">
              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Buyer Name</label>
                <input type="text" value={user?.displayName || ""} readOnly className="w-full border p-2.5 rounded-xl bg-gray-100" />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Email</label>
                <input type="email" value={user?.email || ""} readOnly className="w-full border p-2.5 rounded-xl bg-gray-100" />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Listing ID</label>
                <input type="text" value={list._id} readOnly className="w-full border p-2.5 rounded-xl bg-gray-100" />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Listing Name</label>
                <input type="text" value={list.name} readOnly className="w-full border p-2.5 rounded-xl bg-gray-100" />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  readOnly={list.category?.toLowerCase() === "pets"}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={1}
                  className="w-full border p-2.5 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Price</label>
                <input type="text" value={list.price * quantity} readOnly className="w-full border p-2.5 rounded-xl bg-gray-100" />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Address</label>
                <input type="text" name="address" placeholder="Enter your address" className="w-full border p-2.5 rounded-xl" />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Pickup Date</label>
                <input type="date" name="date" className="w-full border p-2.5 rounded-xl" />
              </div>

              <div className="flex items-center gap-5">
                <label className="w-40 font-semibold">Phone</label>
                <input type="text" name="phone" placeholder="Enter your phone number" className="w-full border p-2.5 rounded-xl" />
              </div>

              <div className="flex items-start gap-5">
                <label className="w-40 font-semibold mt-1">Additional Notes</label>
                <textarea name="notes" placeholder="Write any notes (optional)" rows={3} className="w-full border p-2.5 rounded-xl" />
              </div>

              <div className="mt-6 flex justify-between">
                <button type="button" onClick={() => setOpenModal(false)} className="px-5 py-2 bg-gray-300 rounded-xl hover:bg-gray-400">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
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

            <button type="button" onClick={() => setOpenModal(false)} className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListDetailsPage;
