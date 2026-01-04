import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navber = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  // Dark mode state
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logout Successful!"))
      .catch((err) => console.error(err));
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-orange-600 dark:text-orange-400 font-semibold"
      : " dark:text-white hover:text-orange-600 dark:hover:text-orange-300";

  return (
    <nav className="w-full dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
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
          <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            Paw<span className="text-blue-600 dark:text-blue-400">Mart</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-lg font-medium">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/pets" className={isActive("/pets")}>Pets & Supplies</Link>
          {user && (
            <>
              <Link to="/add-listing" className={isActive("/add-listing")}>Add Listing</Link>
              <Link to="/my-lists" className={isActive("/my-lists")}>My Listings</Link>
              <Link to="/my-orders" className={isActive("/my-orders")}>My Orders</Link>
            </>
          )}
        </div>

        {/* Desktop Auth + Dark Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <>
              <div className="relative group">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-12 h-12 rounded-full border object-cover"
                  alt="profile"
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-amber-700 text-white text-sm px-4 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {user.displayName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-600 px-5 py-2 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive("/login")}>Login</Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-md text-lg text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Icon */}
        {/* Mobile Icon */}
        <button
          className="md:hidden p-2 rounded-full text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[600px]" : "max-h-0"
          }`}
      >
        {/* Ensure dropdown background and text adapt to theme; make links full-width with hover states */}
        <div className="flex flex-col items-center  dark:bg-gray-900  dark:text-gray-100 pb-6 pt-2 w-full">
          {/* Menu Items */}
          <Link to="/" className={`w-full py-3 text-lg text-center ${isActive("/")} dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800`}>Home</Link>
          <Link to="/pets" className={`w-full py-3 text-lg text-center ${isActive("/pets")} dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800`}>Pets & Supplies</Link>
          {user && (
            <>
              <Link to="/add-listing" className={`w-full py-3 text-lg text-center ${isActive("/add-listing")} dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800`}>Add Listing</Link>
              <Link to="/my-lists" className={`w-full py-3 text-lg text-center ${isActive("/my-lists")} dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800`}>My Listings</Link>
              <Link to="/my-orders" className={`w-full py-3 text-lg text-center ${isActive("/my-orders")} dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800`}>My Orders</Link>

              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                className="w-20 h-20 rounded-full border my-4 object-cover"
                alt="profile"
              />
              <p className="text-base font-medium mb-3 dark:text-white">{user.displayName}</p>

              <button
                onClick={handleLogout}
                className="w-11/12 py-3 text-white bg-red-600 dark:bg-red-700 px-6 rounded-md hover:bg-red-700 dark:hover:bg-red-600 text-lg transition"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className={`w-full py-3 text-lg text-center ${isActive("/login")} dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800`}>Login</Link>
              <Link
                to="/register"
                className="w-11/12 py-3 px-6 rounded-md text-lg text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 transition text-center"
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
