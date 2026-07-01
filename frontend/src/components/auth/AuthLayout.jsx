import { Link } from "react-router-dom";
import { Link2, BarChart3, ShieldCheck, Globe, Sparkles } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLabel,
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c1018] p-4 sm:p-8">
      <div className="pointer-events-none absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-amber-300/15 blur-3xl" />

      <div className="grid w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/10 bg-[#0f1521]/80 shadow-[0_36px_90px_rgba(0,0,0,.45)] backdrop-blur lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#121b2d] via-[#14253d] to-[#1f3e5d] p-10 text-white lg:flex lg:p-14">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
                <Link2 size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">ShortLink Studio</h2>
                <p className="text-cyan-100/80">Cloud-native URL platform</p>
              </div>
            </div>

            <div className="mt-14 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-100/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
              <Sparkles size={14} />
              Premium Workspace
            </div>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
              A cleaner command center for every link you launch.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
              Manage short links, monitor traffic patterns, and deliver branded experiences through a unified serverless dashboard.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <Feature icon={<BarChart3 size={20} />} title="Real-time Analytics" />
            <Feature icon={<ShieldCheck size={20} />} title="Secure Authentication" />
            <Feature icon={<Globe size={20} />} title="Global URL Access" />
          </div>

          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
        </div>

        <div className="flex items-center justify-center bg-white p-8 sm:p-12 lg:p-14">
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
              >
                {" "}
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
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur">
        {icon}
      </div>
      <span className="text-base font-medium sm:text-lg">{title}</span>
    </div>
  );
}