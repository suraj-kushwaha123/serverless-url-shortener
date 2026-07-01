export default function RecentActivity({ activities = [], loading }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-[430px]">

      <h2 className="text-xl font-bold text-slate-800">
        Recent Click Activity
      </h2>

      <p className="text-slate-500 text-sm mt-1 mb-6">
        Latest visitors to your shortened URLs
      </p>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-slate-200 text-slate-500">

              <th className="text-left py-3 font-semibold">Time</th>

              <th className="text-left py-3 font-semibold">Country</th>

              <th className="text-left py-3 font-semibold">Device</th>

              <th className="text-left py-3 font-semibold">Browser</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="4" className="py-14 text-center text-slate-500 font-medium">
                  Loading recent activity...
                </td>
              </tr>
            ) : activities.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-14 text-center text-slate-500 font-medium">
                  No recent activity tracked yet.
                </td>
              </tr>
            ) : (
              activities.map((item, index) => (

                <tr
                  key={`${item.time}-${index}`}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="py-4 text-slate-700">
                    {item.time}
                  </td>

                  <td className="text-slate-700">
                    {item.country}
                  </td>

                  <td>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                      {item.device}
                    </span>
                  </td>

                  <td className="text-slate-700">
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
