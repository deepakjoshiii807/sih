import { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink, Logo, LogoIcon } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import {
  LayoutDashboard, UserCog, Shield, Target, Zap, Briefcase,
  FileText, Star, Grid3X3, Settings, LogOut, Search, Bell,
  Upload, TrendingUp, ChevronRight, BookOpen, Award,
} from "lucide-react";

/* ─── Mock Data ─── */
const student = {
  name: "Aarav Sharma", initials: "AS", course: "BAMS", year: "3rd Year",
  institution: "All India Institute of Ayurveda", targetRole: "Clinical Research Intern",
  profileCompletion: 82, skillConfidence: 78, bestMatch: 92,
};

const skills = [
  { name: "Python", pct: 92, verified: true },
  { name: "Machine Learning", pct: 86, verified: true },
  { name: "Research", pct: 81, verified: true },
  { name: "Data Analysis", pct: 76, verified: true },
  { name: "Clinical Research", pct: 68, verified: false },
  { name: "Scientific Writing", pct: 64, verified: false },
];

const gaps = [
  { name: "Research Methodology", current: 78, required: 85, severity: "Medium" as const },
  { name: "Statistical Analysis", current: 61, required: 80, severity: "High" as const },
  { name: "Scientific Writing", current: 69, required: 85, severity: "Medium" as const },
];

const bestMatch = {
  title: "Clinical Research Intern", org: "AIIA", division: "Research Division",
  location: "New Delhi", duration: "3 Months", match: 92,
  matched: ["Python", "Research", "Data Analysis", "Documentation"],
  missing: ["Statistical Analysis"],
  explanation: "92% match because your profile strongly aligns with 8 of 9 required skills.",
};

const applications = [
  { role: "Clinical Research Intern", org: "AIIA · Research Division", stage: "applied", label: "Applied", status: "Submitted 2 days ago" },
  { role: "Research Data Assistant", org: "CCRAS · New Delhi", stage: "shortlisted", label: "Shortlisted", status: "Interview · Sept 8" },
  { role: "AYUSH Research Internship", org: "NIA · Jaipur", stage: "offer", label: "Offer", status: "Respond by Sept 12" },
];

const recommendations = [
  { gap: "Statistical Analysis", title: "Statistics for Health Research", type: "Course", why: "Helps close your Statistical Analysis gap." },
  { gap: "Scientific Writing", title: "Scientific Writing Fundamentals", type: "Course", why: "Helps close your Scientific Writing gap." },
];

const evidence = {
  total: 12, verified: 8, processing: 3, review: 1,
  items: [
    { name: "Academic Transcript", issuer: "AIIA", status: "verified" },
    { name: "Python Certificate", issuer: "NPTEL", status: "verified" },
    { name: "Research Project", issuer: "AIIA", status: "processing" },
    { name: "Internship Certificate", issuer: "CCRAS", status: "review" },
  ],
};

const portfolio = { projects: 4, certificates: 6, verifiedSkills: 18 };

const navLinks = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "profile", label: "My Profile", icon: <UserCog size={18} /> },
  { id: "evidence", label: "Evidence Vault", icon: <Shield size={18} />, count: 12 },
  { id: "skills", label: "Skills", icon: <Target size={18} /> },
  { id: "gaps", label: "Skill Gap", icon: <Zap size={18} /> },
  { id: "opportunities", label: "Opportunities", icon: <Briefcase size={18} />, count: 3 },
  { id: "applications", label: "Applications", icon: <FileText size={18} /> },
  { id: "recommendations", label: "Recommendations", icon: <Star size={18} /> },
  { id: "portfolio", label: "Portfolio", icon: <Grid3X3 size={18} /> },
];

/* ─── Pixel Bar ─── */
function PxBar({ pct, segments = 18, yellow = false }: { pct: number; segments?: number; yellow?: boolean }) {
  const filled = Math.round((pct / 100) * segments);
  return (
    <div className="flex gap-[3px] flex-wrap">
      {Array.from({ length: segments }, (_, i) => (
        <span
          key={i}
          className={`w-[7px] h-[13px] ${i < filled ? (yellow ? "bg-[#B99A22]" : "bg-[#244B35]") : "bg-[#EDEBE0]"}`}
        />
      ))}
    </div>
  );
}

/* ─── Tags ─── */
const tagCls: Record<string, string> = {
  verified: "bg-[#DCE6D0] text-[#16301F]",
  self: "bg-[#EDEBE0] text-[#6B6F68]",
  high: "bg-[#E8C7AE] text-[#7a3f1a]",
  medium: "bg-[#E8D36B] text-[#5c4a08]",
  lavender: "bg-[#C8B5DE] text-[#4d3a74]",
  processing: "bg-[#E3E9F6] text-[#3d5790]",
  review: "bg-[#E8C7AE] text-[#7a3f1a]",
};

function Tag({ cls, children }: { cls: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest uppercase px-2 py-[3px] rounded-md whitespace-nowrap ${tagCls[cls] || cls}`}>
      {children}
    </span>
  );
}

/* ─── Eye Brow ─── */
function Eyebrow({ color, children }: { color?: string; children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase inline-flex items-center gap-2" style={{ color: color || "#9A9D94" }}>
      <span className="w-[7px] h-[7px] bg-[#171A18] opacity-85" style={{ boxShadow: "0 7px 0 -2px #F7F6F0" }} />
      {children}
    </span>
  );
}

/* ─── Link More ─── */
function LinkMore({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="font-mono text-xs font-bold text-[#244B35] tracking-wide inline-flex items-center gap-1.5 hover:gap-3 transition-all">
      {children}
    </button>
  );
}

/* ─── Main Dashboard ─── */
export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F7F6F0", color: "#171A18" }}>
      {/* ─── Sidebar ─── */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {sidebarOpen ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-[2px]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveNav(link.id)}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeNav === link.id
                      ? "bg-[#DCE6D0] text-[#16301F] font-semibold"
                      : "text-[rgba(220,230,208,.75)] hover:bg-[rgba(220,230,208,.08)] hover:text-white"
                  }`}
                >
                  <span className="flex-shrink-0">{link.icon}</span>
                  <SidebarLink
                    link={{ label: link.label, href: "#", icon: <></> }}
                    className={activeNav === link.id ? "text-[#16301F]" : ""}
                    onClick={() => setActiveNav(link.id)}
                  />
                  {link.count !== undefined && (
                    <span className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded-md ${
                      activeNav === link.id ? "bg-[#244B35] text-[#DCE6D0]" : "bg-[rgba(220,230,208,.14)] text-[#DCE6D0]"
                    }`}>
                      {link.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-[rgba(220,230,208,.12)] pt-3 mt-2">
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[rgba(220,230,208,.6)] text-xs font-medium hover:bg-[rgba(220,230,208,.08)] hover:text-white transition-colors">
              <Settings size={16} /> Settings
            </button>
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[rgba(220,230,208,.6)] text-xs font-medium hover:bg-[rgba(220,230,208,.08)] hover:text-white transition-colors">
              <LogOut size={16} /> Logout
            </button>
            <div className="mt-3 p-3 rounded-xl bg-[rgba(220,230,208,.07)] border border-[rgba(220,230,208,.1)]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" style={{ background: "#E8D36B", color: "#16301F" }}>
                  {student.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: "#F7F6F0" }}>{student.name}</div>
                  <div className="text-xs font-mono" style={{ color: "rgba(220,230,208,.55)" }}>{student.course} · {student.year}</div>
                </div>
              </div>
              <div className="mt-2.5">
                <div className="flex justify-between text-xs mb-1 font-mono" style={{ color: "rgba(220,230,208,.6)" }}>
                  <span>Profile</span><span>{student.profileCompletion}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(220,230,208,.14)" }}>
                  <div className="h-full rounded-full" style={{ width: `${student.profileCompletion}%`, background: "#E8D36B" }} />
                </div>
              </div>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* ─── Main Content ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center gap-4 px-7 py-5 border-b" style={{ background: "rgba(247,246,240,.86)", backdropFilter: "blur(10px)", borderColor: "#E6E3D7" }}>
          <div>
            <div className="font-bold text-[22px] tracking-tight">
              {greeting}, <span style={{ color: "#244B35" }}>{student.name.split(" ")[0]}</span>.
            </div>
            <div className="text-[13px]" style={{ color: "#6B6F68" }}>Here's what your skill journey looks like today.</div>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-white" style={{ borderColor: "#E6E3D7", width: 210 }}>
              <Search size={16} style={{ color: "#9A9D94", flexShrink: 0 }} />
              <input type="text" placeholder="Search skills, opportunities…" className="border-none outline-none bg-transparent flex-1 text-[13px]" />
            </div>
            <button className="relative w-10 h-10 rounded-xl border bg-white grid place-items-center hover:bg-[#EFEDE3] transition-colors" style={{ borderColor: "#E6E3D7" }}>
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-[7px] h-[7px] rounded-full" style={{ background: "#C98B5F" }} />
            </button>
            <div className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm cursor-pointer" style={{ background: "#E8D36B", color: "#16301F" }}>
              {student.initials}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-7 pb-16">
          <div className="grid grid-cols-12 gap-5 max-w-[1400px]">

            {/* ─── Hero / Personal Progress ─── */}
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-12 lg:col-span-8 rounded-[18px] border p-6 overflow-hidden relative"
              style={{ background: "linear-gradient(160deg,#FFFFFF 0%,#FBF9F2 55%,#F2EFE2 100%)", borderColor: "#E6E3D7" }}
            >
              <div className="absolute right-3.5 bottom-3.5 w-16 h-16 opacity-50 pointer-events-none" style={{ backgroundImage: "radial-gradient(#9A9D94 1px,transparent 1px)", backgroundSize: "8px 8px", maskImage: "linear-gradient(135deg,transparent 30%,#000)" }} />
              <div className="flex items-center gap-3">
                <Eyebrow>Personal Progress</Eyebrow>
                <span className="ml-auto font-mono text-[10px] font-bold tracking-widest bg-[#244B35] text-[#DCE6D0] px-2.5 py-1 rounded-md">DEMO DATA</span>
              </div>
              <h2 className="font-bold text-[clamp(22px,2.4vw,30px)] tracking-tight leading-tight mt-4 mb-2.5">
                Your next opportunity <em className="not-italic relative" style={{ color: "#244B35" }}>
                  starts with your skills.
                  <span className="absolute left-0 right-0 bottom-0.5 h-[7px] -z-10" style={{ background: "rgba(232,211,107,.5)" }} />
                </em>
              </h2>
              <p className="text-[14px] max-w-[40ch] mb-5" style={{ color: "#6B6F68" }}>
                You've built a strong foundation. Close a few skill gaps to unlock better matches.
              </p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { label: "Profile Completion", value: student.profileCompletion, color: "#244B35", bg: "#244B35", px: 5 },
                  { label: "Skill Confidence", value: student.skillConfidence, color: "#B99A22", bg: "#B99A22", px: 4 },
                  { label: "Best Match", value: student.bestMatch, color: "#C98B5F", bg: "#C98B5F", px: 5 },
                ].map((m) => (
                  <div key={m.label} className="flex-1 min-w-[96px] border rounded-xl p-3 bg-white" style={{ borderColor: "#E6E3D7" }}>
                    <div className="font-bold text-2xl tracking-tight" style={{ color: m.color }}>{m.value}<small className="text-[13px] font-semibold" style={{ color: "#6B6F68" }}>%</small></div>
                    <div className="font-mono text-[10px] mt-0.5 leading-snug" style={{ color: "#6B6F68" }}>{m.label}</div>
                    <div className="flex gap-[3px] mt-2">
                      {Array.from({ length: 6 }, (_, i) => (
                        <span key={i} className="w-2 h-[6px]" style={{ background: i < m.px ? m.bg : "#EDEBE0" }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Skill Journey */}
              <div className="mt-6 pt-5 border-t border-dashed" style={{ borderColor: "#E6E3D7" }}>
                <div className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase mb-3.5" style={{ color: "#9A9D94" }}>Your Skill Journey</div>
                <div className="grid grid-cols-2 gap-x-6">
                  {[
                    { label: "Evidence", sub: "6 items verified", done: true },
                    { label: "Skills", sub: "18 extracted", done: true },
                    { label: "Skill Gap", sub: `Close ${gaps.length} gaps`, active: true },
                    { label: "Match", sub: `Best match ${student.bestMatch}%` },
                    { label: "Opportunity", sub: "Apply now" },
                  ].map((step, i) => (
                    <div key={step.label} className={`relative flex gap-3 ${i < 4 ? "pb-4" : ""}`}>
                      {i < 4 && <div className="absolute left-[11px] top-6 bottom-1 w-0.5" style={{ background: step.done ? "#244B35" : "#E6E3D7" }} />}
                      <div
                        className={`w-6 h-6 flex-none rounded-[7px] z-10 grid place-items-center font-mono text-[11px] font-bold border-2 ${
                          step.done ? "bg-[#244B35] border-[#244B35] text-white"
                          : step.active ? "bg-[#E8D36B] border-[#B99A22] text-[#16301F] shadow-[0_0_0_4px_rgba(232,211,107,.25)]"
                          : "bg-white border-dashed"
                        }`}
                        style={!step.done && !step.active ? { borderColor: "#E6E3D7", color: "#9A9D94" } : undefined}
                      >
                        {step.done ? "✓" : i + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-[13.5px]">{step.label}</div>
                        <div className="font-mono text-[10px]" style={{ color: "#9A9D94" }}>{step.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* ─── Skill Snapshot ─── */}
            <motion.section
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
              className="col-span-12 lg:col-span-4 rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7" }}
            >
              <Eyebrow>Skill Snapshot</Eyebrow>
              <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Your Skill Snapshot</div>
              <div className="text-[13px] mb-4" style={{ color: "#6B6F68" }}>Verified vs self-declared</div>
              {skills.map((sk) => (
                <div key={sk.name} className="py-2.5 border-b last:border-b-0" style={{ borderColor: "#EDEBE0" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm">{sk.name}</span>
                    <Tag cls={sk.verified ? "verified" : "self"}>{sk.verified ? "✓ Evidence" : "Self-declared"}</Tag>
                    <span className="ml-auto font-mono font-bold text-xs">{sk.pct}<span className="text-[10px] font-normal" style={{ color: "#9A9D94" }}>%</span></span>
                  </div>
                  <PxBar pct={sk.pct} yellow={!sk.verified} />
                </div>
              ))}
              <LinkMore>View all skills <ChevronRight size={14} /></LinkMore>
            </motion.section>

            {/* ─── Skill Gap ─── */}
            <motion.section
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-12 sm:col-span-4 rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7" }}
            >
              <Eyebrow color="#B99A22">Skill Gap</Eyebrow>
              <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Your Biggest Skill Gaps</div>
              <div className="text-[13px] mb-4" style={{ color: "#6B6F68" }}>
                Matched against your target role · <b style={{ color: "#171A18" }}>{student.targetRole}</b>
              </div>
              {gaps.map((g) => (
                <div key={g.name} className="py-2.5 border-b last:border-b-0" style={{ borderColor: "#EDEBE0" }}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-semibold text-sm">{g.name}</span>
                    <span className="font-mono font-bold text-xs">{g.current}%</span>
                  </div>
                  <PxBar pct={g.current} segments={16} yellow />
                  <div className="flex items-center gap-2.5 mt-2">
                    <Tag cls={g.severity === "High" ? "high" : "medium"}>Gap: {g.severity}</Tag>
                    <span className="font-mono text-[11px]" style={{ color: "#9A9D94" }}>Target {g.required}%+</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
                <span className="font-mono text-[11px]" style={{ color: "#9A9D94" }}>vs. target role requirements</span>
                <LinkMore>Close these gaps <ChevronRight size={14} /></LinkMore>
              </div>
            </motion.section>

            {/* ─── Best Match ─── */}
            <motion.section
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
              className="col-span-12 sm:col-span-8 rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7" }}
            >
              <Eyebrow>Best Match</Eyebrow>
              <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Best Match For You</div>
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Ring */}
                <div className="relative flex-shrink-0 w-[116px] h-[116px]">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#EDEBE0" strokeWidth="11" />
                    <motion.circle
                      cx="60" cy="60" r="52" fill="none" stroke="#C98B5F" strokeWidth="11" strokeLinecap="round"
                      strokeDasharray={326.7}
                      initial={{ strokeDashoffset: 326.7 }}
                      animate={{ strokeDashoffset: 326.7 * (1 - bestMatch.match / 100) }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center font-bold text-[26px]" style={{ color: "#C98B5F" }}>
                    {bestMatch.match}<small className="text-xs font-semibold" style={{ color: "#6B6F68" }}>%</small>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-xl tracking-tight leading-snug">{bestMatch.title}</div>
                  <div className="font-mono text-xs mt-1" style={{ color: "#6B6F68" }}>{bestMatch.org} / {bestMatch.division}</div>
                  <div className="flex gap-1.5 mt-2.5 flex-wrap">
                    <span className="font-mono text-[10.5px] font-bold border rounded-md px-2 py-[3px] inline-flex items-center gap-1.5" style={{ borderColor: "#E6E3D7", color: "#6B6F68" }}>
                      <span className="text-[8px]" style={{ color: "#C98B5F" }}>●</span> {bestMatch.location}
                    </span>
                    <span className="font-mono text-[10.5px] font-bold border rounded-md px-2 py-[3px] inline-flex items-center gap-1.5" style={{ borderColor: "#E6E3D7", color: "#6B6F68" }}>
                      <span className="text-[8px]" style={{ color: "#C98B5F" }}>▮</span> {bestMatch.duration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#9A9D94" }}>
                  Skills matched · {bestMatch.matched.length + bestMatch.missing.length} of 9
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bestMatch.matched.map((s) => (
                    <span key={s} className="text-[11.5px] font-medium rounded-md px-2.5 py-1 bg-[#DCE6D0] text-[#16301F]">✓ {s}</span>
                  ))}
                  {bestMatch.missing.map((s) => (
                    <span key={s} className="text-[11.5px] font-medium rounded-md px-2.5 py-1 bg-[#EDEBE0] text-[#6B6F68] line-through">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2 mt-3.5 pt-3.5 border-t border-dashed" style={{ borderColor: "#E6E3D7" }}>
                <TrendingUp size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#C98B5F" }} />
                <span className="text-xs leading-relaxed" style={{ color: "#6B6F68" }}>{bestMatch.explanation}</span>
              </div>
              <div className="flex gap-2.5 mt-4 flex-wrap">
                <button className="inline-flex items-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-[10px] border transition-all hover:-translate-y-0.5" style={{ background: "#E8C7AE", borderColor: "#E8C7AE", color: "#5a2f12" }}>
                  View opportunity <ChevronRight size={16} />
                </button>
                <button className="inline-flex items-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-[10px] border bg-white transition-all hover:-translate-y-0.5" style={{ borderColor: "#E6E3D7" }}>
                  See all opportunities
                </button>
              </div>
            </motion.section>

            {/* ─── Applications ─── */}
            <motion.section
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.14 }}
              className="col-span-12 sm:col-span-4 rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7" }}
            >
              <Eyebrow>Applications</Eyebrow>
              <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Application Journey</div>
              <div className="text-[13px] mb-4" style={{ color: "#6B6F68" }}>Quick status of your submissions</div>
              {applications.map((app) => (
                <div key={app.role} className="relative pl-7 pb-5 last:pb-0">
                  <div className="absolute left-[6px] top-4 bottom-1 w-0.5" style={{ background: "#E6E3D7" }} />
                  <div className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-[5px] border-2 border-white ${
                    app.stage === "applied" ? "bg-[#244B35] shadow-[0_0_0_3px_rgba(36,75,53,.18)]"
                    : app.stage === "shortlisted" ? "bg-[#E8D36B] shadow-[0_0_0_3px_rgba(232,211,107,.25)]"
                    : "bg-[#C98B5F] shadow-[0_0_0_3px_rgba(201,139,95,.25)]"
                  }`} style={{ boxShadow: `0 0 0 1px #E6E3D7, ${app.stage === "applied" ? "0 0 0 3px rgba(36,75,53,.18)" : app.stage === "shortlisted" ? "0 0 0 3px rgba(232,211,107,.25)" : "0 0 0 3px rgba(201,139,95,.25)"}` }} />
                  <div className="font-semibold text-[14.5px]">{app.role}</div>
                  <div className="font-mono text-[11px] mt-0.5" style={{ color: "#6B6F68" }}>{app.org}</div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs" style={{ color: "#6B6F68" }}>
                    <span className={`font-mono font-bold text-[11px] px-1.5 py-[2px] rounded-md ${
                      app.stage === "applied" ? "bg-[#DCE6D0] text-[#16301F]"
                      : app.stage === "shortlisted" ? "bg-[#E8D36B] text-[#5c4a08]"
                      : "bg-[#E8C7AE] text-[#5a2f12]"
                    }`}>{app.label}</span>
                    <span>{app.status}</span>
                  </div>
                </div>
              ))}
              <LinkMore>View all applications <ChevronRight size={14} /></LinkMore>
            </motion.section>

            {/* ─── Recommendations ─── */}
            <motion.section
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              className="col-span-12 lg:col-span-7 rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7" }}
            >
              <Eyebrow color="#8A6FB8">Recommendations</Eyebrow>
              <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Recommended For Your Skill Gaps</div>
              <div className="text-[13px] mb-4" style={{ color: "#6B6F68" }}>Not random — every pick maps to a gap you can close.</div>
              {recommendations.map((r) => (
                <div key={r.title} className="flex gap-3 py-3.5 border-b last:border-b-0" style={{ borderColor: "#EDEBE0" }}>
                  <div className="w-9 h-9 flex-none rounded-[10px] grid place-items-center" style={{ background: "#C8B5DE", color: "#4d3a74" }}>
                    <BookOpen size={17} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold tracking-widest uppercase" style={{ color: "#8A6FB8" }}>{r.gap}</div>
                    <div className="font-semibold text-[14.5px] mt-0.5">{r.title}</div>
                    <Tag cls="lavender">{r.type}</Tag>
                    <p className="text-xs mt-1" style={{ color: "#6B6F68" }}>{r.why}</p>
                  </div>
                </div>
              ))}
              <LinkMore>Explore learning paths <ChevronRight size={14} /></LinkMore>
            </motion.section>

            {/* ─── Evidence Vault ─── */}
            <motion.section
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
              className="col-span-12 lg:col-span-5 rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7" }}
            >
              <Eyebrow>Evidence Vault</Eyebrow>
              <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Evidence Vault</div>
              <div className="text-[13px] mb-4" style={{ color: "#6B6F68" }}>Proof that backs your skills</div>
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {[
                  { num: evidence.total, label: "Evidence items", cls: "" },
                  { num: evidence.verified, label: "Verified", cls: "text-[#244B35]" },
                  { num: evidence.processing, label: "Processing", cls: "text-[#8A6FB8]" },
                  { num: evidence.review, label: "Needs review", cls: "text-[#C98B5F]" },
                ].map((s) => (
                  <div key={s.label} className="border rounded-[11px] p-2.5" style={{ borderColor: "#E6E3D7", background: "#EFEDE3" }}>
                    <div className={`font-bold text-lg flex items-center gap-1.5 ${s.cls}`}>{s.num}</div>
                    <div className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {evidence.items.map((ev) => (
                <div key={ev.name} className="flex items-center gap-2.5 py-2 border-b last:border-b-0 text-[13px]" style={{ borderColor: "#EDEBE0" }}>
                  <div className="w-[26px] h-[30px] flex-none border rounded-[5px] relative bg-white" style={{ borderColor: "#E6E3D7" }}>
                    <div className="absolute -top-px -right-px w-[9px] h-[9px] bg-[#F7F6F0] rounded-bl-[4px] border" style={{ borderColor: "#E6E3D7", borderTop: "none", borderRight: "none" }} />
                  </div>
                  <div>
                    <div className="font-medium">{ev.name}</div>
                    <div className="text-[11px] font-mono" style={{ color: "#9A9D94" }}>{ev.issuer}</div>
                  </div>
                  <span className={`ml-auto font-mono text-[10px] font-bold tracking-widest uppercase px-2 py-[3px] rounded-md ${
                    ev.status === "verified" ? "bg-[#DCE6D0] text-[#16301F]"
                    : ev.status === "processing" ? "bg-[#E3E9F6] text-[#3d5790]"
                    : "bg-[#E8C7AE] text-[#7a3f1a]"
                  }`}>
                    {ev.status === "verified" ? "✓ Verified" : ev.status === "processing" ? "… Processing" : "! Review"}
                  </span>
                </div>
              ))}
              <button className="mt-3.5 w-full flex items-center justify-center gap-2 border-[1.5px] border-dashed rounded-[11px] font-semibold text-[13.5px] py-2.5 transition-all hover:bg-[#DCE6D0] hover:-translate-y-0.5" style={{ borderColor: "#244B35", color: "#244B35" }}>
                <Upload size={15} /> Upload evidence
              </button>
            </motion.section>

            {/* ─── Quick Actions ─── */}
            <motion.section
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-12 lg:col-span-4 rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7" }}
            >
              <Eyebrow>Quick Actions</Eyebrow>
              <div className="font-semibold text-[19px] tracking-tight mt-2 mb-3">What do you want to do?</div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Upload Evidence", desc: "Back skills with proof", icon: <Shield size={17} />, bg: "#DCE6D0", fg: "#16301F" },
                  { label: "Opportunities", desc: "92% match waiting", icon: <Briefcase size={17} />, bg: "#E8C7AE", fg: "#7a3f1a" },
                  { label: "Skill Gaps", desc: "3 gaps to close", icon: <Zap size={17} />, bg: "#E8D36B", fg: "#5c4a08" },
                  { label: "Update Profile", desc: "82% complete", icon: <UserCog size={17} />, bg: "#C8B5DE", fg: "#4d3a74" },
                ].map((a) => (
                  <button key={a.label} className="flex items-center gap-2.5 border rounded-xl p-3 bg-white text-left transition-all hover:-translate-y-0.5 hover:border-[#244B35]" style={{ borderColor: "#E6E3D7" }}>
                    <div className="w-[34px] h-[34px] flex-none rounded-[9px] grid place-items-center" style={{ background: a.bg, color: a.fg }}>{a.icon}</div>
                    <div>
                      <div className="font-semibold text-[13.5px] leading-tight">{a.label}</div>
                      <div className="text-[11px] font-mono" style={{ color: "#9A9D94" }}>{a.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.section>

            {/* ─── Portfolio ─── */}
            <motion.section
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
              className="col-span-12 lg:col-span-8 rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7" }}
            >
              <Eyebrow>Portfolio</Eyebrow>
              <div className="font-semibold text-[19px] tracking-tight mt-2 mb-3">Your Verified Portfolio</div>
              <div className="flex flex-col gap-2 mb-3">
                {[
                  { label: "Projects", val: portfolio.projects },
                  { label: "Certificates", val: portfolio.certificates },
                  { label: "Verified Skills", val: portfolio.verifiedSkills },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-[13px] border-b pb-2 last:border-b-0" style={{ borderColor: "#EDEBE0" }}>
                    <span style={{ color: "#6B6F68" }}>{s.label}</span>
                    <b className="font-bold text-[15px]">{s.val}</b>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {["Rural Health Survey", "CVD Data Project", "Herbal Safety Scan"].map((t) => (
                  <div key={t} className="flex-1 border rounded-[9px] p-2" style={{ borderColor: "#E6E3D7", background: "#EFEDE3" }}>
                    <div className="w-[22px] h-[22px] rounded-md grid place-items-center mb-1.5" style={{ background: "#DCE6D0", color: "#16301F" }}>
                      <Award size={12} />
                    </div>
                    <div className="text-[10px] font-semibold leading-tight">{t}</div>
                    <div className="text-[9px] font-mono" style={{ color: "#9A9D94" }}>Verified</div>
                  </div>
                ))}
              </div>
              <button className="mt-3.5 w-full inline-flex items-center justify-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-[10px] border transition-all hover:-translate-y-0.5" style={{ background: "#244B35", borderColor: "#244B35", color: "#F7F6F0" }}>
                Open portfolio <ChevronRight size={16} />
              </button>
            </motion.section>

          </div>

          {/* Footer note */}
          <div className="mt-6 text-center font-mono text-[11px] flex items-center justify-center gap-2 flex-wrap" style={{ color: "#9A9D94" }}>
            <span className="bg-[#EDEBE0] text-[#6B6F68] px-1.5 py-0.5 rounded-md tracking-widest">PROTOTYPE</span>
            <span>Rendering synthetic demo data · connect the LeadToLearn REST API to go live.</span>
          </div>
        </main>
      </div>
    </div>
  );
}
