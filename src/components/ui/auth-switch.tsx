import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Briefcase,
  BookOpen,
  Building2,
  ArrowRight,
  Loader2,
  AlertTriangle,
  ChevronLeft,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────
type AuthMode = "login" | "signup";
type SignupStep = "role" | "details";
type RoleType = "student" | "industry" | "academician" | "admin";

interface RoleConfig {
  id: RoleType;
  name: string;
  desc: string;
  icon: typeof GraduationCap;
  color: string;
  gradient: string;
}

const ROLES: RoleConfig[] = [
  { id: "student", name: "Student", desc: "Build skills, discover opportunities", icon: GraduationCap, color: "#22C55E", gradient: "from-[#22C55E]/10 to-transparent" },
  { id: "industry", name: "Industry", desc: "Find talent, create opportunities", icon: Briefcase, color: "#3B82F6", gradient: "from-[#3B82F6]/10 to-transparent" },
  { id: "academician", name: "Academician", desc: "Connect curriculum with industry", icon: BookOpen, color: "#A78BFA", gradient: "from-[#A78BFA]/10 to-transparent" },
  { id: "admin", name: "Institution Admin", desc: "Monitor outcomes & insights", icon: Building2, color: "#F59E0B", gradient: "from-[#F59E0B]/10 to-transparent" },
];

const PIPELINE = [
  { label: "Evidence", done: true },
  { label: "Skills", done: true },
  { label: "Gap", done: false },
  { label: "Match", done: false },
  { label: "Opportunity", done: false },
];

// ─── Component ─────────────────────────────────────────
export default function AuthSwitch() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [step, setStep] = useState<SignupStep>("role");
  const [role, setRole] = useState<RoleType | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [inst, setInst] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [sector, setSector] = useState("");
  const [site, setSite] = useState("");
  const [dept, setDept] = useState("");
  const [desig, setDesig] = useState("");
  const [remember, setRemember] = useState(false);

  const roleCfg = ROLES.find((r) => r.id === role);

  const reset = useCallback((m: AuthMode) => {
    setMode(m);
    setStep("role");
    setRole(null);
    setErrs({});
    setEmail("");
    setPw("");
    setName("");
    setConfirmPw("");
    setShowPw(false);
  }, []);

  const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const strength = (p: string) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[a-z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strInfo = (s: number) =>
    s <= 1 ? { t: "Very weak", c: "#EF4444" } :
    s <= 2 ? { t: "Weak", c: "#F97316" } :
    s <= 3 ? { t: "Fair", c: "#EAB308" } :
    { t: "Strong", c: "#22C55E" };

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!validEmail(email)) er.email = "Enter a valid email";
    if (!pw) er.pw = "Password required";
    setErrs(er);
    if (Object.keys(er).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    alert("Signed in as " + email);
  };

  const doSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    const er: Record<string, string> = {};
    if (!name.trim()) er.name = "Required";
    if (!validEmail(email)) er.email = "Enter a valid email";
    if (pw.length < 8) er.pw = "Min 8 characters";
    if (strength(pw) < 3) er.pw = "Password too weak";
    if (pw !== confirmPw) er.cpw = "Passwords don't match";
    setErrs(er);
    if (Object.keys(er).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    alert(role + " account created for " + email);
  };

  // ─── Brand Panel (Left Side) ───
  const BrandPanel = () => (
    <div className="flex flex-col justify-between h-full py-10 px-8 lg:px-12">
      {/* Top */}
      <div>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-black font-bold text-sm">S</span>
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">SkillBridge</span>
        </div>

        <h1
          className="text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-tight mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Turn your skills
          <br />
          into <span className="text-primary">opportunities.</span>
        </h1>

        <p className="text-white/40 text-sm leading-relaxed max-w-sm">
          The AYUSH platform connecting evidence, skills, and industry demand
          into verified career pathways.
        </p>
      </div>

      {/* Pipeline */}
      <div className="my-8">
        <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4">
          Your journey
        </p>
        <div className="flex items-center gap-0">
          {PIPELINE.map((p, i) => (
            <div key={p.label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-500",
                    p.done
                      ? "bg-primary text-black"
                      : "bg-white/[0.06] text-white/25 border border-white/[0.06]"
                  )}
                >
                  {p.done ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={cn("text-[10px] font-medium", p.done ? "text-primary" : "text-white/20")}>
                  {p.label}
                </span>
              </div>
              {i < PIPELINE.length - 1 && (
                <div className={cn("w-6 lg:w-10 h-px mx-1 mb-5", p.done ? "bg-primary/40" : "bg-white/[0.06]")} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div>
          <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>300+</span>
          <p className="text-[11px] text-white/30 mt-0.5">AYUSH Programs</p>
        </div>
        <div className="w-px bg-white/[0.08]" />
        <div>
          <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'Syne', sans-serif" }}>1,200+</span>
          <p className="text-[11px] text-white/30 mt-0.5">Clinical Opportunities</p>
        </div>
      </div>
    </div>
  );

  // ─── Pipeline (Mobile) ───
  const MobilePipeline = () => (
    <div className="flex items-center justify-center gap-1 lg:hidden py-2 mb-2">
      {PIPELINE.map((p, i) => (
        <div key={p.label} className="flex items-center">
          <div className={cn("w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold", p.done ? "bg-primary text-black" : "bg-white/[0.06] text-white/25")}>
            {p.done ? <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> : i + 1}
          </div>
          {i < PIPELINE.length - 1 && <div className={cn("w-3 h-px mx-0.5", p.done ? "bg-primary/40" : "bg-white/[0.06]")} />}
        </div>
      ))}
    </div>
  );

  // ─── Password Strength ───
  const StrBar = ({ v }: { v: string }) => {
    if (!v) return null;
    const s = strength(v);
    const info = strInfo(s);
    return (
      <div className="mt-2 space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(s / 5) * 100}%`, background: info.c }} />
          </div>
          <span className="text-[10px] font-medium" style={{ color: info.c }}>{info.t}</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {[{ l: "8+ chars", ok: v.length >= 8 }, { l: "Uppercase", ok: /[A-Z]/.test(v) }, { l: "Number", ok: /\d/.test(v) }, { l: "Special", ok: /[^A-Za-z0-9]/.test(v) }].map((r) => (
            <span key={r.l} className={cn("text-[10px]", r.ok ? "text-primary" : "text-white/20")}>{r.ok ? "✓" : "○"} {r.l}</span>
          ))}
        </div>
      </div>
    );
  };

  // ─── Input ───
  const Inp = ({ icon: Icon, label, error, ...props }: { icon: typeof Mail; label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-1.5">
      <label className="text-[12px] font-medium text-white/50">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
        <input
          className={cn(
            "w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border rounded-lg text-sm text-white placeholder:text-white/20",
            "focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all",
            error ? "border-red-500/40" : "border-white/[0.06]"
          )}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{error}</p>}
    </div>
  );

  // ─── Password Field ───
  const PwField = ({ value, onChange, error, label = "Password" }: { value: string; onChange: (v: string) => void; error?: string; label?: string }) => (
    <div className="space-y-1.5">
      <label className="text-[12px] font-medium text-white/50">{label}</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
        <input
          type={showPw ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full pl-10 pr-10 py-2.5 bg-white/[0.03] border rounded-lg text-sm text-white placeholder:text-white/20",
            "focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all",
            error ? "border-red-500/40" : "border-white/[0.06]"
          )}
        />
        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{error}</p>}
      <StrBar v={value} />
    </div>
  );

  // ─── Select ───
  const Sel = ({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: string[] }) => (
    <div className="space-y-1.5">
      <label className="text-[12px] font-medium text-white/50">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-primary/40 transition-all appearance-none">
        <option value="" className="bg-[#0A0A0F]">Select</option>
        {opts.map((o) => <option key={o} value={o} className="bg-[#0A0A0F]">{o}</option>)}
      </select>
    </div>
  );

  // ─── Role Cards ───
  const RoleCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {ROLES.map((r) => {
        const sel = role === r.id;
        const Icon = r.icon;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => setRole(r.id)}
            className={cn(
              "group relative flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200",
              sel ? "border-[color:var(--rc)]" : "border-white/[0.06] hover:border-white/[0.12]"
            )}
            style={{
              ["--rc" as string]: r.color,
              background: sel ? `linear-gradient(135deg, ${r.color}12, transparent)` : undefined,
              borderColor: sel ? r.color + "60" : undefined,
            }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all" style={{ background: sel ? r.color + "20" : "rgba(255,255,255,0.04)" }}>
              <Icon className="w-5 h-5" style={{ color: sel ? r.color : "rgba(255,255,255,0.3)" }} />
            </div>
            <div className="min-w-0">
              <span className="block text-[13px] font-semibold truncate" style={{ color: sel ? r.color : "#E6E1D9" }}>{r.name}</span>
              <span className="block text-[11px] text-white/30 mt-0.5 leading-snug line-clamp-1">{r.desc}</span>
            </div>
            {sel && (
              <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: r.color }}>
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );

  // ─── Role Fields ───
  const Fields = () => {
    if (role === "student") return (
      <>
        <Inp icon={GraduationCap} label="Full Name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} error={errs.name} />
        <Inp icon={Mail} label="Email" placeholder="you@institution.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errs.email} />
        <PwField value={pw} onChange={setPw} error={errs.pw} />
        <div className="grid grid-cols-2 gap-3">
          <Inp icon={Building2} label="Institution" placeholder="College / University" value={inst} onChange={(e) => setInst(e.target.value)} />
          <Inp icon={BookOpen} label="Course" placeholder="e.g. B.A.M.S." value={course} onChange={(e) => setCourse(e.target.value)} />
        </div>
        <Sel label="Graduation Year" value={year} onChange={setYear} opts={["2025", "2026", "2027", "2028", "2029"]} />
      </>
    );
    if (role === "industry") return (
      <>
        <Inp icon={Briefcase} label="Organization Name" placeholder="Company name" value={name} onChange={(e) => setName(e.target.value)} error={errs.name} />
        <Inp icon={Mail} label="Official Email" placeholder="hr@company.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errs.email} />
        <PwField value={pw} onChange={setPw} error={errs.pw} />
        <div className="grid grid-cols-2 gap-3">
          <Sel label="Sector" value={sector} onChange={setSector} opts={["Pharmaceutical", "Healthcare", "Biotech", "Ayurveda Mfg", "Research", "Other"]} />
          <Inp icon={Building2} label="Website" placeholder="https://..." type="url" value={site} onChange={(e) => setSite(e.target.value)} />
        </div>
      </>
    );
    if (role === "academician") return (
      <>
        <Inp icon={GraduationCap} label="Full Name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} error={errs.name} />
        <Inp icon={Mail} label="Institutional Email" placeholder="you@university.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errs.email} />
        <PwField value={pw} onChange={setPw} error={errs.pw} />
        <div className="grid grid-cols-2 gap-3">
          <Inp icon={Building2} label="Institution" placeholder="University" value={inst} onChange={(e) => setInst(e.target.value)} />
          <Inp icon={BookOpen} label="Department" placeholder="e.g. Rasashastra" value={dept} onChange={(e) => setDept(e.target.value)} />
        </div>
        <Sel label="Designation" value={desig} onChange={setDesig} opts={["Professor", "Assoc. Professor", "Asst. Professor", "Lecturer", "HOD", "Other"]} />
      </>
    );
    return (
      <>
        <Inp icon={Building2} label="Full Name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} error={errs.name} />
        <Inp icon={Mail} label="Official Email" placeholder="admin@institution.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errs.email} />
        <PwField value={pw} onChange={setPw} error={errs.pw} />
        <div className="grid grid-cols-2 gap-3">
          <Inp icon={Building2} label="Institution" placeholder="Institution name" value={inst} onChange={(e) => setInst(e.target.value)} />
          <Sel label="Designation" value={desig} onChange={setDesig} opts={["Director", "Dean", "Registrar", "Placement Head", "Other"]} />
        </div>
      </>
    );
  };

  // ─── Auth Panel (Right Side) ───
  const AuthPanel = () => (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-white/[0.06]">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => reset(m)}
            className={cn(
              "flex-1 py-3.5 text-[13px] font-semibold transition-all relative",
              mode === m ? "text-white" : "text-white/25 hover:text-white/40"
            )}
          >
            {m === "login" ? "Sign In" : "Create Account"}
            {mode === m && <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-primary rounded-full" />}
          </button>
        ))}
      </div>

      {/* Form Area */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">

        {/* ─── Login ─── */}
        {mode === "login" && (
          <form onSubmit={doLogin} className="space-y-5">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Welcome back</h2>
              <p className="text-[13px] text-white/35 mt-1">Sign in to your SkillBridge account</p>
            </div>

            <Inp icon={Mail} label="Email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errs.email} />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-medium text-white/50">Password</label>
                <button type="button" className="text-[11px] text-primary/70 hover:text-primary transition-colors">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  className={cn("w-full pl-10 pr-10 py-2.5 bg-white/[0.03] border rounded-lg text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all", errs.pw ? "border-red-500/40" : "border-white/[0.06]")}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errs.pw && <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{errs.pw}</p>}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-3.5 h-3.5 rounded border-white/15 bg-white/[0.04] text-primary" />
              <span className="text-[12px] text-white/40">Remember me</span>
            </label>

            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-black font-semibold rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] text-white/20 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <button type="button" className="w-full py-2.5 border border-white/[0.08] rounded-lg text-[13px] text-white/50 hover:bg-white/[0.03] hover:text-white/70 transition-all flex items-center justify-center gap-2.5">
              <svg viewBox="0 0 24 24" width="15" height="15"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>

            <p className="text-center text-[12px] text-white/25 pt-2">
              New to SkillBridge?{" "}
              <button type="button" onClick={() => reset("signup")} className="text-primary font-semibold hover:underline">
                Create an account
              </button>
            </p>
          </form>
        )}

        {/* ─── Signup: Role ─── */}
        {mode === "signup" && step === "role" && (
          <div className="space-y-5">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Create your account</h2>
              <p className="text-[13px] text-white/35 mt-1">Select your role to get started</p>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-3">Continue as</p>
              <RoleCards />
            </div>

            <button
              onClick={() => role && setStep("details")}
              disabled={!role}
              className={cn(
                "w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
                role ? "bg-primary text-black hover:bg-primary/90" : "bg-white/[0.04] text-white/15 cursor-not-allowed"
              )}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[12px] text-white/25">
              Already have an account?{" "}
              <button type="button" onClick={() => reset("login")} className="text-primary font-semibold hover:underline">
                Sign in
              </button>
            </p>
          </div>
        )}

        {/* ─── Signup: Details ─── */}
        {mode === "signup" && step === "details" && (
          <form onSubmit={doSignup} className="space-y-4">
            <button type="button" onClick={() => setStep("role")} className="flex items-center gap-1 text-[12px] text-white/35 hover:text-white/55 transition-colors mb-2">
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>

            {roleCfg && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: roleCfg.color + "18" }}>
                  <roleCfg.icon className="w-4.5 h-4.5" style={{ color: roleCfg.color }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{roleCfg.name}</h2>
                  <p className="text-[12px] text-white/30">Create your account</p>
                </div>
              </div>
            )}

            <Fields />

            <p className="text-[10px] text-white/20 leading-relaxed">
              By continuing you agree to our <a href="#" className="text-primary/60 hover:underline">Terms</a> and <a href="#" className="text-primary/60 hover:underline">Privacy Policy</a>.
            </p>

            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-black font-semibold rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>

            <p className="text-center text-[12px] text-white/25">
              Already have an account?{" "}
              <button type="button" onClick={() => reset("login")} className="text-primary font-semibold hover:underline">
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );

  // ─── Main Render ───
  return (
    <div className="min-h-screen w-full bg-[#0A0A0F] relative">
      {/* Noise */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-overlay" />

      {/* Mobile: Brand header + Auth */}
      <div className="lg:hidden relative z-10">
        <div className="px-6 pt-16 pb-4">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-black font-bold text-xs">S</span>
            </div>
            <span className="text-white font-semibold text-sm">SkillBridge</span>
          </div>
          <MobilePipeline />
        </div>
        <AuthPanel />
      </div>

      {/* Desktop: Two-column */}
      <div className="hidden lg:flex min-h-screen relative z-10">
        {/* Left: Brand */}
        <div className="w-[52%] relative">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.04] rounded-full blur-[100px]" />
          <BrandPanel />
        </div>

        {/* Divider */}
        <div className="w-px bg-white/[0.06]" />

        {/* Right: Auth */}
        <div className="flex-1 max-w-lg">
          <AuthPanel />
        </div>
      </div>
    </div>
  );
}
