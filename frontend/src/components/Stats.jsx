import { Link2, MousePointerClick, Activity, CalendarPlus } from "lucide-react";

const CARDS = [
  {
    key: "total",
    icon: Link2,
    iconBg: "bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    accentBar: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]",
    label: "Total Vectors",
    getValue: (urls) => urls.length,
  },
  {
    key: "clicks",
    icon: MousePointerClick,
    iconBg: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
    accentBar: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]",
    label: "Telemetry Pings",
    getValue: (urls) =>
      urls.reduce((sum, item) => sum + Number(item.clicks || 0), 0),
  },
  {
    key: "active",
    icon: Activity,
    iconBg: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]",
    accentBar: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]",
    label: "Active Links",
    getValue: (urls) => urls.filter((u) => Number(u.clicks || 0) > 0).length,
  },
  {
    key: "today",
    icon: CalendarPlus,
    iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.3)]",
    accentBar: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]",
    label: "Generated Today",
    getValue: (urls) => {
      const today = new Date().toDateString();
      return urls.filter((item) => {
        if (!item.createdAt) return false;
        return new Date(item.createdAt).toDateString() === today;
      }).length;
    },
  },
];

export default function Stats({ urls }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map((card) => {
        const Icon = card.icon;
        const value = card.getValue(urls);

        return (
          <div
            key={card.key}
            className="group relative overflow-hidden rounded-2xl glass-panel p-5 transition-all hover:scale-105"
          >
            {/* Top accent bar */}
            <div className={`absolute inset-x-0 top-0 h-0.5 ${card.accentBar} transition-all duration-500 group-hover:h-1`} />

            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${card.iconBg}`}>
                <Icon size={20} />
              </div>
            </div>

            <h3 className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{card.label}</h3>
            <p className="mt-1 text-3xl font-black text-white group-hover:neon-text-cyan transition-colors">
              {value.toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}
