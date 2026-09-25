import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut, getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import toast from "react-hot-toast";
import { LayoutDashboard, BarChart3, Settings, LogOut, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Analytics", path: "/analytics", icon: <BarChart3 size={20} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadProfile() {
      try {
        const [currentUser, attributes] = await Promise.all([
          getCurrentUser(),
          fetchUserAttributes(),
        ]);
        if (isMounted) {
          setProfile({
            name: attributes.name || currentUser.signInDetails?.loginId || "Operator",
            email: attributes.email || currentUser.signInDetails?.loginId || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoadingProfile(false);
      }
    }
    loadProfile();
    return () => { isMounted = false; };
  }, []);

  const initials = getInitials(profile.name || profile.email);

  async function handleSignOut() {
    try {
      await signOut();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Unable to disconnect. Retry sequence.");
    }
  }

  return (
    <aside
      className="
        fixed bottom-0 left-0 right-0 z-40
        border-t border-cyan-500/20 bg-[#050508]/80 backdrop-blur-2xl
        
        lg:static lg:flex lg:h-screen lg:w-[280px] lg:flex-col lg:border-r lg:border-t-0 lg:shrink-0
      "
    >
      <div className="hidden border-b border-cyan-500/20 px-8 py-8 lg:block relative overflow-hidden">
        {/* Glow effect behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-600/30 blur-[40px] pointer-events-none" />
        
        <Link to="/dashboard" className="group relative z-10 flex items-center gap-4">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover:scale-105">
            <Sparkles className="absolute -top-1.5 -right-1.5 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" size={14} />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white group-hover:neon-text-cyan transition-all">
              ShortLink
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500/80">
              Nexus Terminal
            </p>
          </div>
        </Link>
      </div>

      <div className="lg:flex lg:flex-1 lg:flex-col lg:p-6 lg:pt-8">
        <p className="mb-6 hidden text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 lg:block px-2">
          Systems
        </p>
        
        <nav className="flex justify-around px-2 py-3 lg:block lg:space-y-3 lg:px-0 lg:py-0 relative">
          {menu.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 lg:flex-row lg:justify-start lg:gap-4 lg:px-5 lg:py-4 lg:text-sm z-10
                ${active ? "text-cyan-300" : "text-slate-500 hover:text-white"}`}
              >
                {active && (
                  <motion.div
                    layoutId="cyberActiveTab"
                    className="absolute inset-0 -z-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.15)] hidden lg:block"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <div className={`${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "text-slate-500"}`}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
                
                {/* Active indicator dot for mobile */}
                {active && (
                  <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] lg:hidden" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto hidden border-t border-cyan-500/20 bg-[#0a0a10]/50 p-6 lg:block">
        <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 backdrop-blur-sm transition-colors hover:bg-white/[0.05]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 font-bold text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            {loadingProfile ? "..." : initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">
              {loadingProfile ? "Syncing..." : profile.name}
            </p>
            <p className="truncate text-xs font-semibold text-cyan-500/80">
              ID: {loadingProfile ? "..." : profile.email.split('@')[0]}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg p-2 text-slate-500 transition-all hover:bg-red-500/20 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            title="Disconnect"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function getInitials(value) {
  if (!value) return "OP";
  const namePart = value.includes("@") ? value.split("@")[0] : value;
  const segments = namePart.trim().split(/[\s._-]+/).filter(Boolean);
  if (segments.length === 0) return "OP";
  if (segments.length === 1) return segments[0].slice(0, 2).toUpperCase();
  return `${segments[0][0]}${segments[1][0]}`.toUpperCase();
}
