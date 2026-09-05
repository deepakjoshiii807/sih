import { useState } from "react";
import { Sidebar, SidebarBody, Logo, LogoIcon, useSidebar } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, GraduationCap, BarChart3, Building2, AlertTriangle,
  FileText, TrendingUp, Users, Settings, LogOut, Search, Bell,
  ChevronRight, Check, Save, Mail, Globe, Smartphone, Target, Zap,
  MapPin, Calendar, Clock, Award, Briefcase, Eye, Shield, BookOpen,
} from "lucide-react";

import type {
  Institution, PlacementRecord, DepartmentPlacement, PlacementTrend,
  SkillMetric, ReadinessDistribution, DepartmentComparison,
  AnomalyFlag, InstitutionalReport, InstitutionAnalytics,
} from "@/lib/institution-api";
import { institutionApi } from "@/lib/institution-api";

/* ─── Mock Data ─── */
const institution: Institution = { name: "All India Institute of Ayurveda", initials: "AIIA", location: "New Delhi, India", type: "Government Institute", establishedYear: 2015, departments: ["Ayurveda", "Surgery", "Pharmacology", "Kayachikitsa", "Shalya Tantra", "Shaalakya Tantra"], totalStudents: 320, totalFaculty: 48, website: "https://aiia.gov.in", email: "admin@aiia.gov.in", phone: "+91 11 2659 3642", verified: true };

const placements: PlacementRecord[] = [
  { id: "pl-1", studentName: "Aarav Sharma", studentInitials: "AS", department: "Ayurveda", course: "BAMS", company: "AIIA Research Division", role: "Clinical Research Intern", type: "Internship", startDate: "Sept 2025", duration: "3 Months", stipend: "₹12,000/mo", status: "active" },
  { id: "pl-2", studentName: "Meera Joshi", studentInitials: "MJ", department: "Ayurveda", course: "BAMS", company: "NIA Jaipur", role: "AYUSH Research Intern", type: "Internship", startDate: "Aug 2025", duration: "2 Months", stipend: "₹8,000/mo", status: "completed" },
  { id: "pl-3", studentName: "Neha Gupta", studentInitials: "NG", department: "Pharmacology", course: "BPharm", company: "CCRAS", role: "Research Data Assistant", type: "Placement", startDate: "Aug 2025", duration: "6 Months", stipend: "₹15,000/mo", status: "active" },
  { id: "pl-4", studentName: "Rohan Patel", studentInitials: "RP", department: "Ayurveda", course: "BAMS", company: "MoHFW", role: "Public Health Analyst", type: "Internship", startDate: "Jul 2025", duration: "4 Months", stipend: "₹10,000/mo", status: "completed" },
  { id: "pl-5", studentName: "Ananya Reddy", studentInitials: "AR", department: "Kayachikitsa", course: "BAMS", company: "AIIA", role: "Clinical Assistant", type: "Placement", startDate: "Sept 2025", duration: "12 Months", stipend: "₹18,000/mo", status: "offered" },
];

const departmentPlacements: DepartmentPlacement[] = [
  { department: "Ayurveda", totalStudents: 85, placed: 52, placementRate: 61, avgStipend: "₹11,000/mo", topCompany: "AIIA" },
  { department: "Surgery", totalStudents: 45, placed: 28, placementRate: 62, avgStipend: "₹13,000/mo", topCompany: "AIIMS" },
  { department: "Pharmacology", totalStudents: 60, placed: 41, placementRate: 68, avgStipend: "₹14,000/mo", topCompany: "CCRAS" },
  { department: "Kayachikitsa", totalStudents: 55, placed: 30, placementRate: 55, avgStipend: "₹10,000/mo", topCompany: "AIIA" },
  { department: "Shalya Tantra", totalStudents: 40, placed: 20, placementRate: 50, avgStipend: "₹9,000/mo", topCompany: "MoHFW" },
  { department: "Shaalakya Tantra", totalStudents: 35, placed: 18, placementRate: 51, avgStipend: "₹9,500/mo", topCompany: "NIA" },
];

const skillMetrics: SkillMetric[] = [
  { name: "Python", verifiedCount: 120, selfDeclaredCount: 85, totalCount: 205, avgConfidence: 72, trend: "up" },
  { name: "Research Methodology", verifiedCount: 140, selfDeclaredCount: 60, totalCount: 200, avgConfidence: 68, trend: "stable" },
  { name: "Data Analysis", verifiedCount: 100, selfDeclaredCount: 90, totalCount: 190, avgConfidence: 65, trend: "up" },
  { name: "Clinical Research", verifiedCount: 80, selfDeclaredCount: 70, totalCount: 150, avgConfidence: 58, trend: "up" },
  { name: "Statistical Analysis", verifiedCount: 45, selfDeclaredCount: 60, totalCount: 105, avgConfidence: 42, trend: "stable" },
  { name: "Machine Learning", verifiedCount: 35, selfDeclaredCount: 50, totalCount: 85, avgConfidence: 38, trend: "up" },
];

const readinessDist: ReadinessDistribution[] = [
  { department: "Ayurveda", beginning: 20, developing: 42, jobReady: 23, total: 85 },
  { department: "Surgery", beginning: 12, developing: 22, jobReady: 11, total: 45 },
  { department: "Pharmacology", beginning: 10, developing: 28, jobReady: 22, total: 60 },
  { department: "Kayachikitsa", beginning: 15, developing: 28, jobReady: 12, total: 55 },
  { department: "Shalya Tantra", beginning: 12, developing: 20, jobReady: 8, total: 40 },
  { department: "Shaalakya Tantra", beginning: 10, developing: 18, jobReady: 7, total: 35 },
];

const deptComparison: DepartmentComparison[] = [
  { name: "Ayurveda", students: 85, avgSkills: 7.2, avgMatch: 83, avgReadiness: 68, placementRate: 61, verifiedPct: 58, topGap: "Statistical Analysis", internshipParticipation: 72 },
  { name: "Surgery", students: 45, avgSkills: 6.8, avgMatch: 78, avgReadiness: 62, placementRate: 62, verifiedPct: 55, topGap: "Machine Learning", internshipParticipation: 65 },
  { name: "Pharmacology", students: 60, avgSkills: 8.1, avgMatch: 88, avgReadiness: 75, placementRate: 68, verifiedPct: 65, topGap: "Data Analysis", internshipParticipation: 78 },
  { name: "Kayachikitsa", students: 55, avgSkills: 6.5, avgMatch: 76, avgReadiness: 64, placementRate: 55, verifiedPct: 50, topGap: "Python", internshipParticipation: 60 },
  { name: "Shalya Tantra", students: 40, avgSkills: 5.8, avgMatch: 70, avgReadiness: 58, placementRate: 50, verifiedPct: 45, topGap: "Research Methodology", internshipParticipation: 52 },
  { name: "Shaalakya Tantra", students: 35, avgSkills: 5.5, avgMatch: 68, avgReadiness: 55, placementRate: 51, verifiedPct: 42, topGap: "Clinical Research", internshipParticipation: 48 },
];

const anomalies: AnomalyFlag[] = [
  { id: "an-1", studentName: "Ravi Kumar", studentInitials: "RK", department: "Ayurveda", type: "Duplicate Record", description: "Two identical internship records detected for same company/period.", severity: "high", status: "flagged", flaggedDate: "Sept 3, 2025", evidence: "Duplicate entries: AIIA internship Sept 2025 submitted twice." },
  { id: "an-2", studentName: "Priya Desai", studentInitials: "PD", department: "Pharmacology", type: "Statistical Outlier", description: "12 verified skills when dept average is 6.8.", severity: "medium", status: "reviewing", flaggedDate: "Sept 2, 2025", evidence: "12 verified skills vs dept avg 6.8. All added within 48 hours." },
  { id: "an-3", studentName: "Amit Verma", studentInitials: "AV", department: "Surgery", type: "Inconsistent Data", description: "Placement record shows company that closed 6 months ago.", severity: "high", status: "flagged", flaggedDate: "Sept 1, 2025", evidence: "Company 'HealthTech Solutions' closed March 2025." },
  { id: "an-4", studentName: "Sneha Rao", studentInitials: "SR", department: "Kayachikitsa", type: "Unusual Pattern", description: "5 internships claimed in single month, exceeding max.", severity: "medium", status: "resolved", flaggedDate: "Aug 28, 2025", evidence: "5 internships in Aug 2025. Policy allows max 2 concurrent." },
  { id: "an-5", studentName: "Deepak Joshi", studentInitials: "DJ", department: "Shalya Tantra", type: "Duplicate Record", description: "Same certificate uploaded with different metadata.", severity: "low", status: "escalated", flaggedDate: "Aug 25, 2025", evidence: "NPTEL certificate hash matches existing record." },
];

const reports: InstitutionalReport[] = [
  { id: "rpt-1", title: "Q3 2025 Placement Report", type: "Placement", period: "Jul - Sep 2025", generatedDate: "Sept 5, 2025", departments: ["All"], summary: "Overall placement rate improved to 58% from 52% in Q2.", keyFindings: ["Pharmacology leads with 68% placement rate", "Avg stipend increased 12% to ₹11,500/mo", "3 new industry partnerships established"], status: "ready" },
  { id: "rpt-2", title: "Skill Development Analysis", type: "Skill Development", period: "Aug 2025", generatedDate: "Sept 1, 2025", departments: ["All"], summary: "Python remains top verified skill. Statistical Analysis gap persists.", keyFindings: ["Python verified: 120 students (+15 from July)", "Statistical Analysis: only 45 verified out of 320", "ML skills showing fastest growth (+28% MoM)"], status: "ready" },
  { id: "rpt-3", title: "Department Performance", type: "Readiness", period: "Q3 2025", generatedDate: "Sept 3, 2025", departments: ["All"], summary: "Pharmacology shows best readiness. Shalya Tantra needs intervention.", keyFindings: ["Pharmacology avg readiness: 75% (highest)", "Shalya Tantra avg readiness: 58% (lowest)", "4 departments below 60% job-ready rate"], status: "ready" },
  { id: "rpt-4", title: "Industry Engagement", type: "Industry Engagement", period: "Q3 2025", generatedDate: "Sept 4, 2025", departments: ["All"], summary: "12 active industry partners. CCRAS and AIIA top recruiters.", keyFindings: ["12 partners providing opportunities", "CCRAS: 8 hires, AIIA: 6 hires", "3 new partnerships (MoHFW, NIA, AIIMS)"], status: "ready" },
  { id: "rpt-5", title: "Anomaly Investigation", type: "Anomaly", period: "Aug 2025", generatedDate: "Sept 2, 2025", departments: ["Ayurveda", "Pharmacology"], summary: "5 anomalies flagged, 1 resolved, 1 escalated.", keyFindings: ["2 high-severity pending review", "1 resolved (concurrent internship violation)", "1 escalated (duplicate certificate)"], status: "ready" },
];

const analytics: InstitutionAnalytics = { totalStudents: 320, totalPlaced: 189, placementRate: 59, internshipRate: 72, avgReadiness: 64, avgSkills: 6.8, industryPartners: 12, monthlyTrend: [{ month: "May", placements: 8, internships: 12, verified: 45 }, { month: "Jun", placements: 10, internships: 15, verified: 52 }, { month: "Jul", placements: 12, internships: 18, verified: 60 }, { month: "Aug", placements: 15, internships: 22, verified: 72 }, { month: "Sep", placements: 12, internships: 20, verified: 68 }], skillGaps: [{ skill: "Statistical Analysis", gapCount: 215, pct: 67 }, { skill: "Machine Learning", gapCount: 235, pct: 73 }, { skill: "Data Management", gapCount: 180, pct: 56 }, { skill: "Clinical Research", gapCount: 170, pct: 53 }], industryEngagement: [{ company: "AIIA", opportunities: 8, hired: 6 }, { company: "CCRAS", opportunities: 6, hired: 8 }, { company: "AIIMS", opportunities: 5, hired: 4 }, { company: "MoHFW", opportunities: 4, hired: 3 }, { company: "NIA", opportunities: 3, hired: 2 }] };

const navLinks = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "placements", label: "Placements", icon: <Briefcase size={18} /> },
  { id: "skills", label: "Skill Development", icon: <Target size={18} /> },
  { id: "departments", label: "Departments", icon: <Building2 size={18} /> },
  { id: "anomalies", label: "Anomalies", icon: <AlertTriangle size={18} />, count: 3 },
  { id: "reports", label: "Reports", icon: <FileText size={18} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { id: "profile", label: "Institution Profile", icon: <GraduationCap size={18} /> },
];

/* ─── Helpers ─── */
function PxBar({ pct, segments = 18, color = "#244B35" }: { pct: number; segments?: number; color?: string }) {
  const filled = Math.round((pct / 100) * segments);
  return <div className="flex gap-[3px] flex-wrap">{Array.from({ length: segments }, (_, i) => <span key={i} className={`w-[7px] h-[13px] ${i < filled ? "" : "bg-[#EDEBE0]"}`} style={i < filled ? { background: color } : undefined} />)}</div>;
}
const tagCls: Record<string, string> = {
  "high": "bg-[#E8C7AE] text-[#7a3f1a]", "medium": "bg-[#E8D36B] text-[#5c4a08]", "low": "bg-[#DCE6D0] text-[#16301F]",
  "flagged": "bg-[#E8C7AE] text-[#7a3f1a]", "reviewing": "bg-[#E8D36B] text-[#5c4a08]", "resolved": "bg-[#DCE6D0] text-[#16301F]", "escalated": "bg-[#C8B5DE] text-[#4d3a74]",
  "active": "bg-[#DCE6D0] text-[#16301F]", "completed": "bg-[#EDEBE0] text-[#6B6F68]", "offered": "bg-[#E8D36B] text-[#5c4a08]",
  "ready": "bg-[#DCE6D0] text-[#16301F]", "generating": "bg-[#EDEBE0] text-[#6B6F68]",
  "up": "bg-[#DCE6D0] text-[#16301F]", "stable": "bg-[#EDEBE0] text-[#6B6F68]", "down": "bg-[#E8C7AE] text-[#7a3f1a]",
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
            <button key={link.id} onClick={() => setActiveNav(link.id)}
              className={`flex items-center rounded-xl text-sm font-medium transition-colors relative ${open ? "gap-3 px-3 py-2.5" : "justify-center px-0 py-2.5"} ${activeNav === link.id ? "bg-[#244B35] text-white font-semibold" : "text-[#6B6F68] hover:bg-[#EDEBE0] hover:text-[#171A18]"}`}
              title={!open ? link.label : undefined}>
              <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 20, height: 20 }}>{link.icon}</span>
              {open && <span className="text-sm whitespace-pre flex-1 text-left">{link.label}</span>}
              {open && link.count !== undefined && <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-md ${activeNav === link.id ? "bg-white/20 text-white" : "bg-[#E8C7AE] text-[#7a3f1a]"}`}>{link.count}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t pt-3 mt-2" style={{ borderColor: open ? "#E6E3D7" : "transparent" }}>
        <button onClick={() => setActiveNav("profile")} className={`flex items-center gap-3 w-full rounded-xl text-[#6B6F68] text-xs font-medium hover:bg-[#EDEBE0] hover:text-[#171A18] transition-colors ${open ? "px-3 py-2" : "px-0 py-2 justify-center"}`}><Settings size={16} /> {open && "Settings"}</button>
        <button className={`flex items-center gap-3 w-full rounded-xl text-[#6B6F68] text-xs font-medium hover:bg-[#EDEBE0] hover:text-[#171A18] transition-colors ${open ? "px-3 py-2" : "px-0 py-2 justify-center"}`}><LogOut size={16} /> {open && "Log out"}</button>
        {open && <div className="mt-3 p-3 rounded-xl border" style={{ background: "#F7F6F0", borderColor: "#E6E3D7" }}><div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" style={{ background: "#244B35", color: "#DCE6D0" }}>{institution.initials}</div><div className="min-w-0"><div className="font-semibold text-sm truncate" style={{ color: "#171A18" }}>{institution.name}</div><div className="text-[11px] font-mono" style={{ color: "#6B6F68" }}>Institution Admin</div></div></div></div>}
        {!open && <div className="flex justify-center mt-3"><div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: "#244B35", color: "#DCE6D0" }}>{institution.initials}</div></div>}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   OVERVIEW
   ═══════════════════════════════════════════════════════ */
function OverviewSection() {
  const flagged = anomalies.filter(a => a.status === "flagged").length;
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] p-7 md:p-9 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #244B35 0%, #1C3D2B 40%, #1A3626 100%)", boxShadow: "0 8px 32px rgba(36,75,53,.18), inset 0 1px 0 rgba(220,230,208,.12)" }}>
        <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none"><div className="grid grid-cols-6 gap-[6px]">{Array.from({length:36},(_,i)=><div key={i} className="w-[5px] h-[5px] bg-white rounded-[1px]" />)}</div></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: "rgba(255,255,255,.5)" }}><span className="inline-block w-[7px] h-[7px] bg-white mr-2 opacity-85" style={{ boxShadow: "0 7px 0 -2px #244B35" }} />Institution Admin</span>
            <div className="font-semibold text-[26px] md:text-[30px] tracking-tight mt-3 mb-1" style={{ color: "#fff" }}>{institution.name}</div>
            <p className="text-[14px] mb-6" style={{ color: "rgba(255,255,255,.7)" }}>{institution.totalStudents} students across {institution.departments.length} departments. {analytics.placementRate}% placement rate. {analytics.industryPartners} industry partners.</p>
            <div className="flex items-center gap-6 flex-wrap">
              {[{ label: "Students", value: institution.totalStudents, color: "#DCE6D0" }, { label: "Placement Rate", value: `${analytics.placementRate}%`, color: "#E8D36B" }, { label: "Partners", value: analytics.industryPartners, color: "#F0EAF8" }].map((s) => (
                <div key={s.label}><div className="font-bold text-3xl leading-none" style={{ color: s.color }}>{s.value}</div><div className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,.5)" }}>{s.label}</div></div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex flex-col flex-shrink-0 w-[180px]">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,.5)" }}>Quick Stats</div>
            {[{ label: "Internship Rate", val: `${analytics.internshipRate}%` }, { label: "Avg Readiness", val: `${analytics.avgReadiness}%` }, { label: "Anomalies", val: `${flagged} flagged` }].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5"><span className="text-[12px]" style={{ color: "rgba(255,255,255,.6)" }}>{item.label}</span><span className="font-semibold text-[12px]" style={{ color: "#fff" }}>{item.val}</span></div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Students", value: institution.totalStudents, color: "#244B35", bg: "#DCE6D0", accent: "#244B35" },
          { label: "Placed", value: analytics.totalPlaced, color: "#171A18", bg: "#EDEBE0", accent: "#C98B5F" },
          { label: "Industry Partners", value: analytics.industryPartners, color: "#4A2D7A", bg: "#EAE3F4", accent: "#8A6FB8" },
          { label: "Anomalies", value: flagged, color: "#7a3f1a", bg: "#F0E8DD", accent: "#C98B5F" },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="rounded-[14px] p-5 text-center border-l-[3px] hover:shadow-md transition-shadow" style={{ background: s.bg, borderLeftColor: s.accent }}>
            <div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "#6B6F68" }}>{s.label}</div>
            <div className="font-bold text-[32px] tracking-tight leading-none" style={{ color: s.color }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Placement by Department */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Placement Overview</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4" style={{ color: "#171A18" }}>Department Placement Rates</div>
        <div className="flex flex-col gap-3">
          {departmentPlacements.map((d) => (
            <div key={d.department} className="flex items-center gap-3">
              <span className="font-semibold text-sm w-28 truncate" style={{ color: "#171A18" }}>{d.department}</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full transition-all" style={{ width: `${d.placementRate}%`, background: d.placementRate >= 60 ? "#244B35" : d.placementRate >= 50 ? "#E8D36B" : "#E8C7AE" }} /></div>
              <span className="font-mono text-xs font-bold w-10 text-right" style={{ color: "#6B6F68" }}>{d.placementRate}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Critical Anomalies */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Anomaly Alerts</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4" style={{ color: "#171A18" }}>Flagged Records</div>
        <div className="flex flex-col gap-3">
          {anomalies.filter(a => a.status === "flagged").map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl border-l-[3px] hover:shadow-sm transition-shadow" style={{ borderColor: "#C98B5F", background: "#FDF8F3" }}>
              <AlertTriangle size={16} style={{ color: "#C98B5F" }} />
              <div className="flex-1 min-w-0"><div className="font-semibold text-sm" style={{ color: "#171A18" }}>{a.studentName} - {a.type}</div><div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{a.department} / {a.flaggedDate}</div></div>
              <Tag cls={a.severity}>{a.severity}</Tag>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PLACEMENTS
   ═══════════════════════════════════════════════════════ */
function PlacementsSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Placements</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1" style={{ color: "#171A18" }}>Placement & Internship Records</div>
        <p className="text-xs mb-5" style={{ color: "#6B6F68" }}>{placements.length} active records across {departmentPlacements.length} departments</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Total Placed", value: analytics.totalPlaced, color: "#244B35", bg: "#DCE6D0" },
            { label: "Placement Rate", value: `${analytics.placementRate}%`, color: "#171A18", bg: "#EDEBE0" },
            { label: "Internship Rate", value: `${analytics.internshipRate}%`, color: "#4A2D7A", bg: "#EAE3F4" },
            { label: "Partners", value: analytics.industryPartners, color: "#C98B5F", bg: "#F0E8DD" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: s.bg }}>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#6B6F68" }}>{s.label}</div>
              <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {placements.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-md transition-shadow" style={{ borderColor: "#E6E3D7", background: "linear-gradient(180deg, #FDFCFA 0%, #FAFCF7 100%)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: "#EDEBE0", color: "#171A18" }}>{p.studentInitials}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm" style={{ color: "#171A18" }}>{p.studentName}</div>
                <div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{p.role} / {p.company}</div>
              </div>
              <div className="hidden sm:flex items-center gap-3 font-mono text-[11px]" style={{ color: "#6B6F68" }}>
                <span>{p.department}</span><span>{p.stipend}</span><span>{p.duration}</span>
              </div>
              <Tag cls={p.status}>{p.status}</Tag>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Department Breakdown */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Department Breakdown</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4" style={{ color: "#171A18" }}>Department Placement Performance</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b" style={{ borderColor: "#E6E3D7" }}>
              {["Department", "Students", "Placed", "Rate", "Avg Stipend", "Top Company"].map(h => <th key={h} className="font-mono text-[10px] font-bold tracking-widest uppercase py-3 px-3" style={{ color: "#9A9D94" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {departmentPlacements.map((d) => (
                <tr key={d.department} className="border-b hover:bg-[#FAFAF7] transition-colors" style={{ borderColor: "#EDEBE0" }}>
                  <td className="py-3 px-3 font-semibold text-sm" style={{ color: "#171A18" }}>{d.department}</td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "#6B6F68" }}>{d.totalStudents}</td>
                  <td className="py-3 px-3 font-mono text-xs font-bold" style={{ color: "#244B35" }}>{d.placed}</td>
                  <td className="py-3 px-3"><div className="flex items-center gap-2"><div className="w-16 h-2 rounded-full overflow-hidden" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full" style={{ width: `${d.placementRate}%`, background: d.placementRate >= 60 ? "#244B35" : "#E8D36B" }} /></div><span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>{d.placementRate}%</span></div></td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "#6B6F68" }}>{d.avgStipend}</td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "#6B6F68" }}>{d.topCompany}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Placement Trends */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Trends</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4" style={{ color: "#171A18" }}>Monthly Placement Trends</div>
        <div className="flex items-end gap-4 h-[140px]">
          {analytics.monthlyTrend.map((m) => {
            const max = Math.max(...analytics.monthlyTrend.map(x => x.placements + x.internships));
            return <div key={m.month} className="flex-1 flex flex-col items-center gap-1"><div className="w-full flex gap-1 items-end justify-center"><div className="w-[40%] rounded-t-lg" style={{ height: `${(m.placements / max) * 100}%`, background: "#244B35" }} /><div className="w-[40%] rounded-t-lg" style={{ height: `${(m.internships / max) * 100}%`, background: "#8A6FB8" }} /></div><div className="font-mono text-[10px] font-bold" style={{ color: "#9A9D94" }}>{m.month}</div></div>;
          })}
        </div>
        <div className="flex items-center gap-4 mt-2"><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#244B35" }} /><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Placements</span></div><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#8A6FB8" }} /><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Internships</span></div></div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILL DEVELOPMENT
   ═══════════════════════════════════════════════════════ */
function SkillsSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Skill Development</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-1" style={{ color: "#171A18" }}>Institution-Wide Skill Intelligence</div>
        <p className="text-xs mb-5" style={{ color: "#6B6F68" }}>Verified vs self-declared skills across {institution.totalStudents} students</p>

        <div className="flex flex-col gap-4">
          {skillMetrics.map((sk) => (
            <div key={sk.name} className="p-4 rounded-xl border hover:shadow-md transition-shadow" style={{ borderColor: "#E6E3D7", background: "linear-gradient(180deg, #FDFCFA 0%, #FAFCF7 100%)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm" style={{ color: "#171A18" }}>{sk.name}</span>
                  <Tag cls={sk.trend}>{sk.trend === "up" ? "↗ Growing" : sk.trend === "stable" ? "→ Stable" : "↘ Declining"}</Tag>
                </div>
                <span className="font-mono text-xs font-bold" style={{ color: "#6B6F68" }}>Avg {sk.avgConfidence}%</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-mono mb-1" style={{ color: "#6B6F68" }}><span>Verified: {sk.verifiedCount}</span><span>Self-declared: {sk.selfDeclaredCount}</span></div>
                  <div className="h-3 rounded-full overflow-hidden flex" style={{ background: "#E6E3D7" }}>
                    <div className="h-full" style={{ width: `${(sk.verifiedCount / sk.totalCount) * 100}%`, background: "#244B35" }} />
                    <div className="h-full" style={{ width: `${(sk.selfDeclaredCount / sk.totalCount) * 100}%`, background: "#E8D36B" }} />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold" style={{ color: "#171A18" }}>{sk.totalCount}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Readiness by Department */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow color="#8A6FB8">Readiness</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4" style={{ color: "#171A18" }}>Readiness Distribution by Department</div>
        <div className="flex flex-col gap-3">
          {readinessDist.map((d) => (
            <div key={d.department}>
              <div className="flex items-center justify-between mb-1"><span className="font-semibold text-sm" style={{ color: "#171A18" }}>{d.department}</span><span className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{d.total} students</span></div>
              <div className="h-4 rounded-full overflow-hidden flex" style={{ background: "#E6E3D7" }}>
                <div className="h-full" style={{ width: `${(d.jobReady / d.total) * 100}%`, background: "#244B35" }} />
                <div className="h-full" style={{ width: `${(d.developing / d.total) * 100}%`, background: "#E8D36B" }} />
                <div className="h-full" style={{ width: `${(d.beginning / d.total) * 100}%`, background: "#E8C7AE" }} />
              </div>
              <div className="flex items-center gap-4 mt-1 font-mono text-[10px]" style={{ color: "#6B6F68" }}>
                <span>Job-Ready: {d.jobReady}</span><span>Developing: {d.developing}</span><span>Beginning: {d.beginning}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4"><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#244B35" }} /><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Job-Ready</span></div><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#E8D36B" }} /><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Developing</span></div><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#E8C7AE" }} /><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Beginning</span></div></div>
      </motion.div>

      {/* Skill Gaps */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Skill Gaps</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4" style={{ color: "#171A18" }}>Most Common Skill Gaps</div>
        <div className="flex flex-col gap-3">
          {analytics.skillGaps.map((g) => (
            <div key={g.skill}>
              <div className="flex items-center justify-between mb-1"><span className="font-semibold text-sm" style={{ color: "#171A18" }}>{g.skill}</span><span className="font-mono text-xs" style={{ color: "#C98B5F" }}>{g.gapCount} students ({g.pct}%)</span></div>
              <PxBar pct={g.pct} segments={16} color="#C98B5F" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DEPARTMENTS
   ═══════════════════════════════════════════════════════ */
function DepartmentsSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Department Comparison</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-5" style={{ color: "#171A18" }}>Cross-Department Analysis</div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b" style={{ borderColor: "#E6E3D7" }}>
              {["Department", "Students", "Skills", "Match", "Readiness", "Placement", "Verified", "Top Gap"].map(h => <th key={h} className="font-mono text-[10px] font-bold tracking-widest uppercase py-3 px-3" style={{ color: "#9A9D94" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {deptComparison.sort((a, b) => b.avgReadiness - a.avgReadiness).map((d) => (
                <tr key={d.name} className="border-b hover:bg-[#FAFAF7] transition-colors" style={{ borderColor: "#EDEBE0" }}>
                  <td className="py-3 px-3 font-semibold text-sm" style={{ color: "#171A18" }}>{d.name}</td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "#6B6F68" }}>{d.students}</td>
                  <td className="py-3 px-3 font-mono text-xs font-bold" style={{ color: "#244B35" }}>{d.avgSkills}</td>
                  <td className="py-3 px-3 font-mono text-xs font-bold" style={{ color: d.avgMatch >= 80 ? "#244B35" : "#C98B5F" }}>{d.avgMatch}%</td>
                  <td className="py-3 px-3"><div className="flex items-center gap-2"><div className="w-12 h-2 rounded-full overflow-hidden" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full" style={{ width: `${d.avgReadiness}%`, background: d.avgReadiness >= 65 ? "#244B35" : "#E8D36B" }} /></div><span className="font-mono text-xs" style={{ color: "#6B6F68" }}>{d.avgReadiness}%</span></div></td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "#6B6F68" }}>{d.placementRate}%</td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: "#6B6F68" }}>{d.verifiedPct}%</td>
                  <td className="py-3 px-3"><Tag cls="medium">{d.topGap}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deptComparison.map((d) => (
          <motion.div key={d.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-[18px] border p-5 bg-white hover:shadow-md transition-shadow" style={{ borderColor: "#E6E3D7" }}>
            <div className="font-semibold text-[16px] mb-3" style={{ color: "#171A18" }}>{d.name}</div>
            <div className="grid grid-cols-2 gap-2 text-center mb-3">
              <div className="rounded-lg p-2" style={{ background: "#EAE3F4" }}><div className="font-bold text-lg" style={{ color: "#4A2D7A" }}>{d.students}</div><div className="font-mono text-[9px]" style={{ color: "#9A9D94" }}>Students</div></div>
              <div className="rounded-lg p-2" style={{ background: "#DCE6D0" }}><div className="font-bold text-lg" style={{ color: "#244B35" }}>{d.placementRate}%</div><div className="font-mono text-[9px]" style={{ color: "#9A9D94" }}>Placement</div></div>
            </div>
            <div className="flex items-center justify-between text-xs mb-1"><span style={{ color: "#6B6F68" }}>Readiness</span><span className="font-bold" style={{ color: "#171A18" }}>{d.avgReadiness}%</span></div>
            <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: "#E6E3D7" }}><div className="h-full rounded-full" style={{ width: `${d.avgReadiness}%`, background: d.avgReadiness >= 65 ? "#244B35" : "#E8D36B" }} /></div>
            <div className="flex items-center justify-between text-xs"><span style={{ color: "#6B6F68" }}>Internship</span><span className="font-bold" style={{ color: "#171A18" }}>{d.internshipParticipation}%</span></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ANOMALIES
   ═══════════════════════════════════════════════════════ */
function AnomaliesSection() {
  const flagged = anomalies.filter(a => a.status === "flagged").length;
  const reviewing = anomalies.filter(a => a.status === "reviewing").length;
  const resolved = anomalies.filter(a => a.status === "resolved").length;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Flagged", value: flagged, color: "#7a3f1a", bg: "#F0E8DD" },
          { label: "Reviewing", value: reviewing, color: "#5c4a08", bg: "#E8D36B30" },
          { label: "Resolved", value: resolved, color: "#244B35", bg: "#DCE6D0" },
        ].map((s) => (
          <div key={s.label} className="rounded-[14px] p-4 text-center border-l-[3px] hover:shadow-md transition-shadow" style={{ background: s.bg, borderLeftColor: s.color }}>
            <div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1" style={{ color: "#6B6F68" }}>{s.label}</div>
            <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Fraud & Anomaly Detection</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-5" style={{ color: "#171A18" }}>Flagged Records</div>

        <div className="flex flex-col gap-4">
          {anomalies.map((a) => (
            <div key={a.id} className="rounded-xl border p-5 hover:shadow-md transition-shadow" style={{ borderColor: a.severity === "high" ? "#E8C7AE" : "#E6E3D7", background: a.severity === "high" ? "linear-gradient(180deg, #FDFCFA 0%, #FDF8F3 100%)" : "linear-gradient(180deg, #FDFCFA 0%, #FAFCF7 100%)" }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: a.severity === "high" ? "#F0E8DD" : "#EDEBE0", color: a.severity === "high" ? "#7a3f1a" : "#171A18" }}>{a.studentInitials}</div>
                  <div><div className="font-bold text-[15px]" style={{ color: "#171A18" }}>{a.studentName}</div><div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{a.department}</div></div>
                </div>
                <div className="flex items-center gap-2"><Tag cls={a.severity}>{a.severity}</Tag><Tag cls={a.status}>{a.status}</Tag></div>
              </div>
              <div className="font-semibold text-sm mb-1" style={{ color: "#171A18" }}>{a.type}</div>
              <p className="text-xs mb-2" style={{ color: "#6B6F68" }}>{a.description}</p>
              <div className="font-mono text-[11px] p-2 rounded-lg mb-3" style={{ background: "#FAFAF7", color: "#6B6F68" }}>{a.evidence}</div>
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#EDEBE0" }}>
                <span className="font-mono text-[11px]" style={{ color: "#9A9D94" }}>Flagged: {a.flaggedDate}</span>
                {a.status === "flagged" && <div className="flex gap-2">
                  <button onClick={() => institutionApi.reviewAnomaly(a.id, "resolve")} className="font-semibold text-[11px] px-3 py-1.5 rounded-lg transition-all hover:shadow-sm" style={{ background: "#DCE6D0", color: "#16301F" }}>Mark Resolved</button>
                  <button onClick={() => institutionApi.reviewAnomaly(a.id, "escalate")} className="font-semibold text-[11px] px-3 py-1.5 rounded-lg border transition-all hover:bg-[#FAFAF7]" style={{ borderColor: "#E6E3D7", color: "#6B6F68" }}>Escalate</button>
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
   REPORTS
   ═══════════════════════════════════════════════════════ */
function ReportsSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Reports</Eyebrow>
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-5" style={{ color: "#171A18" }}>Institutional Reports</div>

        <div className="flex flex-col gap-4">
          {reports.map((r) => (
            <div key={r.id} className="rounded-xl border p-5 hover:shadow-md transition-shadow" style={{ borderColor: "#E6E3D7", background: "linear-gradient(180deg, #FDFCFA 0%, #FAFCF7 100%)" }}>
              <div className="flex items-start justify-between mb-2">
                <div><div className="font-semibold text-[16px]" style={{ color: "#171A18" }}>{r.title}</div><div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{r.type} / {r.period}</div></div>
                <Tag cls={r.status}>{r.status}</Tag>
              </div>
              <p className="text-sm mb-3" style={{ color: "#6B6F68" }}>{r.summary}</p>
              <div className="flex flex-col gap-1.5 mb-3">
                {r.keyFindings.map((f, i) => <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "#6B6F68" }}><Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#244B35" }} />{f}</div>)}
              </div>
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#EDEBE0" }}>
                <div className="flex items-center gap-2">{r.departments.map(d => <Tag key={d} cls="active">{d}</Tag>)}</div>
                <div className="flex items-center gap-2"><span className="font-mono text-[11px]" style={{ color: "#9A9D94" }}>Generated: {r.generatedDate}</span><button onClick={() => { const el = document.createElement("div"); el.className = "fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-white font-semibold text-sm shadow-lg"; el.style.background = "#244B35"; el.textContent = "Report downloaded!"; document.body.appendChild(el); setTimeout(() => el.remove(), 3000); }} className="font-semibold text-[11px] px-3 py-1.5 rounded-lg transition-all hover:shadow-sm" style={{ background: "#DCE6D0", color: "#16301F" }}>Download PDF</button></div>
              </div>
            </div>
          ))}
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
          { label: "Students", value: analytics.totalStudents, color: "#244B35", bg: "#DCE6D0" },
          { label: "Placement Rate", value: `${analytics.placementRate}%`, color: "#171A18", bg: "#EDEBE0" },
          { label: "Avg Readiness", value: `${analytics.avgReadiness}%`, color: "#4A2D7A", bg: "#EAE3F4" },
          { label: "Partners", value: analytics.industryPartners, color: "#C98B5F", bg: "#F0E8DD" },
        ].map((s) => (
          <div key={s.label} className="rounded-[14px] p-5 text-center border-l-[3px] hover:shadow-md transition-shadow" style={{ background: s.bg, borderLeftColor: s.color }}>
            <div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "#6B6F68" }}>{s.label}</div>
            <div className="font-bold text-[32px] tracking-tight leading-none" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
          <Eyebrow color="#8A6FB8">Industry Engagement</Eyebrow>
          <div className="font-semibold text-[16px] tracking-tight mt-2 mb-4" style={{ color: "#171A18" }}>Top Recruiting Partners</div>
          <div className="flex flex-col gap-3">
            {analytics.industryEngagement.map((e) => (
              <div key={e.company} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#FAFCF7" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: "#DCE6D0", color: "#244B35" }}>{e.company[0]}</div>
                <div className="flex-1"><div className="font-semibold text-sm" style={{ color: "#171A18" }}>{e.company}</div></div>
                <div className="text-right"><div className="font-bold text-sm" style={{ color: "#244B35" }}>{e.hired} hired</div><div className="font-mono text-[9px]" style={{ color: "#9A9D94" }}>{e.opportunities} opps</div></div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
          <Eyebrow color="#C98B5F">Placement Performance</Eyebrow>
          <div className="font-semibold text-[16px] tracking-tight mt-2 mb-4" style={{ color: "#171A18" }}>Monthly Trends</div>
          <div className="flex items-end gap-4 h-[140px]">
            {analytics.monthlyTrend.map((m) => {
              const max = Math.max(...analytics.monthlyTrend.map(x => x.verified));
              return <div key={m.month} className="flex-1 flex flex-col items-center gap-1"><div className="w-full flex gap-1 items-end justify-center"><div className="w-[40%] rounded-t-lg" style={{ height: `${(m.placements / max) * 100}%`, background: "#244B35" }} /><div className="w-[40%] rounded-t-lg" style={{ height: `${(m.verified / max) * 100}%`, background: "#8A6FB8" }} /></div><div className="font-mono text-[10px] font-bold" style={{ color: "#9A9D94" }}>{m.month}</div></div>;
            })}
          </div>
          <div className="flex items-center gap-4 mt-2"><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#244B35" }} /><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Placements</span></div><div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#8A6FB8" }} /><span className="font-mono text-[10px]" style={{ color: "#6B6F68" }}>Verified Skills</span></div></div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow color="#244B35">Skill Gap Overview</Eyebrow>
        <div className="font-semibold text-[16px] tracking-tight mt-2 mb-4" style={{ color: "#171A18" }}>Institution-Wide Skill Gaps</div>
        <div className="flex flex-col gap-3">
          {analytics.skillGaps.map((g) => (
            <div key={g.skill}>
              <div className="flex items-center justify-between mb-1"><span className="font-semibold text-sm" style={{ color: "#171A18" }}>{g.skill}</span><span className="font-mono text-xs" style={{ color: "#C98B5F" }}>{g.gapCount} students ({g.pct}%)</span></div>
              <PxBar pct={g.pct} segments={16} color="#C98B5F" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INSTITUTION PROFILE
   ═══════════════════════════════════════════════════════ */
function ProfileSection() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0" style={{ background: "linear-gradient(135deg, #244B35, #1C3D2B)", color: "#DCE6D0", boxShadow: "0 4px 12px rgba(36,75,53,.15)" }}>{institution.initials}</div>
          <div className="flex-1">
            <div className="font-semibold text-[22px] tracking-tight" style={{ color: "#171A18" }}>{institution.name}</div>
            <div className="text-sm mb-1" style={{ color: "#6B6F68" }}>{institution.type} / Est. {institution.establishedYear}</div>
            <div className="text-xs mb-3" style={{ color: "#6B6F68" }}>{institution.location}</div>
            <div className="flex flex-wrap gap-2 mb-3">{institution.departments.map(d => <Tag key={d} cls="active">{d}</Tag>)}</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-[18px] border p-5 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
          <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Contact</div>
          {[{ icon: <Globe size={14} />, label: institution.website }, { icon: <Mail size={14} />, label: institution.email }, { icon: <Smartphone size={14} />, label: institution.phone }, { icon: <MapPin size={14} />, label: institution.location }].map((f, i) => (
            <div key={i} className="flex items-center gap-2 py-2 text-sm" style={{ color: "#6B6F68" }}>{f.icon}{f.label}</div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-[18px] border p-5 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
          <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Quick Stats</div>
          {[
            { label: "Students", value: institution.totalStudents },
            { label: "Faculty", value: institution.totalFaculty },
            { label: "Departments", value: institution.departments.length },
            { label: "Industry Partners", value: analytics.industryPartners },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-2"><span className="text-xs" style={{ color: "#6B6F68" }}>{s.label}</span><span className="font-bold text-sm" style={{ color: "#244B35" }}>{s.value}</span></div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-[18px] border p-5 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
          <div className="font-semibold text-sm mb-3" style={{ color: "#171A18" }}>Performance</div>
          {[
            { label: "Placement Rate", value: `${analytics.placementRate}%` },
            { label: "Internship Rate", value: `${analytics.internshipRate}%` },
            { label: "Avg Readiness", value: `${analytics.avgReadiness}%` },
            { label: "Avg Skills", value: analytics.avgSkills },
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
  const [name, setName] = useState(institution.name);
  const [email, setEmail] = useState(institution.email);
  const [phone, setPhone] = useState(institution.phone);
  const [website, setWebsite] = useState(institution.website);
  const [location, setLocation] = useState(institution.location);
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
        <div className="font-semibold text-[22px] tracking-tight mt-2 mb-5" style={{ color: "#171A18" }}>Institution Settings</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Institution Name</label><input className={inputCls} style={inputStyle} value={name} onChange={e => setName(e.target.value)} /></div>
          <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Email</label><input className={inputCls} style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Phone</label><input className={inputCls} style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} /></div>
          <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Website</label><input className={inputCls} style={inputStyle} value={website} onChange={e => setWebsite(e.target.value)} /></div>
          <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Location</label><input className={inputCls} style={inputStyle} value={location} onChange={e => setLocation(e.target.value)} /></div>
          <div><label className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: "#9A9D94" }}>Departments</label><input className={inputCls} style={inputStyle} value={institution.departments.join(", ")} readOnly /></div>
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
export default function InstitutionDashboard() {
  const [activeNav, setActiveNav] = useState("overview");

  const titleMap: Record<string, string> = {
    overview: "Overview", placements: "Placements", skills: "Skill Development",
    departments: "Departments", anomalies: "Anomalies", reports: "Reports",
    analytics: "Analytics", profile: "Institution Profile",
  };

  const renderSection = () => {
    switch (activeNav) {
      case "overview": return <OverviewSection />;
      case "placements": return <PlacementsSection />;
      case "skills": return <SkillsSection />;
      case "departments": return <DepartmentsSection />;
      case "anomalies": return <AnomaliesSection />;
      case "reports": return <ReportsSection />;
      case "analytics": return <AnalyticsSection />;
      case "profile": return <ProfileSection />;
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
              {activeNav === "overview" ? `${institution.name}` : titleMap[activeNav]}
            </h1>
            {activeNav === "overview" && <p className="text-sm mt-0.5" style={{ color: "#6B6F68" }}>Institution-wide monitoring and analytics.</p>}
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 border rounded-xl px-3 py-2 bg-white" style={{ borderColor: "#E6E3D7" }}><Search size={14} style={{ color: "#9A9D94" }} /><input type="text" placeholder="Search departments, students..." className="border-none outline-none bg-transparent text-[13px] w-48" style={{ color: "#171A18" }} /></div>
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
