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

type AuthMode = "login" | "signup";
type SignupStep = "role" | "details";
type RoleType = "student" | "industry" | "academician" | "admin";

interface RoleConfig {
  id: RoleType;
  name: string;
  desc: string;
  icon: typeof GraduationCap;
  color: string;
  bg: string;
  iconBg: string;
}

const ROLES: RoleConfig[] = [
  { id: "student", name: "Student", desc: "Build skills, discover opportunities", icon: GraduationCap, color: "#16a34a", bg: "#f0fdf4", iconBg: "#dcfce7" },
  { id: "industry", name: "Industry", desc: "Find talent, create opportunities", icon: Briefcase, color: "#2563eb", bg: "#eff6ff", iconBg: "#dbeafe" },
  { id: "academician", name: "Academician", desc: "Connect curriculum with industry", icon: BookOpen, color: "#7c3aed", bg: "#f5f3ff", iconBg: "#ede9fe" },
  { id: "admin", name: "Institution Admin", desc: "Monitor outcomes & insights", icon: Building2, color: "#d97706", bg: "#fffbeb", iconBg: "#fef3c7" },
];

const PIPELINE = [
  { label: "Evidence", done: true },
  { label: "Skills", done: true },
  { label: "Gap", done: false },
  { label: "Match", done: false },
  { label: "Opportunity", done: false },
];

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
    setMode(m); setStep("role"); setRole(null); setErrs({});
    setEmail(""); setPw(""); setName(""); setConfirmPw(""); setShowPw(false);
  }, []);

  const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const strength = (p: string) => {
    let s = 0;
    if (p.length >= 8) s++; if (/[A-Z]/.test(p)) s++; if (/[a-z]/.test(p)) s++; if (/\d/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const strInfo = (s: number) => s <= 1 ? { t: "Very weak", c: "#dc2626" } : s <= 2 ? { t: "Weak", c: "#ea580c" } : s <= 3 ? { t: "Fair", c: "#ca8a04" } : { t: "Strong", c: "#16a34a" };

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

  // ─── Strength Bar ───
  const StrBar = ({ v }: { v: string }) => {
    if (!v) return null;
    const s = strength(v);
    const info = strInfo(s);
    return (
      <div className="mt-2 space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(s / 5) * 100}%`, background: info.c }} />
          </div>
          <span className="text-[11px] font-medium" style={{ color: info.c }}>{info.t}</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {[{ l: "8+ chars", ok: v.length >= 8 }, { l: "Uppercase", ok: /[A-Z]/.test(v) }, { l: "Number", ok: /\d/.test(v) }, { l: "Special", ok: /[^A-Za-z0-9]/.test(v) }].map((r) => (
            <span key={r.l} className={cn("text-[10px]", r.ok ? "text-green-600" : "text-gray-400")}>{r.ok ? "✓" : "○"} {r.l}</span>
          ))}
        </div>
      </div>
    );
  };

  // ─── Input ───
  const Inp = ({ icon: Icon, label, error, ...props }: { icon: typeof Mail; label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-gray-600">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input className={cn("w-full pl-10 pr-4 py-3 bg-gray-50/80 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all", error ? "border-red-300 bg-red-50/50" : "border-gray-200")} {...props} />
      </div>
      {error && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{error}</p>}
    </div>
  );

  // ─── Password Field ───
  const PwField = ({ value, onChange, error, label = "Password" }: { value: string; onChange: (v: string) => void; error?: string; label?: string }) => (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-gray-600">{label}</label>
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type={showPw ? "text" : "password"} placeholder="••••••••" value={value} onChange={(e) => onChange(e.target.value)} className={cn("w-full pl-10 pr-10 py-3 bg-gray-50/80 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all", error ? "border-red-300 bg-red-50/50" : "border-gray-200")} />
        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{error}</p>}
      <StrBar v={value} />
    </div>
  );

  // ─── Select ───
  const Sel = ({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: string[] }) => (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-gray-600">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3.5 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all appearance-none">
        <option value="" className="bg-white">Select</option>
        {opts.map((o) => <option key={o} value={o} className="bg-white">{o}</option>)}
      </select>
    </div>
  );

  // ─── Role Cards (Premium Bento) ───
  const RoleCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {ROLES.map((r) => {
        const sel = role === r.id;
        const Icon = r.icon;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => setRole(r.id)}
            className={cn(
              "group relative flex flex-col items-start gap-0 p-0 rounded-2xl border-2 text-left transition-all duration-300 overflow-hidden",
              sel
                ? "shadow-lg scale-[1.02]"
                : "border-gray-100 hover:border-gray-200 hover:shadow-md hover:scale-[1.01]"
            )}
            style={{
              background: sel ? r.bg : "#ffffff",
              borderColor: sel ? r.color + "50" : undefined,
            }}
          >
            {/* Gradient accent strip */}
            <div
              className="h-1.5 w-full transition-all duration-300"
              style={{
                background: sel
                  ? `linear-gradient(90deg, ${r.color}, ${r.color}80)`
                  : `linear-gradient(90deg, ${r.color}20, ${r.color}08)`,
              }}
            />

            <div className="p-4 flex items-start gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  background: sel
                    ? `linear-gradient(135deg, ${r.color}25, ${r.color}10)`
                    : r.iconBg,
                  boxShadow: sel ? `0 4px 12px ${r.color}20` : undefined,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: r.color }} />
              </div>
              <div className="min-w-0 pt-0.5">
                <span className="block text-[14px] font-semibold text-gray-900">{r.name}</span>
                <span className="block text-[12px] text-gray-500 mt-0.5 leading-snug">{r.desc}</span>
              </div>
            </div>

            {/* Selected indicator */}
            {sel && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: r.color, boxShadow: `0 2px 8px ${r.color}40` }}>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            )}

            {/* Hover glow effect */}
            {!sel && (
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${r.color}05, transparent)` }}
              />
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

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: "linear-gradient(160deg, #e0f2fe 0%, #f0f9ff 25%, #ecfdf5 50%, #f0fdf4 75%, #e0f2fe 100%)" }}>
      {/* Animated background */}
      <style>{`
        @keyframes drift1 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 25% { transform: translate(120px, -80px) rotate(45deg) scale(1.15); } 50% { transform: translate(-60px, 60px) rotate(90deg) scale(0.9); } 75% { transform: translate(80px, 30px) rotate(135deg) scale(1.1); } }
        @keyframes drift2 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 33% { transform: translate(-140px, 70px) rotate(-60deg) scale(1.2); } 66% { transform: translate(70px, -120px) rotate(-120deg) scale(0.85); } }
        @keyframes drift3 { 0%, 100% { transform: translate(0, 0) scale(1); } 20% { transform: translate(90px, 100px) scale(1.1); } 50% { transform: translate(-100px, -50px) scale(0.88); } 80% { transform: translate(40px, -80px) scale(1.15); } }
        @keyframes drift4 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 40% { transform: translate(-80px, -120px) rotate(90deg); } 70% { transform: translate(120px, 50px) rotate(180deg); } }
        @keyframes drift5 { 0%, 100% { transform: translate(0, 0) scale(1); } 30% { transform: translate(100px, 80px) scale(1.1); } 60% { transform: translate(-70px, -90px) scale(1.15); } }
        @keyframes drift6 { 0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); } 50% { transform: translate(-50px, 100px) rotate(180deg) scale(1.2); } }
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes ring-orbit { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
      `}</style>

      {/* Animated gradient base */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #dbeafe, #ecfdf5, #ede9fe, #fef3c7, #fce7f3, #dbeafe)", backgroundSize: "400% 400%", animation: "gradient-shift 12s ease infinite" }} />

      {/* Floating shapes — circles */}
      <div className="absolute w-[320px] h-[320px] rounded-full" style={{ top: "-8%", left: "8%", background: "linear-gradient(135deg, rgba(56,189,248,0.35), rgba(34,197,94,0.2))", filter: "blur(40px)", animation: "drift1 20s ease-in-out infinite" }} />
      <div className="absolute w-[280px] h-[280px] rounded-full" style={{ top: "55%", right: "-5%", background: "linear-gradient(225deg, rgba(167,139,250,0.3), rgba(251,146,60,0.2))", filter: "blur(35px)", animation: "drift2 24s ease-in-out infinite" }} />
      <div className="absolute w-[220px] h-[220px] rounded-full" style={{ top: "25%", left: "60%", background: "linear-gradient(180deg, rgba(251,207,232,0.3), rgba(167,139,250,0.15))", filter: "blur(30px)", animation: "drift3 18s ease-in-out infinite" }} />

      {/* Floating shapes — rounded squares */}
      <div className="absolute w-[180px] h-[180px] rounded-[32px]" style={{ bottom: "15%", left: "15%", background: "linear-gradient(135deg, rgba(253,230,138,0.3), rgba(251,146,60,0.15))", filter: "blur(25px)", animation: "drift4 26s ease-in-out infinite" }} />
      <div className="absolute w-[140px] h-[140px] rounded-[28px]" style={{ top: "12%", right: "20%", background: "linear-gradient(45deg, rgba(187,247,208,0.3), rgba(56,189,248,0.15))", filter: "blur(20px)", animation: "drift5 22s ease-in-out infinite" }} />
      <div className="absolute w-[100px] h-[100px] rounded-[20px]" style={{ top: "70%", left: "45%", background: "linear-gradient(90deg, rgba(244,114,182,0.25), rgba(167,139,250,0.15))", filter: "blur(18px)", animation: "drift6 15s ease-in-out infinite" }} />

      {/* Small floating dots */}
      <div className="absolute w-3 h-3 rounded-full bg-sky-400/40" style={{ top: "20%", left: "30%", animation: "drift1 12s ease-in-out infinite" }} />
      <div className="absolute w-2 h-2 rounded-full bg-emerald-400/50" style={{ top: "65%", right: "30%", animation: "drift3 14s ease-in-out infinite" }} />
      <div className="absolute w-2.5 h-2.5 rounded-full bg-violet-400/40" style={{ top: "40%", left: "75%", animation: "drift5 10s ease-in-out infinite" }} />
      <div className="absolute w-2 h-2 rounded-full bg-amber-400/45" style={{ bottom: "25%", right: "15%", animation: "drift2 16s ease-in-out infinite" }} />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-pink-400/40" style={{ top: "80%", left: "10%", animation: "drift4 11s ease-in-out infinite" }} />

      {/* Orbiting rings */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full border-2 border-white/20 pointer-events-none" style={{ animation: "ring-orbit 50s linear infinite" }} />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full border border-white/10 pointer-events-none" style={{ animation: "ring-orbit 80s linear infinite reverse" }} />
      <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full border border-white/5 pointer-events-none" style={{ animation: "ring-orbit 120s linear infinite" }} />

      {/* Back to Home */}
      <a href="/" className="absolute top-5 right-6 lg:top-7 lg:right-10 z-20 flex items-center gap-1.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-full px-4 py-2 transition-all hover:bg-white/70 hover:shadow-sm">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><polyline points="12 19 5 12 12 5" /></svg>
        Back to Home
      </a>

      {/* Brand */}
      <div className="relative z-10 flex items-center gap-2.5 px-6 lg:px-10 pt-6 lg:pt-8">
        <div className="w-9 h-9 rounded-xl bg-gray-900 px-1 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-[10px] tracking-tight">L2L</span>
        </div>
        <span className="text-gray-900 font-semibold text-[15px] tracking-tight">Lead2Learn</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-[440px]">

          {/* ─── Card ─── */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.8)] p-8 pb-7">
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </div>
            </div>

            {/* ─── Login ─── */}
            {mode === "login" && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">Sign in with email</h1>
                  <p className="text-[14px] text-gray-500 mt-1.5 leading-relaxed">Access your AYUSH skills dashboard.<br />Manage evidence, opportunities &amp; growth.</p>
                </div>

                <form onSubmit={doLogin} className="space-y-3.5">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={cn("w-full pl-10 pr-4 py-3 bg-gray-50/80 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all", errs.email ? "border-red-300" : "border-gray-200")} />
                  </div>
                  {errs.email && <p className="text-[11px] text-red-500 flex items-center gap-1 -mt-2"><AlertTriangle className="w-3 h-3" />{errs.email}</p>}

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type={showPw ? "text" : "password"} placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} className={cn("w-full pl-10 pr-10 py-3 bg-gray-50/80 border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all", errs.pw ? "border-red-300" : "border-gray-200")} />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errs.pw && <p className="text-[11px] text-red-500 flex items-center gap-1 -mt-2"><AlertTriangle className="w-3 h-3" />{errs.pw}</p>}

                  <div className="flex items-center justify-between pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-3.5 h-3.5 rounded border-gray-300 text-gray-900 focus:ring-gray-200" />
                      <span className="text-[12px] text-gray-500">Remember me</span>
                    </label>
                    <button type="button" className="text-[12px] text-gray-500 hover:text-gray-700 transition-colors">Forgot password?</button>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-3 bg-gray-900 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 mt-2">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Started"}
                  </button>
                </form>

                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 border-t border-dashed border-gray-200" />
                  <span className="text-[11px] text-gray-400 font-medium">Or sign in with</span>
                  <div className="flex-1 border-t border-dashed border-gray-200" />
                </div>

                {/* Social buttons */}
                <div className="grid grid-cols-3 gap-2.5">
                  <button type="button" className="py-2.5 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  </button>
                  <button type="button" className="py-2.5 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button type="button" className="py-2.5 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#000"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  </button>
                </div>

                <p className="text-center text-[13px] text-gray-500 mt-6">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => reset("signup")} className="text-gray-900 font-semibold hover:underline">
                    Create one
                  </button>
                </p>
              </>
            )}

            {/* ─── Signup: Role Selection ─── */}
            {mode === "signup" && step === "role" && (
              <>
                {/* Decorative header */}
                <div className="text-center mb-6 relative">
                  <div className="flex justify-center gap-1.5 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">Create your account</h1>
                  <p className="text-[14px] text-gray-500 mt-1.5">Pick your role — we'll customize the experience</p>
                </div>

                <div className="mb-5">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Continue as</p>
                  <RoleCards />
                </div>

                <button onClick={() => role && setStep("details")} disabled={!role} className={cn("w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]", role ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-100 text-gray-400 cursor-not-allowed")}>
                  {role ? (
                    <>Continue as {ROLES.find((r) => r.id === role)?.name} <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>Select a role <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                <p className="text-center text-[13px] text-gray-500 mt-5">
                  Already have an account?{" "}
                  <button type="button" onClick={() => reset("login")} className="text-gray-900 font-semibold hover:underline">Sign in</button>
                </p>
              </>
            )}

            {/* ─── Signup: Details ─── */}
            {mode === "signup" && step === "details" && (
              <form onSubmit={doSignup} className="space-y-3.5">
                <button type="button" onClick={() => setStep("role")} className="flex items-center gap-1 text-[13px] text-gray-400 hover:text-gray-600 transition-colors mb-1">
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>

                {roleCfg && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: roleCfg.iconBg }}>
                      <roleCfg.icon className="w-5 h-5" style={{ color: roleCfg.color }} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{roleCfg.name}</h2>
                      <p className="text-[12px] text-gray-500">Create your account</p>
                    </div>
                  </div>
                )}

                <Fields />

                <p className="text-[11px] text-gray-400 leading-relaxed">
                  By continuing you agree to our <a href="#" className="text-gray-600 hover:underline">Terms</a> and <a href="#" className="text-gray-600 hover:underline">Privacy Policy</a>.
                </p>

                <button type="submit" disabled={loading} className="w-full py-3 bg-gray-900 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
                </button>

                <p className="text-center text-[13px] text-gray-500">
                  Already have an account?{" "}
                  <button type="button" onClick={() => reset("login")} className="text-gray-900 font-semibold hover:underline">Sign in</button>
                </p>
              </form>
            )}
          </div>

          {/* Pipeline (below card) */}
          <div className="flex items-center justify-center gap-1 mt-6">
            {PIPELINE.map((p, i) => (
              <div key={p.label} className="flex items-center">
                <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold", p.done ? "bg-gray-900 text-white" : "bg-white/60 text-gray-400 border border-gray-200/60")}>
                  {p.done ? <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> : i + 1}
                </div>
                {i < PIPELINE.length - 1 && <div className={cn("w-5 h-px mx-0.5", p.done ? "bg-gray-300" : "bg-gray-200")} />}
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-2">Evidence → Skills → Gap → Match → Opportunity</p>
        </div>
      </div>
    </div>
  );
}
