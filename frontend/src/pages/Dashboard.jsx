import { useEffect, useState } from "react";
import api from "../services/api";
import { Search, ArrowUpDown } from "lucide-react";

import AppShell from "../components/AppShell";
import UrlForm from "../components/UrlForm";
import Stats from "../components/Stats";
import UrlTable from "../components/UrlTable";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const rowsPerPage = 10;

  async function fetchUrls() {
    try {
      const response = await api.get("/urls");
      setUrls(Array.isArray(response.data) ? response.data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load URLs. Check that the backend API is deployed and reachable."
      );
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

        if (isMounted) {
          setError(
            "Failed to load URLs. Check that the backend API is deployed and reachable."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUrls();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUrls = [...urls]
    .filter((item) => {
      const longUrl = item.longUrl || "";
      const shortCode = item.shortCode || "";

      return `${longUrl} ${shortCode}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "clicks":
          return Number(b.clicks || 0) - Number(a.clicks || 0);

        case "az":
          return (a.longUrl || "").localeCompare(b.longUrl || "");

        case "za":
          return (b.longUrl || "").localeCompare(a.longUrl || "");

        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredUrls.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const currentUrls = filteredUrls.slice(start, start + rowsPerPage);

  return (
    <AppShell>
      <div className="w-full p-8">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Workspace
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Create, manage, and monitor all shortened URLs from one focused
            view.
          </p>
        </div>

        <Stats urls={filteredUrls} />

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <UrlForm fetchUrls={fetchUrls} />
        </div>

        {(notice || error) && (
          <div
            className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-blue-100 bg-blue-50 text-blue-700"
            }`}
          >
            {error || notice}
          </div>
        )}

        <section className="mt-8">

          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

            <div className="relative w-full max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search URLs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="relative">
              <ArrowUpDown
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="clicks">Most Clicked</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center text-slate-500 shadow-sm">
              Loading URLs...
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <UrlTable
                urls={currentUrls}
                fetchUrls={fetchUrls}
                onMessage={(message) => {
                  setNotice(message);
                  setError("");
                }}
              />
            </div>
          )}

          {totalPages > 0 && (
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded-lg border px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-slate-500">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded-lg border px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>

      </div>
    </AppShell>
  );
}