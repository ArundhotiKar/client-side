import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navber = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logout Successful!"))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 64 64" fill="#ff7f00">
            <circle cx="20" cy="20" r="8" />
            <circle cx="44" cy="20" r="8" />
            <circle cx="26" cy="40" r="6" />
            <circle cx="38" cy="40" r="6" />
            <circle cx="32" cy="50" r="10" />
          </svg>
          <h1 className="text-3xl font-bold text-orange-600">
            Paw<span className="text-blue-600">Mart</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-lg font-medium">
          <Link to="/" className="hover:text-orange-600 transition">Home</Link>
          <Link to="/pets" className="hover:text-orange-600 transition">Pets & Supplies</Link>

          {/* Logged-in only links */}
          {user && (
            <>
              <Link to="/add-listing" className="hover:text-orange-600">Add Listing</Link>
              <Link to="/my-listings" className="hover:text-orange-600">My Listings</Link>
              <Link to="/my-orders" className="hover:text-orange-600">My Orders</Link>
            </>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  className="w-12 h-12 rounded-full border object-cover"
                  alt="profile"
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-amber-700 text-white text-sm px-4 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {user.displayName}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 text-lg">Login</Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 text-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Icon */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center bg-white pb-6 pt-2">

          <Link to="/" className="py-3 text-lg hover:text-orange-600">Home</Link>
          <Link to="/pets" className="py-3 text-lg hover:text-orange-600">Pets & Supplies</Link>

          {/* Logged-in only */}
          {user && (
            <>
              <Link to="/add-listing" className="py-3 text-lg hover:text-orange-600">Add Listing</Link>
              <Link to="/my-listings" className="py-3 text-lg hover:text-orange-600">My Listings</Link>
              <Link to="/my-orders" className="py-3 text-lg hover:text-orange-600">My Orders</Link>

              <img
                src={user.photoURL || "/default-avatar.png"}
                className="w-20 h-20 rounded-full border my-4 object-cover"
                alt="profile"
              />
              <p className="text-base font-medium mb-3">{user.displayName}</p>

              <button
                onClick={handleLogout}
                className="py-3 text-white bg-red-600 px-6 rounded-md hover:bg-red-700 text-lg"
              >
                Logout
              </button>
            </>
          )}

          {/* If not logged in */}
          {!user && (
            <>
              <Link to="/login" className="py-3 text-lg hover:text-blue-600">Login</Link>
              <Link
                to="/register"
                className="py-3 bg-blue-600 text-white px-6 rounded-md hover:bg-blue-700 text-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navber;
