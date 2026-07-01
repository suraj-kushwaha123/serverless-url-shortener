import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My URLs",
      path: "/dashboard#urls",
      icon: <Link2 size={20} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <aside
  className="
    fixed bottom-0 left-0 right-0 z-40
    border-t border-slate-200 bg-white shadow-xl

    lg:static
    lg:flex
    lg:h-screen
    lg:w-72
    lg:flex-col
    lg:border-r
    lg:border-t-0
    lg:shrink-0
  "
>

      <div className="hidden border-b border-slate-200 px-6 py-7 lg:block">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            U
          </div>

          <div>

            <h1 className="text-lg font-bold text-slate-950">
              URL Shortener
            </h1>

            <p className="text-xs text-slate-500">
              Admin Dashboard
            </p>

          </div>

        </div>

      </div>

      <div className="lg:flex lg:flex-1 lg:flex-col lg:p-5">

        <p className="mb-4 hidden text-xs uppercase tracking-widest text-slate-400 lg:block">
          Navigation
        </p>

        <nav className="grid grid-cols-4 gap-1 px-2 py-2 lg:block lg:space-y-2 lg:px-0 lg:py-0">

          {menu.map((item) => {

            const [path, hash] = item.path.split("#");
            const active = hash
              ? location.pathname === path && location.hash === `#${hash}`
              : location.pathname === path && !location.hash;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold transition-all duration-200 lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:py-3 lg:text-sm
                ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {item.icon}

                <span className="font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}

        </nav>

      </div>

      <div className="mt-auto hidden border-t border-slate-200 p-5 lg:block">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
            S
          </div>

          <div className="flex-1">

            <p className="font-semibold text-slate-950">
              Suraj
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            title="Sign out"
          >
            <LogOut size={18} />
          </button>

        </div>

      </div>

    </aside>
  );
}
