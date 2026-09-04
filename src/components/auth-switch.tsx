import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
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
  description: string;
  icon: typeof GraduationCap;
  color: string;
  bg: string;
  ring: string;
}

const ROLES: RoleConfig[] = [
  {
    id: "student",
    name: "Student",
    description: "Build skills, discover opportunities",
    icon: GraduationCap,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    ring: "ring-[#22C55E]/40",
  },
  {
    id: "industry",
    name: "Industry",
    description: "Find talent, create opportunities",
    icon: Briefcase,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.08)",
    ring: "ring-[#3B82F6]/40",
  },
  {
    id: "academician",
    name: "Academician",
    description: "Connect curriculum with industry",
    icon: BookOpen,
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    ring: "ring-[#A78BFA]/40",
  },
  {
    id: "admin",
    name: "Institution Admin",
    description: "Monitor outcomes & insights",
    icon: Building2,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    ring: "ring-[#F59E0B]/40",
  },
];

const PIPELINE_STEPS = ["Evidence", "Skills", "Gap", "Match", "Opportunity"];

// ─── Component ─────────────────────────────────────────
export default function AuthSwitch() {
  const navigate = useNavigate();

  // Core state
  const [mode, setMode] = useState<AuthMode>("login");
  const [step, setStep] = useState<SignupStep>("role");
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [course, setCourse] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [sector, setSector] = useState("");
  const [website, setWebsite] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const selectedRoleConfig = ROLES.find((r) => r.id === selectedRole);

  const switchMode = useCallback((newMode: AuthMode) => {
    setMode(newMode);
    setStep("role");
    setSelectedRole(null);
    setErrors({});
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setShowPassword(false);
  }, []);

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const calcStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[a-z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strengthLabel = (s: number) => {
    if (s <= 1) return { text: "Very weak", color: "#EF4444" };
    if (s <= 2) return { text: "Weak", color: "#F97316" };
    if (s <= 3) return { text: "Fair", color: "#EAB308" };
    if (s <= 4) return { text: "Good", color: "#22C55E" };
    return { text: "Strong", color: "#22C55E" };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!validateEmail(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    alert("Demo: Signed in as " + email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Required";
    if (!validateEmail(email)) errs.email = "Enter a valid email";
    if (!password || password.length < 8) errs.password = "Min 8 characters";
    if (calcStrength(password) < 3) errs.password = "Password too weak";
    if (password !== confirmPassword) errs.confirmPassword = "Passwords don't match";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    alert("Demo: " + selectedRole + " account created for " + email);
  };

  // ─── Pipeline ──────────────────────────────────────
  const Pipeline = () => (
    <div className="flex items-center justify-center gap-1 sm:gap-2 py-3">
      {PIPELINE_STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-1 sm:gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-[9px] sm:text-[10px] font-bold transition-all",
                i < 2
                  ? "bg-primary text-black"
                  : "bg-white/[0.06] text-white/30"
              )}
            >
              {i + 1}
            </div>
            <span
              className={cn(
                "text-[9px] sm:text-[10px] font-medium hidden sm:block",
                i < 2 ? "text-primary" : "text-white/25"
              )}
            >
              {s}
            </span>
          </div>
          {i < PIPELINE_STEPS.length - 1 && (
            <div
              className={cn(
                "w-4 sm:w-6 h-px mt-[-12px]",
                i < 1 ? "bg-primary/50" : "bg-white/10"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  // ─── Password Strength ─────────────────────────────
  const PasswordStrength = ({ value }: { value: string }) => {
    if (!value) return null;
    const score = calcStrength(value);
    const info = strengthLabel(score);
    return (
      <div className="mt-2 space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(score / 5) * 100}%`,
                background: info.color,
              }}
            />
          </div>
          <span className="text-[11px] font-medium" style={{ color: info.color }}>
            {info.text}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {[
            { label: "8+ chars", ok: value.length >= 8 },
            { label: "Uppercase", ok: /[A-Z]/.test(value) },
            { label: "Lowercase", ok: /[a-z]/.test(value) },
            { label: "Number", ok: /\d/.test(value) },
            { label: "Special", ok: /[^A-Za-z0-9]/.test(value) },
          ].map((r) => (
            <span
              key={r.label}
              className={cn(
                "text-[10px]",
                r.ok ? "text-primary" : "text-white/25"
              )}
            >
              {r.ok ? "✓" : "○"} {r.label}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // ─── Input Component ───────────────────────────────
  const Input = ({
    icon: Icon,
    label,
    error,
    ...props
  }: {
    icon: typeof Mail;
    label: string;
    error?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-white/70">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          className={cn(
            "w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border rounded-lg text-sm text-white placeholder:text-white/25",
            "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all",
            error ? "border-red-500/50" : "border-white/[0.08]"
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[11px] text-red-400 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );

  // ─── Role Cards ────────────────────────────────────
  const RoleCards = () => (
    <div className="grid grid-cols-2 gap-3">
      {ROLES.map((role) => {
        const isSelected = selectedRole === role.id;
        const Icon = role.icon;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelectedRole(role.id)}
            className={cn(
              "group relative flex flex-col items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200",
              isSelected
                ? cn("border-2 ring-2", role.ring)
                : "border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02]"
            )}
            style={{
              background: isSelected ? role.bg : undefined,
              borderColor: isSelected ? role.color + "60" : undefined,
            }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: isSelected ? role.color + "20" : "rgba(255,255,255,0.04)",
              }}
            >
              <Icon
                className="w-5 h-5 transition-colors duration-200"
                style={{ color: isSelected ? role.color : "rgba(255,255,255,0.35)" }}
              />
            </div>

            {/* Text */}
            <div>
              <span
                className="block text-sm font-semibold transition-colors"
                style={{ color: isSelected ? role.color : "#E6E1D9" }}
              >
                {role.name}
              </span>
              <span className="block text-[11px] text-white/35 mt-0.5 leading-snug">
                {role.description}
              </span>
            </div>

            {/* Selected indicator */}
            {isSelected && (
              <div
                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: role.color }}
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );

  // ─── Student Fields ────────────────────────────────
  const StudentFields = () => (
    <>
      <Input icon={GraduationCap} label="Full Name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input icon={Mail} label="Email" placeholder="you@institution.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <div className="space-y-1.5">
        <label className="text-[13px] font-medium text-white/70">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "w-full pl-10 pr-10 py-2.5 bg-white/[0.04] border rounded-lg text-sm text-white placeholder:text-white/25",
              "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all",
              errors.password ? "border-red-500/50" : "border-white/[0.08]"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.password}</p>}
        <PasswordStrength value={password} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input icon={Building2} label="Institution" placeholder="College / University" value={institution} onChange={(e) => setInstitution(e.target.value)} />
        <Input icon={BookOpen} label="Course / Program" placeholder="e.g. B.A.M.S." value={course} onChange={(e) => setCourse(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className="text-[13px] font-medium text-white/70">Graduation Year</label>
        <select
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
          className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
        >
          <option value="" className="bg-[#0A0A0F]">Select year</option>
          {["2025", "2026", "2027", "2028", "2029"].map((y) => (
            <option key={y} value={y} className="bg-[#0A0A0F]">{y}</option>
          ))}
        </select>
      </div>
    </>
  );

  // ─── Industry Fields ───────────────────────────────
  const IndustryFields = () => (
    <>
      <Input icon={Briefcase} label="Organization Name" placeholder="Company name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input icon={Mail} label="Official Email" placeholder="hr@company.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <div className="space-y-1.5">
        <label className="text-[13px] font-medium text-white/70">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "w-full pl-10 pr-10 py-2.5 bg-white/[0.04] border rounded-lg text-sm text-white placeholder:text-white/25",
              "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all",
              errors.password ? "border-red-500/50" : "border-white/[0.08]"
            )}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.password}</p>}
        <PasswordStrength value={password} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-white/70">Industry / Sector</label>
          <select value={sector} onChange={(e) => setSector(e.target.value)} className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-primary/50 transition-all">
            <option value="" className="bg-[#0A0A0F]">Select sector</option>
            {["Pharmaceutical", "Healthcare", "Biotech", "Ayurveda Manufacturing", "Research", "Education", "Other"].map((s) => (
              <option key={s} value={s} className="bg-[#0A0A0F]">{s}</option>
            ))}
          </select>
        </div>
        <Input icon={Building2} label="Website" placeholder="https://company.com" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
    </>
  );

  // ─── Academician Fields ────────────────────────────
  const AcademicianFields = () => (
    <>
      <Input icon={GraduationCap} label="Full Name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input icon={Mail} label="Institutional Email" placeholder="you@university.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <div className="space-y-1.5">
        <label className="text-[13px] font-medium text-white/70">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "w-full pl-10 pr-10 py-2.5 bg-white/[0.04] border rounded-lg text-sm text-white placeholder:text-white/25",
              "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all",
              errors.password ? "border-red-500/50" : "border-white/[0.08]"
            )}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.password}</p>}
        <PasswordStrength value={password} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input icon={Building2} label="Institution" placeholder="University / College" value={institution} onChange={(e) => setInstitution(e.target.value)} />
        <Input icon={BookOpen} label="Department" placeholder="e.g. Rasashastra" value={department} onChange={(e) => setDepartment(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <label className="text-[13px] font-medium text-white/70">Designation</label>
        <select value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-primary/50 transition-all">
          <option value="" className="bg-[#0A0A0F]">Select designation</option>
          {["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Head of Department", "Other"].map((d) => (
            <option key={d} value={d} className="bg-[#0A0A0F]">{d}</option>
          ))}
        </select>
      </div>
    </>
  );

  // ─── Admin Fields ──────────────────────────────────
  const AdminFields = () => (
    <>
      <Input icon={Building2} label="Full Name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input icon={Mail} label="Official Email" placeholder="admin@institution.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <div className="space-y-1.5">
        <label className="text-[13px] font-medium text-white/70">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "w-full pl-10 pr-10 py-2.5 bg-white/[0.04] border rounded-lg text-sm text-white placeholder:text-white/25",
              "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all",
              errors.password ? "border-red-500/50" : "border-white/[0.08]"
            )}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.password}</p>}
        <PasswordStrength value={password} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input icon={Building2} label="Institution" placeholder="Institution name" value={institution} onChange={(e) => setInstitution(e.target.value)} />
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-white/70">Designation</label>
          <select value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-primary/50 transition-all">
            <option value="" className="bg-[#0A0A0F]">Select designation</option>
            {["Director", "Dean", "Registrar", "Placement Head", "Admin Officer", "Other"].map((d) => (
              <option key={d} value={d} className="bg-[#0A0A0F]">{d}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );

  // ─── Dynamic Role Fields ───────────────────────────
  const RoleFields = () => {
    switch (selectedRole) {
      case "student": return <StudentFields />;
      case "industry": return <IndustryFields />;
      case "academician": return <AcademicianFields />;
      case "admin": return <AdminFields />;
      default: return null;
    }
  };

  // ─── Render ────────────────────────────────────────
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            SkillBridge
          </h1>
          <p className="text-xs text-white/35 mt-1">AYUSH Academia × Industry</p>
        </div>

        {/* Pipeline */}
        <Pipeline />

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/[0.06]">
            <button
              onClick={() => switchMode("login")}
              className={cn(
                "flex-1 py-3 text-sm font-semibold transition-all relative",
                mode === "login" ? "text-white" : "text-white/30 hover:text-white/50"
              )}
            >
              Login
              {mode === "login" && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => switchMode("signup")}
              className={cn(
                "flex-1 py-3 text-sm font-semibold transition-all relative",
                mode === "signup" ? "text-white" : "text-white/30 hover:text-white/50"
              )}
            >
              Sign Up
              {mode === "signup" && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* ── Login ── */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Welcome back</h2>
                  <p className="text-[13px] text-white/35 mt-0.5">Sign in to your SkillBridge account</p>
                </div>

                <Input icon={Mail} label="Email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-white/70">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        "w-full pl-10 pr-10 py-2.5 bg-white/[0.04] border rounded-lg text-sm text-white placeholder:text-white/25",
                        "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all",
                        errors.password ? "border-red-500/50" : "border-white/[0.08]"
                      )}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-[11px] text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-white/20 bg-white/[0.04] text-primary focus:ring-primary/20"
                    />
                    <span className="text-[13px] text-white/50">Remember me</span>
                  </label>
                  <button type="button" className="text-[13px] text-primary/80 hover:text-primary transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-primary text-black font-semibold rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[11px] text-white/25">or continue with</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <button type="button" className="w-full py-2.5 border border-white/[0.08] rounded-lg text-sm text-white/60 hover:bg-white/[0.03] transition-all flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" width="16" height="16"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>

                <p className="text-center text-[13px] text-white/30 pt-2">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => switchMode("signup")} className="text-primary font-semibold hover:underline">
                    Create one
                  </button>
                </p>
              </form>
            )}

            {/* ── Signup ── */}
            {mode === "signup" && step === "role" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-white">Create your account</h2>
                  <p className="text-[13px] text-white/35 mt-0.5">Choose your role to get started</p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">Continue as</p>
                  <RoleCards />
                </div>

                <button
                  onClick={() => selectedRole && setStep("details")}
                  disabled={!selectedRole}
                  className={cn(
                    "w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all",
                    selectedRole
                      ? "bg-primary text-black hover:bg-primary/90"
                      : "bg-white/[0.04] text-white/20 cursor-not-allowed"
                  )}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[13px] text-white/30">
                  Already have an account?{" "}
                  <button type="button" onClick={() => switchMode("login")} className="text-primary font-semibold hover:underline">
                    Sign in
                  </button>
                </p>
              </div>
            )}

            {mode === "signup" && step === "details" && (
              <form onSubmit={handleSignup} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setStep("role")}
                  className="flex items-center gap-1 text-[13px] text-white/40 hover:text-white/60 transition-colors -mb-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back to role selection
                </button>

                <div className="flex items-center gap-3">
                  {selectedRoleConfig && (
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: selectedRoleConfig.color + "20" }}
                    >
                      <selectedRoleConfig.icon className="w-4 h-4" style={{ color: selectedRoleConfig.color }} />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {selectedRoleConfig?.name} Registration
                    </h2>
                    <p className="text-[13px] text-white/35 mt-0.5">
                      Fill in your details to create an account
                    </p>
                  </div>
                </div>

                <RoleFields />

                <p className="text-[11px] text-white/25">
                  By creating an account you agree to the{" "}
                  <a href="#" className="text-primary/70 hover:underline">Terms</a> and{" "}
                  <a href="#" className="text-primary/70 hover:underline">Privacy Policy</a>
                </p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-primary text-black font-semibold rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                </button>

                <p className="text-center text-[13px] text-white/30">
                  Already have an account?{" "}
                  <button type="button" onClick={() => switchMode("login")} className="text-primary font-semibold hover:underline">
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-[11px] text-white/20 mt-4">
          SkillBridge — Discover. Learn. Grow.
        </p>
      </div>
    </div>
  );
}
