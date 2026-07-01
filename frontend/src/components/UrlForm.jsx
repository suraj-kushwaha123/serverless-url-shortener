import { useState } from "react";
import api, { API_BASE_URL } from "../services/api";
import { getCurrentUser } from "aws-amplify/auth";
import { Copy, Link2 } from "lucide-react";

export default function UrlForm({ fetchUrls }) {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

async function shortenUrl(e) {
  e.preventDefault();

  try {
    setLoading(true);
    setMessage("");

    const currentUser = await getCurrentUser();

    const response = await api.post("/shorten", {
      url: url,
      userId: currentUser.userId
    });

    const code = response.data.shortCode;

    const generatedShortUrl = response.data.shortUrl || `${API_BASE_URL}/${code}`;

    setShortUrl(generatedShortUrl);

    setUrl("");

    if (fetchUrls) {
      await fetchUrls();
    }

  } catch (err) {
    console.error(err);
    setMessage(err.response?.data?.message || "Failed to shorten URL. Check your API deployment and try again.");
  } finally {
    setLoading(false);
  }
}

  async function copyShortUrl() {
    await navigator.clipboard.writeText(shortUrl);
    setMessage("Short URL copied to clipboard.");
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Link2 size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Create Short URL
          </h2>
          <p className="text-sm text-slate-500">
            Paste a destination link and generate a tracked redirect.
          </p>
        </div>
      </div>

      <form onSubmit={shortenUrl} className="flex flex-col gap-3 lg:flex-row">

        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Shorten URL"}
        </button>

      </form>

      {message && (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          {message}
        </div>
      )}

      {shortUrl && (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

          <h3 className="mb-3 font-semibold text-slate-950">
            Generated Short URL
          </h3>

          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              value={shortUrl}
              readOnly
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            />

            <button
              onClick={copyShortUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Copy size={14} />
              Copy
            </button>

          </div>

        </div>
      )}

    </section>
  );
}
