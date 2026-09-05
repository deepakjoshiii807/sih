import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "convex/react";
import { AlertTriangle, ArrowRight, ChevronLeft, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { PROFILE_ROLES, roleHome, type ProfileRoleId } from "@/lib/profile-roles";
import { cn } from "@/lib/utils";

type Tab = "demo" | "email";

const VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function errorMessage(err: unknown): string {
  if (err instanceof Error && err.message) return err.message;
  return "Something went wrong — please try again.";
}

export default function AuthSwitch() {
  const { isLoading, isAuthenticated, user, signIn } = useAuth();
  const setProfileRole = useMutation(api.roles.setProfileRole);
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("demo");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Signed in but hasn't chosen one of the four product profiles yet.
  const needsRolePick = isAuthenticated && !!user && !user.profileRole;

  const pickRole = async (role: ProfileRoleId, label: string) => {
    if (busy) return;
    setBusy(`Setting up ${label} workspace…`);
    setError("");
    try {
      await setProfileRole({ profileRole: role });
      toast.success(`Signed in as ${label}`);
    } catch (err) {
      setError(errorMessage(err));
      toast.error(errorMessage(err));
    } finally {
      setBusy(null);
    }
  };

  // ─── Auto-redirect: authenticated user with a profile goes to their home ──
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.profileRole) {
      navigate(roleHome(user.profileRole), { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, user, navigate]);

  // ─── Enter a demo profile instantly (anonymous session) ────────────────
  const demoAs = async (role: ProfileRoleId, label: string) => {
    if (busy) return;
    setBusy(`Signing in as ${label}…`);
    setError("");
    try {
      if (!isAuthenticated) {
        await signIn("anonymous");
      }
      await setProfileRole({ profileRole: role });
      toast.success(`Signed in as ${label}`);
    } catch (err) {
      setError(errorMessage(err));
      toast.error(errorMessage(err));
    } finally {
      setBusy(null);
    }
  };

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!VALID_EMAIL.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setBusy("Sending code…");
    try {
      await signIn("emailOtp", { email: email.trim().toLowerCase() });
      setOtpSent(true);
    } catch (err) {
      setError(errorMessage(err));
      toast.error(errorMessage(err));
    } finally {
      setBusy(null);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(code.trim())) {
      setError("Enter the 6-digit code from the email.");
      return;
    }
    setBusy("Verifying code…");
    try {
      const params: Record<string, string> = { email: email.trim().toLowerCase(), code: code.trim() };
      if (name.trim()) params.name = name.trim();
      await signIn("emailOtp", params);
      toast.success("Signed in");
    } catch (err) {
      setError(errorMessage(err));
      toast.error(errorMessage(err));
    } finally {
      setBusy(null);
    }
  };

  const roleCards = useMemo(() => PROFILE_ROLES, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "#f4f7fb" }}>
      {/* Decorative gradient wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />
        <div className="absolute top-1/3 -right-28 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #34d399, transparent 70%)" }} />
        <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }} />
      </div>

      {/* Back to home */}
      <Link
        to="/"
        className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center gap-1.5 rounded-full border border-gray-200/70 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-gray-600 backdrop-blur transition-all hover:bg-white hover:text-gray-900 sm:text-[13px]"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Home
      </Link>

      {/* Brand */}
      <div className="relative z-10 flex items-center gap-2.5 px-5 pt-6 sm:px-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900">
          <span className="text-[9px] font-bold tracking-tight text-white sm:text-[10px]">L2L</span>
        </div>
        <span className="text-sm font-semibold tracking-tight text-gray-900 sm:text-[15px]">Lead2Learn</span>
      </div>

      {/* Card */}
      <div className="relative z-10 flex min-h-[calc(100vh-76px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-[480px]">
          <div className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-[22px] font-bold tracking-tight text-gray-900">AIIA Skills Platform</h1>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                Evidence → Skills → Gap → Match → Opportunity
              </p>
            </div>

            {/* Tab switch */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1">
              {(
                [
                  { id: "demo", label: "Instant demo" },
                  { id: "email", label: "Email sign in" },
                ] as { id: Tab; label: string }[]
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTab(t.id);
                    setError("");
                  }}
                  className={cn(
                    "cursor-pointer rounded-lg py-2 text-[13px] font-semibold transition-all",
                    tab === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* ─────────────────────────── DEMO TAB ─────────────────────────── */}
            {tab === "demo" && (
              <div>
                <p className="mb-4 text-center text-[13px] text-gray-500">
                  One tap per profile — no email or password needed.
                </p>
                {needsRolePick ? (
                  <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-center text-xs text-amber-700">
                    You're signed in — choose a profile to open its dashboard.
                  </p>
                ) : null}
                <div className="flex flex-col gap-2.5">
                  {roleCards.map((r) => {
                    const Icon = r.icon;
                    const loading = busy === `Signing in as ${r.name}…`;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        disabled={!!busy}
                        onClick={() => demoAs(r.id, r.name)}
                        className={cn(
                          "group flex w-full items-center gap-3.5 rounded-2xl border-2 border-gray-100 bg-white p-4 text-left transition-all",
                          "hover:border-gray-200 hover:shadow-md active:scale-[0.99]",
                          busy && !loading && "pointer-events-none opacity-50",
                        )}
                      >
                        <div
                          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                          style={{ background: r.iconBg }}
                        >
                          <Icon className="h-5 w-5" style={{ color: r.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-semibold text-gray-900">{r.name}</span>
                            <span className="rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider" style={{ background: r.bg, color: r.color }}>
                              {r.label}
                            </span>
                          </div>
                          <span className="mt-0.5 block text-[12px] text-gray-500">{r.desc}</span>
                        </div>
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        ) : (
                          <ArrowRight className="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-gray-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ────────────────────────── EMAIL TAB ─────────────────────────── */}
            {tab === "email" && (
              <div>
                {!otpSent ? (
                  <form onSubmit={sendCode} className="space-y-3.5">
                    <p className="text-center text-[13px] text-gray-500">
                      Enter your email and we'll send a one-time code.
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-gray-600">Full name (optional, new accounts)</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-gray-600">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          placeholder="you@institution.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100"
                        />
                      </div>
                    </div>
                    {error && (
                      <p className="flex items-center gap-1.5 text-[12px] text-red-500">
                        <AlertTriangle className="h-3 w-3 flex-shrink-0" /> {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={!!busy}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.99] disabled:opacity-50"
                    >
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send code <ArrowRight className="h-4 w-4" /></>}
                    </button>
                  </form>
                ) : needsRolePick ? null : (
                  <form onSubmit={verifyCode} className="space-y-3.5">
                    <div className="flex items-center gap-1 text-[13px] text-gray-500">
                      <button type="button" onClick={() => { setOtpSent(false); setCode(""); setError(""); }} className="flex items-center gap-1 text-gray-400 transition-colors hover:text-gray-600">
                        <ChevronLeft className="h-3.5 w-3.5" /> Change email
                      </button>
                    </div>
                    <p className="text-center text-[13px] text-gray-500">
                      We emailed a 6-digit code to <span className="font-semibold text-gray-700">{email}</span>
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-gray-600">One-time code</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="000000"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3 pl-4 pr-4 text-center font-mono text-lg tracking-[0.4em] text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100"
                      />
                    </div>
                    {error && (
                      <p className="flex items-center gap-1.5 text-[12px] text-red-500">
                        <AlertTriangle className="h-3 w-3 flex-shrink-0" /> {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={!!busy}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.99] disabled:opacity-50"
                    >
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Verify & continue <ArrowRight className="h-4 w-4" /></>}
                    </button>
                    <p className="text-center text-[11px] text-gray-400">
                      Didn't get it? Check spam, or go back to resend.
                    </p>
                  </form>
                )}

                {/* Profile picker shown right after a successful email sign-in */}
                {needsRolePick && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="mb-3 text-center text-[13px] font-semibold text-gray-700">
                      Welcome! Pick your profile to continue
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {roleCards.map((r) => {
                        const Icon = r.icon;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            disabled={!!busy}
                            onClick={() => pickRole(r.id, r.name)}
                            className="group flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white p-3 text-left transition-all hover:border-gray-200 hover:shadow-sm active:scale-[0.98]"
                          >
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: r.iconBg }}>
                              <Icon className="h-4 w-4" style={{ color: r.color }} />
                            </div>
                            <span className="text-[13px] font-semibold text-gray-800">{r.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="mt-4 text-center text-[11px] text-gray-400">
            Prototype for the AIIA Academia–Industry collaboration demo.
          </p>
        </div>
      </div>
    </div>
  );
}
