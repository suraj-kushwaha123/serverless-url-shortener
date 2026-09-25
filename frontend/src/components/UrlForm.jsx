import { useState } from "react";
import toast from "react-hot-toast";
import api, { API_BASE_URL } from "../services/api";
import { getCurrentUser } from "aws-amplify/auth";
import { Check, Copy, Link2, Zap } from "lucide-react";

export default function UrlForm({ fetchUrls }) {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function shortenUrl(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setShortUrl("");

      const currentUser = await getCurrentUser();

      const response = await api.post("/shorten", {
        url: url,
        userId: currentUser.userId,
      });

      const code = response.data.shortCode;
      const generatedShortUrl = response.data.shortUrl || `${API_BASE_URL}/${code}`;

      setShortUrl(generatedShortUrl);
      setUrl("");
      toast.success("Telemetry linked.");

      if (fetchUrls) {
        await fetchUrls();
      }
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        "Failed to establish link. Check terminal connection.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function copyShortUrl() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied to terminal clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed.");
    }
  }

  return (
    <section>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <Link2 size={20} />
        </div>

        <div>
          <h2 className="text-xl font-black text-white neon-text-cyan">Establish Vector</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Generate new short route
          </p>
        </div>
      </div>

      <form onSubmit={shortenUrl} className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1 min-w-0 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors">
            <Zap size={18} />
          </div>
          <input
            type="url"
            placeholder="https://destination.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-xl border border-cyan-500/30 bg-black/50 py-4 pl-12 pr-4 text-sm font-medium text-cyan-100 placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-[54px] items-center justify-center gap-2 rounded-xl bg-cyan-500 px-8 text-sm font-black uppercase tracking-widest text-[#050508] transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] disabled:opacity-50"
        >
          {loading ? "Routing..." : "Initialize"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5 backdrop-blur-md">
          <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Secure Route Established</h3>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={shortUrl}
              readOnly
              className="min-w-0 flex-1 rounded-lg border border-cyan-500/20 bg-black/60 px-4 py-3 text-sm font-bold text-cyan-100 outline-none shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
            />

            <button
              type="button"
              onClick={copyShortUrl}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                copied
                  ? "bg-amber-400 text-[#050508] shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                  : "border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Secured" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
