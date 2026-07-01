import { Link } from "react-router-dom";
import { Link2, BarChart3, ShieldCheck, Globe } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLabel,
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(0,0,0,.15)] lg:grid-cols-2">
        {/* LEFT */}

        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-10 text-white lg:flex lg:p-14">
          <div>
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center rounded-2xl bg-white/15 backdrop-blur"
                style={{ height: "56px", width: "56px" }}
              >
                <Link2 size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">ShortLink</h2>
                <p className="text-blue-100">URL Management Platform</p>
              </div>
            </div>

            <h1 className="mt-16 text-3xl font-extrabold leading-tight sm:text-4xl">
              Manage all your links from one dashboard.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
              Track clicks, monitor analytics, manage URLs, generate QR
              codes and gain insights with a modern cloud-powered URL
              shortening platform.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            <Feature icon={<BarChart3 size={20} />} title="Real-time Analytics" />
            <Feature icon={<ShieldCheck size={20} />} title="Secure Authentication" />
            <Feature icon={<Globe size={20} />} title="Global URL Access" />
          </div>

          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-14">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 text-base text-slate-500 sm:text-lg">
              {subtitle}
            </p>

            <div className="mt-8">{children}</div>

            <p className="mt-8 text-center text-sm text-slate-500 sm:text-base">
              {footerText}
              <Link
                to={footerLink}
                className="font-semibold text-blue-600 hover:text-blue-700"
                style={{ marginLeft: "6px" }}
              >
                {footerLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="flex items-center justify-center rounded-xl bg-white/20 backdrop-blur"
        style={{ height: "44px", width: "44px" }}
      >
        {icon}
      </div>
      <span className="text-base font-medium sm:text-lg">{title}</span>
    </div>
  );
}