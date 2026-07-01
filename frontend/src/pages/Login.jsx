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
      title="Welcome Back 👋"
      subtitle="Login to continue managing your shortened URLs."
      footerText="Don't have an account?"
      footerLink="/register"
      footerLabel="Sign Up"
    >
      <form onSubmit={handleLogin} className="space-y-6" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
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
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Password
          </label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label
            className="text-sm text-slate-600"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <input type="checkbox" className="rounded" style={{ height: "16px", width: "16px" }} />
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
          {loading ? "Signing In..." : "Sign In"}
          <ArrowRight size={18} />
        </button>

        <div style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }}></div>
          <span style={{ padding: "0 16px", fontSize: "14px", color: "#94a3b8" }}>OR</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }}></div>
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