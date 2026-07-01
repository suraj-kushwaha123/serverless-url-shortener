import { Link } from "react-router-dom";
import {
  Link2,
  BarChart3,
  ShieldCheck,
  Globe,
} from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLabel,
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

      <div className="w-full max-w-7xl min-h-[760px] rounded-[40px] overflow-hidden bg-white shadow-[0_30px_80px_rgba(0,0,0,.15)]">

        <div className="grid lg:grid-cols-2 h-full">

          {/* LEFT */}

          <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-14 text-white overflow-hidden">

            <div>

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">

                  <Link2 size={34} />

                </div>

                <div>

                  <h2 className="text-4xl font-bold">
                    ShortLink
                  </h2>

                  <p className="text-blue-100 text-lg">
                    URL Management Platform
                  </p>

                </div>

              </div>

              <h1 className="mt-20 text-5xl font-extrabold leading-tight">
                Manage all your links from one dashboard.
              </h1>

              <p className="mt-8 max-w-xl text-xl leading-9 text-blue-100">
                Track clicks, monitor analytics, manage URLs,
                generate QR codes and gain insights with a
                modern cloud-powered URL shortening platform.
              </p>

            </div>

            <div className="space-y-7">

              <Feature
                icon={<BarChart3 />}
                title="Real-time Analytics"
              />

              <Feature
                icon={<ShieldCheck />}
                title="Secure Authentication"
              />

              <Feature
                icon={<Globe />}
                title="Global URL Access"
              />

            </div>

            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>

            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center justify-center p-14">

            <div className="w-full max-w-lg">

              <h1 className="text-5xl font-bold text-slate-900">
                {title}
              </h1>

              <p className="mt-4 text-lg text-slate-500">
                {subtitle}
              </p>

              <div className="mt-10">
                {children}
              </div>

              <div className="mt-10 text-center text-slate-500">

                {footerText}

                <Link
                  to={footerLink}
                  className="ml-2 font-semibold text-blue-600"
                >
                  {footerLabel}
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-5">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

        {icon}

      </div>

      <span className="text-xl font-medium">
        {title}
      </span>

    </div>
  );
}