import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ClickChart({ data = [], loading, timeframe }) {
  const hasData = data.some((item) => Number(item.clicks) > 0);

  const timeframeLabel = timeframe > 0 ? `Last ${timeframe} Days` : "All Time";
  const timeframeMsg = timeframe > 0 ? `the last ${timeframe} days` : "the selected time period";

  return (
    <div className="glass-panel rounded-2xl p-6 h-[430px]">

      <h2 className="text-xl font-black text-white neon-text-cyan">
        Daily Clicks
      </h2>

      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500/80 mb-6">
        {timeframeLabel} Performance
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
        <EmptyChartMessage text={`No clicks recorded in ${timeframeMsg}.`} />
      )}

    </div>
  );
}

function EmptyChartMessage({ text }) {
  return (
    <div className="h-[85%] flex items-center justify-center rounded-xl bg-cyan-950/20 text-sm font-bold uppercase tracking-widest text-cyan-500">
      {text}
    </div>
  );
}
