import { useEffect, useState } from "react";
import api from "../services/api";
import { Search, ArrowUpDown, Terminal } from "lucide-react";
import { motion } from "framer-motion";

import AppShell from "../components/AppShell";
import UrlForm from "../components/UrlForm";
import Stats from "../components/Stats";
import UrlTable from "../components/UrlTable";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
};

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preferences, setPreferences] = useState({ compactTable: false, defaultSort: "newest" });
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const saved = localStorage.getItem("urlShortenerSettings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPreferences(parsed);
      setSortBy(parsed.defaultSort || "newest");
    }
  }, []);

  const rowsPerPage = 10;

  async function fetchUrls() {
    try {
      const response = await api.get("/urls");
      setUrls(Array.isArray(response.data) ? response.data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load telemetry. API connection lost.");
    }
  }

  useEffect(() => {
    let isMounted = true;
    async function loadUrls() {
      try {
        setLoading(true);
        const response = await api.get("/urls");
        if (isMounted) {
          setUrls(Array.isArray(response.data) ? response.data : []);
          setError("");
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to load telemetry. API connection lost.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadUrls();

    // Auto-refresh data every 10 seconds silently
    const interval = setInterval(async () => {
      try {
        const response = await api.get("/urls");
        if (isMounted) {
          setUrls(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error("Auto-refresh failed", err);
      }
    }, 10000);

    return () => { 
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredUrls = [...urls]
    .filter((item) => {
      const longUrl = item.longUrl || "";
      const shortCode = item.shortCode || "";
      return `${longUrl} ${shortCode}`.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest": return new Date(a.createdAt) - new Date(b.createdAt);
        case "clicks": return Number(b.clicks || 0) - Number(a.clicks || 0);
        case "az": return (a.longUrl || "").localeCompare(b.longUrl || "");
        case "za": return (b.longUrl || "").localeCompare(a.longUrl || "");
        default: return 0;
      }
    });

  const totalPages = Math.ceil(filteredUrls.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const currentUrls = filteredUrls.slice(start, start + rowsPerPage);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full relative z-10">
          
          <motion.div variants={itemVariants} className="mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 backdrop-blur-md">
              <Terminal size={14} className="text-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">Terminal Ready</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl neon-text-cyan">
              Nexus Dashboard
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-400">
              Establish new vectors, monitor traffic, and analyze routing telemetry.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Stats urls={filteredUrls} />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 glass-panel rounded-2xl p-5 sm:p-6">
            <UrlForm fetchUrls={fetchUrls} />
          </motion.div>

          {error && (
            <motion.div variants={itemVariants} className="mt-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm font-bold text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              [SYSTEM ERROR] {error}
            </motion.div>
          )}

          <motion.section variants={itemVariants} className="mt-10">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              
              <div className="relative w-full max-w-md group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 transition-colors group-focus-within:text-cyan-300" />
                <input
                  type="text"
                  placeholder="Query databank..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded bg-black/40 py-3 pl-11 pr-4 text-sm font-medium text-white border border-cyan-500/30 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-500 backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"
                />
              </div>

              <div className="relative group">
                <ArrowUpDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 transition-colors group-focus-within:text-cyan-300" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded bg-black/40 py-3 pl-11 pr-12 text-sm font-bold uppercase tracking-wider text-cyan-100 border border-cyan-500/30 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 cursor-pointer backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"
                >
                  <option value="newest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="clicks">Highest Traffic</option>
                  <option value="az">Alpha (A-Z)</option>
                  <option value="za">Alpha (Z-A)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-cyan-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex h-64 items-center justify-center rounded-2xl glass-panel">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500">Fetching Telemetry...</p>
                </div>
              </div>
            ) : (
              <div className="w-full overflow-hidden rounded-2xl glass-panel">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-2">
                    <UrlTable urls={currentUrls} fetchUrls={fetchUrls} compact={preferences.compactTable} />
                  </div>
                </div>
              </div>
            )}

            {totalPages > 0 && (
              <div className="mt-8 flex items-center justify-between rounded-xl glass-panel px-6 py-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="rounded border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-cyan-300 transition-all hover:bg-cyan-500/30 disabled:opacity-30 disabled:hover:bg-cyan-500/10"
                >
                  Prev
                </button>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Sector <span className="text-cyan-300 text-sm mx-1">{currentPage}</span> of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="rounded border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-cyan-300 transition-all hover:bg-cyan-500/30 disabled:opacity-30 disabled:hover:bg-cyan-500/10"
                >
                  Next
                </button>
              </div>
            )}
          </motion.section>
        </motion.div>
      </div>
    </AppShell>
  );
}