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

export default function DeviceDistribution({ devices = [], loading }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-xl font-bold text-slate-800">
        Device Distribution
      </h2>

      <p className="text-slate-500 text-sm mt-1 mb-6">
        Visitors by device type
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
                      className={`w-10 h-10 rounded-xl ${style.color} flex items-center justify-center`}
                    >
                      <Icon className="text-white" size={20} />
                    </div>

                    <span className="font-semibold text-slate-700">
                      {device.name}
                    </span>

                  </div>

                  <span className="font-bold text-slate-800">
                    {device.value}%
                  </span>

                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    className={`${style.color} h-3 rounded-full transition-all duration-500`}
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
    <div className="rounded-xl bg-slate-50 px-4 py-10 text-center text-sm font-medium text-slate-500">
      {text}
    </div>
  );
}
