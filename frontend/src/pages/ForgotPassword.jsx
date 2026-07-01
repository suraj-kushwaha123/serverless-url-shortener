import { useState } from "react";
import {
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendCode(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      await resetPassword({
        username: email,
      });

      setMessage("Verification code sent to your email.");
      setStep(2);
    } catch (err) {
      setMessage(err.message || "Unable to send verification code.");
    } finally {
      setLoading(false);
    }
  }

  async function reset(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });

      navigate("/login");
    } catch (err) {
      setMessage(err.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto grid min-h-[620px] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl lg:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-10 sm:px-10">
          <form onSubmit={step === 1 ? sendCode : reset} className="w-full max-w-md">
            <Link to="/login" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
              <ArrowLeft size={16} />
              Back to login
            </Link>

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              {step === 1 ? <Mail size={22} /> : <KeyRound size={22} />}
            </div>

            <h1 className="text-4xl font-bold text-slate-950">
              {step === 1 ? "Reset your password" : "Create a new password"}
            </h1>
            <p className="mt-3 text-slate-500">
              {step === 1
                ? "Enter your email and Cognito will send a verification code."
                : "Use the verification code from your email to finish the reset."}
            </p>

            {message && (
              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
                {message}
              </div>
            )}

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </label>

              {step === 2 && (
                <>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Verification Code</span>
                    <input
                      placeholder="Enter code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">New Password</span>
                    <input
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      required
                    />
                  </label>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Please wait..." : step === 1 ? "Send Code" : "Reset Password"}
              </button>
            </div>
          </form>
        </section>

        <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-end">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
            Account Recovery
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight">
            Secure reset flow backed by Cognito.
          </h2>
          <p className="mt-4 text-slate-300">
            Verification codes keep password recovery controlled by the account owner.
          </p>
        </section>
    </div>
    </div>
  );
}
