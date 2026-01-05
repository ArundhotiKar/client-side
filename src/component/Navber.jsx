import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navber = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

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
      : "hover:text-orange-600 dark:hover:text-orange-300";

  return (
    <nav className="w-full dark:bg-gray-900 shadow-md top-0 z-50">
      <div className="max-w-8xl mx-auto flex items-center justify-between py-4 px-6">
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

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Profile Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-8 h-8 rounded-full border"
                  alt="profile"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg overflow-hidden z-50">
                  <div className="flex flex-col items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <img
                      src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      className="w-16 h-16 rounded-full border mb-2"
                      alt="profile"
                    />
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{user.displayName}</p>
                  </div>
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={isActive("/login")}>Login</Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Icon */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all ${open ? "max-h-[700px]" : "max-h-0"} overflow-hidden`}>
        <div className="flex flex-col items-center dark:bg-gray-900 pb-6 w-full">
          <Link to="/" className="w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">Home</Link>
          <Link to="/pets" className="w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">Pets & Supplies</Link>

          {user && (
            <>
              <Link to="/add-listing" className="w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">Add Listing</Link>
              <Link to="/my-lists" className="w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">My Listings</Link>
              <Link to="/my-orders" className="w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">My Orders</Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 my-4 px-6 py-3 rounded-md dark:bg-gray-700"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          {/* Profile / Auth */}
          {user ? (
            <div className="w-full px-4">
              <div className="flex flex-col items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-20 h-20 rounded-full border mb-2"
                  alt="profile"
                />
                <p className="font-semibold text-gray-800 dark:text-gray-200">{user.displayName}</p>
              </div>
              <div className="flex  space-x-4">
                <Link to="/my-profile" className="w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  My Profile
                </Link>
                <Link to="/dashboard" className="w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  Dashboard
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition">Login</Link>
              <Link
                to="/register"
                className="w-full py-3 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition"
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
