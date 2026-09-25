import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-[#050508]/70 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_10px_40px_rgba(34,211,238,0.1)]" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1100px] items-center justify-between px-4 sm:px-8">
        <Link to="/" className="group flex flex-col">
          <h1 className="text-2xl font-black tracking-tight text-white transition-all group-hover:neon-text-cyan">
            ShortLink
          </h1>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 transition-all group-hover:text-cyan-400">
            Platform
          </span>
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          <a
            href="#features"
            className="relative text-sm font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
          >
            Features
            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/login"
            className="text-sm font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-cyan-500/10 px-8 py-3 text-sm font-bold uppercase tracking-wider text-cyan-300 border border-cyan-500/30 transition-all hover:scale-105 hover:bg-cyan-500 hover:text-[#050508] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            <span className="relative z-10">Access Hub</span>
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded border border-cyan-500/30 bg-cyan-500/10 p-2 text-cyan-300 transition-all hover:bg-cyan-500/20 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-cyan-500/20 bg-[#050508]/95 backdrop-blur-3xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                Features
              </a>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 py-3 text-center text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/10"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-cyan-500/50 bg-cyan-500/20 py-3 text-center text-sm font-bold uppercase tracking-wider text-cyan-300 hover:bg-cyan-500 hover:text-[#050508]"
              >
                Access Hub
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
