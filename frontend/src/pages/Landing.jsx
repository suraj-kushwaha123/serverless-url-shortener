import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Link2,
  BarChart3,
  Cloud,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0e1116] text-white">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

      <Navbar />

      <main
        className="relative w-full px-4 pb-16 pt-28 sm:px-8 lg:pt-32"
        style={{
          maxWidth: "1000px",
          marginInline: "auto",
        }}
      >
      <section className="flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex w-full max-w-[860px] flex-col items-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur sm:text-xs">
            <Sparkles size={14} />
            AWS Native Link Intelligence
          </div>

          <h1 className="mx-auto mt-6 max-w-[760px] text-3xl font-black leading-[1.08] sm:text-4xl lg:text-5xl">
            Shorten Links With
            <span className="mt-1 block bg-gradient-to-r from-amber-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent sm:mt-2">
              Style, Speed, and Signal
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[760px] text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            Build branded links, monitor behavior in real-time, and launch campaigns
            from a cloud-secure workspace that feels as modern as your product.
          </p>

          <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-200 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_14px_30px_rgba(251,191,36,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(251,191,36,0.45)] sm:px-8 sm:py-4 sm:text-base"
            >
              Start Free
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10 sm:px-8 sm:py-4 sm:text-base"
            >
              Explore Dashboard
            </Link>
          </div>

          <div className="mx-auto mt-12 grid w-full max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <Metric value="99.99%" label="Uptime" />
            <Metric value="<45ms" label="Redirect" />
            <Metric value="22M+" label="Clicks" />
            <Metric value="128" label="Regions" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-12 w-full max-w-4xl min-w-0"
        >
          <div className="w-full min-w-0 rounded-[2rem] border border-white/10 bg-[#131822]/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,.45)] backdrop-blur sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-300" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <span className="rounded-full border border-emerald-300/25 bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                Live
              </span>
            </div>

            <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-[#0f141d] p-5 sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
                    Analytics Command Center
                  </h2>
                  <p className="mt-2 text-sm text-slate-400 sm:text-base">
                    Track traffic quality and engagement trends instantly.
                  </p>
                </div>
                <Zap className="hidden text-amber-300 sm:block" size={24} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <Panel label="Click Distribution">
                  <div className="flex justify-center">
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                      <div className="absolute inset-0 rounded-full border-[10px] border-amber-200 border-r-cyan-300 border-t-emerald-300" />
                      <div className="absolute inset-4 rounded-full bg-[#0f141d]" />
                    </div>
                  </div>
                </Panel>

                <Panel label="Daily Traffic">
                  <svg
                    viewBox="0 0 220 120"
                    preserveAspectRatio="none"
                    className="h-24 w-full sm:h-28"
                  >
                    <path
                      d="M10 78 C40 30, 72 88, 110 40 S170 24, 210 66"
                      stroke="#67e8f9"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </Panel>
              </div>

              <div className="mt-6 min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#131a26] p-4 sm:p-5">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Performance Momentum
                </p>
                <svg
                  viewBox="0 0 500 220"
                  preserveAspectRatio="none"
                  className="h-36 w-full sm:h-48"
                >
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#263241" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#263241" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#263241" />
                  <line x1="0" y1="160" x2="500" y2="160" stroke="#263241" />

                  <path
                    d="M0 180 C70 170, 120 120, 180 130 S290 180, 350 100 S430 80, 500 170 L500 220 L0 220 Z"
                    fill="rgba(34,211,238,.24)"
                    stroke="#67e8f9"
                    strokeWidth="3"
                  />

                  <path
                    d="M0 185 C80 170, 150 150, 210 120 S330 90, 420 170 S470 170, 500 130"
                    fill="none"
                    stroke="#fef3c7"
                    strokeWidth="2"
                    opacity="0.75"
                  />
                </svg>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
                <InfoCard icon={<Zap size={15} />} label="Backend" value="AWS Lambda" />
                <InfoCard icon={<Globe2 size={15} />} label="Data" value="DynamoDB" />
                <InfoCard icon={<ShieldCheck size={15} />} label="Security" value="Cognito" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="pb-12">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#101725] via-[#111d2a] to-[#101821] p-6 shadow-[0_20px_60px_rgba(0,0,0,.28)] sm:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
            Why Teams Choose Us
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center text-2xl font-bold text-slate-100 sm:text-3xl">
            Everything your company needs to run modern link operations.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-7 text-slate-300 sm:text-base">
            From branded short links to actionable analytics, the platform gives marketing, product, and growth teams one place to create, track, and optimize every shared URL.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<Link2 size={18} />}
            title="Campaign-Friendly Links"
            description="Create clear short URLs that stay memorable and easy to share across channels."
          />
          <FeatureCard
            icon={<BarChart3 size={18} />}
            title="Actionable Analytics"
            description="See geography, devices, and click momentum so your next campaign performs better."
          />
          <FeatureCard
            icon={<Cloud size={18} />}
            title="Secure By Default"
            description="Authentication and API layers are backed by AWS services built for scale."
          />
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-200/20 bg-cyan-300/5 px-5 py-4 text-center text-sm text-cyan-50/90 sm:text-base">
            Cleaner links, sharper insights, and better decisions for every team that shares content online.
          </div>
        </div>
      </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <p className="text-center text-sm text-slate-500">
          (c) 2026 URL Shortener. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <p className="truncate text-base font-bold text-white sm:text-lg">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );
}

function Panel({ label, children }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-[#121926] p-4 sm:p-5">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      {children}
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-[#111722] py-3 text-center sm:py-4">
      <div className="mb-1 inline-flex items-center gap-1 text-xs text-cyan-200">
        {icon}
        {label}
      </div>
      <h3 className="truncate px-1 text-sm font-semibold text-slate-100 sm:text-base">
        {value}
      </h3>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur">
      <div className="mx-auto mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-200/30 bg-cyan-200/10 text-cyan-100">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}