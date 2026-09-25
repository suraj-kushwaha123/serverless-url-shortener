export default function RecentActivity({ activities = [], loading, timeframe }) {
  const timeframeLabel = timeframe > 0 ? `Last ${timeframe} Days` : "All Time";

  return (
    <div className="glass-panel rounded-2xl p-6 h-[430px]">

      <h2 className="text-xl font-black text-white neon-text-cyan">
        Recent Click Activity
      </h2>

      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500/80 mt-1 mb-6">
        Latest visitors to your shortened URLs ({timeframeLabel})
      </p>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-cyan-500/20 text-cyan-500 text-[10px] font-bold uppercase tracking-widest">

              <th className="text-left py-3">Time</th>

              <th className="text-left py-3">Device</th>

              <th className="text-left py-3">Browser</th>

            </tr>

          </thead>

          <tbody className="divide-y divide-white/5">

            {loading ? (
              <tr>
                <td colSpan="3" className="py-14 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Loading recent activity...
                </td>
              </tr>
            ) : activities.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-14 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  No recent activity tracked yet.
                </td>
              </tr>
            ) : (
              activities.map((item, index) => (

                <tr
                  key={`${item.time}-${index}`}
                  className="transition-colors hover:bg-white/[0.02]"
                >

                  <td className="py-4 text-xs font-bold text-slate-400">
                    {item.time}
                  </td>

                  <td>
                    <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                      {item.device}
                    </span>
                  </td>

                  <td className="text-sm font-medium text-slate-300">
                    {item.browser}
                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
