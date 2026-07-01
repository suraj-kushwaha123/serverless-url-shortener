import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#2f2f2f] text-white">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-28 sm:px-8 lg:min-h-[90vh] lg:flex-row lg:justify-between lg:gap-16 lg:pt-32">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl lg:w-1/2"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD166]">
            AWS Serverless Platform
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            URL Shortening Platform
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            Create secure short URLs, manage links, monitor click analytics
            and simplify sharing with a fast, secure and scalable platform.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 rounded-xl bg-[#FFD166] px-8 py-4 font-semibold text-black transition hover:scale-105 hover:shadow-lg hover:shadow-[#FFD166]/20"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Log In
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:max-w-md">
            <Stat value="99.9%" label="Uptime" />
            <Stat value="<50ms" label="Redirect Speed" />
            <Stat value="AWS" label="Cloud Native" />
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 w-full min-w-0 lg:mt-0 lg:w-1/2"
        >
          <div className="w-full min-w-0 rounded-3xl bg-[#383838] p-6 shadow-2xl sm:rounded-[30px] sm:p-8">
            {/* Browser Top */}

            <div className="mb-6 flex gap-2 sm:mb-8">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>

            {/* Dashboard Title */}

            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Analytics Dashboard
              </h2>
              <p className="mt-2 text-sm text-gray-400 sm:text-base">
                Real-time monitoring of shortened URLs
              </p>
            </div>

            <div className="min-w-0 rounded-3xl bg-[#333333] p-4 sm:p-6">
              {/* Top Graphs */}

              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {/* Donut Chart */}

                <div className="min-w-0 rounded-2xl bg-[#2b2b2b] p-4 sm:p-5">
                  <p className="mb-4 text-xs text-gray-400">
                    Click Distribution
                  </p>

                  <div className="flex justify-center">
                    <div className="relative h-20 w-20 sm:h-28 sm:w-28">
                      <div className="absolute inset-0 rounded-full border-[8px] border-[#FFD166] border-r-blue-500 border-t-cyan-400 sm:border-[10px]"></div>
                      <div className="absolute inset-3 rounded-full bg-[#2b2b2b] sm:inset-4"></div>
                    </div>
                  </div>
                </div>

                {/* Line Chart */}

                <div className="min-w-0 overflow-hidden rounded-2xl bg-[#2b2b2b] p-4 sm:p-5">
                  <p className="mb-4 text-xs text-gray-400">
                    Daily Traffic
                  </p>

                  <svg
                    viewBox="0 0 220 120"
                    preserveAspectRatio="none"
                    className="h-20 w-full sm:h-28"
                  >
                    <path
                      d="M10 75 C40 20, 70 85, 110 35 S170 20, 210 70"
                      stroke="#FFD166"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Performance Graph */}

              <div className="mt-5 min-w-0 overflow-hidden rounded-2xl bg-[#2b2b2b] p-4 sm:mt-6 sm:p-5">
                <p className="mb-4 text-xs text-gray-400">
                  URL Performance
                </p>

                <svg
                  viewBox="0 0 500 220"
                  preserveAspectRatio="none"
                  className="h-36 w-full sm:h-48"
                >
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#4a4a4a" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#4a4a4a" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#4a4a4a" />
                  <line x1="0" y1="160" x2="500" y2="160" stroke="#4a4a4a" />

                  <path
                    d="M0 180 C70 170, 120 120, 180 130 S290 180, 350 100 S430 80, 500 170 L500 220 L0 220 Z"
                    fill="rgba(255,209,102,.35)"
                    stroke="#FFD166"
                    strokeWidth="3"
                  />

                  <path
                    d="M0 185 C80 170, 150 150, 210 120 S330 90, 420 170 S470 170, 500 130"
                    fill="none"
                    stroke="#EFEFEF"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* Bottom Info */}

              <div className="mt-5 grid grid-cols-3 gap-3 sm:mt-6 sm:gap-4">
                <InfoCard label="Backend" value="AWS Lambda" />
                <InfoCard label="Database" value="DynamoDB" />
                <InfoCard label="Auth" value="Cognito" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-6">
        <p className="text-center text-sm text-gray-500">
          © 2026 URL Shortener. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-lg font-bold text-white sm:text-xl">{value}</p>
      <p className="mt-1 text-xs text-gray-500 sm:text-sm">{label}</p>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="min-w-0 rounded-xl bg-[#2b2b2b] py-3 text-center sm:py-4">
      <p className="text-[11px] text-gray-500 sm:text-xs">{label}</p>
      <h3 className="mt-1.5 truncate px-1 text-sm font-semibold sm:mt-2 sm:text-base">
        {value}
      </h3>
    </div>
  );
}