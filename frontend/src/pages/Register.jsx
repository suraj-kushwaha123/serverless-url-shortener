import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { User, Mail, ArrowRight, ShieldCheck } from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import SocialButton from "../components/auth/SocialButton";

export default function Register() {
  const navigate = useNavigate();

  // step 1 = signup form, step 2 = OTP verification
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: { email, name },
        },
      });

      // THIS was the missing piece: Cognito needs a confirmation code
      // before the account is usable. Previously we navigated straight
      // to /login here, so the OTP screen never showed up.
      if (!result.isSignUpComplete) {
        setMessage("We've sent a verification code to your email.");
        setStep(2);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      if (result.isSignUpComplete) {
        navigate("/login", { state: { justRegistered: true } });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");

    try {
      await resendSignUpCode({ username: email });
      setMessage("A new code has been sent to your email.");
    } catch (err) {
      setError(err.message || "Unable to resend code.");
    }
  }

  if (step === 2) {
    return (
      <AuthLayout
        title="Verify Your Email"
        subtitle={`Enter the code we sent to ${email}.`}
        footerText="Wrong email?"
        footerLink="/register"
        footerLabel="Go back"
      >
        <form onSubmit={handleConfirm} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Verification Code
            </label>
            <AuthInput
              icon={ShieldCheck}
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
            />
          </div>

          {message && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-semibold text-white shadow-[0_14px_26px_rgba(37,99,235,.28)] transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Account"}
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={handleResend}
            className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Resend code
          </button>
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Build your link workspace and unlock real-time analytics in minutes."
      footerText="Already have an account?"
      footerLink="/login"
      footerLabel="Login"
    >
      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>
          <AuthInput
            icon={User}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email
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

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Confirm Password
          </label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" required className="h-4 w-4 rounded border-slate-300" />
          I agree to the Terms & Conditions
        </label>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-base font-semibold text-white shadow-[0_14px_26px_rgba(37,99,235,.28)] transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
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
            className="h-6 w-6"
            alt=""
          />
          Continue with Google
        </SocialButton>
      </form>
    </AuthLayout>
  );
}