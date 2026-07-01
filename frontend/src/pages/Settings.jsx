import { useEffect, useState } from "react";
import {
  fetchUserAttributes,
  getCurrentUser,
  updatePassword,
  updateUserAttributes,
} from "aws-amplify/auth";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Save,
  Server,
  ShieldCheck,
  User,
} from "lucide-react";

import AppShell from "../components/AppShell";
import { API_BASE_URL } from "../services/api";

const defaultPreferences = {
  compactTable: false,
  emailReports: true,
  defaultSort: "newest",
};

export default function Settings() {
  const [account, setAccount] = useState({
    userId: "",
    email: "",
    name: "",
  });
  const [profileName, setProfileName] = useState("");
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("urlShortenerSettings");

    return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
  });
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAccount() {
      try {
        const [currentUser, attributes] = await Promise.all([
          getCurrentUser(),
          fetchUserAttributes(),
        ]);

        if (isMounted) {
          const name = attributes.name || "";

          setAccount({
            userId: currentUser.userId,
            email: attributes.email || currentUser.signInDetails?.loginId || "",
            name,
          });
          setProfileName(name);
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setMessage("Unable to load account details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAccount();

    return () => {
      isMounted = false;
    };
  }, []);

  async function saveProfile(event) {
    event.preventDefault();

    try {
      setSavingProfile(true);
      setMessage("");

      await updateUserAttributes({
        userAttributes: {
          name: profileName.trim(),
        },
      });

      setAccount((current) => ({
        ...current,
        name: profileName.trim(),
      }));
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function savePassword(event) {
    event.preventDefault();

    if (!passwords.current || !passwords.next) {
      setMessage("Enter both current and new password.");
      return;
    }

    try {
      setSavingPassword(true);
      setMessage("");

      await updatePassword({
        oldPassword: passwords.current,
        newPassword: passwords.next,
      });

      setPasswords({
        current: "",
        next: "",
      });
      setMessage("Password updated successfully.");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to update password.");
    } finally {
      setSavingPassword(false);
    }
  }

  function savePreferences() {
    localStorage.setItem("urlShortenerSettings", JSON.stringify(preferences));
    setMessage("Preferences saved on this browser.");
  }

  return (
    <AppShell>
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Settings
              </h1>

              <p className="text-slate-500 mt-2 text-lg">
                Manage your account, security, and workspace preferences.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              <ShieldCheck size={18} />
              Cognito protected
            </div>
          </div>

          {message && (
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-medium text-blue-700">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
            <section className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Account Profile
                  </h2>

                  <p className="text-sm text-slate-500">
                    Details from your signed-in Cognito account.
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="rounded-xl bg-slate-50 px-4 py-12 text-center text-sm font-medium text-slate-500">
                  Loading account settings...
                </div>
              ) : (
                <form onSubmit={saveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Email">
                      <input
                        value={account.email}
                        readOnly
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                      />
                    </Field>

                    <Field label="User ID">
                      <input
                        value={account.userId}
                        readOnly
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                      />
                    </Field>
                  </div>

                  <Field label="Display Name">
                    <input
                      value={profileName}
                      onChange={(event) => setProfileName(event.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    <Save size={17} />
                    {savingProfile ? "Saving..." : "Save Profile"}
                  </button>
                </form>
              )}
            </section>

            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-green-600 text-white flex items-center justify-center">
                  <Server size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Backend
                  </h2>

                  <p className="text-sm text-slate-500">
                    Active API connection.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  API Base URL
                </p>

                <p className="mt-2 break-all text-sm font-medium text-slate-700">
                  {API_BASE_URL}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-green-700">
                <CheckCircle2 size={17} />
                Requests include your Cognito token.
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                  <KeyRound size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Security
                  </h2>

                  <p className="text-sm text-slate-500">
                    Change your account password.
                  </p>
                </div>
              </div>

              <form onSubmit={savePassword} className="space-y-5">
                <Field label="Current Password">
                  <PasswordInput
                    value={passwords.current}
                    visible={showPasswords}
                    onChange={(value) =>
                      setPasswords((current) => ({
                        ...current,
                        current: value,
                      }))
                    }
                  />
                </Field>

                <Field label="New Password">
                  <PasswordInput
                    value={passwords.next}
                    visible={showPasswords}
                    onChange={(value) =>
                      setPasswords((current) => ({
                        ...current,
                        next: value,
                      }))
                    }
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60"
                  >
                    <KeyRound size={17} />
                    {savingPassword ? "Updating..." : "Update Password"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPasswords((current) => !current)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {showPasswords ? <EyeOff size={17} /> : <Eye size={17} />}
                    {showPasswords ? "Hide" : "Show"}
                  </button>
                </div>
              </form>
            </section>

            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                  <Save size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Preferences
                  </h2>

                  <p className="text-sm text-slate-500">
                    Saved locally for your current browser.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <Toggle
                  label="Compact URL table"
                  checked={preferences.compactTable}
                  onChange={(checked) =>
                    setPreferences((current) => ({
                      ...current,
                      compactTable: checked,
                    }))
                  }
                />

                <Toggle
                  label="Email analytics reports"
                  checked={preferences.emailReports}
                  onChange={(checked) =>
                    setPreferences((current) => ({
                      ...current,
                      emailReports: checked,
                    }))
                  }
                />

                <Field label="Default Dashboard Sort">
                  <select
                    value={preferences.defaultSort}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        defaultSort: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="clicks">Most Clicked</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                  </select>
                </Field>

                <button
                  type="button"
                  onClick={savePreferences}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Save size={17} />
                  Save Preferences
                </button>
              </div>
            </section>
          </div>
        </div>
    </AppShell>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function PasswordInput({ value, visible, onChange }) {
  return (
    <input
      type={visible ? "text" : "password"}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3">
      <span className="text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-blue-600"
      />
    </label>
  );
}
