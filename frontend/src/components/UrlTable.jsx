import { useState } from "react";
import toast from "react-hot-toast";
import api, { API_BASE_URL } from "../services/api";
import { Check, Copy, ExternalLink, Trash2, AlertTriangle, X } from "lucide-react";

export default function UrlTable({ urls, fetchUrls, compact }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); 
  const [deletingCode, setDeletingCode] = useState(null);

  const cellPadding = compact ? "px-4 py-2" : "px-6 py-4";
  const headerPadding = compact ? "px-4 py-3" : "px-6 py-4";

  async function copyUrl(shortCode) {
    const shortUrl = `${API_BASE_URL}/${shortCode}`;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedCode(shortCode);
      toast.success("Short URL copied to clipboard.");
      setTimeout(() => setCopiedCode((prev) => (prev === shortCode ? null : prev)), 2000);
    } catch {
      toast.error("Copy failed — please copy the URL manually.");
    }
  }

  async function handleDelete(shortCode) {
    setDeletingCode(shortCode);
    setConfirmDelete(null);

    try {
      await api.delete(`/url/${shortCode}`);
      toast.success("Route destroyed.");
      await fetchUrls();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to destroy route."
      );
    } finally {
      setDeletingCode(null);
    }
  }

  return (
    <div className="w-full">
      <div className={`border-b border-cyan-500/20 ${compact ? "px-4 py-3" : "px-6 py-5"}`}>
        <h2 className={`${compact ? "text-base" : "text-lg"} font-black text-white neon-text-cyan`}>Active Vectors</h2>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Monitored datalinks and click telemetry.
        </p>
      </div>

      <table className="w-full min-w-[800px] text-sm">
        <thead>
          <tr className="border-b border-cyan-500/10 bg-cyan-500/5 text-left text-[10px] font-bold uppercase tracking-widest text-cyan-500">
            <th className={headerPadding}>Short Route</th>
            <th className={headerPadding}>Origin Target</th>
            <th className={headerPadding}>Timestamp</th>
            <th className={headerPadding}>Pings</th>
            <th className={`${headerPadding} text-right`}>Overrides</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5">
          {urls.length === 0 ? (
            <tr>
              <td colSpan="5" className={`${compact ? "py-8" : "py-16"} px-6 text-center text-xs font-bold uppercase tracking-widest text-slate-500`}>
                No active vectors. Initialize a new route above.
              </td>
            </tr>
          ) : (
            urls.map((item) => {
              const isDeleting = deletingCode === item.shortCode;
              const isCopied = copiedCode === item.shortCode;
              const isConfirming = confirmDelete === item.shortCode;

              return (
                <tr
                  key={item.shortCode}
                  className="transition-colors hover:bg-white/[0.02]"
                >
                  <td className={`${cellPadding} font-black`}>
                    <a
                      href={`${API_BASE_URL}/${item.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500 hover:text-[#050508] transition-all ${compact ? "px-2 py-1 text-xs" : "px-3 py-1.5"}`}
                    >
                      {item.shortCode}
                    </a>
                  </td>

                  <td className={cellPadding}>
                    <a
                      href={item.longUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex max-w-[200px] items-center gap-2 truncate font-medium text-slate-400 hover:text-cyan-400 lg:max-w-xs transition-colors ${compact ? "text-xs" : ""}`}
                    >
                      <span className="truncate">{item.longUrl}</span>
                      <ExternalLink size={14} className="shrink-0" />
                    </a>
                  </td>

                  <td className={`whitespace-nowrap ${cellPadding} text-xs font-bold uppercase tracking-wider text-slate-500`}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>

                  <td className={cellPadding}>
                    <span className={`inline-flex min-w-[40px] items-center justify-center rounded bg-amber-500/20 border border-amber-500/40 text-xs font-black text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.2)] ${compact ? "px-1.5 py-0.5" : "px-2 py-1"}`}>
                      {item.clicks || 0}
                    </span>
                  </td>

                  <td className={`${cellPadding} text-right`}>
                    {isConfirming ? (
                      <div className="flex items-center justify-end gap-2">
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-500">
                          <AlertTriangle size={14} />
                          Purge?
                        </span>

                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDelete(item.shortCode)}
                          className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] disabled:opacity-60"
                        >
                          Yes
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfirmDelete(null)}
                          className="inline-flex items-center gap-1 rounded border border-white/20 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition hover:bg-white/10"
                        >
                          <X size={12} />
                          No
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => copyUrl(item.shortCode)}
                          className={`inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                            isCopied
                              ? "border-amber-400/50 bg-amber-400/20 text-amber-300"
                              : "border-cyan-500/20 bg-cyan-500/5 text-cyan-500 hover:bg-cyan-500/20 hover:border-cyan-500/40"
                          }`}
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          {isCopied ? "Copied" : "Copy"}
                        </button>

                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => setConfirmDelete(item.shortCode)}
                          className="inline-flex items-center gap-1.5 rounded border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-red-400 transition-all hover:bg-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] disabled:opacity-60"
                        >
                          <Trash2 size={12} />
                          {isDeleting ? "..." : "Purge"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
