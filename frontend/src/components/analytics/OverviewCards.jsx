import {
  MousePointerClick,
  CalendarDays,
  Globe,
  Laptop,
} from "lucide-react";

export default function OverviewCards({ analytics, loading }) {
  const stats = [
    {
      title: "Total Clicks",
      value: analytics?.totalClicks ?? 0,
      icon: MousePointerClick,
      color: "bg-blue-600",
    },
    {
      title: "Today's Clicks",
      value: analytics?.todayClicks ?? 0,
      icon: CalendarDays,
      color: "bg-green-600",
    },
    {
      title: "Countries",
      value: analytics?.countriesCount ?? 0,
      icon: Globe,
      color: "bg-purple-600",
    },
    {
      title: "Devices",
      value: analytics?.devicesCount ?? 0,
      icon: Laptop,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-5 flex justify-between items-center hover:shadow-md transition"
          >

            <div>

              <p className="text-slate-500 text-sm">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-2">
                {loading ? "..." : formatNumber(item.value)}
              </h2>

            </div>

            <div
              className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}
            >

              <Icon
                className="text-white"
                size={24}
              />

            </div>

          </div>

        );

      })}

    </div>
  );
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}
