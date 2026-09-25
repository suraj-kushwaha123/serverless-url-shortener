import {
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

const deviceStyles = {
  Desktop: {
    color: "bg-blue-600",
    icon: Monitor,
  },
  Mobile: {
    color: "bg-green-500",
    icon: Smartphone,
  },
  Tablet: {
    color: "bg-yellow-500",
    icon: Tablet,
  },
};

export default function DeviceDistribution({ devices = [], loading, timeframe }) {
  const timeframeLabel = timeframe > 0 ? `Last ${timeframe} Days` : "All Time";

  return (
    <div className="glass-panel rounded-2xl p-6">

      <h2 className="text-xl font-black text-white neon-text-cyan">
        Device Distribution
      </h2>

      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500/80 mt-1 mb-6">
        Visitors by device type ({timeframeLabel})
      </p>

      <div className="space-y-6">

        {loading ? (
          <EmptyDevices text="Loading devices..." />
        ) : devices.length === 0 ? (
          <EmptyDevices text="No device data tracked yet." />
        ) : (
          devices.map((device) => {
            const style = deviceStyles[device.name] || deviceStyles.Desktop;
            const Icon = style.icon;

            return (
              <div key={device.name}>

                <div className="flex justify-between items-center mb-3">

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-10 h-10 rounded-xl ${style.color} flex items-center justify-center border border-white/10`}
                    >
                      <Icon className="text-white" size={20} />
                    </div>

                    <span className="font-bold text-slate-300">
                      {device.name}
                    </span>

                  </div>

                  <span className="font-black text-cyan-400">
                    {device.value}%
                  </span>

                </div>

                <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-cyan-500/20 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">

                  <div
                    className={`${style.color} h-3 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                    style={{
                      width: `${device.value}%`,
                    }}
                  />

                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}

function EmptyDevices({ text }) {
  return (
    <div className="rounded-xl bg-cyan-950/20 px-4 py-10 text-center text-sm font-bold uppercase tracking-widest text-cyan-500">
      {text}
    </div>
  );
}
