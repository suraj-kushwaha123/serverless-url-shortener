import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#9333EA",
  "#F59E0B",
  "#EF4444",
];

export default function TrafficSources({ data = [], loading, timeframe }) {
  const hasData = data.length > 0;
  const timeframeLabel = timeframe > 0 ? `Last ${timeframe} Days` : "All Time";

  return (
    <div className="glass-panel rounded-2xl p-6 h-[430px] flex flex-col">

      <h2 className="text-xl font-black text-white neon-text-cyan">
        Traffic Sources
      </h2>

      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500/80 mb-4">
        Visitor Distribution ({timeframeLabel})
      </p>

      <div className="flex-1">

        {loading ? (
          <EmptyPieMessage text="Loading sources..." />
        ) : hasData ? (
          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                paddingAngle={3}
              >

                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>
        ) : (
          <EmptyPieMessage text="No traffic source data tracked yet." />
        )}

      </div>

    </div>
  );
}

function EmptyPieMessage({ text }) {
  return (
    <div className="h-full flex items-center justify-center rounded-xl bg-cyan-950/20 text-center text-sm font-bold uppercase tracking-widest text-cyan-500">
      {text}
    </div>
  );
}
