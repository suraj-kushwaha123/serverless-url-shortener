import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "aws-amplify/auth";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signIn({
        username: email,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to continue managing your shortened URLs."
      footerText="Don't have an account?"
      footerLink="/register"
      footerLabel="Sign Up"
    >
      <form
        onSubmit={handleLogin}
        className="space-y-6"
      >
        <div>

          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="john@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

        </div>

        <div>

          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Password
          </label>

          <div className="relative">

            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-14 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-slate-600">

            <input
              type="checkbox"
              className="rounded"
            />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </Link>

        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading
            ? "Signing In..."
            : "Sign In"}

          <ArrowRight size={18} />
        </button>

        <div className="relative">

          <div className="absolute inset-0 flex items-center">

            <div className="w-full border-t border-slate-200"></div>

          </div>

          <div className="relative flex justify-center">

            <span className="bg-white px-4 text-sm text-slate-400">
              OR
            </span>

          </div>

        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-4 font-semibold transition hover:bg-slate-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-6 w-6"
          />

          Continue with Google
        </button>

      </form>
    </AuthLayout>
  );
}