import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "aws-amplify/auth";
import { Mail, ArrowRight } from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import SocialButton from "../components/auth/SocialButton";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn({ username: email, password });

      if (result.isSignedIn) {
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

      setError(err.message || err.name || "Unable to login. Please check your credentials.");
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
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
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

        <div className="my-2 flex items-center">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="px-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">or continue with</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <SocialButton>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-6 w-6"
          />
          Continue with Google
        </SocialButton>
      </form>
    </AuthLayout>
  );
}