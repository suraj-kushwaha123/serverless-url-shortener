import { CalendarDays, Download } from "lucide-react";
import toast from "react-hot-toast";

export default function AnalyticsHeader({ analytics, loading, timeframe, setTimeframe }) {
  function exportReport() {
    if (loading || !analytics) {
      toast.error("Analytics data is still loading.");
      return;
    }

    const csv = buildCsvReport(analytics, timeframe);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Analytics report downloaded.");
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-cyan-500/20 pb-6">

      <div>

        <h1 className="text-3xl font-black text-white neon-text-cyan">
          Analytics
        </h1>

        <p className="text-slate-400 mt-2 text-sm font-medium">
          Monitor your shortened URL performance and visitor insights.
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none">
            <CalendarDays size={18} />
          </div>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(Number(e.target.value))}
            className="appearance-none outline-none pl-10 pr-10 py-3 bg-black/60 rounded-xl border border-cyan-500/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] text-cyan-300 font-bold text-sm cursor-pointer transition-all hover:border-cyan-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 backdrop-blur-md"
            disabled={loading}
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={0}>All Time</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-cyan-500"></div>
        </div>

        <button
          type="button"
          onClick={exportReport}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl font-bold uppercase tracking-widest text-xs transition-all hover:bg-cyan-500 hover:text-[#050508] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
        >

          <Download size={16} />

          Export Report

        </button>

      </div>

    </div>
  );
}

function buildCsvReport(analytics, timeframe) {
  const rows = [];

  rows.push(["Analytics Report", new Date().toISOString()]);
  rows.push([]);

  rows.push(["Overview"]);
  rows.push(["Metric", "Value"]);
  rows.push(["Total Clicks", analytics.totalClicks ?? 0]);
  rows.push(["Today's Clicks", analytics.todayClicks ?? 0]);
  rows.push(["Devices", analytics.devicesCount ?? 0]);
  rows.push([]);

  const timeframeLabel = timeframe > 0 ? `(Last ${timeframe} Days)` : "(All Time)";
  rows.push([`Daily Clicks ${timeframeLabel}`]);
  rows.push(["Day", "Clicks"]);
  (analytics.dailyClicks || []).forEach((item) => rows.push([item.day, item.clicks]));
  rows.push([]);

  rows.push(["Traffic Sources"]);
  rows.push(["Source", "Clicks"]);
  (analytics.trafficSources || []).forEach((item) => rows.push([item.name, item.value]));
  rows.push([]);

  rows.push(["Top Countries"]);
  rows.push(["Country", "Clicks", "Percentage"]);
  (analytics.topCountries || []).forEach((item) =>
    rows.push([item.country, item.clicks, `${item.percentage}%`])
  );
  rows.push([]);

  rows.push(["Device Distribution"]);
  rows.push(["Device", "Percentage"]);
  (analytics.deviceDistribution || []).forEach((item) => rows.push([item.name, `${item.value}%`]));
  rows.push([]);

  rows.push(["Recent Activity"]);
  rows.push(["Time", "Country", "Device", "Browser"]);
  (analytics.recentActivity || []).forEach((item) =>
    rows.push([item.time, item.country, item.device, item.browser])
  );

  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

function csvEscape(value) {
  const text = String(value ?? "");

  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}