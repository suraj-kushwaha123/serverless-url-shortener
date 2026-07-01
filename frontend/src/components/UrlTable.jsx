import api, { API_BASE_URL } from "../services/api";
import { Copy, ExternalLink, Trash2 } from "lucide-react";

export default function UrlTable({ urls, fetchUrls, onMessage }) {

  function copyUrl(shortCode) {
    const shortUrl = `${API_BASE_URL}/${shortCode}`;

    navigator.clipboard.writeText(shortUrl);

    onMessage?.("Short URL copied to clipboard.");
  }

  async function deleteUrl(shortCode) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this URL?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/url/${shortCode}`);

      onMessage?.("URL deleted successfully.");

      await fetchUrls();

    } catch (err) {
      console.error(err);
      onMessage?.("Failed to delete URL. Please try again.");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-bold text-slate-950">
          My URLs
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Short links, destination URLs, and click counts.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3 font-semibold">Short URL</th>
              <th className="px-5 py-3 font-semibold">Original URL</th>
              <th className="px-5 py-3 font-semibold">Clicks</th>
              <th className="px-5 py-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {urls.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-5 py-12 text-center text-slate-500">
                  No URLs found. Create your first short link above.
                </td>
              </tr>
            ) : (
              urls.map((item) => (
                <tr key={item.shortCode} className="transition-colors hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-semibold text-slate-950">
                    <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-blue-700">
                      {item.shortCode}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <a
                      href={item.longUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex max-w-md items-center gap-2 truncate font-medium text-slate-700 hover:text-blue-700"
                    >
                      <span className="truncate">{item.longUrl}</span>
                      <ExternalLink size={14} className="shrink-0" />
                    </a>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                      {item.clicks || 0}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyUrl(item.shortCode)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Copy size={13} />
                        Copy
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteUrl(item.shortCode)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
