export default function TopCountries({ countries = [], loading }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-xl font-bold text-slate-800">
        Top Countries
      </h2>

      <p className="text-slate-500 text-sm mt-1 mb-6">
        Traffic by location
      </p>

      <div className="space-y-5">

        {loading ? (
          <EmptyCountries text="Loading countries..." />
        ) : countries.length === 0 ? (
          <EmptyCountries text="No country data tracked yet." />
        ) : (
          countries.map((item) => (

            <div key={item.country}>

              <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-3">

                  <span className="text-2xl min-w-8">
                    {item.flag || "-"}
                  </span>

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {item.country}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {item.clicks} Clicks
                    </p>

                  </div>

                </div>

                <span className="font-bold text-blue-600">
                  {item.percentage}%
                </span>

              </div>

              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

function EmptyCountries({ text }) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm font-medium text-slate-500">
      {text}
    </div>
  );
}
