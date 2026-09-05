import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  ChevronLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { apiErrorMessage, useAuth, type ApiRole } from "@/lib/django-auth";
import { PROFILE_ROLES, apiRoleToProfileRole, roleForPath, roleHome, type ProfileRoleId } from "@/lib/profile-roles";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

/** Platform profile id → Django User.role value. */
const API_ROLE: Record<ProfileRoleId, ApiRole> = {
  student: "student",
  industry: "industry",
  academician: "academician",
  institutionAdmin: "institution_admin",
};

const VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordStrength(p: string): number {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

export default function AuthSwitch() {
  const { isLoading, isAuthenticated, user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<Mode>("login");
  const [role, setRole] = useState<ProfileRoleId | null>(null);
  const [showPw, setShowPw] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const nextParam = useMemo(() => {
    try {
      return new URLSearchParams(location.search).get("next");
    } catch {
      return null;
    }
  }, [location.search]);

  // Signed-in users are sent to their dashboard (or a matching deep link).
  useEffect(() => {
    if (isLoading || !isAuthenticated || !user) return;
    const profile = apiRoleToProfileRole(user.role);
    const dest = profile ? roleHome(profile) : "/login";
    const nextOk = profile && nextParam && roleForPath(nextParam) === profile;
    navigate(nextOk ? (nextParam as string) : dest, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, user]);

  const reset = (m: Mode) => {
    setMode(m);
    setRole(null);
    setErrs({});
    setPw("");
    setConfirmPw("");
    setShowPw(false);
  };

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!VALID_EMAIL.test(email)) er.email = "Enter a valid email address.";
    if (!pw) er.pw = "Password is required.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await signIn(email, pw);
      // redirect happens via the effect above once `user` is set
    } catch (err) {
      setErrs({ form: apiErrorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const submitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!role) er.role = "Select a profile first.";
    if (!name.trim()) er.name = "Full name is required.";
    if (!VALID_EMAIL.test(email)) er.email = "Enter a valid email address.";
    if (pw.length < 8) er.pw = "Password must be at least 8 characters.";
    else if (passwordStrength(pw) < 3) er.pw = "Make your password stronger (add uppercase, numbers or symbols).";
    if (pw !== confirmPw) er.cpw = "Passwords don't match.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      await signUp({
        email,
        password: pw,
        name: name.trim(),
        role: API_ROLE[role as ProfileRoleId],
        phone: phone.trim(),
      });
    } catch (err) {
      setErrs({ form: apiErrorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const inputCls = (invalid?: string) =>
    cn(
      "w-full rounded-xl border bg-gray-50/80 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all",
      "placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100",
      invalid ? "border-red-300 bg-red-50/40" : "border-gray-200",
    );

  const FieldError = ({ msg }: { msg?: string }) =>
    msg ? (
      <p className="flex items-center gap-1.5 text-[12px] text-red-500">
        <AlertTriangle className="h-3 w-3 flex-shrink-0" /> {msg}
      </p>
    ) : null;

  const roleCards = useMemo(() => PROFILE_ROLES, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f4f6f8]">
      {/* decorative wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #94a3b8, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #cbd5e1, transparent 70%)" }} />
      </div>

      <Link to="/" className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-gray-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-gray-600 backdrop-blur transition-all hover:bg-white hover:text-gray-900 sm:right-8 sm:top-6">
        <ChevronLeft className="h-3.5 w-3.5" /> Home
      </Link>

      <div className="relative z-10 flex items-center gap-2.5 px-5 pt-6 sm:px-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900">
          <span className="text-[9px] font-bold tracking-tight text-white sm:text-[10px]">L2L</span>
        </div>
        <span className="text-sm font-semibold tracking-tight text-gray-900 sm:text-[15px]">Lead2Learn · AIIA Skills Platform</span>
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-[430px]">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_40px_rgba(15,23,42,0.06)] sm:p-7">
            <div className="mb-5 text-center">
              <h1 className="text-[21px] font-bold tracking-tight text-gray-900">
                {mode === "login" ? "Sign in to your account" : "Create your account"}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {mode === "login"
                  ? "Access your role dashboard, skill passport and pipeline."
                  : "Pick your profile, then add your details — one account per role."}
              </p>
            </div>

            {errs.form && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                {errs.form}
              </div>
            )}

            {mode === "login" && (
              <form onSubmit={submitLogin} className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-gray-600">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="email" placeholder="you@institution.edu" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls(errs.email)} autoComplete="email" />
                  </div>
                  <FieldError msg={errs.email} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-gray-600">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      className={cn(inputCls(errs.pw), "pr-10")}
                      autoComplete="current-password"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600">
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FieldError msg={errs.pw} />
                </div>

                <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.99] disabled:opacity-50">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
                </button>

                <p className="pt-1 text-center text-[13px] text-gray-500">
                  New to the platform?{" "}
                  <button type="button" onClick={() => reset("signup")} className="font-semibold text-gray-900 hover:underline">
                    Create an account
                  </button>
                </p>
              </form>
            )}

            {mode === "signup" && !role && (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Select your profile</p>
                <div className="grid grid-cols-1 gap-2">
                  {roleCards.map((r) => {
                    const Icon = r.icon;
                    const selected = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-3.5 text-left transition-all",
                          selected ? "border-gray-900 shadow-sm" : "border-gray-100 hover:border-gray-200 hover:shadow-sm",
                        )}
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: r.iconBg }}>
                          <Icon className="h-5 w-5" style={{ color: r.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[14px] font-semibold text-gray-900">{r.name}</span>
                          <span className="block text-[12px] text-gray-500">{r.desc}</span>
                        </div>
                        {selected && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="pt-1 text-center text-[13px] text-gray-500">
                  Already registered?{" "}
                  <button type="button" onClick={() => reset("login")} className="font-semibold text-gray-900 hover:underline">Sign in</button>
                </p>
              </div>
            )}

            {mode === "signup" && role && (
              <form onSubmit={submitSignup} className="space-y-3">
                <button type="button" onClick={() => setRole(null)} className="flex items-center gap-1 text-[13px] text-gray-400 transition-colors hover:text-gray-600">
                  <ChevronLeft className="h-3.5 w-3.5" /> Choose a different profile
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: roleCards.find((r) => r.id === role)?.iconBg }}>
                    {(() => { const Icon = roleCards.find((r) => r.id === role)?.icon ?? Building2; return <Icon className="h-5 w-5" style={{ color: roleCards.find((r) => r.id === role)?.color }} />; })()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{roleCards.find((r) => r.id === role)?.name}</div>
                    <div className="text-[11px] text-gray-400">Creating your account</div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-gray-600">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls(errs.name)} autoComplete="name" />
                  </div>
                  <FieldError msg={errs.name} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-gray-600">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="email" placeholder="you@institution.edu" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls(errs.email)} autoComplete="email" />
                  </div>
                  <FieldError msg={errs.email} />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-gray-600">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input type="tel" placeholder="+91 …" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls()} autoComplete="tel" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-gray-600">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input type={showPw ? "text" : "password"} placeholder="Min 8 characters" value={pw} onChange={(e) => setPw(e.target.value)} className={cn(inputCls(errs.pw), "pr-10")} autoComplete="new-password" />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <FieldError msg={errs.pw} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-gray-600">Confirm password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type={showPw ? "text" : "password"} placeholder="Repeat password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className={inputCls(errs.cpw)} autoComplete="new-password" />
                  </div>
                  <FieldError msg={errs.cpw} />
                </div>

                <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.99] disabled:opacity-50">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create account <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            )}
          </div>

          <p className="mt-4 text-center text-[11px] text-gray-400">
            Academia–Industry collaboration platform · AYUSH skill development
          </p>
        </div>
      </div>
    </div>
  );
}
