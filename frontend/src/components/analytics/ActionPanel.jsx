import {
  Copy,
  ExternalLink,
  Download,
  Trash2,
} from "lucide-react";

export default function ActionPanel() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-2">
        Quick Actions
      </h2>

      <p className="text-slate-500 text-sm mb-8">
        Manage your shortened URL
      </p>

      <div className="space-y-4">

        <button className="w-full flex items-center gap-3 bg-blue-600 text-white px-5 py-4 rounded-xl hover:bg-blue-700 transition">

          <Copy size={20} />

          Copy Short URL

        </button>

        <button className="w-full flex items-center gap-3 bg-green-600 text-white px-5 py-4 rounded-xl hover:bg-green-700 transition">

          <ExternalLink size={20} />

          Open URL

        </button>

        <button className="w-full flex items-center gap-3 bg-orange-500 text-white px-5 py-4 rounded-xl hover:bg-orange-600 transition">

          <Download size={20} />

          Download Report

        </button>

        <button className="w-full flex items-center gap-3 bg-red-600 text-white px-5 py-4 rounded-xl hover:bg-red-700 transition">

          <Trash2 size={20} />

          Delete URL

        </button>

      </div>

    </div>
  );
}