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

export default function TrafficSources({ data = [], loading }) {
  const hasData = data.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-[430px] flex flex-col">

      <h2 className="text-xl font-bold text-slate-800">
        Traffic Sources
      </h2>

      <p className="text-slate-500 text-sm mb-4">
        Visitor Distribution
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
    <div className="h-full flex items-center justify-center rounded-xl bg-slate-50 text-center text-sm font-medium text-slate-500">
      {text}
    </div>
  );
}
