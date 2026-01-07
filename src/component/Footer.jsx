import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-white py-16 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + Description */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <svg width="45" height="45" viewBox="0 0 64 64" fill="#ff7f00">
              <circle cx="20" cy="20" r="8" />
              <circle cx="44" cy="20" r="8" />
              <circle cx="26" cy="40" r="6" />
              <circle cx="38" cy="40" r="6" />
              <circle cx="32" cy="50" r="10" />
            </svg>
            <h1 className="text-3xl font-bold text-orange-400">
              Paw<span className="text-blue-400">Mart</span>
            </h1>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            PawMart connects pet lovers with their perfect companions. Adopt, sell, or find pet supplies securely and easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li><Link to="/pets" className="hover:text-orange-400 transition">Pets & Supplies</Link></li>
            <li><Link to="/add-listing" className="hover:text-orange-400 transition">Add Listing</Link></li>
  
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-2">Email: support@pawmart.com</p>
          <p className="text-gray-300 mb-2">Phone: +880 1234 567890</p>
          <div className="flex items-center gap-4 mt-3">
            <a href="#" className="text-gray-300 hover:text-blue-400 transition"><Facebook /></a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition"><Twitter /></a>
            <a href="#" className="text-gray-300 hover:text-pink-500 transition"><Instagram /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <p className="text-gray-300 mb-4 text-sm">Subscribe to get updates on new pets and offers.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-3 py-2 rounded-md text-stone-300 w-full sm:w-auto flex-1"
            />
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} PawMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
