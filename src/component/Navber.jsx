import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successful!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
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
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-xl font-medium">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <Link to="/pets" className="hover:text-orange-600">Pets & Supplies</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              {/* Profile */}
              <div className="relative group">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt={user?.displayName || "User"}
                  className="w-15 h-15 rounded-full border border-gray-300"
                />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
                  bg-amber-700 text-white text-sm px-4 py-1 rounded-md 
                  opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                  {user?.displayName || "User"}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 px-5 py-2 rounded-md hover:bg-red-700 text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 text-lg">Login</Link>
              <Link
                to="/register"
                className="text-white bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-700 text-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white pb-6">
          <Link to="/" className="py-3 hover:text-orange-600 text-lg">Home</Link>
          <Link to="/pets" className="py-3 hover:text-orange-600 text-lg">Pets & Supplies</Link>

          {user ? (
            <>
              {/* Mobile Profile */}
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt={user?.displayName || "User"}
                className="w-20 h-20 rounded-full my-4 border border-gray-300"
              />
              <span className="mb-3 text-base font-medium">{user?.displayName || "User"}</span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="py-3 text-white bg-red-600 px-6 rounded-md hover:bg-red-700 text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="py-3 hover:text-blue-600 text-lg">Login</Link>
              <Link
                to="/register"
                className="py-3 text-white bg-blue-600 px-6 rounded-md hover:bg-blue-700 text-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navber;
