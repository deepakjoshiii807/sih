import { useState, useEffect } from "react";
import { Sidebar, SidebarBody, Logo, LogoIcon, useSidebar } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, UserCog, Shield, Target, Zap, Briefcase,
  FileText, Star, Grid3X3, Settings, LogOut, Search, Bell,
  Upload, TrendingUp, ChevronRight, BookOpen, Award, Check,
  Calendar, MapPin, Clock, ExternalLink, Edit3, Camera,
  Lock, Globe, Eye, EyeOff, Mail, Key, BellRing, Trash2,
  Save, Download, Smartphone, Lightbulb, FlaskConical, Link2,
  Share2, Copy, Sparkles,
} from "lucide-react";

import type {
  Student, SkillPassportItem, SkillGap, RoleReadinessProfile,
  SimulatorAction, RecommendedProject, Opportunity, Application,
  LearningRecommendation, PortfolioProject, EvidenceItem,
} from "@/lib/student-api";
import { studentApi } from "@/lib/student-api";

/* ─── Mock Data ─── */
const student: Student = { id: "st-1", name: "Aarav Sharma", initials: "AS", email: "aarav.sharma@aiia.ac.in", phone: "+91 98765 43210", bio: "Third-year BAMS student with a strong interest in clinical research and evidence-based medicine.", institution: "All India Institute of Ayurveda", course: "BAMS", department: "Ayurveda Medicine", year: "3rd Year", graduationYear: 2027, location: "New Delhi", targetRole: "Clinical Research Intern", profileCompletion: 82 };

const skillPassport = { verifiedCount: 5, selfDeclaredCount: 3, totalEvidence: 12, verifiedEvidence: 8, items: [
  { id: "sp-1", name: "Python", taxonomyId: "TC-PY-01", origin: "evidence" as const, confidence: 92, category: "Technical", evidence: { id: "ev-1", title: "Python for Research Certificate", kind: "Certificate" as const, issuer: "NPTEL", date: "Jul 2025", status: "verified" as const } },
  { id: "sp-2", name: "Machine Learning", taxonomyId: "TC-ML-01", origin: "evidence" as const, confidence: 86, category: "Technical", evidence: { id: "ev-2", title: "CVD Risk Prediction Model", kind: "Project" as const, issuer: "AIIA", date: "Jun 2025", status: "verified" as const } },
  { id: "sp-3", name: "Research Methodology", taxonomyId: "TC-RM-04", origin: "evidence" as const, confidence: 81, category: "Research", evidence: { id: "ev-3", title: "Academic Transcript", kind: "Transcript" as const, issuer: "AIIA", date: "Aug 2025", status: "verified" as const } },
  { id: "sp-4", name: "Data Analysis", taxonomyId: "TC-DA-02", origin: "evidence" as const, confidence: 76, category: "Technical", evidence: { id: "ev-4", title: "Rural Health Data Survey", kind: "Project" as const, issuer: "AIIA", date: "May 2025", status: "verified" as const } },
  { id: "sp-5", name: "Clinical Research", taxonomyId: "TC-CR-03", origin: "evidence" as const, confidence: 68, category: "Domain", evidence: { id: "ev-5", title: "Clinical Posting Record", kind: "Log" as const, issuer: "AIIA OPD", date: "Jul 2025", status: "verified" as const } },
  { id: "sp-6", name: "Scientific Writing", taxonomyId: "TC-SW-02", origin: "self-declared" as const, confidence: 64, category: "Communication" },
  { id: "sp-7", name: "Documentation", taxonomyId: "TC-DC-01", origin: "self-declared" as const, confidence: 72, category: "Communication" },
  { id: "sp-8", name: "Statistical Analysis", taxonomyId: "TC-SA-01", origin: "self-declared" as const, confidence: 45, category: "Technical" },
] };

const roleReadiness: RoleReadinessProfile = { targetRole: "Clinical Research Intern", readiness: "Developing", readinessScore: 74, matchedSkills: 5, totalRequired: 8, strongSkills: ["Python", "Machine Learning", "Research Methodology"], missingSkills: ["Statistical Analysis"], weakSkills: ["Scientific Writing", "Clinical Research"], explanation: "You are Developing toward this role. Your Python and research skills are strong, but Statistical Analysis is missing and Scientific Writing needs improvement.", factors: [
  { label: "Verified skills match", value: "5 of 8 required skills verified", positive: true },
  { label: "Strong technical foundation", value: "Python 92%, ML 86%", positive: true },
  { label: "Missing critical skill", value: "Statistical Analysis not demonstrated", positive: false },
  { label: "Weak areas need attention", value: "Scientific Writing at 64%", positive: false },
  { label: "Evidence-backed", value: "74% of skills have supporting evidence", positive: true },
] };

const gaps: SkillGap[] = [
  { id: "gp-1", taxonomyId: "TC-SA-01", name: "Statistical Analysis", current: 45, required: 75, severity: "High", evidenceNeeded: true },
  { id: "gp-2", taxonomyId: "TC-SW-02", name: "Scientific Writing", current: 64, required: 80, severity: "Medium", evidenceNeeded: false },
  { id: "gp-3", taxonomyId: "TC-CT-05", name: "Clinical Trial Documentation", current: 55, required: 75, severity: "Medium", evidenceNeeded: true },
];

const simulatorActions: SimulatorAction[] = [
  { type: "course", name: "Statistics for Health Research", description: "Complete NPTEL course on statistical methods", skillsImproved: [{ skill: "Statistical Analysis", currentConfidence: 45, projectedConfidence: 72 }], readinessChange: { from: 74, to: 83, fromLabel: "Developing", toLabel: "Developing" } },
  { type: "project", name: "Clinical Data Analysis Project", description: "Analyze real clinical trial dataset using Python and statistical methods", skillsImproved: [{ skill: "Statistical Analysis", currentConfidence: 45, projectedConfidence: 78 }, { skill: "Data Analysis", currentConfidence: 76, projectedConfidence: 84 }], readinessChange: { from: 74, to: 88, fromLabel: "Developing", toLabel: "Job-Ready" } },
  { type: "certification", name: "GCP Certification", description: "Obtain Good Clinical Practice certification", skillsImproved: [{ skill: "Clinical Trial Documentation", currentConfidence: 55, projectedConfidence: 78 }], readinessChange: { from: 74, to: 81, fromLabel: "Developing", toLabel: "Developing" } },
];

const recommendedProjects: RecommendedProject[] = [
  { id: "rp-1", title: "Clinical Data Statistical Analysis", description: "Analyze a provided clinical trial dataset. Apply appropriate statistical tests, create visualizations, and write a brief findings report.", targetSkill: "Statistical Analysis", skillGapId: "gp-1", difficulty: "Intermediate", estimatedDuration: "3 weeks", deliverables: ["Jupyter notebook", "Statistical test results", "Charts", "Findings report"], verificationCriteria: ["Correct methodology", "Reproducible code", "Clear visualizations"], submissionStatus: "not submitted" },
  { id: "rp-2", title: "Herbal Drug Efficacy Literature Review", description: "Conduct a systematic literature review on the efficacy of a chosen Ayurvedic formulation.", targetSkill: "Scientific Writing", skillGapId: "gp-2", difficulty: "Beginner", estimatedDuration: "2 weeks", deliverables: ["Literature review", "Reference list", "Summary tables"], verificationCriteria: ["Proper citations", "Structured methodology"], submissionStatus: "not submitted" },
];

const opportunities: Opportunity[] = [
  { id: "op-1", title: "Clinical Research Intern", type: "Internship", org: "AIIA / Research Division", location: "New Delhi", duration: "3 Months", stipend: "₹12,000/month", deadline: "Sept 30, 2025", match: 92, matchedSkills: ["Python", "Research Methodology", "Data Analysis"], missingSkills: ["Statistical Analysis"], requiredSkills: ["Python", "Research Methodology", "Data Analysis", "Statistical Analysis"], description: "Work on ongoing clinical trials in Ayurvedic pharmacology.", workArrangement: "On-site", openings: 4 },
  { id: "op-2", title: "Research Data Assistant", type: "Part-time", org: "CCRAS / New Delhi", location: "New Delhi", duration: "6 Months", stipend: "₹15,000/month", deadline: "Oct 15, 2025", match: 85, matchedSkills: ["Python", "Data Analysis", "Machine Learning"], missingSkills: [], requiredSkills: ["Python", "Data Analysis", "Statistical Analysis"], description: "Assist in cleaning and analyzing clinical trial data.", workArrangement: "Hybrid", openings: 2 },
  { id: "op-3", title: "AYUSH Research Internship", type: "Internship", org: "NIA / Jaipur", location: "Jaipur", duration: "2 Months", stipend: "₹8,000/month", deadline: "Sept 20, 2025", match: 78, matchedSkills: ["Research Methodology", "Clinical Research"], missingSkills: ["Statistical Analysis"], requiredSkills: ["Research", "Data Analysis", "Clinical Research"], description: "Support field research on AYUSH healthcare delivery.", workArrangement: "On-site", openings: 3 },
];

const applications: Application[] = [
  { id: "ap-1", opportunityId: "op-1", role: "Clinical Research Intern", org: "AIIA Research Division", stage: "shortlisted", stageLabel: "Shortlisted", status: "Interview scheduled", nextStep: "Interview: Sept 10", match: 92, appliedDate: "Sept 3, 2025" },
  { id: "ap-2", opportunityId: "op-2", role: "Research Data Assistant", org: "CCRAS", stage: "interviewed", stageLabel: "Interviewed", status: "Awaiting decision", match: 88, appliedDate: "Aug 25, 2025" },
  { id: "ap-3", opportunityId: "op-3", role: "AYUSH Research Internship", org: "NIA Jaipur", stage: "applied", stageLabel: "Applied", status: "Submitted 2 days ago", match: 78, appliedDate: "Sept 4, 2025" },
];

const recommendations: LearningRecommendation[] = [
  { id: "rc-1", closesGap: "Statistical Analysis", title: "Statistics for Health Research", type: "Course", provider: "NPTEL", duration: "8 weeks", rating: 4.6, why: "Directly addresses your Statistical Analysis gap.", projectedImprovement: 27 },
  { id: "rc-2", closesGap: "Scientific Writing", title: "Scientific Writing Fundamentals", type: "Course", provider: "Coursera", duration: "4 weeks", rating: 4.8, why: "Builds the writing skills your target role lists as required.", projectedImprovement: 18 },
  { id: "rc-3", closesGap: "Clinical Trial Documentation", title: "GCP & Clinical Trial Basics", type: "Workshop", provider: "AIIA", duration: "2 days", rating: 4.7, why: "Hands-on practice with trial documentation.", projectedImprovement: 23 },
];

const portfolioData = { projects: 4, certificates: 6, verifiedSkills: 18, internshipHours: 240, achievements: 3, featured: [
  { id: "pf-1", title: "Rural Health Data Survey", description: "Analyzed health data from 500+ rural households", skills: ["Python", "Data Analysis"], date: "May 2025" },
  { id: "pf-2", title: "CVD Risk Prediction Model", description: "ML model predicting cardiovascular risk from Ayurvedic markers", skills: ["Machine Learning", "Python"], date: "Jun 2025" },
  { id: "pf-3", title: "Herbal Safety Database", description: "Searchable database of 200+ herb-drug interactions", skills: ["Data Analysis", "Documentation"], date: "Apr 2025" },
] };

const navLinks = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "profile", label: "My Profile", icon: <UserCog size={18} /> },
  { id: "passport", label: "Skill Passport", icon: <Shield size={18} /> },
  { id: "gaps", label: "Skill Gap", icon: <Zap size={18} /> },
  { id: "simulator", label: "Simulator", icon: <FlaskConical size={18} /> },
  { id: "projects", label: "Projects", icon: <Lightbulb size={18} /> },
  { id: "opportunities", label: "Opportunities", icon: <Briefcase size={18} />, count: 3 },
  { id: "applications", label: "Applications", icon: <FileText size={18} /> },
  { id: "recommendations", label: "Learn", icon: <BookOpen size={18} /> },
  { id: "portfolio", label: "Portfolio", icon: <Grid3X3 size={18} /> },
];

/* ─── Helpers ─── */
function PxBar({ pct, segments = 18, color = "#244B35" }: { pct: number; segments?: number; color?: string }) {
  const filled = Math.round((pct / 100) * segments);
  return <div className="flex gap-[3px] flex-wrap">{Array.from({ length: segments }, (_, i) => <span key={i} className={`w-[7px] h-[13px] ${i < filled ? "" : "bg-[#EDEBE0]"}`} style={i < filled ? { background: color } : undefined} />)}</div>;
}
const tagCls: Record<string, string> = { verified: "bg-[#DCE6D0] text-[#16301F]", "self-declared": "bg-[#EDEBE0] text-[#6B6F68]", high: "bg-[#E8C7AE] text-[#7a3f1a]", medium: "bg-[#E8D36B] text-[#5c4a08]", low: "bg-[#DCE6D0] text-[#16301F]", lavender: "bg-[#C8B5DE] text-[#4d3a74]", "Job-Ready": "bg-[#DCE6D0] text-[#16301F]", Developing: "bg-[#E8D36B] text-[#5c4a08]", Beginning: "bg-[#E8C7AE] text-[#7a3f1a]", applied: "bg-[#EDEBE0] text-[#6B6F68]", shortlisted: "bg-[#E8D36B] text-[#5c4a08]", interviewed: "bg-[#C8B5DE] text-[#4d3a74]", offered: "bg-[#DCE6D0] text-[#16301F]", evidence: "bg-[#DCE6D0] text-[#16301F]", "self-declared-tag": "bg-[#EDEBE0] text-[#6B6F68]" };
function Tag({ cls, children }: { cls: string; children: React.ReactNode }) { return <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest uppercase px-2 py-[3px] rounded-md whitespace-nowrap ${tagCls[cls] || cls}`}>{children}</span>; }
function Eyebrow({ color, children }: { color?: string; children: React.ReactNode }) { return <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase inline-flex items-center gap-2" style={{ color: color || "#9A9D94" }}><span className="w-[7px] h-[7px] bg-[#171A18] opacity-85" style={{ boxShadow: "0 7px 0 -2px #F7F6F0" }} />{children}</span>; }
function LinkMore({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) { return <button onClick={onClick} className="font-mono text-xs font-bold text-[#244B35] tracking-wide inline-flex items-center gap-1.5 hover:gap-3 transition-all mt-3">{children}</button>; }

/* ─── Sidebar ─── */
function SidebarContent({ activeNav, setActiveNav }: { activeNav: string; setActiveNav: (id: string) => void }) {
  const { open } = useSidebar();
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className={open ? "" : "flex justify-center"}>{open ? <Logo /> : <LogoIcon />}</div>
        <div className="mt-8 flex flex-col gap-[2px]">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => setActiveNav(link.id)} className={`flex items-center gap-3 w-full text-left rounded-xl text-sm font-medium transition-colors ${open ? "px-3 py-2.5" : "px-0 py-2.5 justify-center"} ${activeNav === link.id ? "bg-[#244B35] text-white font-semibold" : "text-[#6B6F68] hover:bg-[#EDEBE0] hover:text-[#171A18]"}`}>
              <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}>{link.icon}</span>
              {open && <span className="text-sm whitespace-pre">{link.label}</span>}
              {open && link.count !== undefined && <span className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded-md ${activeNav === link.id ? "bg-white/20 text-white" : "bg-[#EDEBE0] text-[#6B6F68]"}`}>{link.count}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t pt-3 mt-2" style={{ borderColor: open ? "#E6E3D7" : "transparent" }}>
        <button onClick={() => setActiveNav("settings")} className={`flex items-center gap-3 w-full rounded-xl text-[#6B6F68] text-xs font-medium hover:bg-[#EDEBE0] hover:text-[#171A18] transition-colors ${open ? "px-3 py-2" : "px-0 py-2 justify-center"}`}><Settings size={16} /> {open && "Settings"}</button>
        <button className={`flex items-center gap-3 w-full rounded-xl text-[#6B6F68] text-xs font-medium hover:bg-[#EDEBE0] hover:text-[#171A18] transition-colors ${open ? "px-3 py-2" : "px-0 py-2 justify-center"}`}><LogOut size={16} /> {open && "Log out"}</button>
        {open && <div className="mt-3 p-3 rounded-xl border" style={{ background: "#F7F6F0", borderColor: "#E6E3D7" }}><div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" style={{ background: "#244B35", color: "#DCE6D0" }}>{student.initials}</div><div className="min-w-0"><div className="font-semibold text-sm truncate" style={{ color: "#171A18" }}>{student.name}</div><div className="text-[11px] font-mono" style={{ color: "#6B6F68" }}>{student.course} / {student.year}</div></div></div><div className="mt-2.5"><div className="flex justify-between text-xs mb-1 font-mono" style={{ color: "#6B6F68" }}><span>Profile {student.profileCompletion}%</span></div><div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full" style={{ width: `${student.profileCompletion}%`, background: "#244B35" }} /></div></div></div>}
        {!open && <div className="flex justify-center mt-3"><div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: "#244B35", color: "#DCE6D0" }}>{student.initials}</div></div>}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   OVERVIEW SECTION
   ═══════════════════════════════════════════════════════ */
function OverviewSection() {
  const [animateRing, setAnimateRing] = useState(0);
  useEffect(() => { let f = 0; const id = setInterval(() => { f += 2; setAnimateRing(Math.min(f, student.profileCompletion)); if (f >= student.profileCompletion) clearInterval(id); }, 12); return () => clearInterval(id); }, []);

  const skillJourney = [
    { label: "Evidence", done: true }, { label: "Skills", done: true },
    { label: "Skill Gap", active: true }, { label: "Match" }, { label: "Opportunity" },
  ];

  const bestMatch = opportunities[0];

  return (
    <div className="flex flex-col gap-5">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="rounded-[18px] p-7 md:p-9 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #244B35 0%, #1C3D2B 40%, #1A3626 100%)", boxShadow: "0 8px 32px rgba(36,75,53,.18), inset 0 1px 0 rgba(220,230,208,.12)" }}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <Eyebrow color="#DCE6D0">Personal Progress</Eyebrow>
            <div className="font-semibold text-[26px] md:text-[30px] tracking-tight mt-3 mb-1" style={{ color: "#fff" }}>Your next opportunity starts with your skills.</div>
            <p className="text-[14px] mb-6" style={{ color: "rgba(255,255,255,.7)" }}>You have built a strong foundation. Close a few skill gaps to unlock better matches.</p>
            <div className="flex flex-col sm:flex-row gap-6 mb-5">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="5" /><circle cx="32" cy="32" r="28" fill="none" stroke="#DCE6D0" strokeWidth="5" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * (1 - animateRing / 100)} strokeLinecap="round" transform="rotate(-90 32 32)" /></svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-sm" style={{ color: "#DCE6D0" }}>{animateRing}%</div>
                </div>
                <div><div className="font-mono text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,.5)" }}>Profile</div><div className="font-semibold text-lg" style={{ color: "#fff" }}>{student.profileCompletion}%</div></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,.5)" }}>Skill Confidence</div>
                <PxBar pct={roleReadiness.readinessScore} color="#DCE6D0" />
                <div className="mt-2 flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(232,211,107,.25)", color: "#E8D36B" }}>Best match {bestMatch.match}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2 min-w-[160px]">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,.5)" }}>Your Skill Journey</div>
            {skillJourney.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-[5px] flex items-center justify-center text-[10px] font-bold border-2 ${s.done ? "bg-[#DCE6D0] border-[#DCE6D0] text-[#244B35]" : s.active ? "bg-[#E8D36B] border-[#B99A22] text-[#16301F]" : "bg-white/10 border-white/20 text-white/40"}`}>{s.done ? "\u2713" : i + 1}</div>
                <span className={`text-xs font-medium ${s.done || s.active ? "text-white" : "text-white/40"}`}>{s.label}</span>
                {i < skillJourney.length - 1 && <div className="absolute ml-[9px] mt-[20px] w-[2px] h-2" style={{ background: s.done ? "rgba(220,230,208,.4)" : "rgba(255,255,255,.1)" }} />}
              </div>
            ))}
          </div>
        </div>
        {/* Decorative pixel dots */}
        <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none"><div className="grid grid-cols-6 gap-[6px]">{Array.from({length:36},(_,i)=><div key={i} className="w-[5px] h-[5px] bg-white rounded-[1px]" />)}</div></div>
        <div className="absolute bottom-4 left-4 opacity-[0.04] pointer-events-none"><div className="grid grid-cols-4 gap-[5px]">{Array.from({length:16},(_,i)=><div key={i} className="w-[4px] h-[4px] bg-[#E8D36B] rounded-[1px]" />)}</div></div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Profile Completion", value: `${student.profileCompletion}%`, color: "#244B35", bg: "#DCE6D0", accent: "#244B35", icon: <Target size={16} /> },
          { label: "Skill Confidence", value: `${roleReadiness.readinessScore}%`, color: "#171A18", bg: "#EDEBE0", accent: "#C98B5F", icon: <Sparkles size={16} /> },
          { label: "Evidence Items", value: `${skillPassport.totalEvidence}`, color: "#4d3a74", bg: "#EAE3F4", accent: "#8A6FB8", icon: <Shield size={16} /> },
          { label: "Applications", value: `${applications.length}`, color: "#7a3f1a", bg: "#F0E8DD", accent: "#C98B5F", icon: <Briefcase size={16} /> },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="rounded-[14px] p-5 border relative overflow-hidden group hover:shadow-md transition-shadow" style={{ background: s.bg, borderColor: "#E6E3D7", borderLeft: `3px solid ${s.accent}` }}>
            <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity" style={{ color: s.color }}>{s.icon}</div>
            <div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "#6B6F68" }}>{s.label}</div>
            <div className="font-bold text-3xl tracking-tight" style={{ color: s.color }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Skill Snapshot + Skill Gap */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}
          className="md:col-span-7 rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
          <Eyebrow color="#244B35">Skill Snapshot</Eyebrow>
          <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Your Skill Snapshot</div>
          <div className="flex flex-col gap-3">
            {skillPassport.items.slice(0, 5).map((sk) => (
              <div key={sk.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium" style={{ color: "#171A18" }}>{sk.name}</span>
                  <Tag cls={sk.origin === "evidence" ? "verified" : "self-declared"}>{sk.origin === "evidence" ? "\u2713 Verified" : "Self-declared"}</Tag>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full" style={{ width: `${sk.confidence}%`, background: sk.origin === "evidence" ? "#244B35" : "#E8D36B" }} /></div>
                  <span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{sk.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
          className="md:col-span-5 rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #E8C7AE, #F0E8DD)" }} />
          <Eyebrow color="#E8C7AE">Skill Gap</Eyebrow>
          <div className="font-semibold text-[19px] tracking-tight mt-2 mb-1">Your Biggest Skill Gaps</div>
          <p className="text-xs mb-4" style={{ color: "#6B6F68" }}>Matched against your target role requirements.</p>
          <div className="flex flex-col gap-4">
            {gaps.map((g) => (
              <div key={g.id}>
                <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium" style={{ color: "#171A18" }}>{g.name}</span><Tag cls={g.severity.toLowerCase()}>{g.severity}</Tag></div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full" style={{ width: `${g.current}%`, background: g.severity === "High" ? "#E8C7AE" : "#E8D36B" }} /></div>
                  <span className="font-mono text-[11px] font-bold" style={{ color: "#6B6F68" }}>{g.current}/{g.required}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Best Match */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Best Match For You</Eyebrow>
        <div className="flex flex-col md:flex-row gap-6 mt-3">
          <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #DCE6D0, #C8DFBA)", border: "3px solid #244B35", boxShadow: "0 4px 12px rgba(36,75,53,.15)" }}>
            <span className="font-bold text-xl" style={{ color: "#244B35" }}>{bestMatch.match}%</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-[18px]" style={{ color: "#171A18" }}>{bestMatch.title}</div>
            <div className="text-sm mb-2" style={{ color: "#6B6F68" }}>{bestMatch.org}</div>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] mb-3" style={{ color: "#6B6F68" }}>
              <span className="inline-flex items-center gap-1"><MapPin size={11} /> {bestMatch.location}</span>
              <span className="inline-flex items-center gap-1"><Clock size={11} /> {bestMatch.duration}</span>
              <span className="inline-flex items-center gap-1"><Briefcase size={11} /> {bestMatch.stipend}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {bestMatch.matchedSkills.map((sk) => <Tag key={sk} cls="verified">{sk}</Tag>)}
              {bestMatch.missingSkills.map((sk) => <Tag key={sk} cls="high">{sk}</Tag>)}
            </div>
            <p className="text-xs mb-3" style={{ color: "#6B6F68" }}>{bestMatch.match}% match because your profile strongly aligns with {bestMatch.matchedSkills.length} of {bestMatch.requiredSkills.length} required skills.</p>
            <div className="flex gap-3">
              <button className="font-mono text-xs font-bold px-4 py-2 rounded-lg text-white transition-all hover:shadow-md hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #244B35, #1C3D2B)" }}>View opportunity</button>
              <button className="font-mono text-xs font-bold px-4 py-2 rounded-lg border transition-all hover:shadow-sm hover:bg-[#FAFAF7]" style={{ borderColor: "#E6E3D7", color: "#6B6F68" }}>See all opportunities</button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Applications */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Application Journey</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Application Journey</div>
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div key={app.id} className="relative pl-7 pb-5 last:pb-0">
              <div className="absolute left-[6px] top-4 bottom-1 w-0.5" style={{ background: "#E6E3D7" }} />
              <div className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-[5px] border-2 border-white`} style={{ background: app.stage === "applied" ? "#244B35" : app.stage === "shortlisted" ? "#E8D36B" : "#C8B5DE", boxShadow: `0 0 0 1px #E6E3D7, 0 0 0 3px ${app.stage === "applied" ? "rgba(36,75,53,.18)" : app.stage === "shortlisted" ? "rgba(232,211,107,.25)" : "rgba(200,181,222,.25)"}` }} />
              <div className="font-semibold text-[14.5px]" style={{ color: "#171A18" }}>{app.role}</div>
              <div className="flex items-center gap-2 mt-0.5"><Tag cls={app.stage}>{app.stageLabel}</Tag><span className="text-xs" style={{ color: "#6B6F68" }}>{app.status}</span></div>
              {app.nextStep && <div className="font-mono text-[11px] mt-1" style={{ color: "#6B6F68" }}>{app.nextStep}</div>}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C8B5DE, #EAE3F4)" }} />
        <Eyebrow color="#8A6FB8">Recommendations</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Recommended For Your Skill Gaps</div>
        <p className="text-xs mb-4" style={{ color: "#6B6F68" }}>Each recommendation is connected to a specific skill gap.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ borderColor: "#DED6EC", background: "linear-gradient(180deg, #FDFCFA 0%, #F8F5FC 100%)" }}>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#8A6FB8" }}>{rec.closesGap}</div>
              <div className="font-semibold text-sm mb-1" style={{ color: "#171A18" }}>{rec.title}</div>
              <div className="text-xs mb-2" style={{ color: "#6B6F68" }}>{rec.type} / {rec.provider} / {rec.duration}</div>
              <div className="flex items-center gap-1 mb-2"><Star size={12} style={{ color: "#E8D36B", fill: "#E8D36B" }} /><span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{rec.rating}</span></div>
              <p className="text-xs" style={{ color: "#6B6F68" }}>{rec.why}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #E8D36B, #C98B5F, #8A6FB8)" }} />
        <Eyebrow>Quick Actions</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">What do you want to do?</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Upload size={16} />, label: "Upload Evidence", color: "#244B35" },
            { icon: <Briefcase size={16} />, label: "Explore Opportunities", color: "#C98B5F" },
            { icon: <Zap size={16} />, label: "Check Skill Gaps", color: "#E8D36B" },
            { icon: <UserCog size={16} />, label: "Update Profile", color: "#8A6FB8" },
          ].map((a) => (
            <button key={a.label} className="flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all hover:shadow-md hover:-translate-y-0.5" style={{ borderColor: "#E6E3D7", background: "#FAFAF7" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: a.color + "15", color: a.color }}>{a.icon}</div>
              <span className="text-xs font-semibold" style={{ color: "#171A18" }}>{a.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROFILE SECTION
   ═══════════════════════════════════════════════════════ */
function ProfileSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-20 h-20 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0" style={{ background: "linear-gradient(135deg, #244B35, #1C3D2B)", color: "#DCE6D0", boxShadow: "0 4px 12px rgba(36,75,53,.15)" }}>{student.initials}</div>
          <div className="flex-1">
            <div className="font-semibold text-[22px] tracking-tight" style={{ color: "#171A18" }}>{student.name}</div>
            <div className="text-sm mb-1" style={{ color: "#6B6F68" }}>{student.course} / {student.year} / {student.department}</div>
            <div className="text-xs mb-3" style={{ color: "#6B6F68" }}>{student.institution}</div>
            <Tag cls="verified">Target: {student.targetRole}</Tag>
          </div>
          <div className="flex-shrink-0"><button className="font-mono text-xs font-bold px-4 py-2 rounded-lg border flex items-center gap-2" style={{ borderColor: "#E6E3D7", color: "#6B6F68" }}><Edit3 size={13} /> Edit</button></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <Eyebrow>Contact Information</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            {[
              { icon: <Mail size={14} />, label: "Email", value: student.email },
              { icon: <Smartphone size={14} />, label: "Phone", value: student.phone },
              { icon: <MapPin size={14} />, label: "Location", value: student.location },
              { icon: <Globe size={14} />, label: "Institution", value: student.institution },
              { icon: <BookOpen size={14} />, label: "Course", value: `${student.course} - ${student.year}` },
              { icon: <Calendar size={14} />, label: "Graduation", value: `Class of ${student.graduationYear}` },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "#FAFAF7" }}>
                <div className="mt-0.5" style={{ color: "#9A9D94" }}>{f.icon}</div>
                <div><div className="font-mono text-[10px] font-bold tracking-widest uppercase" style={{ color: "#9A9D94" }}>{f.label}</div><div className="text-sm font-medium" style={{ color: "#171A18" }}>{f.value}</div></div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <Eyebrow>Quick Stats</Eyebrow>
          <div className="flex flex-col gap-3 mt-3">
            {[
              { label: "Verified Skills", value: skillPassport.verifiedCount, color: "#244B35" },
              { label: "Total Evidence", value: skillPassport.totalEvidence, color: "#8A6FB8" },
              { label: "Applications", value: applications.length, color: "#C98B5F" },
              { label: "Profile", value: `${student.profileCompletion}%`, color: "#171A18" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#FAFAF7" }}>
                <span className="text-xs font-medium" style={{ color: "#6B6F68" }}>{s.label}</span>
                <span className="font-bold text-lg" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILL PASSPORT SECTION
   ═══════════════════════════════════════════════════════ */
function SkillPassportSection() {
  const verified = skillPassport.items.filter((i) => i.origin === "evidence");
  const selfDeclared = skillPassport.items.filter((i) => i.origin === "self-declared");

  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Skill Passport</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1">Your Skill Passport</div>
        <p className="text-xs mb-4" style={{ color: "#6B6F68" }}>Evidence-backed and self-declared skills, clearly distinguished.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Verified Skills", value: skillPassport.verifiedCount, bg: "#DCE6D0", color: "#244B35" },
            { label: "Self-Declared", value: skillPassport.selfDeclaredCount, bg: "#EDEBE0", color: "#6B6F68" },
            { label: "Total Evidence", value: skillPassport.totalEvidence, bg: "#EAE3F4", color: "#4d3a74" },
            { label: "Verified Evidence", value: skillPassport.verifiedEvidence, bg: "#DCE6D0", color: "#244B35" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4 text-center hover:shadow-sm transition-shadow" style={{ background: s.bg, border: "1px solid rgba(0,0,0,.04)" }}>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#6B6F68" }}>{s.label}</div>
              <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="flex items-center gap-2 mb-4"><div className="w-3 h-3 rounded-sm" style={{ background: "#244B35" }} /><div className="font-semibold text-[16px]" style={{ color: "#171A18" }}>Evidence-Derived Skills</div></div>
          <div className="flex flex-col gap-3">
            {verified.map((sk) => (
              <div key={sk.id} className="p-3 rounded-xl border hover:shadow-sm transition-shadow" style={{ borderColor: "#D6E3CE", background: "linear-gradient(135deg, #FAFCF7, #F4F9F0)" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-sm" style={{ color: "#171A18" }}>{sk.name}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: "#244B35" }}>{sk.confidence}%</span>
                </div>
                <PxBar pct={sk.confidence} color="#244B35" />
                {sk.evidence && <div className="mt-2 font-mono text-[10px]" style={{ color: "#6B6F68" }}>{sk.evidence.title} / {sk.evidence.issuer} / {sk.evidence.date}</div>}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="flex items-center gap-2 mb-4"><div className="w-3 h-3 rounded-sm" style={{ background: "#E8D36B" }} /><div className="font-semibold text-[16px]" style={{ color: "#171A18" }}>Self-Declared Skills</div></div>
          <div className="flex flex-col gap-3">
            {selfDeclared.map((sk) => (
              <div key={sk.id} className="p-3 rounded-xl border hover:shadow-sm transition-shadow" style={{ borderColor: "#E6DDD5", background: "linear-gradient(135deg, #FAFAF7, #FDF9F2)" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-sm" style={{ color: "#171A18" }}>{sk.name}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{sk.confidence}%</span>
                </div>
                <PxBar pct={sk.confidence} color="#E8D36B" />
                <div className="mt-2 font-mono text-[10px]" style={{ color: "#9A9D94" }}>No evidence uploaded yet</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Role Readiness</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-1">Role Readiness: {roleReadiness.targetRole}</div>
        <div className="flex items-center gap-3 mt-3 mb-4">
          <Tag cls={roleReadiness.readiness}>{roleReadiness.readiness}</Tag>
          <span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{roleReadiness.readinessScore}/100</span>
          <span className="text-xs" style={{ color: "#6B6F68" }}>{roleReadiness.matchedSkills}/{roleReadiness.totalRequired} skills matched</span>
        </div>
        <p className="text-sm mb-4" style={{ color: "#6B6F68" }}>{roleReadiness.explanation}</p>
        <div className="flex flex-col gap-2">
          {roleReadiness.factors.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5">{f.positive ? <Check size={14} style={{ color: "#244B35" }} /> : <Zap size={14} style={{ color: "#E8C7AE" }} />}</span>
              <span><strong style={{ color: "#171A18" }}>{f.label}:</strong> <span style={{ color: "#6B6F68" }}>{f.value}</span></span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILL GAP SECTION
   ═══════════════════════════════════════════════════════ */
function SkillGapSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #E8C7AE, #F0E8DD)" }} />
        <Eyebrow color="#E8C7AE">Skill Gap Analysis</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1">Your Skill Gaps</div>
        <p className="text-xs mb-5" style={{ color: "#6B6F68" }}>Based on your target role: {roleReadiness.targetRole}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gaps.map((g) => (
            <div key={g.id} className="rounded-xl border p-5 hover:shadow-md transition-shadow" style={{ borderColor: "#E6DDD5", background: "linear-gradient(180deg, #FDFCFA 0%, #FDF8F3 100%)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm" style={{ color: "#171A18" }}>{g.name}</span>
                <Tag cls={g.severity.toLowerCase()}>{g.severity} Gap</Tag>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1 font-mono" style={{ color: "#6B6F68" }}><span>Current</span><span>{g.current}%</span></div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full" style={{ width: `${g.current}%`, background: g.severity === "High" ? "#E8C7AE" : "#E8D36B" }} /></div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1 font-mono" style={{ color: "#6B6F68" }}><span>Required</span><span>{g.required}%</span></div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full" style={{ width: `${g.required}%`, background: "#244B35" }} /></div>
              </div>
              {g.evidenceNeeded && <div className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md inline-block" style={{ background: "#F0E8DD", color: "#7a3f1a" }}>Evidence needed</div>}
              <button className="mt-3 font-mono text-xs font-bold text-[#244B35] inline-flex items-center gap-1.5 hover:gap-3 transition-all px-3 py-1.5 rounded-lg hover:bg-[#F0F5EC]">Close gap <ChevronRight size={12} /></button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SIMULATOR SECTION
   ═══════════════════════════════════════════════════════ */
function SimulatorSection() {
  const [selected, setSelected] = useState(0);
  const action = simulatorActions[selected];

  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Skill Gap Simulator</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1">See What Could Change</div>
        <p className="text-xs mb-5" style={{ color: "#6B6F68" }}>Select an action to simulate its impact on your role readiness.</p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-5 flex flex-col gap-2">
            {simulatorActions.map((a, i) => (
              <button key={i} onClick={() => setSelected(i)} className={`text-left p-4 rounded-xl border transition-all ${selected === i ? "ring-2" : "hover:shadow-sm"}`} style={{ borderColor: selected === i ? "#244B35" : "#E6E3D7", background: selected === i ? "linear-gradient(135deg, #F0F5EC, #E8F0E2)" : "#FAFAF7", boxShadow: selected === i ? "0 0 0 3px rgba(36,75,53,.12)" : undefined }}>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#9A9D94" }}>{a.type}</div>
                <div className="font-semibold text-sm" style={{ color: "#171A18" }}>{a.name}</div>
                <p className="text-xs mt-1" style={{ color: "#6B6F68" }}>{a.description}</p>
              </button>
            ))}
          </div>

          <div className="md:col-span-7 rounded-xl border p-5" style={{ borderColor: "#E6E3D7", background: "#FAFAF7" }}>
            <div className="font-semibold text-[16px] mb-4" style={{ color: "#171A18" }}>{action.name}</div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg p-3 text-center" style={{ background: "#EDEBE0" }}>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#6B6F68" }}>Current</div>
                <div className="font-bold text-2xl" style={{ color: "#171A18" }}>{action.readinessChange.from}</div>
                <Tag cls={action.readinessChange.fromLabel}>{action.readinessChange.fromLabel}</Tag>
              </div>
              <div className="rounded-lg p-3 text-center" style={{ background: "linear-gradient(135deg, #DCE6D0, #C8DFBA)" }}>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#6B6F68" }}>Projected</div>
                <div className="font-bold text-2xl" style={{ color: "#244B35" }}>{action.readinessChange.to}</div>
                <Tag cls={action.readinessChange.toLabel}>{action.readinessChange.toLabel}</Tag>
              </div>
            </div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#6B6F68" }}>Skills Improved</div>
            {action.skillsImproved.map((sk) => (
              <div key={sk.skill} className="mb-3">
                <div className="flex justify-between text-xs mb-1"><span className="font-medium" style={{ color: "#171A18" }}>{sk.skill}</span><span className="font-mono font-bold" style={{ color: "#244B35" }}>{sk.currentConfidence}% &rarr; {sk.projectedConfidence}%</span></div>
                <div className="h-2 rounded-full overflow-hidden flex gap-0.5" style={{ background: "#E6E3D7" }}>
                  <div className="h-full rounded-full" style={{ width: `${sk.currentConfidence}%`, background: "#E8D36B" }} />
                  <div className="h-full rounded-full" style={{ width: `${sk.projectedConfidence - sk.currentConfidence}%`, background: "#244B35" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECTS SECTION (Skill-to-Project Loop)
   ═══════════════════════════════════════════════════════ */
function ProjectsSection() {
  const [projectStatus, setProjectStatus] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleStart = (id: string) => {
    setProjectStatus(prev => ({ ...prev, [id]: "in-progress" }));
  };

  const handleSubmit = (id: string) => {
    setSubmitting(id);
    setTimeout(() => {
      setProjectStatus(prev => ({ ...prev, [id]: "submitted" }));
      setSubmitting(null);
      setDescription("");
    }, 1500);
  };

  const statusLabel = (id: string) => {
    const s = projectStatus[id];
    if (s === "submitted") return "Submitted";
    if (s === "in-progress") return "In Progress";
    return "Not started";
  };

  const statusCls = (id: string) => {
    const s = projectStatus[id];
    if (s === "submitted") return "verified";
    if (s === "in-progress") return "medium";
    return "applied";
  };

  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Skill-to-Project Loop</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1" style={{ color: "#171A18" }}>Recommended Projects</div>
        <p className="text-xs mb-5" style={{ color: "#6B6F68" }}>Each project targets a specific skill gap. Complete it to earn verified evidence for your Skill Passport.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recommendedProjects.map((proj) => {
            const status = projectStatus[proj.id];
            return (
            <div key={proj.id} className="rounded-xl border p-5 hover:shadow-md transition-shadow" style={{ borderColor: "#DED6EC", background: "linear-gradient(180deg, #FDFCFA 0%, #FAF8FD 100%)" }}>
              <div className="flex items-center justify-between mb-2">
                <Tag cls="lavender">{proj.targetSkill}</Tag>
                <div className="flex items-center gap-2"><Tag cls={proj.difficulty === "Beginner" ? "low" : "medium"}>{proj.difficulty}</Tag><Tag cls={statusCls(proj.id)}>{statusLabel(proj.id)}</Tag></div>
              </div>
              <div className="font-semibold text-[16px] mb-1" style={{ color: "#171A18" }}>{proj.title}</div>
              <p className="text-xs mb-3" style={{ color: "#6B6F68" }}>{proj.description}</p>
              <div className="flex items-center gap-3 font-mono text-[11px] mb-3" style={{ color: "#6B6F68" }}>
                <span className="inline-flex items-center gap-1"><Clock size={11} /> {proj.estimatedDuration}</span>
                <span className="inline-flex items-center gap-1"><FileText size={11} /> {proj.deliverables.length} deliverables</span>
              </div>
              <div className="mb-3">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "#9A9D94" }}>Deliverables</div>
                <div className="flex flex-wrap gap-1.5">{proj.deliverables.map((d) => <span key={d} className="text-[10px] font-medium px-2 py-0.5 rounded-md" style={{ background: "#EDEBE0", color: "#6B6F68" }}>{d}</span>)}</div>
              </div>
              <div className="mb-3">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: "#9A9D94" }}>Verification Criteria</div>
                <div className="flex flex-col gap-1">{proj.verificationCriteria.map((c) => <div key={c} className="flex items-center gap-1.5 text-xs" style={{ color: "#6B6F68" }}><Check size={11} style={{ color: "#244B35" }} /> {c}</div>)}</div>
              </div>

              {/* Submission Flow */}
              {status === "in-progress" && (
                <div className="mt-3 p-3 rounded-xl border" style={{ borderColor: "#E6E3D7", background: "#FAFAF7" }}>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#9A9D94" }}>Submit Evidence</div>
                  <textarea className="w-full rounded-lg border px-3 py-2 text-sm outline-none mb-2" style={{ borderColor: "#E6E3D7", background: "#fff", color: "#171A18", minHeight: 60 }} placeholder="Describe your project and upload files..." value={description} onChange={e => setDescription(e.target.value)} />
                  <div className="flex items-center gap-2 mb-2">
                    <button className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-all hover:bg-[#F0F5EC]" style={{ borderColor: "#E6E3D7", color: "#6B6F68" }}><Upload size={12} /> Upload files</button>
                    <span className="font-mono text-[10px]" style={{ color: "#9A9D94" }}>PDF, images, code files</span>
                  </div>
                  <button onClick={() => handleSubmit(proj.id)} disabled={!description.trim() || submitting === proj.id} className="font-mono text-xs font-bold px-4 py-2 rounded-lg text-white transition-all hover:shadow-md disabled:opacity-50" style={{ background: "linear-gradient(135deg, #244B35, #1C3D2B)" }}>{submitting === proj.id ? "Submitting..." : "Submit for Review"}</button>
                </div>
              )}

              {status === "submitted" && (
                <div className="mt-3 p-3 rounded-xl" style={{ background: "#F0F5EC" }}>
                  <div className="flex items-center gap-2"><Check size={14} style={{ color: "#244B35" }} /><span className="font-semibold text-sm" style={{ color: "#244B35" }}>Submitted for review</span></div>
                  <p className="text-xs mt-1" style={{ color: "#6B6F68" }}>Awaiting academician verification. You will be notified when reviewed.</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "#EDEBE0" }}>
                <Tag cls={statusCls(proj.id)}>{statusLabel(proj.id)}</Tag>
                {!status && <button onClick={() => handleStart(proj.id)} className="font-mono text-xs font-bold px-4 py-2 rounded-lg text-white transition-all hover:shadow-md hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #244B35, #1C3D2B)" }}>Start project</button>}
                {status === "in-progress" && <button onClick={() => handleSubmit(proj.id)} disabled={!description.trim() || submitting === proj.id} className="font-mono text-xs font-bold px-4 py-2 rounded-lg text-white transition-all hover:shadow-md disabled:opacity-50" style={{ background: "linear-gradient(135deg, #244B35, #1C3D2B)" }}>{submitting === proj.id ? "Submitting..." : "Submit"}</button>}
              </div>
            </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   OPPORTUNITIES SECTION
   ═══════════════════════════════════════════════════════ */
function OpportunitiesSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="flex items-center justify-between mb-1">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Opportunities</Eyebrow>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: "#F0E8DD", color: "#7a3f1a" }}>{opportunities.length} matched</span>
        </div>
        <div className="font-semibold text-[22px] tracking-tight mb-5">Discover Opportunities</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {opportunities.map((opp) => (
            <div key={opp.id} className="rounded-xl border p-5 hover:shadow-md transition-shadow" style={{ borderColor: "#E6DDD5", background: "linear-gradient(180deg, #FDFCFA 0%, #FDF9F2 100%)" }}>
              <div className="flex items-center justify-between mb-2">
                <Tag cls="evidence">{opp.type}</Tag>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: "#DCE6D0", color: "#244B35" }}>{opp.match}%</div>
              </div>
              <div className="font-semibold text-[17px] mb-1" style={{ color: "#171A18" }}>{opp.title}</div>
              <div className="text-sm mb-2" style={{ color: "#6B6F68" }}>{opp.org}</div>
              <p className="text-xs mb-3" style={{ color: "#6B6F68" }}>{opp.description}</p>
              <div className="flex flex-wrap gap-3 font-mono text-[11px] mb-3" style={{ color: "#6B6F68" }}>
                <span className="inline-flex items-center gap-1"><MapPin size={11} /> {opp.location}</span>
                <span className="inline-flex items-center gap-1"><Clock size={11} /> {opp.duration}</span>
                <span className="inline-flex items-center gap-1"><Briefcase size={11} /> {opp.stipend}</span>
                <span className="inline-flex items-center gap-1"><Target size={11} /> {opp.openings} openings</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {opp.matchedSkills.map((sk) => <Tag key={sk} cls="verified">{sk}</Tag>)}
                {opp.missingSkills.map((sk) => <Tag key={sk} cls="high">{sk}</Tag>)}
              </div>
              <div className="font-mono text-[10px] mb-3" style={{ color: "#6B6F68" }}>Deadline: {opp.deadline}</div>
              <div className="flex gap-3">
                <button onClick={() => { const el = document.createElement("div"); el.className = "fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-white font-semibold text-sm shadow-lg"; el.style.background = "#244B35"; el.textContent = "Application submitted!"; document.body.appendChild(el); setTimeout(() => el.remove(), 3000); }} className="font-mono text-xs font-bold px-4 py-2 rounded-lg text-white transition-all hover:shadow-md hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #244B35, #1C3D2B)" }}>Apply now</button>
                <button className="font-mono text-xs font-bold px-4 py-2 rounded-lg border" style={{ borderColor: "#E6E3D7", color: "#6B6F68" }}>Details</button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   APPLICATIONS SECTION
   ═══════════════════════════════════════════════════════ */
function ApplicationsSection() {
  const stages = ["Applied", "Shortlisted", "Interviewed", "Offered", "Joined"];

  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Applications</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-5">Application Tracker</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {stages.map((st, i) => (
            <div key={st} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold" style={{ background: "#EDEBE0", color: "#6B6F68" }}>{i + 1}</div>
              <span className="text-xs font-medium" style={{ color: "#171A18" }}>{st}</span>
              {i < stages.length - 1 && <div className="flex-1 h-[2px]" style={{ background: "#E6E3D7" }} />}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div key={app.id} className="rounded-xl border p-5 hover:shadow-md transition-shadow" style={{ borderColor: "#DED6EC", background: "linear-gradient(180deg, #FDFCFA 0%, #FBF8FE 100%)" }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                <div>
                  <div className="font-semibold text-[16px]" style={{ color: "#171A18" }}>{app.role}</div>
                  <div className="text-sm" style={{ color: "#6B6F68" }}>{app.org}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag cls={app.stage}>{app.stageLabel}</Tag>
                  <span className="font-mono text-xs font-bold" style={{ color: "#244B35" }}>{app.match}% match</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#6B6F68" }}>
                <span>Applied: {app.appliedDate}</span>
                <span>Status: {app.status}</span>
                {app.nextStep && <span className="font-medium" style={{ color: "#244B35" }}>{app.nextStep}</span>}
              </div>
              <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #E6E3D7" }}>
                {stages.map((st, i) => {
                  const stKey = st.toLowerCase();
                  const isCurrent = app.stage === stKey || (app.stage === "shortlisted" && i <= 1) || (app.stage === "interviewed" && i <= 2);
                  return <div key={st} className="flex-1 h-1.5 rounded-full" style={{ background: isCurrent ? "#244B35" : "#E6E3D7" }} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RECOMMENDATIONS SECTION
   ═══════════════════════════════════════════════════════ */
function RecommendationsSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Learning Recommendations</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1">Recommended For Your Skill Gaps</div>
        <p className="text-xs mb-5" style={{ color: "#6B6F68" }}>Each recommendation is directly connected to a specific skill gap.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="rounded-xl border p-5" style={{ borderColor: "#E6E3D7", background: "#FAFAF7" }}>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#8A6FB8" }}>{rec.closesGap}</div>
              <div className="font-semibold text-[16px] mb-1" style={{ color: "#171A18" }}>{rec.title}</div>
              <div className="text-xs mb-2" style={{ color: "#6B6F68" }}>{rec.type} / {rec.provider} / {rec.duration}</div>
              <div className="flex items-center gap-1 mb-2">
                <Star size={13} style={{ color: "#E8D36B", fill: "#E8D36B" }} />
                <span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{rec.rating}</span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#6B6F68" }}>{rec.why}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: "#DCE6D0", color: "#244B35" }}>+{rec.projectedImprovement}% improvement</span>
                <button className="font-mono text-xs font-bold text-[#244B35] inline-flex items-center gap-1.5 hover:gap-3 transition-all px-3 py-1.5 rounded-lg hover:bg-[#F0F5EC]">Start learning <ChevronRight size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PORTFOLIO SECTION
   ═══════════════════════════════════════════════════════ */
function PortfolioSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Verified Portfolio</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-4">Your Verified Portfolio</div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          {[
            { label: "Projects", value: portfolioData.projects, color: "#244B35" },
            { label: "Certificates", value: portfolioData.certificates, color: "#8A6FB8" },
            { label: "Verified Skills", value: portfolioData.verifiedSkills, color: "#244B35" },
            { label: "Internship Hours", value: portfolioData.internshipHours, color: "#C98B5F" },
            { label: "Achievements", value: portfolioData.achievements, color: "#E8D36B" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4 text-center hover:shadow-sm transition-shadow" style={{ background: "#FAFAF7", border: "1px solid #E6E3D7" }}>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#6B6F68" }}>{s.label}</div>
              <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="font-semibold text-[16px] mb-3" style={{ color: "#171A18" }}>Featured Work</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portfolioData.featured.map((p) => (
            <div key={p.id} className="rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ borderColor: "#E6DDD5", background: "linear-gradient(180deg, #FDFCFA 0%, #FDF9F2 100%)" }}>
              <div className="font-semibold text-sm mb-1" style={{ color: "#171A18" }}>{p.title}</div>
              <p className="text-xs mb-2" style={{ color: "#6B6F68" }}>{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {p.skills.map((sk) => <Tag key={sk} cls="verified">{sk}</Tag>)}
              </div>
              <div className="font-mono text-[10px]" style={{ color: "#9A9D94" }}>{p.date}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SETTINGS SECTION
   ═══════════════════════════════════════════════════════ */
function SettingsSection() {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [phone, setPhone] = useState(student.phone);
  const [bio, setBio] = useState(student.bio);
  const [notifs, setNotifs] = useState({ email: true, push: true, opportunities: true, digest: false });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: POST to /api/student/settings with { name, email, phone, bio, notifications: notifs }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors";
  const inputStyle = { borderColor: "#E6E3D7", background: "#FAFAF7", color: "#171A18" };

  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Settings</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-5">Account Settings</div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Profile Information</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Full Name</label><input className={inputCls} style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Email</label><input className={inputCls} style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Phone</label><input className={inputCls} style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Course</label><input className={inputCls} style={inputStyle} value={student.course + " / " + student.year} readOnly /></div>
            </div>
            <div className="mb-4"><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Bio</label><textarea className={inputCls} style={{ ...inputStyle, minHeight: 80 }} value={bio} onChange={(e) => setBio(e.target.value)} /></div>
          </div>

          <div className="md:col-span-4">
            <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Notification Preferences</div>
            <div className="flex flex-col gap-3">
              {Object.entries({ email: "Email notifications", push: "Push notifications", opportunities: "Opportunity alerts", digest: "Weekly digest" }).map(([k, label]) => (
                <label key={k} className="flex items-center justify-between cursor-pointer p-3 rounded-lg" style={{ background: "#FAFAF7", border: "1px solid #E6E3D7" }}>
                  <span className="text-xs font-medium" style={{ color: "#171A18" }}>{label}</span>
                  <div className={`w-9 h-5 rounded-full transition-colors relative ${notifs[k as keyof typeof notifs] ? "" : ""}`} style={{ background: notifs[k as keyof typeof notifs] ? "#244B35" : "#E6E3D7" }} onClick={() => setNotifs({ ...notifs, [k]: !notifs[k as keyof typeof notifs] })}>
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform" style={{ left: notifs[k as keyof typeof notifs] ? "18px" : "2px" }} />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-end gap-3">
        <span className="text-xs" style={{ color: "#9A9D94" }}>Changes are saved locally. Connect backend to persist.</span>
        <button onClick={handleSave} className="font-mono text-xs font-bold px-5 py-2.5 rounded-lg text-white transition-colors" style={{ background: saved ? "#244B35" : "#244B35" }}>
          {saved ? "\u2713 Saved" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════════════════ */
export default function StudentDashboard() {
  const [activeNav, setActiveNav] = useState("overview");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const titleMap: Record<string, string> = {
    overview: "Overview", profile: "My Profile", passport: "Skill Passport",
    gaps: "Skill Gap Analysis", simulator: "Skill Gap Simulator",
    projects: "Projects", opportunities: "Opportunities",
    applications: "Applications", recommendations: "Learning",
    portfolio: "Portfolio", settings: "Settings",
  };

  const renderSection = () => {
    switch (activeNav) {
      case "overview": return <OverviewSection />;
      case "profile": return <ProfileSection />;
      case "passport": return <SkillPassportSection />;
      case "gaps": return <SkillGapSection />;
      case "simulator": return <SimulatorSection />;
      case "projects": return <ProjectsSection />;
      case "opportunities": return <OpportunitiesSection />;
      case "applications": return <ApplicationsSection />;
      case "recommendations": return <RecommendationsSection />;
      case "portfolio": return <PortfolioSection />;
      case "settings": return <SettingsSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#F7F6F0" }}>
      <Sidebar open={undefined} setOpen={undefined}>
        <SidebarBody className="justify-between gap-10">
          <SidebarContent activeNav={activeNav} setActiveNav={setActiveNav} />
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-6 md:py-8">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-start justify-between">
            <div>
              <h1 className="font-semibold text-[22px] md:text-[26px] tracking-tight" style={{ color: "#171A18" }}>
                {activeNav === "overview" ? `${greeting}, ${student.name.split(" ")[0]}.` : titleMap[activeNav]}
              </h1>
              {activeNav === "overview" && <p className="text-sm mt-0.5" style={{ color: "#6B6F68" }}>Here is what your skill journey looks like today.</p>}
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 border rounded-xl px-3 py-2 bg-white" style={{ borderColor: "#E6E3D7" }}><Search size={14} style={{ color: "#9A9D94" }} /><input type="text" placeholder="Search skills, opportunities..." className="border-none outline-none bg-transparent text-[13px] w-48" style={{ color: "#171A18" }} /></div>
              <button className="relative w-9 h-9 rounded-xl border bg-white flex items-center justify-center hover:bg-[#EFEDE3] transition-colors" style={{ borderColor: "#E6E3D7" }}><Bell size={16} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#C98B5F" }} /></button>
            </div>
          </motion.div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div key={activeNav} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
