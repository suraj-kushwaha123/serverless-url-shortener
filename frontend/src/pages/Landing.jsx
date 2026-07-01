import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#2f2f2f] text-white overflow-hidden">

      <Navbar />

      <section className="max-w-7xl mx-auto px-8 pt-32 pb-20 min-h-screen flex items-center">

        <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >

            <p className="uppercase tracking-[0.25em] text-[#FFD166] text-sm font-semibold">
              AWS Serverless Platform
            </p>

            <h1 className="text-6xl lg:text-7xl font-bold leading-tight mt-6">

              URL

              <br />

              Shortening

              <br />

              Platform

            </h1>

            <p className="text-gray-400 text-xl leading-9 mt-8 max-w-lg">

              Create secure short URLs, manage links, monitor click analytics
              and simplify sharing with a fast, secure and scalable platform.

            </p>

            <div className="mt-10">

              <Link
                to="/register"
                className="inline-flex items-center gap-3 bg-[#FFD166] text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

            </div>

          </motion.div>

          {/* RIGHT */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

  <div className="bg-[#383838] rounded-[30px] p-8 shadow-2xl">

    {/* Browser Top */}

    <div className="flex gap-2 mb-8">
      <div className="w-3 h-3 rounded-full bg-red-400"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
      <div className="w-3 h-3 rounded-full bg-green-400"></div>
    </div>

    {/* Dashboard Title */}

    <div className="mb-8">

      <h2 className="text-3xl font-bold">
        Analytics Dashboard
      </h2>

      <p className="text-gray-400 mt-2">
        Real-time monitoring of shortened URLs
      </p>

    </div>

    <div className="bg-[#333333] rounded-3xl p-6">

      {/* Top Graphs */}

      <div className="grid grid-cols-2 gap-5">

        {/* Donut Chart */}

        <div className="bg-[#2b2b2b] rounded-2xl p-5">

          <p className="text-xs text-gray-400 mb-4">
            Click Distribution
          </p>

          <div className="flex justify-center">

            <div className="relative w-28 h-28">

              <div className="absolute inset-0 rounded-full border-[10px] border-[#FFD166] border-r-blue-500 border-t-cyan-400"></div>

              <div className="absolute inset-4 rounded-full bg-[#2b2b2b]"></div>

            </div>

          </div>

        </div>

        {/* Line Chart */}

        <div className="bg-[#2b2b2b] rounded-2xl p-5">

          <p className="text-xs text-gray-400 mb-4">
            Daily Traffic
          </p>

          <svg
            viewBox="0 0 220 120"
            className="w-full h-28"
          >

            <path
              d="M10 75
              C40 20,
              70 85,
              110 35
              S170 20,
              210 70"
              stroke="#FFD166"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

          </svg>

        </div>

      </div>

      {/* Performance Graph */}

      <div className="bg-[#2b2b2b] rounded-2xl mt-6 p-5">

        <p className="text-xs text-gray-400 mb-4">
          URL Performance
        </p>

        <svg
          viewBox="0 0 500 220"
          className="w-full h-60"
        >

          <line x1="0" y1="40" x2="500" y2="40" stroke="#555" />
          <line x1="0" y1="80" x2="500" y2="80" stroke="#555" />
          <line x1="0" y1="120" x2="500" y2="120" stroke="#555" />
          <line x1="0" y1="160" x2="500" y2="160" stroke="#555" />

          <path
            d="M0 180
            C70 170,
            120 120,
            180 130
            S290 180,
            350 100
            S430 80,
            500 170"
            fill="rgba(255,209,102,.45)"
            stroke="#FFD166"
            strokeWidth="3"
          />

          <path
            d="M0 185
            C80 170,
            150 150,
            210 120
            S330 90,
            420 170
            S470 170,
            500 130"
            fill="rgba(255,255,255,.15)"
            stroke="#EFEFEF"
            strokeWidth="2"
          />

        </svg>

      </div>

      {/* Bottom Info */}

      <div className="grid grid-cols-3 gap-4 mt-6">

        <div className="bg-[#2b2b2b] rounded-xl py-4 text-center">

          <p className="text-xs text-gray-500">
            Backend
          </p>

          <h3 className="font-semibold mt-2">
            AWS Lambda
          </h3>

        </div>

        <div className="bg-[#2b2b2b] rounded-xl py-4 text-center">

          <p className="text-xs text-gray-500">
            Database
          </p>

          <h3 className="font-semibold mt-2">
            DynamoDB
          </h3>

        </div>

        <div className="bg-[#2b2b2b] rounded-xl py-4 text-center">

          <p className="text-xs text-gray-500">
            Authentication
          </p>

          <h3 className="font-semibold mt-2">
            Cognito
          </h3>

        </div>

      </div>

    </div>

  </div>

</motion.div>

        </div>

      </section>

      <footer className="border-t border-[#444] py-6">

        <p className="text-center text-gray-500">
          © 2026 URL Shortener. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}