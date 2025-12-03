const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + Name */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3">
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

          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            PawMart connects local pet owners and buyers for adoption and 
            pet care products.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-orange-400">Home</a></li>
            <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
            <li><a href="/terms" className="hover:text-orange-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="flex md:justify-end items-start">
          <p className="text-gray-400 text-sm mt-1">
            © {new Date().getFullYear()} PawMart. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
