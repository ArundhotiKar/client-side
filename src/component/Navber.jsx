import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-5">

        {/* LEFT: Logo + Website Name */}
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 64 64"
            fill="#ff7f00"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="8" />
            <circle cx="44" cy="20" r="8" />
            <circle cx="26" cy="40" r="6" />
            <circle cx="38" cy="40" r="6" />
            <circle cx="32" cy="50" r="10" />
          </svg>

          <h1 className="text-2xl font-bold text-orange-600">
            Paw<span className="text-blue-600">Mart</span>
          </h1>
        </div>

        {/* MIDDLE: Home | Pets & Supplies (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <Link to="/pets" className="hover:text-orange-600">Pets & Supplies</Link>
        </div>

        {/* RIGHT: Login | Register (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="hover:text-blue-600 text-lg">Login</Link>
          <Link
            to="/register"
            className="text-white bg-blue-600 px-4 py-1 rounded-md hover:bg-blue-700 text-lg"
          >
            Register
          </Link>
        </div>

        {/* Hamburger Button (mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white pb-4">
          <Link to="/" className="py-2 hover:text-orange-600">Home</Link>
          <Link to="/pets" className="py-2 hover:text-orange-600">Pets & Supplies</Link>
          <Link to="/login" className="py-2 hover:text-blue-600">Login</Link>
          <Link
            to="/register"
            className="py-2 text-white bg-blue-600 px-4 rounded-md hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navber;
