import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "aws-amplify/auth";
import { Mail, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";

const REMEMBER_KEY = "urlShortenerRememberedEmail";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => localStorage.getItem(REMEMBER_KEY) || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem(REMEMBER_KEY));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn({ username: email, password });

      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }

      if (result.isSignedIn) {
        toast.success("Welcome back!");
        navigate("/dashboard", { replace: true });
        return;
      }

      switch (result.nextStep?.signInStep) {
        case "CONFIRM_SIGN_UP":
          navigate("/register", { state: { email, resumeConfirm: true } });
          break;

        case "RESET_PASSWORD":
          navigate("/forgot-password", { state: { email } });
          break;

        case "DONE":
          navigate("/dashboard", { replace: true });
          break;

        default:
          setError("Additional authentication is required. Please follow the next step.");
      }
    } catch (err) {
      console.error(err);

      // Common gotcha: if a stale session already exists, Amplify throws
      // instead of returning isSignedIn: true. Treat it as a success case.
      if (err.name === "UserAlreadyAuthenticatedException") {
        navigate("/dashboard", { replace: true });
        return;
      }

      const friendlyMessage =
        err.message || err.name || "Unable to login. Please check your credentials.";

      setError(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to manage links, monitor traffic, and launch smarter campaigns."
      footerText="Don't have an account?"
      footerLink="/register"
      footerLabel="Sign Up"
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <AuthInput
            icon={Mail}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
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
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 py-4 text-base font-semibold text-white shadow-[0_14px_26px_rgba(37,99,235,.28)] transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
          <ArrowRight size={18} />
        </button>
      </form>
    </AuthLayout>
  );
}