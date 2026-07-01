import { CalendarDays, Download } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="text-slate-500 mt-2 text-lg">
          Monitor your shortened URL performance and visitor insights.
        </p>

      </div>

      <div className="flex items-center gap-4">

        <button
          className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition"
        >

          <CalendarDays size={18} />

          Last 7 Days

        </button>

        <button
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >

          <Download size={18} />

          Export Report

        </button>

      </div>

    </div>
  );
}