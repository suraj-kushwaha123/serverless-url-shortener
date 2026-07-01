import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ClickChart({ data = [], loading }) {
  const hasData = data.some((item) => Number(item.clicks) > 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-[430px]">

      <h2 className="text-xl font-bold text-slate-800">
        Daily Clicks
      </h2>

      <p className="text-slate-500 text-sm mb-6">
        Last 7 Days Performance
      </p>

      {loading ? (
        <EmptyChartMessage text="Loading click data..." />
      ) : hasData ? (
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <EmptyChartMessage text="No clicks recorded in the last 7 days." />
      )}

    </div>
  );
}

function EmptyChartMessage({ text }) {
  return (
    <div className="h-[85%] flex items-center justify-center rounded-xl bg-slate-50 text-sm font-medium text-slate-500">
      {text}
    </div>
  );
}
