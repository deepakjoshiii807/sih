import { useState } from "react";
import { Sidebar, SidebarBody, Logo, LogoIcon, useSidebar } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, UserCog, BarChart3, TrendingUp, FileText, Users, Check,
  AlertTriangle, ChevronRight, Star, Settings, LogOut, Search, Bell,
  Target, Zap, BookOpen, Award, ClipboardCheck, Eye, ArrowRight,
  Briefcase, FlaskConical, Lightbulb, MapPin, Calendar, Clock,
  Save, Mail, Globe, Smartphone, Trash2, Lock,
} from "lucide-react";

import type {
  Academician, DepartmentSkill, DemandTrend, IndustryRole,
  CurriculumReport, VerificationRequest, AcademicanOpportunity,
  CurriculumLoopStep, DepartmentAnalytics,
} from "@/lib/faculty-api";
import { facultyApi } from "@/lib/faculty-api";

/* ─── Mock Data ─── */
const academician: Academician = { name: "Dr. Priya Mehta", initials: "PM", title: "Professor of Ayurveda & Research", department: "Department of Ayurveda", institution: "All India Institute of Ayurveda", email: "priya.mehta@aiia.ac.in", phone: "+91 98765 12345", bio: "Professor with 12 years of experience in clinical research, AYUSH studies, and curriculum development.", subjects: ["Clinical Research", "Pharmacology", "Research Methodology", "AYUSH Therapeutics"], researchInterests: ["Herbal Pharmacovigilance", "Clinical Trial Design", "AYUSH Healthcare Delivery"], experience: 12, studentsCount: 24, verifiedCount: 18 };

const departmentSkills: DepartmentSkill[] = [
  { name: "Clinical Research", taxonomyId: "TC-CR-03", industryDemand: "High", curriculumCoverage: 32, studentProficiency: 45, gapSeverity: "Critical", trend: "increasing", studentsWithGap: 18, totalStudents: 24 },
  { name: "Statistical Analysis", taxonomyId: "TC-SA-01", industryDemand: "High", curriculumCoverage: 18, studentProficiency: 35, gapSeverity: "Critical", trend: "increasing", studentsWithGap: 20, totalStudents: 24 },
  { name: "Pharmacovigilance", taxonomyId: "TC-PV-02", industryDemand: "Medium", curriculumCoverage: 41, studentProficiency: 52, gapSeverity: "Moderate", trend: "stable", studentsWithGap: 12, totalStudents: 24 },
  { name: "Data Management", taxonomyId: "TC-DM-01", industryDemand: "High", curriculumCoverage: 21, studentProficiency: 40, gapSeverity: "Critical", trend: "increasing", studentsWithGap: 17, totalStudents: 24 },
  { name: "Python", taxonomyId: "TC-PY-01", industryDemand: "High", curriculumCoverage: 55, studentProficiency: 68, gapSeverity: "Moderate", trend: "increasing", studentsWithGap: 10, totalStudents: 24 },
  { name: "Scientific Writing", taxonomyId: "TC-SW-02", industryDemand: "Medium", curriculumCoverage: 62, studentProficiency: 58, gapSeverity: "Acceptable", trend: "stable", studentsWithGap: 8, totalStudents: 24 },
  { name: "Research Methodology", taxonomyId: "TC-RM-04", industryDemand: "High", curriculumCoverage: 70, studentProficiency: 72, gapSeverity: "Acceptable", trend: "stable", studentsWithGap: 6, totalStudents: 24 },
  { name: "Machine Learning", taxonomyId: "TC-ML-01", industryDemand: "High", curriculumCoverage: 12, studentProficiency: 28, gapSeverity: "Critical", trend: "increasing", studentsWithGap: 19, totalStudents: 24 },
];

const demandTrends: DemandTrend[] = [
  { skill: "Clinical Research", direction: "up", demandLevel: "High", changePercent: 35, period: "Last 6 months" },
  { skill: "Data Analysis", direction: "up-strong", demandLevel: "High", changePercent: 52, period: "Last 6 months" },
  { skill: "Machine Learning", direction: "up-strong", demandLevel: "High", changePercent: 68, period: "Last 6 months" },
  { skill: "Statistical Analysis", direction: "up", demandLevel: "High", changePercent: 41, period: "Last 6 months" },
  { skill: "Pharmacology", direction: "stable", demandLevel: "Medium", changePercent: 5, period: "Last 6 months" },
  { skill: "Documentation", direction: "stable", demandLevel: "Low", changePercent: -2, period: "Last 6 months" },
  { skill: "Ayurvedic Therapeutics", direction: "up", demandLevel: "Medium", changePercent: 18, period: "Last 6 months" },
];

const industryRoles: IndustryRole[] = [
  { title: "Clinical Research Intern", demandLevel: "High", openings: 45, avgMatch: 72, topSkills: ["Clinical Research", "Python", "Data Analysis"] },
  { title: "Research Data Analyst", demandLevel: "High", openings: 32, avgMatch: 68, topSkills: ["Python", "Statistical Analysis", "Data Analysis"] },
  { title: "AYUSH Public Health Intern", demandLevel: "Medium", openings: 18, avgMatch: 75, topSkills: ["Research Methodology", "Clinical Research"] },
  { title: "Pharmacovigilance Associate", demandLevel: "Medium", openings: 12, avgMatch: 65, topSkills: ["Pharmacovigilance", "Scientific Writing", "Clinical Research"] },
];

const curriculumReport: CurriculumReport = { id: "rpt-1", department: "Department of Ayurveda", generatedDate: "Sept 2025", totalStudents: 24, avgReadiness: 68, readinessDistribution: { beginning: 6, developing: 12, jobReady: 6 }, topGaps: [{ skill: "Statistical Analysis", gapCount: 20, severity: "Critical" }, { skill: "Machine Learning", gapCount: 19, severity: "Critical" }, { skill: "Clinical Research", gapCount: 18, severity: "Critical" }, { skill: "Data Management", gapCount: 17, severity: "Critical" }], coverageGaps: [{ skill: "Machine Learning", coverage: 12, demand: "High" }, { skill: "Statistical Analysis", coverage: 18, demand: "High" }, { skill: "Data Management", coverage: 21, demand: "High" }, { skill: "Clinical Research", coverage: 32, demand: "High" }], recommendations: ["Introduce mandatory Statistical Analysis module in 2nd year", "Add Python for Healthcare elective in 3rd year", "Partner with industry for Clinical Research practical sessions", "Develop internal ML lab with real clinical datasets"] };

const verifications: VerificationRequest[] = [
  { id: "v-1", studentName: "Aarav Sharma", studentInitials: "AS", title: "CVD Risk Prediction Model", type: "Project", submittedDate: "Sept 3, 2025", status: "pending", skillsClaimed: ["Python", "Machine Learning", "Data Analysis"], description: "ML model predicting cardiovascular risk from Ayurvedic markers." },
  { id: "v-2", studentName: "Neha Gupta", studentInitials: "NG", title: "Clinical Posting Certificate", type: "Certificate", submittedDate: "Sept 2, 2025", status: "pending", skillsClaimed: ["Clinical Research", "Patient Assessment"], description: "Certificate for 4-week clinical posting at AIIA OPD." },
  { id: "v-3", studentName: "Rohan Patel", studentInitials: "RP", title: "Herbal Drug Efficacy Study", type: "Project", submittedDate: "Sept 1, 2025", status: "pending", skillsClaimed: ["Research Methodology", "Data Analysis", "Scientific Writing"], description: "Literature review on Ashwagandha formulations." },
  { id: "v-4", studentName: "Ananya Reddy", studentInitials: "AR", title: "NPTEL Statistics Certificate", type: "Certificate", submittedDate: "Aug 30, 2025", status: "flagged", skillsClaimed: ["Statistical Analysis"], description: "NPTEL course certificate - requires verification." },
  { id: "v-5", studentName: "Meera Joshi", studentInitials: "MJ", title: "AYUSH Research Internship", type: "Internship", submittedDate: "Aug 28, 2025", status: "approved", skillsClaimed: ["Research", "Clinical Research", "Data Analysis"], description: "3-month internship at NIA Jaipur." },
  { id: "v-6", studentName: "Vikram Singh", studentInitials: "VS", title: "Pharmacognosy Lab Report", type: "Project", submittedDate: "Aug 25, 2025", status: "pending", skillsClaimed: ["Pharmacognosy", "Documentation"], description: "Lab report on medicinal plant identification." },
];

const opportunities: AcademicanOpportunity[] = [
  { id: "ao-1", title: "FDP on AI in Healthcare", category: "FDP", organizer: "AICTE", location: "Online", duration: "2 weeks", deadline: "Oct 15, 2025", description: "Learn to integrate AI/ML into healthcare curriculum.", skillsRelevant: ["Machine Learning", "Data Analysis", "Python"], status: "open", interested: 8 },
  { id: "ao-2", title: "Industrial Training at CCRAS", category: "Industrial Training", organizer: "CCRAS", location: "New Delhi", duration: "1 month", deadline: "Sept 30, 2025", description: "Hands-on research training at CCRAS.", skillsRelevant: ["Research Methodology", "Clinical Research"], status: "open", interested: 5 },
  { id: "ao-3", title: "Curriculum Consultancy for BAMS", category: "Consultancy", organizer: "NCISM", location: "New Delhi", duration: "3 months", deadline: "Nov 1, 2025", description: "Faculty consultants for updating BAMS pharmacology curriculum.", skillsRelevant: ["Pharmacology", "Scientific Writing"], status: "open", interested: 3 },
  { id: "ao-4", title: "Joint Research: Herbal Drug Safety", category: "Research Collaboration", organizer: "AIIA + IIT Delhi", location: "New Delhi", duration: "6 months", deadline: "Oct 20, 2025", description: "Building a herb-drug interaction database.", skillsRelevant: ["Data Analysis", "Python", "Clinical Research"], status: "open", interested: 12 },
];

const curriculumLoop: CurriculumLoopStep[] = [
  { id: 1, label: "Industry Demand", description: "High demand for Statistical Analysis and ML", status: "completed", insight: "72% of roles require Statistical Analysis" },
  { id: 2, label: "Skill Gap Detection", description: "Statistical Analysis 18% coverage, ML 12%", status: "completed", insight: "20 of 24 students lack Statistical Analysis" },
  { id: 3, label: "Department Report", description: "Aggregated report generated", status: "completed", insight: "Report shared with HOD on Sept 1" },
  { id: 4, label: "Academic Intervention", description: "New modules proposed", status: "current", insight: "Curriculum committee review Sept 15" },
  { id: 5, label: "Student Development", description: "Students enroll in courses", status: "upcoming", insight: "Expected completion end of semester" },
  { id: 6, label: "Reassessment", description: "Skills reassessed", status: "upcoming", insight: "Scheduled for Jan 2026" },
];

const analytics: DepartmentAnalytics = { totalStudents: 24, avgSkills: 7.2, avgMatch: 83, avgReadiness: 68, readinessDistribution: { beginning: 6, developing: 12, jobReady: 6 }, skillDistribution: [{ name: "Python", count: 18, pct: 75 }, { name: "Research", count: 16, pct: 67 }, { name: "Data Analysis", count: 14, pct: 58 }, { name: "ML", count: 10, pct: 42 }, { name: "Clinical Research", count: 8, pct: 33 }, { name: "Statistical Analysis", count: 6, pct: 25 }], monthlyTrend: [{ month: "May", verified: 12, placements: 2 }, { month: "Jun", verified: 15, placements: 3 }, { month: "Jul", verified: 18, placements: 4 }, { month: "Aug", verified: 22, placements: 5 }, { month: "Sep", verified: 25, placements: 3 }], departmentComparison: [{ dept: "Ayurveda", avgMatch: 83, avgReadiness: 68 }, { dept: "Surgery", avgMatch: 78, avgReadiness: 62 }, { dept: "Pharmacology", avgMatch: 88, avgReadiness: 75 }, { dept: "Kayachikitsa", avgMatch: 76, avgReadiness: 64 }] };

const navLinks = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "skill-intel", label: "Skill Intelligence", icon: <Target size={18} /> },
  { id: "demand", label: "Industry Demand", icon: <TrendingUp size={18} /> },
  { id: "curriculum", label: "Curriculum Feedback", icon: <FileText size={18} /> },
  { id: "verification", label: "Student Verification", icon: <ClipboardCheck size={18} />, count: 4 },
  { id: "opportunities", label: "Opportunities", icon: <Briefcase size={18} /> },
  { id: "curriculum-loop", label: "Curriculum Loop", icon: <FlaskConical size={18} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { id: "profile", label: "My Profile", icon: <UserCog size={18} /> },
];

/* ─── Helpers ─── */
function PxBar({ pct, segments = 18, color = "#244B35" }: { pct: number; segments?: number; color?: string }) {
  const filled = Math.round((pct / 100) * segments);
  return <div className="flex gap-[3px] flex-wrap">{Array.from({ length: segments }, (_, i) => <span key={i} className={`w-[7px] h-[13px] ${i < filled ? "" : "bg-[#EDEBE0]"}`} style={i < filled ? { background: color } : undefined} />)}</div>;
}
const tagCls: Record<string, string> = {
  "High": "bg-[#E8C7AE] text-[#7a3f1a]", "Medium": "bg-[#E8D36B] text-[#5c4a08]", "Low": "bg-[#DCE6D0] text-[#16301F]",
  "Critical": "bg-[#E8C7AE] text-[#7a3f1a]", "Moderate": "bg-[#E8D36B] text-[#5c4a08]", "Acceptable": "bg-[#DCE6D0] text-[#16301F]",
  "pending": "bg-[#EDEBE0] text-[#6B6F68]", "approved": "bg-[#DCE6D0] text-[#16301F]", "flagged": "bg-[#E8C7AE] text-[#7a3f1a]",
  "changes-requested": "bg-[#E8D36B] text-[#5c4a08]",
  "FDP": "bg-[#C8B5DE] text-[#4d3a74]", "Industrial Training": "bg-[#DCE6D0] text-[#16301F]",
  "Consultancy": "bg-[#E8D36B] text-[#5c4a08]", "Research Collaboration": "bg-[#EAE3F4] text-[#4d3a74]",
  "open": "bg-[#DCE6D0] text-[#16301F]", "closing": "bg-[#E8D36B] text-[#5c4a08]", "closed": "bg-[#E8C7AE] text-[#7a3f1a]",
  "completed": "bg-[#DCE6D0] text-[#16301F]", "current": "bg-[#E8D36B] text-[#5c4a08]", "upcoming": "bg-[#EDEBE0] text-[#6B6F68]",
};
function Tag({ cls, children }: { cls: string; children: React.ReactNode }) { return <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest uppercase px-2 py-[3px] rounded-md whitespace-nowrap ${tagCls[cls] || cls}`}>{children}</span>; }
function Eyebrow({ color, children }: { color?: string; children: React.ReactNode }) { return <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase inline-flex items-center gap-2" style={{ color: color || "#9A9D94" }}><span className="w-[7px] h-[7px] bg-[#171A18] opacity-85" style={{ boxShadow: "0 7px 0 -2px #F7F6F0" }} />{children}</span>; }

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
              {open && link.count !== undefined && <span className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded-md ${activeNav === link.id ? "bg-white/20 text-white" : "bg-[#E8C7AE] text-[#7a3f1a]"}`}>{link.count}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t pt-3 mt-2" style={{ borderColor: open ? "#E6E3D7" : "transparent" }}>
        <button onClick={() => setActiveNav("settings")} className={`flex items-center gap-3 w-full rounded-xl text-[#6B6F68] text-xs font-medium hover:bg-[#EDEBE0] hover:text-[#171A18] transition-colors ${open ? "px-3 py-2" : "px-0 py-2 justify-center"}`}><Settings size={16} /> {open && "Settings"}</button>
        <button className={`flex items-center gap-3 w-full rounded-xl text-[#6B6F68] text-xs font-medium hover:bg-[#EDEBE0] hover:text-[#171A18] transition-colors ${open ? "px-3 py-2" : "px-0 py-2 justify-center"}`}><LogOut size={16} /> {open && "Log out"}</button>
        {open && <div className="mt-3 p-3 rounded-xl border" style={{ background: "#F7F6F0", borderColor: "#E6E3D7" }}><div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" style={{ background: "#8A6FB8", color: "#F0EAF8" }}>{academician.initials}</div><div className="min-w-0"><div className="font-semibold text-sm truncate" style={{ color: "#171A18" }}>{academician.name}</div><div className="text-[11px] font-mono" style={{ color: "#6B6F68" }}>{academician.department}</div></div></div></div>}
        {!open && <div className="flex justify-center mt-3"><div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: "#8A6FB8", color: "#F0EAF8" }}>{academician.initials}</div></div>}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   OVERVIEW
   ═══════════════════════════════════════════════════════ */
function OverviewSection() {
  const criticalGaps = departmentSkills.filter(s => s.gapSeverity === "Critical").length;
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] p-7 md:p-9 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #4A2D7A 0%, #6B3FA0 50%, #8A6FB8 100%)", boxShadow: "0 8px 32px rgba(138,111,184,.18), inset 0 1px 0 rgba(255,255,255,.1)" }}>
        <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none"><div className="grid grid-cols-6 gap-[6px]">{Array.from({length:36},(_,i)=><div key={i} className="w-[5px] h-[5px] bg-white rounded-[1px]" />)}</div></div>
        <div className="absolute bottom-4 left-4 opacity-[0.04] pointer-events-none"><div className="grid grid-cols-4 gap-[5px]">{Array.from({length:16},(_,i)=><div key={i} className="w-[4px] h-[4px] bg-[#E8D36B] rounded-[1px]" />)}</div></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: "rgba(255,255,255,.5)" }}><span className="inline-block w-[7px] h-[7px] bg-white mr-2 opacity-85" style={{ boxShadow: "0 7px 0 -2px #4A2D7A" }} />Academician Dashboard</span>
            <div className="font-semibold text-[26px] md:text-[30px] tracking-tight mt-3 mb-1" style={{ color: "#fff" }}>Bridge the gap between industry needs and student skills.</div>
            <p className="text-[14px] mb-6" style={{ color: "rgba(255,255,255,.7)" }}>{departmentSkills.length} skills tracked across {academician.studentsCount} students. {criticalGaps} critical curriculum gaps identified.</p>
            <div className="flex items-center gap-6 flex-wrap">
              {[{ label: "Students", value: academician.studentsCount, color: "#F0EAF8" }, { label: "Verified", value: academician.verifiedCount, color: "#DCE6D0" }, { label: "Avg Match", value: `${analytics.avgMatch}%`, color: "#E8D36B" }].map((s) => (
                <div key={s.label}><div className="font-bold text-3xl leading-none" style={{ color: s.color }}>{s.value}</div><div className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,.5)" }}>{s.label}</div></div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex flex-col flex-shrink-0 w-[180px]">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,.5)" }}>Quick Insights</div>
            {[{ label: "Critical Gaps", val: criticalGaps }, { label: "Readiness", val: `${analytics.avgReadiness}%` }, { label: "Department", val: "Ayurveda" }].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5"><span className="text-[12px]" style={{ color: "rgba(255,255,255,.6)" }}>{item.label}</span><span className="font-semibold text-[12px]" style={{ color: "#fff" }}>{item.val}</span></div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: "Students", value: academician.studentsCount, color: "#4A2D7A", bg: "#EAE3F4", accent: "#8A6FB8" }, { label: "Verified", value: academician.verifiedCount, color: "#244B35", bg: "#DCE6D0", accent: "#244B35" }, { label: "Pending Reviews", value: verifications.filter(v => v.status === "pending").length, color: "#7a3f1a", bg: "#F0E8DD", accent: "#C98B5F" }, { label: "Avg Match", value: `${analytics.avgMatch}%`, color: "#171A18", bg: "#EDEBE0", accent: "#C98B5F" }].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="rounded-[14px] p-5 text-center border-l-[3px] hover:shadow-md transition-shadow" style={{ background: s.bg, borderLeftColor: s.accent }}>
            <div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "#6B6F68" }}>{s.label}</div>
            <div className="font-bold text-3xl tracking-tight" style={{ color: s.color }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Top critical skill gaps */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #E8C7AE, #F0E8DD)" }} />
        <Eyebrow color="#C98B5F">Critical Alert</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-1">Top Curriculum Gaps</div>
        <p className="text-xs mb-4" style={{ color: "#6B6F68" }}>Skills with high industry demand but low curriculum coverage.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {departmentSkills.filter(s => s.gapSeverity === "Critical").slice(0, 4).map((sk) => (
            <div key={sk.taxonomyId} className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-shadow" style={{ borderColor: "#E6DDD5", background: "linear-gradient(135deg, #FDFCFA, #FDF8F3)" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1"><span className="font-semibold text-sm" style={{ color: "#171A18" }}>{sk.name}</span><Tag cls="Critical">{sk.gapSeverity}</Tag></div>
                <div className="flex items-center gap-2"><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Coverage {sk.curriculumCoverage}%</span><span className="font-mono text-[10px]" style={{ color: "#C98B5F" }}>Demand {sk.industryDemand}</span></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Readiness Distribution */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Readiness</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Student Readiness Distribution</div>
        <div className="flex items-end gap-4 h-[120px]">
          {[
            { label: "Beginning", count: analytics.readinessDistribution.beginning, color: "#E8C7AE" },
            { label: "Developing", count: analytics.readinessDistribution.developing, color: "#E8D36B" },
            { label: "Job-Ready", count: analytics.readinessDistribution.jobReady, color: "#244B35" },
          ].map((r) => {
            const max = Math.max(...Object.values(analytics.readinessDistribution));
            const h = (r.count / max) * 100;
            return <div key={r.label} className="flex-1 flex flex-col items-center gap-1"><div className="w-full rounded-t-lg" style={{ height: `${h}%`, background: r.color }} /><div className="font-mono text-[10px] font-bold" style={{ color: "#6B6F68" }}>{r.label}</div><div className="font-bold text-lg" style={{ color: "#171A18" }}>{r.count}</div></div>;
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DEPARTMENT SKILL INTELLIGENCE
   ═══════════════════════════════════════════════════════ */
function SkillIntelSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Department Skill Intelligence</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1">Skill Gap Analysis</div>
        <p className="text-xs mb-5" style={{ color: "#6B6F68" }}>Industry demand vs curriculum coverage across your department.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b" style={{ borderColor: "#E6E3D7" }}>
              <th className="font-mono text-[10px] font-bold tracking-widest uppercase py-3 pr-4" style={{ color: "#9A9D94" }}>Skill</th>
              <th className="font-mono text-[10px] font-bold tracking-widest uppercase py-3 px-4" style={{ color: "#9A9D94" }}>Demand</th>
              <th className="font-mono text-[10px] font-bold tracking-widest uppercase py-3 px-4" style={{ color: "#9A9D94" }}>Coverage</th>
              <th className="font-mono text-[10px] font-bold tracking-widest uppercase py-3 px-4" style={{ color: "#9A9D94" }}>Proficiency</th>
              <th className="font-mono text-[10px] font-bold tracking-widest uppercase py-3 px-4" style={{ color: "#9A9D94" }}>Gap</th>
              <th className="font-mono text-[10px] font-bold tracking-widest uppercase py-3 pl-4" style={{ color: "#9A9D94" }}>Students</th>
            </tr></thead>
            <tbody>
              {departmentSkills.map((sk) => (
                <tr key={sk.taxonomyId} className="border-b hover:bg-[#FAFAF7] transition-colors" style={{ borderColor: "#EDEBE0" }}>
                  <td className="py-3 pr-4"><div className="font-semibold text-sm" style={{ color: "#171A18" }}>{sk.name}</div><div className="font-mono text-[10px]" style={{ color: "#9A9D94" }}>{sk.taxonomyId}</div></td>
                  <td className="py-3 px-4"><Tag cls={sk.industryDemand}>{sk.industryDemand}</Tag></td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><PxBar pct={sk.curriculumCoverage} segments={12} color={sk.curriculumCoverage < 30 ? "#C98B5F" : "#244B35"} /><span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{sk.curriculumCoverage}%</span></div></td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><PxBar pct={sk.studentProficiency} segments={12} color={sk.studentProficiency < 40 ? "#E8C7AE" : "#244B35"} /><span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{sk.studentProficiency}%</span></div></td>
                  <td className="py-3 px-4"><Tag cls={sk.gapSeverity}>{sk.gapSeverity}</Tag></td>
                  <td className="py-3 pl-4"><span className="font-mono text-xs font-bold" style={{ color: "#C98B5F" }}>{sk.studentsWithGap}/{sk.totalStudents}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Warnings</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Insights</div>
        <div className="flex flex-col gap-3">
          {departmentSkills.filter(s => s.gapSeverity === "Critical").map((sk) => (
            <div key={sk.taxonomyId} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#FDF8F3" }}>
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#C98B5F" }} />
              <div><span className="font-semibold text-sm" style={{ color: "#171A18" }}>{sk.name}</span> <span className="text-sm" style={{ color: "#6B6F68" }}>is highly demanded ({sk.industryDemand}) but has only {sk.curriculumCoverage}% curriculum coverage. {sk.studentsWithGap} of {sk.totalStudents} students have a gap.</span></div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INDUSTRY DEMAND TRENDS
   ═══════════════════════════════════════════════════════ */
function DemandSection() {
  const dirIcon: Record<string, string> = { "up": "\u2197", "up-strong": "\u2197\u2197", "stable": "\u2192", "down": "\u2198" };
  const dirColor: Record<string, string> = { "up": "#244B35", "up-strong": "#244B35", "stable": "#6B6F68", "down": "#C98B5F" };
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Industry Demand</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1">Skill Demand Trends</div>
        <p className="text-xs mb-5" style={{ color: "#6B6F68" }}>What industry is requesting over the last 6 months.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {demandTrends.map((dt) => (
            <div key={dt.skill} className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-sm transition-shadow" style={{ borderColor: "#E6E3D7", background: "#FAFAF7" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg" style={{ background: dirColor[dt.direction] + "15", color: dirColor[dt.direction] }}>{dirIcon[dt.direction]}</div>
              <div className="flex-1 min-w-0"><div className="font-semibold text-sm" style={{ color: "#171A18" }}>{dt.skill}</div><div className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>{dt.period}</div></div>
              <div className="text-right"><div className="font-bold text-sm" style={{ color: dt.changePercent > 0 ? "#244B35" : "#C98B5F" }}>{dt.changePercent > 0 ? "+" : ""}{dt.changePercent}%</div><Tag cls={dt.demandLevel}>{dt.demandLevel}</Tag></div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Roles in Demand</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Industry Roles</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industryRoles.map((role) => (
            <div key={role.title} className="rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ borderColor: "#E6E3D7", background: "linear-gradient(180deg, #FDFCFA 0%, #F8F5FC 100%)" }}>
              <div className="flex items-center justify-between mb-2"><div className="font-semibold text-sm" style={{ color: "#171A18" }}>{role.title}</div><Tag cls={role.demandLevel}>{role.demandLevel}</Tag></div>
              <div className="flex items-center gap-4 font-mono text-[11px] mb-2" style={{ color: "#6B6F68" }}><span>{role.openings} openings</span><span>Avg match {role.avgMatch}%</span></div>
              <div className="flex flex-wrap gap-1">{role.topSkills.map(s => <Tag key={s} cls="Acceptable">{s}</Tag>)}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CURRICULUM FEEDBACK
   ═══════════════════════════════════════════════════════ */
function CurriculumSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Curriculum Feedback</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1">Department Report</div>
        <p className="text-xs mb-5" style={{ color: "#6B6F68" }}>Aggregated, anonymized data for {curriculumReport.department} / {curriculumReport.generatedDate}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Students", value: curriculumReport.totalStudents, color: "#4A2D7A", bg: "#EAE3F4" },
            { label: "Avg Readiness", value: `${curriculumReport.avgReadiness}%`, color: "#244B35", bg: "#DCE6D0" },
            { label: "Beginning", value: curriculumReport.readinessDistribution.beginning, color: "#C98B5F", bg: "#F0E8DD" },
            { label: "Job-Ready", value: curriculumReport.readinessDistribution.jobReady, color: "#244B35", bg: "#DCE6D0" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: s.bg }}>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#6B6F68" }}>{s.label}</div>
              <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Top Skill Gaps</div>
            <div className="flex flex-col gap-2">
              {curriculumReport.topGaps.map((g) => (
                <div key={g.skill} className="flex items-center justify-between p-3 rounded-xl border" style={{ borderColor: "#E6E3D7", background: "#FAFAF7" }}>
                  <span className="font-semibold text-sm" style={{ color: "#171A18" }}>{g.skill}</span>
                  <div className="flex items-center gap-2"><span className="font-mono text-xs font-bold" style={{ color: "#C98B5F" }}>{g.gapCount} students</span><Tag cls={g.severity}>{g.severity}</Tag></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Coverage Gaps</div>
            <div className="flex flex-col gap-2">
              {curriculumReport.coverageGaps.map((g) => (
                <div key={g.skill} className="p-3 rounded-xl border" style={{ borderColor: "#E6E3D7", background: "#FAFAF7" }}>
                  <div className="flex items-center justify-between mb-1"><span className="font-semibold text-sm" style={{ color: "#171A18" }}>{g.skill}</span><Tag cls={g.demand}>{g.demand} demand</Tag></div>
                  <div className="flex items-center gap-2"><div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full" style={{ width: `${g.coverage}%`, background: g.coverage < 30 ? "#C98B5F" : "#244B35" }} /></div><span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{g.coverage}%</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Recommendations</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Suggested Interventions</div>
        <div className="flex flex-col gap-2">
          {curriculumReport.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#F8F5FC" }}>
              <Lightbulb size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#8A6FB8" }} />
              <span className="text-sm" style={{ color: "#171A18" }}>{rec}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STUDENT VERIFICATION
   ═══════════════════════════════════════════════════════ */
function VerificationSection() {
  const pending = verifications.filter(v => v.status === "pending");
  const flagged = verifications.filter(v => v.status === "flagged");
  const approved = verifications.filter(v => v.status === "approved");

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pending", value: pending.length, color: "#6B6F68", bg: "#EDEBE0" },
          { label: "Flagged", value: flagged.length, color: "#7a3f1a", bg: "#F0E8DD" },
          { label: "Approved", value: approved.length, color: "#244B35", bg: "#DCE6D0" },
        ].map((s) => (
          <div key={s.label} className="rounded-[14px] p-4 text-center border-l-[3px] hover:shadow-md transition-shadow" style={{ background: s.bg, borderLeftColor: s.color }}>
            <div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1" style={{ color: "#6B6F68" }}>{s.label}</div>
            <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Student Verification</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-5">Verification Queue</div>

        <div className="flex flex-col gap-4">
          {verifications.map((v) => (
            <div key={v.id} className="rounded-xl border p-5 hover:shadow-md transition-shadow" style={{ borderColor: v.status === "flagged" ? "#E8C7AE" : v.status === "approved" ? "#DCE6D0" : "#E6E3D7", background: v.status === "flagged" ? "linear-gradient(180deg, #FDFCFA 0%, #FDF8F3 100%)" : "linear-gradient(180deg, #FDFCFA 0%, #FAFCF7 100%)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: v.status === "approved" ? "#DCE6D0" : v.status === "flagged" ? "#F0E8DD" : "#EDEBE0", color: v.status === "approved" ? "#244B35" : v.status === "flagged" ? "#7a3f1a" : "#171A18" }}>{v.studentInitials}</div>
                  <div><div className="font-bold text-[15px]" style={{ color: "#171A18" }}>{v.studentName}</div><div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{v.title}</div></div>
                </div>
                <Tag cls={v.status}>{v.status.replace("-", " ")}</Tag>
              </div>
              <p className="text-xs mb-3" style={{ color: "#6B6F68" }}>{v.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">{v.skillsClaimed.map(s => <Tag key={s} cls="Acceptable">{s}</Tag>)}</div>
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#EDEBE0" }}>
                <div className="flex items-center gap-2"><Tag cls={v.type === "Project" ? "Research Collaboration" : v.type === "Certificate" ? "FDP" : "Industrial Training"}>{v.type}</Tag><span className="font-mono text-[11px]" style={{ color: "#9A9D94" }}>{v.submittedDate}</span></div>
                {v.status === "pending" && <div className="flex gap-2">
                  <button onClick={() => facultyApi.verifyStudent(v.id, "approved")} className="font-semibold text-[11px] px-3 py-1.5 rounded-lg transition-all hover:shadow-sm" style={{ background: "#DCE6D0", color: "#16301F" }}>Verify</button>
                  <button onClick={() => facultyApi.verifyStudent(v.id, "changes-requested")} className="font-semibold text-[11px] px-3 py-1.5 rounded-lg border transition-all hover:bg-[#FAFAF7]" style={{ borderColor: "#E6E3D7" }}>Request Changes</button>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   OPPORTUNITIES (FDP, Training, Consultancy, Research)
   ═══════════════════════════════════════════════════════ */
function OpportunitiesSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Opportunities</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-5">Faculty & Collaboration Opportunities</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="rounded-xl border p-5 hover:shadow-md transition-shadow" style={{ borderColor: "#E6E3D7", background: "linear-gradient(180deg, #FDFCFA 0%, #F8F5FC 100%)" }}>
              <div className="flex items-center justify-between mb-2"><Tag cls={opp.category}>{opp.category}</Tag><Tag cls={opp.status}>{opp.status}</Tag></div>
              <div className="font-semibold text-[16px] mb-1" style={{ color: "#171A18" }}>{opp.title}</div>
              <div className="text-sm mb-2" style={{ color: "#6B6F68" }}>{opp.organizer}</div>
              <p className="text-xs mb-3" style={{ color: "#6B6F68" }}>{opp.description}</p>
              <div className="flex flex-wrap gap-3 font-mono text-[11px] mb-3" style={{ color: "#6B6F68" }}>
                <span className="inline-flex items-center gap-1"><MapPin size={11} /> {opp.location}</span>
                <span className="inline-flex items-center gap-1"><Clock size={11} /> {opp.duration}</span>
                <span className="inline-flex items-center gap-1"><Users size={11} /> {opp.interested} interested</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">{opp.skillsRelevant.map(s => <Tag key={s} cls="Acceptable">{s}</Tag>)}</div>
              <div className="font-mono text-[10px]" style={{ color: "#9A9D94" }}>Deadline: {opp.deadline}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CURRICULUM LOOP (Visual)
   ═══════════════════════════════════════════════════════ */
function CurriculumLoopSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #E8D36B, #8A6FB8)" }} />
        <Eyebrow color="#244B35">Curriculum Feedback Loop</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1">Closed-Loop Curriculum Improvement</div>
        <p className="text-xs mb-8" style={{ color: "#6B6F68" }}>Industry Demand &rarr; Skill Gap &rarr; Department Report &rarr; Academic Intervention &rarr; Student Development &rarr; Reassessment</p>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[2px]" style={{ background: "linear-gradient(180deg, #244B35, #E8D36B, #8A6FB8, #C98B5F)" }} />

          <div className="flex flex-col gap-6">
            {curriculumLoop.map((step, i) => {
              const colors: Record<string, { bg: string; border: string; text: string }> = {
                completed: { bg: "#DCE6D0", border: "#244B35", text: "#16301F" },
                current: { bg: "#E8D36B", border: "#B99A22", text: "#5c4a08" },
                upcoming: { bg: "#EDEBE0", border: "#E6E3D7", text: "#6B6F68" },
              };
              const c = colors[step.status];
              return (
                <div key={step.id} className="flex items-start gap-4 relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 z-10" style={{ background: c.bg, border: `2px solid ${c.border}`, color: c.text, boxShadow: step.status === "current" ? `0 0 0 4px ${c.bg}40` : undefined }}>
                    {step.status === "completed" ? "\u2713" : step.id}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[15px]" style={{ color: "#171A18" }}>{step.label}</span>
                      <Tag cls={step.status}>{step.status}</Tag>
                    </div>
                    <p className="text-sm mb-1" style={{ color: "#6B6F68" }}>{step.description}</p>
                    {step.insight && <div className="font-mono text-[11px] px-2 py-1 rounded-md inline-block" style={{ background: step.status === "current" ? "#F5EDC0" : step.status === "completed" ? "#E8F0E2" : "#F0EDE5", color: c.text }}>{step.insight}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ANALYTICS
   ═══════════════════════════════════════════════════════ */
function AnalyticsSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Students", value: analytics.totalStudents, color: "#4A2D7A", bg: "#EAE3F4" },
          { label: "Avg Skills", value: analytics.avgSkills, color: "#244B35", bg: "#DCE6D0" },
          { label: "Avg Match", value: `${analytics.avgMatch}%`, color: "#171A18", bg: "#EDEBE0" },
          { label: "Avg Readiness", value: `${analytics.avgReadiness}%`, color: "#C98B5F", bg: "#F0E8DD" },
        ].map((s) => (
          <div key={s.label} className="rounded-[14px] p-5 text-center border-l-[3px] hover:shadow-md transition-shadow" style={{ background: s.bg, borderLeftColor: s.color }}>
            <div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "#6B6F68" }}>{s.label}</div>
            <div className="font-bold text-3xl tracking-tight" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
          <Eyebrow color="#8A6FB8">Skill Distribution</Eyebrow>
          <div className="font-semibold text-[16px] tracking-tight mt-2 mb-4">Student Skill Coverage</div>
          <div className="flex flex-col gap-3">
            {analytics.skillDistribution.map((sk) => (
              <div key={sk.name}><div className="flex items-center justify-between mb-1"><span className="text-sm font-medium" style={{ color: "#171A18" }}>{sk.name}</span><span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{sk.count}/{analytics.totalStudents}</span></div>
              <PxBar pct={sk.pct} color="#8A6FB8" /></div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
          <Eyebrow color="#244B35">Department Comparison</Eyebrow>
          <div className="font-semibold text-[16px] tracking-tight mt-2 mb-4">Cross-Department</div>
          <div className="flex flex-col gap-3">
            {analytics.departmentComparison.map((d) => (
              <div key={d.dept} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#FAFCF7" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: "#DCE6D0", color: "#244B35" }}>{d.dept[0]}</div>
                <div className="flex-1"><div className="font-semibold text-sm" style={{ color: "#171A18" }}>{d.dept}</div></div>
                <div className="text-right"><div className="font-bold text-sm" style={{ color: "#244B35" }}>{d.avgMatch}%</div><div className="font-mono text-[9px]" style={{ color: "#9A9D94" }}>match</div></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Monthly Trend</Eyebrow>
        <div className="font-semibold text-[16px] tracking-tight mt-2 mb-4">Verified Skills & Placements</div>
        <div className="flex items-end gap-4 h-[140px]">
          {analytics.monthlyTrend.map((m) => {
            const max = Math.max(...analytics.monthlyTrend.map(x => x.verified));
            return <div key={m.month} className="flex-1 flex flex-col items-center gap-1"><div className="w-full flex gap-1 items-end justify-center"><div className="w-[40%] rounded-t-lg" style={{ height: `${(m.verified / max) * 100}%`, background: "#8A6FB8" }} /><div className="w-[40%] rounded-t-lg" style={{ height: `${(m.placements / max) * 100}%`, background: "#244B35" }} /></div><div className="font-mono text-[10px] font-bold" style={{ color: "#9A9D94" }}>{m.month}</div></div>;
          })}
        </div>
        <div className="flex items-center gap-4 mt-2"><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#8A6FB8" }} /><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Verified</span></div><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#244B35" }} /><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Placements</span></div></div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROFILE
   ═══════════════════════════════════════════════════════ */
function ProfileSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0" style={{ background: "linear-gradient(135deg, #8A6FB8, #6B3FA0)", color: "#F0EAF8", boxShadow: "0 4px 12px rgba(138,111,184,.15)" }}>{academician.initials}</div>
          <div className="flex-1">
            <div className="font-semibold text-[22px] tracking-tight" style={{ color: "#171A18" }}>{academician.name}</div>
            <div className="text-sm mb-1" style={{ color: "#6B6F68" }}>{academician.title}</div>
            <div className="text-xs mb-3" style={{ color: "#6B6F68" }}>{academician.department} / {academician.institution}</div>
            <div className="flex flex-wrap gap-2 mb-3">{academician.subjects.map(s => <Tag key={s} cls="Acceptable">{s}</Tag>)}</div>
            <p className="text-sm" style={{ color: "#6B6F68" }}>{academician.bio}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-[18px] border p-5 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
          <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Contact</div>
          {[{ icon: <Mail size={14} />, label: academician.email }, { icon: <Smartphone size={14} />, label: academician.phone }, { icon: <Globe size={14} />, label: academician.institution }].map((f, i) => (
            <div key={i} className="flex items-center gap-2 py-2 text-sm" style={{ color: "#6B6F68" }}>{f.icon}{f.label}</div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-[18px] border p-5 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
          <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Research Interests</div>
          <div className="flex flex-wrap gap-1.5">{academician.researchInterests.map(r => <Tag key={r} cls="Research Collaboration">{r}</Tag>)}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-[18px] border p-5 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
          <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Quick Stats</div>
          {[
            { label: "Experience", value: `${academician.experience} years` },
            { label: "Students", value: academician.studentsCount },
            { label: "Verified", value: academician.verifiedCount },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-2"><span className="text-xs" style={{ color: "#6B6F68" }}>{s.label}</span><span className="font-bold text-sm" style={{ color: "#244B35" }}>{s.value}</span></div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SETTINGS
   ═══════════════════════════════════════════════════════ */
function SettingsSection() {
  const [name, setName] = useState(academician.name);
  const [email, setEmail] = useState(academician.email);
  const [phone, setPhone] = useState(academician.phone);
  const [bio, setBio] = useState(academician.bio);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifApp, setNotifApp] = useState(true);
  const [notifGap, setNotifGap] = useState(true);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const inputCls = "w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors";
  const inputStyle = { borderColor: "#E6E3D7", background: "#FAFAF7", color: "#171A18" };

  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Settings</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-5">Account Settings</div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Profile Information</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Full Name</label><input className={inputCls} style={inputStyle} value={name} onChange={e => setName(e.target.value)} /></div>
              <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Email</label><input className={inputCls} style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Phone</label><input className={inputCls} style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} /></div>
              <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Department</label><input className={inputCls} style={inputStyle} value={academician.department} readOnly /></div>
            </div>
            <div className="mb-4"><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Bio</label><textarea className={inputCls} style={{ ...inputStyle, minHeight: 80 }} value={bio} onChange={e => setBio(e.target.value)} /></div>
          </div>
          <div className="md:col-span-4">
            <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Notifications</div>
            <div className="flex flex-col gap-3">
              {[{ label: "Email notifications", checked: notifEmail, onChange: setNotifEmail }, { label: "Push notifications", checked: notifApp, onChange: setNotifApp }, { label: "Skill gap alerts", checked: notifGap, onChange: setNotifGap }].map(n => (
                <label key={n.label} className="flex items-center justify-between cursor-pointer p-3 rounded-lg" style={{ background: "#FAFAF7", border: "1px solid #E6E3D7" }}>
                  <span className="text-xs font-medium" style={{ color: "#171A18" }}>{n.label}</span>
                  <div className="w-9 h-5 rounded-full transition-colors relative cursor-pointer" style={{ background: n.checked ? "#244B35" : "#E6E3D7" }} onClick={() => n.onChange(!n.checked)}>
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform" style={{ left: n.checked ? "18px" : "2px" }} />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex items-center justify-end gap-3">
        <span className="text-xs" style={{ color: "#9A9D94" }}>Connect backend to persist settings.</span>
        <button onClick={handleSave} className="font-mono text-xs font-bold px-5 py-2.5 rounded-lg text-white transition-all hover:shadow-md" style={{ background: saved ? "#244B35" : "linear-gradient(135deg, #244B35, #1C3D2B)" }}>{saved ? "\u2713 Saved" : "Save changes"}</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════════════════ */
export default function FacultyDashboard() {
  const [activeNav, setActiveNav] = useState("overview");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const titleMap: Record<string, string> = {
    overview: "Overview", "skill-intel": "Department Skill Intelligence", demand: "Industry Demand Trends",
    curriculum: "Curriculum Feedback", verification: "Student Verification", opportunities: "Opportunities",
    "curriculum-loop": "Curriculum Loop", analytics: "Analytics", profile: "My Profile", settings: "Settings",
  };

  const renderSection = () => {
    switch (activeNav) {
      case "overview": return <OverviewSection />;
      case "skill-intel": return <SkillIntelSection />;
      case "demand": return <DemandSection />;
      case "curriculum": return <CurriculumSection />;
      case "verification": return <VerificationSection />;
      case "opportunities": return <OpportunitiesSection />;
      case "curriculum-loop": return <CurriculumLoopSection />;
      case "analytics": return <AnalyticsSection />;
      case "profile": return <ProfileSection />;
      case "settings": return <SettingsSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F7F6F0" }}>
      <Sidebar open={undefined} setOpen={undefined}>
        <SidebarBody className="justify-between gap-10">
          <SidebarContent activeNav={activeNav} setActiveNav={setActiveNav} />
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-6 md:py-8">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h1 className="font-semibold text-[22px] md:text-[26px] tracking-tight" style={{ color: "#171A18" }}>
              {activeNav === "overview" ? `${greeting}, ${academician.name.split(" ")[1]}.` : titleMap[activeNav]}
            </h1>
            {activeNav === "overview" && <p className="text-sm mt-0.5" style={{ color: "#6B6F68" }}>Bridge the gap between industry needs and student skills.</p>}
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
