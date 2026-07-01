import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#161b26]/95 backdrop-blur-md border-b border-[#232a38]">

      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

        {/* Logo */}

        <Link to="/" className="flex flex-col">

          <h1 className="text-2xl font-bold text-white tracking-wide">
            URL Shortener
          </h1>

          <span className="text-sm text-gray-400">
            Fast • Secure • Simple
          </span>

        </Link>

        {/* Desktop Navigation */}

        <div className="hidden lg:flex items-center gap-10">

          <a
            href="#features"
            className="text-gray-300 hover:text-[#16a34a] transition"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-gray-300 hover:text-[#16a34a] transition"
          >
            About
          </a>

        </div>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="bg-[#16a34a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#15803d] transition"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (

        <div className="lg:hidden bg-[#1c2230] border-t border-[#232a38]">

          <div className="flex flex-col gap-5 p-6">

            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="text-gray-300"
            >
              Features
            </a>

            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="text-gray-300"
            >
              About
            </a>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="border border-gray-600 rounded-xl py-3 text-center text-white"
            >
              Log in
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="bg-[#16a34a] text-white rounded-xl py-3 text-center font-semibold"
            >
              Get Started
            </Link>

          </div>

        </div>

      )}

    </nav>
  );
}
