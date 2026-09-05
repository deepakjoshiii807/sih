import { useState } from "react";
import { Sidebar, SidebarBody, Logo, LogoIcon, useSidebar } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Building2, Briefcase, FileText, Users, BarChart3,
  Clock, Star, Settings, LogOut, Search, Bell, ChevronRight,
  Check, Save, Mail, Key, Globe, Trash2, Lock, Eye, EyeOff,
  Upload, MapPin, Calendar, TrendingUp, AlertTriangle, Target,
  Zap, Shield, Award, Plus, Pause, Play, XCircle, Send,
} from "lucide-react";

import type {
  Company, Opportunity, Application, SLATracker,
  IndustryAnalytics, Rating, ApplicationStage,
} from "@/lib/industry-api";
import { industryApi } from "@/lib/industry-api";

/* ─── Mock Data (swap for: const { company, opportunities, ... } = await industryApi.getDashboard()) ─── */
const company: Company = {
  name: "AIIA Research Division", initials: "AR",
  description: "Research division of the All India Institute of Ayurveda, focused on clinical research, drug discovery, and evidence-based Ayurvedic medicine.",
  domain: "Healthcare / AYUSH Research", orgType: "Government Research Institute",
  location: "New Delhi, India", website: "https://aiia.gov.in",
  email: "research@aiia.gov.in", phone: "+91 11 2659 3642", contactPerson: "Dr. Rajesh Kumar",
  verified: true, foundedYear: 2015, size: "200-500 employees",
};

const opportunities: Opportunity[] = [
  { id: 1, title: "Clinical Research Intern", type: "Internship", description: "Work on ongoing clinical trials in Ayurvedic pharmacology.", openings: 4, location: "New Delhi", workArrangement: "On-site", duration: "3 Months", stipend: "₹12,000/month", deadline: "Sept 30, 2025", eligibility: { qualification: "BAMS / MBBS", courses: ["BAMS", "MBBS"], experience: "No prior experience required", otherCriteria: "" }, requiredSkills: [{ skill: "Python", required: "essential", minProficiency: 70 }, { skill: "Research Methodology", required: "essential", minProficiency: 60 }, { skill: "Data Analysis", required: "essential", minProficiency: 65 }, { skill: "Scientific Writing", required: "preferred", minProficiency: 50 }], status: "active", totalApplicants: 12, shortlistedCount: 3, createdAt: "Aug 15, 2025", blindShortlisting: true },
  { id: 2, title: "Research Data Assistant", type: "Part-time", description: "Assist in cleaning, analyzing, and visualizing clinical trial data.", openings: 2, location: "New Delhi", workArrangement: "Hybrid", duration: "6 Months", stipend: "₹15,000/month", deadline: "Oct 15, 2025", eligibility: { qualification: "BSc / MSc", courses: ["BSc", "MSc"], experience: "6 months relevant experience", otherCriteria: "" }, requiredSkills: [{ skill: "Python", required: "essential", minProficiency: 80 }, { skill: "Data Analysis", required: "essential", minProficiency: 75 }, { skill: "Statistical Analysis", required: "essential", minProficiency: 70 }], status: "active", totalApplicants: 8, shortlistedCount: 2, createdAt: "Aug 20, 2025", blindShortlisting: false },
  { id: 3, title: "AYUSH Public Health Intern", type: "Internship", description: "Support field research on AYUSH healthcare delivery.", openings: 3, location: "Jaipur", workArrangement: "On-site", duration: "2 Months", stipend: "₹8,000/month", deadline: "Sept 20, 2025", eligibility: { qualification: "BAMS / BPH", courses: ["BAMS"], experience: "No prior experience required", otherCriteria: "" }, requiredSkills: [{ skill: "Research", required: "essential", minProficiency: 50 }], status: "closing", totalApplicants: 5, shortlistedCount: 1, createdAt: "Jul 10, 2025", blindShortlisting: false },
  { id: 4, title: "Herbal Pharmacovigilance Intern", type: "Internship", description: "Monitor adverse drug reactions for AYUSH herbal formulations.", openings: 2, location: "New Delhi", workArrangement: "On-site", duration: "4 Months", stipend: "₹10,000/month", deadline: "Oct 5, 2025", eligibility: { qualification: "BAMS / BPharm", courses: ["BAMS", "BPharm"], experience: "1 year preferred", otherCriteria: "" }, requiredSkills: [{ skill: "Clinical Research", required: "essential", minProficiency: 60 }], status: "draft", totalApplicants: 0, shortlistedCount: 0, createdAt: "Sept 1, 2025", blindShortlisting: false },
];

const applications: Application[] = [
  { id: 1, opportunityId: 1, opportunityTitle: "Clinical Research Intern", candidate: { id: 1, name: "Aarav Sharma", initials: "AS", course: "BAMS", year: "3rd Year", institution: "AIIA", skills: [{ name: "Python", confidence: 92, verified: true, source: "NPTEL Certificate" }, { name: "Research Methodology", confidence: 81, verified: true }, { name: "Data Analysis", confidence: 76, verified: true }, { name: "Scientific Writing", confidence: 64, verified: false }], verifiedSkills: 4, totalSkills: 7, certifications: 2, projects: 3, evidence: [{ type: "Certificate", title: "Python for Research", issuer: "NPTEL", date: "Jul 2025", verified: true }], roleReadiness: "Almost Ready", readinessScore: 82 }, matchScore: 92, matchedSkills: ["Python", "Research Methodology", "Data Analysis"], missingSkills: ["Scientific Writing"], stage: "shortlisted", appliedDate: "Sept 3, 2025", lastUpdated: "Sept 5, 2025", notes: "Strong technical background", interviewDate: "Sept 10, 2025" },
  { id: 2, opportunityId: 1, opportunityTitle: "Clinical Research Intern", candidate: { id: 2, name: "Meera Joshi", initials: "MJ", course: "BAMS", year: "Final Year", institution: "BHU", skills: [{ name: "Python", confidence: 85, verified: true }, { name: "Research Methodology", confidence: 88, verified: true }, { name: "Clinical Research", confidence: 78, verified: true }, { name: "Scientific Writing", confidence: 82, verified: true }], verifiedSkills: 6, totalSkills: 9, certifications: 4, projects: 5, evidence: [{ type: "Publication", title: "AYUSH Clinical Outcomes Review", issuer: "Journal of Ayurveda", date: "May 2025", verified: true }], roleReadiness: "Ready", readinessScore: 95 }, matchScore: 95, matchedSkills: ["Python", "Research Methodology", "Data Analysis", "Clinical Research"], missingSkills: [], stage: "interviewed", appliedDate: "Sept 1, 2025", lastUpdated: "Sept 6, 2025", notes: "Excellent interview", interviewDate: "Sept 6, 2025" },
  { id: 3, opportunityId: 1, opportunityTitle: "Clinical Research Intern", candidate: { id: 3, name: "Rohan Patel", initials: "RP", course: "BAMS", year: "4th Year", institution: "GAU", skills: [{ name: "Python", confidence: 70, verified: false }, { name: "Research Methodology", confidence: 75, verified: true }], verifiedSkills: 3, totalSkills: 5, certifications: 1, projects: 2, evidence: [{ type: "Project", title: "Herbal Drug Efficacy Study", issuer: "GAU", date: "Apr 2025", verified: true }], roleReadiness: "Almost Ready", readinessScore: 72 }, matchScore: 78, matchedSkills: ["Research Methodology"], missingSkills: ["Python", "Scientific Writing"], stage: "applied", appliedDate: "Sept 4, 2025", lastUpdated: "Sept 4, 2025", notes: "" },
  { id: 4, opportunityId: 2, opportunityTitle: "Research Data Assistant", candidate: { id: 4, name: "Neha Gupta", initials: "NG", course: "BSc CS", year: "3rd Year", institution: "DU", skills: [{ name: "Python", confidence: 88, verified: true }, { name: "Data Analysis", confidence: 82, verified: true }, { name: "Machine Learning", confidence: 75, verified: true }, { name: "Statistical Analysis", confidence: 80, verified: true }], verifiedSkills: 5, totalSkills: 6, certifications: 3, projects: 4, evidence: [{ type: "Portfolio", title: "Data Science Portfolio", issuer: "GitHub", date: "Aug 2025", verified: true }], roleReadiness: "Ready", readinessScore: 88 }, matchScore: 90, matchedSkills: ["Python", "Data Analysis", "Machine Learning", "Statistical Analysis"], missingSkills: [], stage: "offered", appliedDate: "Aug 25, 2025", lastUpdated: "Sept 2, 2025", notes: "Outstanding assessment" },
];

const slaTrackers: SLATracker[] = [
  { applicationId: 3, candidateName: "Rohan Patel", opportunityTitle: "Clinical Research Intern", appliedDate: "Sept 4, 2025", deadline: "Sept 11, 2025", timeRemaining: "6 days", slaStatus: "on-track", daysRemaining: 6 },
];

const analytics: IndustryAnalytics = {
  totalOpportunities: 4, activeOpportunities: 2, totalApplicants: 25,
  shortlistingRate: 32, fillRate: 75, avgTimeToHire: 14,
  pipeline: [{ stage: "Applied", count: 25 }, { stage: "Shortlisted", count: 8 }, { stage: "Interviewed", count: 5 }, { stage: "Offered", count: 3 }, { stage: "Joined", count: 2 }],
  topCandidateSkills: [{ skill: "Python", count: 18, pct: 72 }, { skill: "Research Methodology", count: 14, pct: 56 }, { skill: "Data Analysis", count: 12, pct: 48 }, { skill: "Clinical Research", count: 8, pct: 32 }],
  applicantSkillGaps: [{ skill: "Statistical Analysis", gapCount: 15, pct: 60 }, { skill: "Machine Learning", gapCount: 12, pct: 48 }],
  monthlyTrend: [{ month: "May", applicants: 8, shortlisted: 3, hired: 1 }, { month: "Jun", applicants: 12, shortlisted: 4, hired: 2 }, { month: "Jul", applicants: 15, shortlisted: 5, hired: 2 }, { month: "Aug", applicants: 22, shortlisted: 7, hired: 3 }, { month: "Sep", applicants: 25, shortlisted: 8, hired: 2 }],
  opportunityPerformance: [{ title: "Clinical Research Intern", applicants: 12, fillRate: 75, avgMatch: 85 }, { title: "Research Data Assistant", applicants: 8, fillRate: 50, avgMatch: 82 }],
};

const ratings: Rating[] = [
  { id: 1, from: "Meera Joshi", fromType: "student", to: "AIIA Research Division", toType: "industry", score: 5, feedback: "Excellent mentorship and research exposure.", date: "Aug 2025", opportunity: "Clinical Research Intern" },
  { id: 2, from: "AIIA Research Division", fromType: "industry", to: "Meera Joshi", toType: "student", score: 5, feedback: "Outstanding performance. Strong research skills.", date: "Aug 2025", opportunity: "Clinical Research Intern" },
];

const navLinks = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "profile", label: "Company Profile", icon: <Building2 size={18} /> },
  { id: "opportunities", label: "Opportunities", icon: <Briefcase size={18} />, count: 4 },
  { id: "applications", label: "Applications", icon: <FileText size={18} />, count: 4 },
  { id: "matching", label: "Candidate Matching", icon: <Users size={18} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { id: "sla", label: "SLA Tracker", icon: <Clock size={18} /> },
  { id: "ratings", label: "Ratings", icon: <Star size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

/* ─── Pixel Bar ─── */
function PxBar({ pct, segments = 18, color = "#244B35" }: { pct: number; segments?: number; color?: string }) {
  const filled = Math.round((pct / 100) * segments);
  return (
    <div className="flex gap-[3px] flex-wrap">
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} className={`w-[7px] h-[13px] ${i < filled ? "" : "bg-[#EDEBE0]"}`}
          style={i < filled ? { background: color } : undefined} />
      ))}
    </div>
  );
}
const tagCls: Record<string, string> = {
  active: "bg-[#DCE6D0] text-[#16301F]", draft: "bg-[#EDEBE0] text-[#6B6F68]",
  paused: "bg-[#E8D36B] text-[#5c4a08]", closed: "bg-[#E8C7AE] text-[#7a3f1a]",
  closing: "bg-[#E8C7AE] text-[#7a3f1a]", verified: "bg-[#DCE6D0] text-[#16301F]",
  "on-track": "bg-[#DCE6D0] text-[#16301F]", warning: "bg-[#E8D36B] text-[#5c4a08]",
  overdue: "bg-[#E8C7AE] text-[#7a3f1a]", applied: "bg-[#EDEBE0] text-[#6B6F68]",
  shortlisted: "bg-[#E8D36B] text-[#5c4a08]", interviewed: "bg-[#C8B5DE] text-[#4d3a74]",
  offered: "bg-[#DCE6D0] text-[#16301F]", joined: "bg-[#244B35] text-white",
  rejected: "bg-[#E8C7AE] text-[#7a3f1a]",
};
function Tag({ cls, children }: { cls: string; children: React.ReactNode }) {
  return <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest uppercase px-2 py-[3px] rounded-md whitespace-nowrap ${tagCls[cls] || cls}`}>{children}</span>;
}
function Eyebrow({ color, children }: { color?: string; children: React.ReactNode }) {
  return <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase inline-flex items-center gap-2" style={{ color: color || "#9A9D94" }}><span className="w-[7px] h-[7px] bg-[#171A18] opacity-85" style={{ boxShadow: "0 7px 0 -2px #F7F6F0" }} />{children}</span>;
}
function LinkMore({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className="font-mono text-xs font-bold text-[#244B35] tracking-wide inline-flex items-center gap-1.5 hover:gap-3 transition-all mt-3">{children}</button>;
}

/* ─── Sidebar Content ─── */
function SidebarContent({ activeNav, setActiveNav }: { activeNav: string; setActiveNav: (id: string) => void }) {
  const { open } = useSidebar();
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className={open ? "" : "flex justify-center"}>{open ? <Logo /> : <LogoIcon />}</div>
        <div className="mt-8 flex flex-col gap-[2px]">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => setActiveNav(link.id)}
              className={`flex items-center gap-3 w-full text-left rounded-xl text-sm font-medium transition-colors ${open ? "px-3 py-2.5" : "px-0 py-2.5 justify-center"} ${activeNav === link.id ? "bg-[#244B35] text-white font-semibold" : "text-[#6B6F68] hover:bg-[#EDEBE0] hover:text-[#171A18]"}`}>
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
        {open && <div className="mt-3 p-3 rounded-xl border" style={{ background: "#F7F6F0", borderColor: "#E6E3D7" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" style={{ background: "#244B35", color: "#DCE6D0" }}>{company.initials}</div>
            <div className="min-w-0"><div className="font-semibold text-sm truncate" style={{ color: "#171A18" }}>{company.name}</div><div className="text-[11px] font-mono" style={{ color: "#6B6F68" }}>Industry Partner</div></div>
          </div>
        </div>}
        {!open && <div className="flex justify-center mt-3"><div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: "#244B35", color: "#DCE6D0" }}>{company.initials}</div></div>}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Overview
   ═══════════════════════════════════════════════════════ */
function OverviewSection() {
  return (
    <>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="col-span-12 rounded-[20px] p-7 overflow-hidden relative" style={{ background: "linear-gradient(135deg, #244B35 0%, #1C3D2B 40%, #1A3626 100%)", color: "#F7F6F0", boxShadow: "0 8px 32px rgba(36,75,53,.18), inset 0 1px 0 rgba(220,230,208,.12)" }}>
        <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none"><div className="grid grid-cols-6 gap-[6px]">{Array.from({length:36},(_,i)=><div key={i} className="w-[5px] h-[5px] bg-white rounded-[1px]" />)}</div></div>
        <div className="absolute bottom-4 left-4 opacity-[0.04] pointer-events-none"><div className="grid grid-cols-4 gap-[5px]">{Array.from({length:16},(_,i)=><div key={i} className="w-[4px] h-[4px] bg-[#E8D36B] rounded-[1px]" />)}</div></div>
        <div className="absolute right-3.5 bottom-3.5 w-16 h-16 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#DCE6D0 1px,transparent 1px)", backgroundSize: "8px 8px" }} />
        <div className="flex items-start gap-6">
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: "#DCE6D0" }}><span className="inline-block w-[7px] h-[7px] bg-[#DCE6D0] mr-2 opacity-85" style={{ boxShadow: "0 7px 0 -2px #244B35" }} />Industry Dashboard</span>
            <h2 className="font-bold text-[clamp(24px,3vw,36px)] tracking-tight leading-tight mt-4 mb-3">Your recruitment pipeline for <em className="not-italic" style={{ color: "#E8D36B" }}>AYUSH talent.</em></h2>
            <p className="text-[14px] max-w-[42ch] mb-6" style={{ color: "rgba(220,230,208,.75)" }}>{analytics.totalApplicants} applicants across {opportunities.length} opportunities. {slaTrackers.length} applications need attention.</p>
            <div className="flex items-center gap-6 flex-wrap">
              {[{ label: "Active Opportunities", value: analytics.activeOpportunities, color: "#DCE6D0" }, { label: "Total Applicants", value: analytics.totalApplicants, color: "#E8D36B" }, { label: "Fill Rate", value: `${analytics.fillRate}%`, color: "#E8C7AE" }].map((s) => (
                <div key={s.label}><div className="font-bold text-3xl leading-none" style={{ color: s.color }}>{s.value}</div><div className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(220,230,208,.55)" }}>{s.label}</div></div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex flex-col flex-shrink-0 w-[180px]">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(220,230,208,.55)" }}>Quick Stats</div>
            {[{ label: "Shortlisting Rate", val: `${analytics.shortlistingRate}%` }, { label: "Avg Time to Hire", val: `${analytics.avgTimeToHire} days` }, { label: "Company", val: company.name.split(" ")[0] }].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5"><span className="text-[12px]" style={{ color: "rgba(220,230,208,.6)" }}>{item.label}</span><span className="font-semibold text-[12px]" style={{ color: "#F7F6F0" }}>{item.val}</span></div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{ label: "Opportunities", value: analytics.totalOpportunities, color: "#244B35", bg: "#DCE6D0", accent: "#244B35" }, { label: "Applicants", value: analytics.totalApplicants, color: "#C98B5F", bg: "#F0E8DD", accent: "#C98B5F" }, { label: "Shortlisting Rate", value: `${analytics.shortlistingRate}%`, color: "#171A18", bg: "#EDEBE0", accent: "#C98B5F" }, { label: "Avg Time to Hire", value: `${analytics.avgTimeToHire}d`, color: "#8A6FB8", bg: "#EAE3F4", accent: "#8A6FB8" }].map((s) => (
          <div key={s.label} className="rounded-[14px] px-5 py-4 text-center border-l-[3px] hover:shadow-md transition-shadow" style={{ background: s.bg, borderLeftColor: s.accent }}><div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "#6B6F68" }}>{s.label}</div><div className="font-bold text-3xl tracking-tight leading-none" style={{ color: s.color }}>{s.value}</div></div>
        ))}
      </motion.div>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="col-span-12 lg:col-span-8 rounded-[20px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow>Applications</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Recent Applications</div>
        {applications.slice(0, 3).map((app) => (
          <div key={app.id} className="flex items-center gap-3 py-3 border-b last:border-b-0" style={{ borderColor: "#EDEBE0" }}>
            <div className="w-9 h-9 rounded-lg grid place-items-center font-bold text-xs flex-shrink-0" style={{ background: "#EDEBE0", color: "#171A18" }}>{app.candidate.initials}</div>
            <div className="flex-1 min-w-0"><div className="font-semibold text-[13px] truncate">{app.candidate.name}</div><div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{app.opportunityTitle} / {app.candidate.institution}</div></div>
            <div className="text-right flex-shrink-0"><div className="font-bold text-sm" style={{ color: app.matchScore >= 90 ? "#244B35" : "#C98B5F" }}>{app.matchScore}%</div></div>
            <Tag cls={app.stage}>{app.stage}</Tag>
          </div>
        ))}
        <LinkMore>View all applications</LinkMore>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="col-span-12 lg:col-span-4 rounded-[20px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">SLA Alerts</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Response Deadlines</div>
        {slaTrackers.length === 0 ? <div className="text-[13px]" style={{ color: "#9A9D94" }}>No pending SLA alerts</div> : slaTrackers.map((sla) => (
          <div key={sla.applicationId} className="p-3 rounded-xl border mb-3" style={{ borderColor: sla.slaStatus === "warning" ? "#E8D36B" : "#E6E3D7" }}>
            <div className="font-semibold text-[13px]">{sla.candidateName}</div>
            <div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{sla.opportunityTitle}</div>
            <div className="flex items-center justify-between mt-2"><Tag cls={sla.slaStatus}>{sla.slaStatus}</Tag><span className="font-mono text-[11px] font-bold" style={{ color: sla.daysRemaining <= 3 ? "#C98B5F" : "#6B6F68" }}>{sla.timeRemaining}</span></div>
          </div>
        ))}
        <LinkMore>View SLA dashboard</LinkMore>
      </motion.section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Company Profile
   ═══════════════════════════════════════════════════════ */
function ProfileSection() {
  return (
    <>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="col-span-12 lg:col-span-8 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow>Company</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Organization Profile</div>
        <div className="flex items-start gap-5 mb-6">
          <div className="w-[72px] h-[72px] rounded-2xl grid place-items-center font-bold text-xl flex-shrink-0" style={{ background: "#244B35", color: "#DCE6D0" }}>{company.initials}</div>
          <div className="flex-1">
            <div className="font-bold text-xl tracking-tight">{company.name}</div>
            <div className="font-mono text-xs" style={{ color: "#6B6F68" }}>{company.orgType} / {company.domain}</div>
            <div className="flex items-center gap-2 mt-2"><Tag cls="verified">Verified Partner</Tag><span className="font-mono text-[11px]" style={{ color: "#9A9D94" }}>Since {company.foundedYear}</span></div>
          </div>
        </div>
        <p className="text-[13px] mb-5" style={{ color: "#6B6F68" }}>{company.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ label: "Location", value: company.location }, { label: "Website", value: company.website }, { label: "Contact Person", value: company.contactPerson }, { label: "Email", value: company.email }, { label: "Phone", value: company.phone }, { label: "Size", value: company.size }].map((f) => (
            <div key={f.label} className="border rounded-xl p-3" style={{ borderColor: "#E6E3D7" }}><div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#9A9D94" }}>{f.label}</div><div className="font-semibold text-sm">{f.value}</div></div>
          ))}
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="col-span-12 lg:col-span-4 rounded-[20px] border p-6 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow>Recruitment</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Recruitment Stats</div>
        <div className="flex flex-col gap-3">
          {[{ label: "Opportunities Posted", val: analytics.totalOpportunities, icon: <Briefcase size={16} /> }, { label: "Total Applicants", val: analytics.totalApplicants, icon: <Users size={16} /> }, { label: "Fill Rate", val: `${analytics.fillRate}%`, icon: <TrendingUp size={16} /> }, { label: "Avg Time to Hire", val: `${analytics.avgTimeToHire} days`, icon: <Clock size={16} /> }].map((s) => (
            <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: "#E6E3D7" }}><div className="w-8 h-8 rounded-lg grid place-items-center" style={{ background: "#DCE6D0", color: "#244B35" }}>{s.icon}</div><div className="flex-1 font-medium text-sm">{s.label}</div><div className="font-bold">{s.val}</div></div>
          ))}
        </div>
      </motion.section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Opportunities
   ═══════════════════════════════════════════════════════ */
function OpportunitiesSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
      <div className="flex items-center justify-between mb-5">
        <div><Eyebrow>Opportunities</Eyebrow><div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Manage Opportunities</div><div className="text-[13px]" style={{ color: "#6B6F68" }}>{opportunities.length} total / {opportunities.filter(o => o.status === "active").length} active</div></div>
        <button className="inline-flex items-center gap-1.5 font-semibold text-[13px] px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: "linear-gradient(135deg, #244B35, #1C3D2B)", color: "#F7F6F0" }}><Plus size={14} /> Post opportunity</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {opportunities.map((opp) => (
          <div key={opp.id} className="border rounded-[14px] p-5 transition-all hover:shadow-md hover:-translate-y-0.5" style={{ borderColor: opp.status === "active" ? "#244B35" : "#E6E3D7" }}>
            <div className="flex items-start justify-between mb-2">
              <div><div className="font-bold text-[15px] tracking-tight">{opp.title}</div><div className="font-mono text-[11px] mt-0.5" style={{ color: "#6B6F68" }}>{opp.type} / {opp.workArrangement}</div></div>
              <Tag cls={opp.status}>{opp.status}</Tag>
            </div>
            <p className="text-[12px] mb-3 line-clamp-2" style={{ color: "#6B6F68" }}>{opp.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {opp.requiredSkills.slice(0, 3).map((sk) => <span key={sk.skill} className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${sk.required === "essential" ? "bg-[#DCE6D0] text-[#16301F]" : "bg-[#EDEBE0] text-[#6B6F68]"}`}>{sk.skill}</span>)}
              {opp.requiredSkills.length > 3 && <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#EDEBE0] text-[#6B6F68]">+{opp.requiredSkills.length - 3}</span>}
            </div>
            <div className="flex gap-3 font-mono text-[11px]" style={{ color: "#6B6F68" }}>
              <span className="inline-flex items-center gap-1"><MapPin size={11} /> {opp.location}</span>
              <span className="inline-flex items-center gap-1"><Calendar size={11} /> {opp.duration}</span>
              <span className="inline-flex items-center gap-1"><Users size={11} /> {opp.totalApplicants}</span>
            </div>
            {opp.blindShortlisting && <div className="mt-2"><Tag cls="lavender">Blind Shortlisting</Tag></div>}
            <div className="flex gap-2 mt-3">
              <button className="flex-1 font-semibold text-[11px] py-2 rounded-xl border transition-all hover:bg-[#EFEDE3]" style={{ borderColor: "#E6E3D7" }}>Edit</button>
              <button className="font-semibold text-[11px] px-3 py-2 rounded-xl border transition-all hover:bg-[#EFEDE3]" style={{ borderColor: "#E6E3D7" }}>{opp.status === "active" ? <Pause size={12} /> : <Play size={12} />}</button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Applications
   ═══════════════════════════════════════════════════════ */
function ApplicationsSection() {
  const stageColors: Record<string, string> = { applied: "#6B6F68", shortlisted: "#B99A22", interviewed: "#8A6FB8", offered: "#244B35", joined: "#244B35" };
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
      <Eyebrow>Applications</Eyebrow>
      <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Application Pipeline</div>
      <div className="flex items-center gap-0 mb-6 px-2">
        {["Applied", "Shortlisted", "Interviewed", "Offered", "Joined"].map((s, i) => (
          <div key={s} className="flex items-center flex-1"><div className="text-center flex-1"><div className="w-8 h-8 mx-auto rounded-lg grid place-items-center font-bold text-xs mb-1" style={{ background: i < 3 ? "#244B35" : "#EDEBE0", color: i < 3 ? "#DCE6D0" : "#9A9D94" }}>{i < 3 ? "✓" : i + 1}</div><div className="font-mono text-[10px] font-bold" style={{ color: i < 3 ? "#244B35" : "#9A9D94" }}>{s}</div></div>{i < 4 && <div className="h-0.5 flex-1 -mt-4" style={{ background: i < 2 ? "#244B35" : "#E6E3D7" }} />}</div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {applications.map((app) => (
          <div key={app.id} className="border rounded-[14px] p-5" style={{ borderColor: "#E6E3D7" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm" style={{ background: "#EDEBE0", color: "#171A18" }}>{app.candidate.initials}</div>
                <div><div className="font-bold text-[15px]">{app.candidate.name}</div><div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{app.candidate.course} / {app.candidate.institution}</div></div>
              </div>
              <div className="text-right"><div className="font-bold text-xl" style={{ color: app.matchScore >= 90 ? "#244B35" : "#C98B5F" }}>{app.matchScore}%</div><div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>match</div></div>
            </div>
            <div className="font-mono text-[11px] mb-2" style={{ color: "#6B6F68" }}>{app.opportunityTitle}</div>
            <div className="flex flex-wrap gap-1 mb-3">
              {app.matchedSkills.map((s) => <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#DCE6D0] text-[#16301F]">✓ {s}</span>)}
              {app.missingSkills.map((s) => <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#E8C7AE] text-[#7a3f1a]">{s}</span>)}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Tag cls={app.stage}>{app.stage}</Tag>
              <span className="font-mono text-[11px]" style={{ color: "#9A9D94" }}>Applied {app.appliedDate}</span>
              {app.interviewDate && <span className="font-mono text-[11px]" style={{ color: "#8A6FB8" }}>Interview: {app.interviewDate}</span>}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: "#EDEBE0" }}>
              <div className="w-8 h-8 rounded-lg grid place-items-center" style={{ background: app.candidate.roleReadiness === "Ready" ? "#DCE6D0" : app.candidate.roleReadiness === "Almost Ready" ? "#E8D36B" : "#E8C7AE", color: app.candidate.roleReadiness === "Ready" ? "#16301F" : app.candidate.roleReadiness === "Almost Ready" ? "#5c4a08" : "#7a3f1a" }}>
                {app.candidate.roleReadiness === "Ready" ? <Check size={14} /> : <Target size={14} />}
              </div>
              <div className="flex-1"><div className="font-semibold text-[12px]">{app.candidate.roleReadiness}</div><div className="font-mono text-[10px]" style={{ color: "#9A9D94" }}>Readiness: {app.candidate.readinessScore}%</div></div>
              <div className="flex gap-1.5">
                {app.stage === "applied" && <button onClick={() => industryApi.shortlistCandidate(app.id)} className="font-semibold text-[11px] px-3 py-1.5 rounded-lg transition-all" style={{ background: "#DCE6D0", color: "#16301F" }}>Shortlist</button>}
                {app.stage === "shortlisted" && <button className="font-semibold text-[11px] px-3 py-1.5 rounded-lg transition-all" style={{ background: "#C8B5DE", color: "#4d3a74" }}>Interview</button>}
                {app.stage === "interviewed" && <button className="font-semibold text-[11px] px-3 py-1.5 rounded-lg transition-all" style={{ background: "#E8D36B", color: "#5c4a08" }}>Make Offer</button>}
                <button className="font-semibold text-[11px] px-3 py-1.5 rounded-lg border transition-all" style={{ borderColor: "#E6E3D7" }}>View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Candidate Matching
   ═══════════════════════════════════════════════════════ */
function MatchingSection() {
  const sorted = [...applications].sort((a, b) => b.matchScore - a.matchScore);
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
      <Eyebrow>Matching</Eyebrow>
      <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Ranked Candidate Recommendations</div>
      <div className="text-[13px] mb-5" style={{ color: "#6B6F68" }}>Sorted by semantic skill-to-role match score</div>
      <div className="flex flex-col gap-4">
        {sorted.map((app, idx) => (
          <div key={app.id} className="border rounded-[14px] p-5 transition-all hover:shadow-md hover:-translate-y-0.5" style={{ borderColor: idx === 0 ? "#244B35" : "#E6E3D7", boxShadow: idx === 0 ? "0 2px 8px rgba(36,75,53,.08)" : undefined }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm" style={{ background: idx === 0 ? "#244B35" : "#EDEBE0", color: idx === 0 ? "#DCE6D0" : "#171A18" }}>{app.candidate.initials}</div>
              <div className="flex-1 min-w-0"><div className="font-bold text-[15px]">{app.candidate.name}</div><div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{app.candidate.course} / {app.candidate.year} / {app.candidate.institution}</div></div>
              <div className="text-right"><div className="font-bold text-2xl" style={{ color: app.matchScore >= 90 ? "#244B35" : app.matchScore >= 80 ? "#C98B5F" : "#B99A22" }}>{app.matchScore}%</div><div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>match</div></div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3 text-center">
              <div className="rounded-lg p-2" style={{ background: "#EFEDE3" }}><div className="font-bold text-lg" style={{ color: "#244B35" }}>{app.candidate.verifiedSkills}</div><div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>Verified</div></div>
              <div className="rounded-lg p-2" style={{ background: "#EFEDE3" }}><div className="font-bold text-lg" style={{ color: "#8A6FB8" }}>{app.candidate.certifications}</div><div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>Certs</div></div>
              <div className="rounded-lg p-2" style={{ background: "#EFEDE3" }}><div className="font-bold text-lg" style={{ color: "#C98B5F" }}>{app.candidate.readinessScore}%</div><div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>Readiness</div></div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {app.matchedSkills.map((s) => <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#DCE6D0] text-[#16301F]">✓ {s}</span>)}
              {app.missingSkills.map((s) => <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#E8C7AE] text-[#7a3f1a] line-through">{s}</span>)}
            </div>
            <div className="flex items-center gap-2">
              <Tag cls={app.candidate.roleReadiness === "Ready" ? "active" : app.candidate.roleReadiness === "Almost Ready" ? "warning" : "closing"}>{app.candidate.roleReadiness}</Tag>
              <span className="font-mono text-[11px]" style={{ color: "#9A9D94" }}>{app.candidate.evidence.length} evidence items</span>
              <button className="ml-auto font-semibold text-[12px] px-3 py-1.5 rounded-xl border transition-all hover:bg-[#EFEDE3]" style={{ borderColor: "#E6E3D7" }}>Full profile</button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Analytics
   ═══════════════════════════════════════════════════════ */
function AnalyticsSection() {
  return (
    <>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="col-span-12 lg:col-span-7 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #8A6FB8, #C8B5DE)" }} />
        <Eyebrow>Pipeline</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Application Pipeline</div>
        <div className="flex items-end gap-3 h-[200px] mb-4">
          {analytics.pipeline.map((p) => {
            const max = Math.max(...analytics.pipeline.map(x => x.count));
            const h = (p.count / max) * 100;
            return <div key={p.stage} className="flex-1 flex flex-col items-center gap-1"><div className="w-full rounded-t-lg transition-all" style={{ height: `${h}%`, background: p.stage === "Applied" ? "#244B35" : p.stage === "Shortlisted" ? "#B99A22" : p.stage === "Interviewed" ? "#8A6FB8" : p.stage === "Offered" ? "#C98B5F" : "#DCE6D0" }} /><div className="font-mono text-[9px] tracking-widest uppercase text-center" style={{ color: "#9A9D94" }}>{p.stage}</div><div className="font-bold text-sm">{p.count}</div></div>;
          })}
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="col-span-12 lg:col-span-5 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#B99A22">Skill Gaps</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Applicant Skill Gaps</div>
        {analytics.applicantSkillGaps.map((g) => (
          <div key={g.skill} className="mb-4"><div className="flex items-baseline justify-between mb-1.5"><span className="font-semibold text-sm">{g.skill}</span><span className="font-mono text-xs" style={{ color: "#6B6F68" }}>{g.gapCount} applicants ({g.pct}%)</span></div><PxBar pct={g.pct} segments={16} color="#C98B5F" /></div>
        ))}
        <div className="mt-4 pt-3 border-t" style={{ borderColor: "#EDEBE0" }}>
          <div className="font-semibold text-sm mb-1">Recommendation</div>
          <div className="text-[12px]" style={{ color: "#6B6F68" }}>Consider adding <b style={{ color: "#171A18" }}>Statistical Analysis</b> as a preferred skill to attract more prepared candidates.</div>
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="col-span-12 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #E8D36B, #C98B5F, #8A6FB8)" }} />
        <Eyebrow>Performance</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Opportunity Performance</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.opportunityPerformance.map((opp) => (
            <div key={opp.title} className="border rounded-[14px] p-5" style={{ borderColor: "#E6E3D7" }}>
              <div className="font-bold text-[14px] mb-2">{opp.title}</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><div className="font-bold text-lg" style={{ color: "#244B35" }}>{opp.applicants}</div><div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>Applicants</div></div>
                <div><div className="font-bold text-lg" style={{ color: "#C98B5F" }}>{opp.fillRate}%</div><div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>Fill Rate</div></div>
                <div><div className="font-bold text-lg" style={{ color: "#8A6FB8" }}>{opp.avgMatch}%</div><div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>Avg Match</div></div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: SLA Tracker
   ═══════════════════════════════════════════════════════ */
function SLASection() {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
      <Eyebrow color="#C98B5F">SLA Tracker</Eyebrow>
      <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Application Response SLA</div>
      <div className="text-[13px] mb-5" style={{ color: "#6B6F68" }}>Track response deadlines for pending applications</div>
      {slaTrackers.length === 0 ? (
        <div className="text-center py-8"><Check size={32} style={{ color: "#244B35", margin: "0 auto 8px" }} /><div className="font-semibold text-sm">All caught up!</div><div className="text-[13px]" style={{ color: "#9A9D94" }}>No pending SLA deadlines</div></div>
      ) : (
        <div className="flex flex-col gap-3">
          {slaTrackers.map((sla) => (
            <div key={sla.applicationId} className="flex items-center gap-4 p-4 rounded-[14px] border" style={{ borderColor: sla.slaStatus === "warning" ? "#E8D36B" : sla.slaStatus === "overdue" ? "#E8C7AE" : "#E6E3D7" }}>
              <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: sla.slaStatus === "on-track" ? "#DCE6D0" : sla.slaStatus === "warning" ? "#E8D36B" : "#E8C7AE", color: sla.slaStatus === "on-track" ? "#16301F" : sla.slaStatus === "warning" ? "#5c4a08" : "#7a3f1a" }}>
                {sla.slaStatus === "overdue" ? <AlertTriangle size={18} /> : <Clock size={18} />}
              </div>
              <div className="flex-1"><div className="font-semibold text-[14px]">{sla.candidateName}</div><div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{sla.opportunityTitle}</div></div>
              <div className="text-right"><div className="font-mono text-[11px] font-bold" style={{ color: sla.daysRemaining <= 3 ? "#C98B5F" : "#6B6F68" }}>{sla.timeRemaining}</div><div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>Deadline: {sla.deadline}</div></div>
              <Tag cls={sla.slaStatus}>{sla.slaStatus}</Tag>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 pt-4 border-t" style={{ borderColor: "#EDEBE0" }}>
        <div className="font-semibold text-sm mb-1">SLA Policy</div>
        <div className="text-[12px]" style={{ color: "#6B6F68" }}>Applications must be reviewed within <b style={{ color: "#171A18" }}>7 days</b> of submission. Overdue applications are automatically flagged and students are notified.</div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Ratings
   ═══════════════════════════════════════════════════════ */
function RatingsSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#DED6EC", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #E8D36B, #C98B5F)" }} />
      <Eyebrow>Ratings</Eyebrow>
      <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Two-Way Ratings & Feedback</div>
      <div className="text-[13px] mb-5" style={{ color: "#6B6F68" }}>Mutual feedback after internship completion</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ratings.map((r) => (
          <div key={r.id} className="border rounded-[14px] p-5" style={{ borderColor: "#E6E3D7" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg grid place-items-center font-bold text-[10px]" style={{ background: r.fromType === "student" ? "#EDEBE0" : "#244B35", color: r.fromType === "student" ? "#171A18" : "#DCE6D0" }}>{r.fromType === "student" ? r.from.split(" ").map(w => w[0]).join("") : company.initials}</div>
                <div><div className="font-semibold text-[13px]">{r.from}</div><div className="font-mono text-[10px]" style={{ color: "#9A9D94" }}>{r.fromType}</div></div>
              </div>
              <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} style={{ color: i < r.score ? "#E8D36B" : "#EDEBE0", fill: i < r.score ? "#E8D36B" : "none" }} />)}</div>
            </div>
            <p className="text-[13px] mb-2" style={{ color: "#6B6F68" }}>{r.feedback}</p>
            <div className="font-mono text-[10px]" style={{ color: "#9A9D94" }}>{r.opportunity} / {r.date}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Settings
   ═══════════════════════════════════════════════════════ */
function SettingsSection() {
  const [name, setName] = useState(company.name);
  const [email, setEmail] = useState(company.email);
  const [phone, setPhone] = useState(company.phone);
  const [website, setWebsite] = useState(company.website);
  const [location, setLocation] = useState(company.location);
  const [description, setDescription] = useState(company.description);
  const [contactPerson, setContactPerson] = useState(company.contactPerson);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifApp, setNotifApp] = useState(true);
  const [notifNewApp, setNotifNewApp] = useState(true);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const inputCls = "w-full border rounded-xl px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-[#244B35]";
  const inputStyle = { borderColor: "#E6E3D7", background: "#FAF9F5", color: "#171A18" };
  const labelCls = "font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5 block";
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button type="button" onClick={() => onChange(!checked)} className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0" style={{ background: checked ? "#244B35" : "#D9D6CC" }}><span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }} /></button>
  );
  return (
    <>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="col-span-12 lg:col-span-8 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#D6E3CE", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #244B35, #DCE6D0)" }} />
        <Eyebrow>Account</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Company Information</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Organization Name</label><input className={inputCls} style={inputStyle} value={name} onChange={e => setName(e.target.value)} /></div>
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Email</label><input className={inputCls} style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Phone</label><input className={inputCls} style={inputStyle} type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Website</label><input className={inputCls} style={inputStyle} value={website} onChange={e => setWebsite(e.target.value)} /></div>
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Location</label><input className={inputCls} style={inputStyle} value={location} onChange={e => setLocation(e.target.value)} /></div>
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Contact Person</label><input className={inputCls} style={inputStyle} value={contactPerson} onChange={e => setContactPerson(e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={labelCls} style={{ color: "#6B6F68" }}>Description</label><textarea className={inputCls + " resize-none"} style={{ ...inputStyle, minHeight: 80 }} value={description} onChange={e => setDescription(e.target.value)} /></div>
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="col-span-12 lg:col-span-4 rounded-[20px] border p-7 bg-white relative overflow-hidden" style={{ borderColor: "#E6DDD5", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #C98B5F, #E8D36B)" }} />
        <Eyebrow color="#C98B5F">Notifications</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Alerts</div>
        <div className="flex flex-col gap-5">
          {[{ label: "Email notifications", desc: "Application alerts via email", checked: notifEmail, onChange: setNotifEmail }, { label: "Push notifications", desc: "Real-time alerts", checked: notifApp, onChange: setNotifApp }, { label: "New application alerts", desc: "When students apply", checked: notifNewApp, onChange: setNotifNewApp }].map((n) => (
            <div key={n.label} className="flex items-center gap-4"><div className="flex-1"><div className="font-semibold text-[13px]" style={{ color: "#171A18" }}>{n.label}</div><div className="text-[11px]" style={{ color: "#9A9D94" }}>{n.desc}</div></div><Toggle checked={n.checked} onChange={n.onChange} /></div>
          ))}
        </div>
      </motion.section>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="col-span-12 flex items-center justify-between">
        <div className="text-[12px] font-mono" style={{ color: "#9A9D94" }}>Connect a backend to persist settings.</div>
        <button onClick={handleSave} className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: saved ? "#DCE6D0" : "#244B35", color: saved ? "#16301F" : "#F7F6F0" }}>{saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save changes</>}</button>
      </motion.div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════════════════ */
export default function IndustryDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");

  const renderSection = () => {
    switch (activeNav) {
      case "overview": return <OverviewSection />;
      case "profile": return <ProfileSection />;
      case "opportunities": return <OpportunitiesSection />;
      case "applications": return <ApplicationsSection />;
      case "matching": return <MatchingSection />;
      case "analytics": return <AnalyticsSection />;
      case "sla": return <SLASection />;
      case "ratings": return <RatingsSection />;
      case "settings": return <SettingsSection />;
      default: return <OverviewSection />;
    }
  };

  const pageTitle: Record<string, string> = {
    overview: "Industry Dashboard", profile: "Company Profile", opportunities: "Opportunities",
    applications: "Applications", matching: "Candidate Matching", analytics: "Analytics",
    sla: "SLA Tracker", ratings: "Ratings", settings: "Settings",
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F7F6F0", color: "#171A18" }}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="justify-between gap-10">
          <SidebarContent activeNav={activeNav} setActiveNav={setActiveNav} />
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 flex items-center gap-4 px-7 py-5 border-b" style={{ background: "rgba(247,246,240,.86)", backdropFilter: "blur(10px)", borderColor: "#E6E3D7" }}>
          <div>
            <div className="font-bold text-[22px] tracking-tight">
              {activeNav === "overview" ? <>{company.name.split(" ")[0]} Dashboard</> : <span style={{ color: "#171A18" }}>{pageTitle[activeNav]}</span>}
            </div>
            <div className="text-[13px]" style={{ color: "#6B6F68" }}>{activeNav === "overview" ? "Recruitment overview and pipeline status" : `${company.name} / ${company.domain}`}</div>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-white" style={{ borderColor: "#E6E3D7", width: 210 }}><Search size={16} style={{ color: "#9A9D94", flexShrink: 0 }} /><input type="text" placeholder="Search candidates..." className="border-none outline-none bg-transparent flex-1 text-[13px]" /></div>
            <button className="relative w-10 h-10 rounded-xl border bg-white grid place-items-center hover:bg-[#EFEDE3] transition-colors" style={{ borderColor: "#E6E3D7" }}><Bell size={18} /><span className="absolute top-2 right-2 w-[7px] h-[7px] rounded-full" style={{ background: "#C98B5F" }} /></button>
            <div className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm cursor-pointer" style={{ background: "#244B35", color: "#DCE6D0" }}>{company.initials}</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-7 pb-16">
          <div className="grid grid-cols-12 gap-5 max-w-[1400px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeNav} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                className="col-span-12 grid grid-cols-12 gap-5">
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
