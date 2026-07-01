import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0d111a]/80 backdrop-blur-xl">

      <div
        className="flex h-20 w-full items-center justify-between px-4 sm:px-8"
        style={{
          maxWidth: "1000px",
          marginInline: "auto",
        }}
      >
        <Link to="/" className="flex flex-col">
          <h1 className="text-2xl font-black tracking-wide text-white">
            URL Shortener
          </h1>

          <span className="text-sm text-slate-400">
            Elegant links for modern teams
          </span>
        </Link>

        <div className="hidden items-center gap-10 lg:flex">

          <a
            href="#features"
            className="text-slate-300 transition hover:text-cyan-200"
          >
            Features
          </a>

        </div>

        <div className="hidden items-center gap-4 lg:flex">

          <Link
            to="/login"
            className="text-slate-200 transition hover:text-white"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-gradient-to-r from-amber-300 to-amber-200 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5"
          >
            Get Started
          </Link>

        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-white/15 p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {open && (

        <div className="border-t border-white/10 bg-[#111826] lg:hidden">
          <div className="flex flex-col gap-4 p-6">

            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="rounded-lg px-1 py-2 text-slate-200"
            >
              Features
            </a>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/20 py-3 text-center text-white"
            >
              Log in
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-gradient-to-r from-amber-300 to-amber-200 py-3 text-center font-semibold text-slate-950"
            >
              Get Started
            </Link>

          </div>

        </div>

      )}

    </nav>
  );
}
