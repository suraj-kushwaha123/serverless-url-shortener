import { Link2, MousePointerClick, Activity, CalendarPlus } from "lucide-react";

export default function Stats({ urls }) {

  const totalUrls = urls.length;

  const totalClicks = urls.reduce(
    (sum, item) => sum + Number(item.clicks || 0),
    0
  );

  const today = new Date().toDateString();

  const todaysUrls = urls.filter((item) => {
    if (!item.createdAt) return false;

    return new Date(item.createdAt).toDateString() === today;
  }).length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        icon={Link2}
        iconBg="bg-blue-50 text-blue-600"
        label="Total URLs"
        value={totalUrls}
      />

      <StatCard
        icon={MousePointerClick}
        iconBg="bg-green-50 text-[#16a34a]"
        label="Total Clicks"
        value={totalClicks}
      />

      <StatCard
        icon={Activity}
        iconBg="bg-purple-50 text-purple-600"
        label="Active Links"
        value={totalUrls}
      />

      <StatCard
        icon={CalendarPlus}
        iconBg="bg-orange-50 text-orange-500"
        label="Today's URLs"
        value={todaysUrls}
      />

    </div>
  );
}

function StatCard({ icon: Icon, iconBg, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon size={18} />
      </div>

      <h3 className="text-sm font-medium text-slate-500">
        {label}
      </h3>

      <h1 className="mt-1 text-3xl font-bold text-slate-950">
        {value}
      </h1>
    </div>
  );
}
