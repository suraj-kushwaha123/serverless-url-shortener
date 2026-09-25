import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  Link2,
  BarChart3,
  Cloud,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
};

export default function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050508] text-white selection:bg-cyan-500/30">
      {/* Heavy Cyberpunk Ambient Glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-cyan-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

      <Navbar />

      <main
        className="relative w-full px-4 pb-20 pt-32 sm:px-8 lg:pt-48"
        style={{
          maxWidth: "1100px",
          marginInline: "auto",
        }}
      >
        <section className="flex flex-col items-center text-center">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto flex w-full max-w-[900px] flex-col items-center relative z-10"
          >
            <motion.div variants={itemVariants} className="group relative mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-md transition-all hover:border-cyan-500/60 hover:bg-cyan-500/20">
              <Sparkles size={14} className="text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              Next-Gen Link Routing
              <div className="absolute -inset-0.5 -z-10 rounded-full bg-cyan-400 opacity-0 blur transition-opacity duration-500 group-hover:opacity-20" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="mx-auto mt-8 max-w-[800px] text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Shorten links with
              <span className="mt-2 block gradient-text">
                Absolute Velocity
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-[650px] text-lg leading-relaxed text-slate-400">
              Build branded URLs, monitor telemetry in real-time, and manage traffic vectors 
              from a highly secure, serverless cloud workspace.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12 flex w-full flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/register"
                className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded bg-cyan-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-[#050508] transition-all hover:scale-105 hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
              >
                Start System
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/login"
                className="glass-panel flex w-full sm:w-auto items-center justify-center gap-2 rounded px-8 py-4 text-sm font-bold uppercase tracking-widest text-cyan-100 transition-all hover:scale-105 hover:text-white"
              >
                Access Terminal
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mx-auto mt-20 grid w-full max-w-[800px] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              <Metric value="99.99%" label="Uptime" />
              <Metric value="<45ms" label="Latency" />
              <Metric value="22M+" label="Redirects" />
              <Metric value="128" label="Regions" />
            </motion.div>
          </motion.div>

          {/* Glowing Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200, damping: 25 }}
            className="mx-auto mt-24 w-full max-w-4xl min-w-0 relative z-10"
          >
            {/* Outer Glow */}
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-b from-cyan-500/30 to-indigo-500/10 opacity-70 blur-2xl" />
            
            <div className="glass-panel relative w-full min-w-0 rounded-[2rem] p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between border-b border-cyan-500/20 pb-6">
                <div>
                  <h2 className="text-xl font-black text-white neon-text-cyan">
                    Telemetry Stream
                  </h2>
                  <p className="mt-1 text-sm font-medium text-cyan-500/70 uppercase tracking-widest">
                    Real-time network vectors
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 backdrop-blur-md">
                  <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Live</span>
                </div>
              </div>

              <div className="group relative min-w-0 overflow-hidden rounded-xl border border-white/5 bg-black/60 p-1">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative p-4 sm:p-6">
                  <svg
                    viewBox="0 0 500 200"
                    preserveAspectRatio="none"
                    className="h-40 w-full sm:h-56 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  >
                    <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(34,211,238,0.1)" strokeDasharray="4 4" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(34,211,238,0.1)" strokeDasharray="4 4" />
                    <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(34,211,238,0.1)" strokeDasharray="4 4" />
                    <path
                      d="M0 160 C70 150, 120 100, 180 110 S290 160, 350 80 S430 60, 500 150 L500 200 L0 200 Z"
                      fill="url(#gradient-chart)"
                      stroke="#22d3ee"
                      strokeWidth="3"
                    />
                    <defs>
                      <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(34,211,238,0.4)" />
                        <stop offset="100%" stopColor="rgba(34,211,238,0.01)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InfoCard icon={<Zap size={18} />} label="Compute" value="AWS Lambda" color="amber" />
                <InfoCard icon={<Globe2 size={18} />} label="Database" value="DynamoDB" color="cyan" />
                <InfoCard icon={<ShieldCheck size={18} />} label="Security" value="Cognito Auth" color="indigo" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="mx-auto mt-32 max-w-5xl pb-12 text-center relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">
            System Modules
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Everything you need for link ops.
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <FeatureItem
              delay={0.1}
              icon={<Link2 size={24} />}
              title="Campaign Vectors"
              description="Clear, memorable short URLs for every channel with custom aliases."
            />
            <FeatureItem
              delay={0.2}
              icon={<BarChart3 size={24} />}
              title="Real-time Analytics"
              description="Geography, devices, and click momentum visualized instantly."
            />
            <FeatureItem
              delay={0.3}
              icon={<Cloud size={24} />}
              title="Cloud Native Security"
              description="Built on robust AWS auth and API layers designed for high scale."
            />
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-[#030305] py-8 mt-12">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-600">
          &copy; 2026 URL Shortener. Engineered on AWS.
        </p>
      </footer>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="glass-panel group min-w-0 rounded-2xl px-5 py-4 transition-all hover:scale-105">
      <p className="truncate text-2xl font-black text-white sm:text-3xl group-hover:neon-text-cyan">{value}</p>
      <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
    </div>
  );
}

function InfoCard({ icon, label, value, color }) {
  const colorMap = {
    amber: "text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)] border-amber-400/30",
    cyan: "text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] border-cyan-400/30",
    indigo: "text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)] border-indigo-400/30",
  };
  
  return (
    <div className="glass-panel group min-w-0 rounded-xl p-4 text-center">
      <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border bg-black/50 transition-all group-hover:scale-110 ${colorMap[color]}`}>
        {icon}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <h3 className="mt-1 text-sm font-bold text-slate-200">
        {value}
      </h3>
    </div>
  );
}

function FeatureItem({ icon, title, description, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-panel group rounded-2xl p-8 text-center transition-all hover:-translate-y-2"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-transform group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">
        {icon}
      </div>
      <h3 className="text-xl font-black text-white">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-slate-400">{description}</p>
    </motion.div>
  );
}