import { useState, useEffect } from "react";
import { Sidebar, SidebarBody, Logo, LogoIcon, useSidebar } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, UserCog, Shield, Target, Zap, Briefcase,
  FileText, Star, Grid3X3, Settings, LogOut, Search, Bell,
  Upload, TrendingUp, ChevronRight, BookOpen, Award, Check,
  Calendar, MapPin, Clock, ExternalLink, Edit3, Camera,
  Users, ClipboardCheck, BarChart3, Eye, AlertTriangle,
  Save, Mail, Key, Globe, Smartphone, Trash2, Lock, BellRing,
} from "lucide-react";

/* ─── Mock Data (structured for REST API swap) ─── */
const faculty = {
  name: "Dr. Priya Mehta", initials: "PM", title: "Professor of Ayurveda & Research",
  department: "Department of Ayurveda", institution: "All India Institute of Ayurveda",
  email: "priya.mehta@aiia.ac.in", phone: "+91 98765 12345",
  bio: "Professor with 12 years of experience in clinical research, AYUSH studies, and mentorship. Specializing in evidence-based Ayurvedic research methodologies.",
  studentsCount: 24, pendingReviews: 7, opportunitiesPosted: 3, verifiedStudents: 18,
};

const students = [
  { id: 1, name: "Aarav Sharma", initials: "AS", course: "BAMS", year: "3rd Year", skills: 7, verified: 4, match: 92, status: "active" as const, lastActive: "2 hours ago" },
  { id: 2, name: "Neha Gupta", initials: "NG", course: "BAMS", year: "2nd Year", skills: 5, verified: 3, match: 78, status: "active" as const, lastActive: "1 day ago" },
  { id: 3, name: "Rohan Patel", initials: "RP", course: "BAMS", year: "4th Year", skills: 9, verified: 7, match: 88, status: "active" as const, lastActive: "5 hours ago" },
  { id: 4, name: "Ananya Reddy", initials: "AR", course: "BAMS", year: "3rd Year", skills: 6, verified: 5, match: 85, status: "pending" as const, lastActive: "3 days ago" },
  { id: 5, name: "Vikram Singh", initials: "VS", course: "BAMS", year: "2nd Year", skills: 4, verified: 2, match: 65, status: "active" as const, lastActive: "12 hours ago" },
  { id: 6, name: "Meera Joshi", initials: "MJ", course: "BAMS", year: "Final Year", skills: 11, verified: 9, match: 95, status: "active" as const, lastActive: "30 min ago" },
];

const pendingEvidence = [
  { id: 1, student: "Aarav Sharma", initials: "AS", name: "Research Project Report", type: "Project", submitted: "Sept 3, 2025", status: "pending" as const },
  { id: 2, student: "Neha Gupta", initials: "NG", name: "Clinical Posting Certificate", type: "Certificate", submitted: "Sept 2, 2025", status: "pending" as const },
  { id: 3, student: "Rohan Patel", initials: "RP", name: "NPTEL Course Certificate", type: "Certificate", submitted: "Sept 1, 2025", status: "pending" as const },
  { id: 4, student: "Ananya Reddy", initials: "AR", name: "Academic Transcript", type: "Transcript", submitted: "Aug 30, 2025", status: "flagged" as const },
  { id: 5, student: "Vikram Singh", initials: "VS", name: "Workshop Attendance", type: "Certificate", submitted: "Aug 28, 2025", status: "pending" as const },
];

const postedOpportunities = [
  { id: 1, title: "Clinical Research Intern", org: "AIIA / Research Division", location: "New Delhi", duration: "3 Months", applicants: 12, match: 92, status: "active" as const },
  { id: 2, title: "AYUSH Research Internship", org: "NIA / Jaipur", location: "Jaipur", duration: "2 Months", applicants: 8, match: 78, status: "active" as const },
  { id: 3, title: "Public Health Analyst Intern", org: "MoHFW / Delhi", location: "New Delhi", duration: "4 Months", applicants: 5, match: 72, status: "closing" as const },
];

const applicationsToReview = [
  { id: 1, student: "Aarav Sharma", initials: "AS", role: "Clinical Research Intern", org: "AIIA / Research Division", match: 92, applied: "Sept 3, 2025", status: "new" as const },
  { id: 2, student: "Neha Gupta", initials: "NG", role: "AYUSH Research Internship", org: "NIA / Jaipur", match: 78, applied: "Sept 2, 2025", status: "reviewed" as const },
  { id: 3, student: "Rohan Patel", initials: "RP", role: "Clinical Research Intern", org: "AIIA / Research Division", match: 88, applied: "Sept 1, 2025", status: "shortlisted" as const },
  { id: 4, student: "Meera Joshi", initials: "MJ", role: "Public Health Analyst Intern", org: "MoHFW / Delhi", match: 95, applied: "Aug 30, 2025", status: "new" as const },
];

const analytics = {
  avgSkills: 7.2, avgMatch: 83, topSkill: "Python", weakSkill: "Statistical Analysis",
  skillDistribution: [
    { name: "Python", count: 18, pct: 75 },
    { name: "Research", count: 16, pct: 67 },
    { name: "Data Analysis", count: 14, pct: 58 },
    { name: "Machine Learning", count: 10, pct: 42 },
    { name: "Clinical Research", count: 8, pct: 33 },
    { name: "Statistical Analysis", count: 6, pct: 25 },
    { name: "Scientific Writing", count: 9, pct: 38 },
  ],
  gapSeverity: { high: 3, medium: 5, low: 8 },
};

const recommendations = [
  { title: "Statistics for Health Research", type: "Course", students: 5, gap: "Statistical Analysis", provider: "NPTEL" },
  { title: "Scientific Writing Fundamentals", type: "Course", students: 4, gap: "Scientific Writing", provider: "Coursera" },
  { title: "Research Methods in Healthcare", type: "Course", students: 3, gap: "Research Methodology", provider: "edX" },
  { title: "GCP & Clinical Trial Basics", type: "Workshop", students: 6, gap: "Clinical Trial Docs", provider: "AIIA" },
];

const navLinks = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "profile", label: "My Profile", icon: <UserCog size={18} /> },
  { id: "students", label: "My Students", icon: <Users size={18} />, count: 24 },
  { id: "evidence", label: "Evidence Review", icon: <ClipboardCheck size={18} />, count: 5 },
  { id: "opportunities", label: "Opportunities", icon: <Briefcase size={18} />, count: 3 },
  { id: "applications", label: "Applications", icon: <FileText size={18} />, count: 4 },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { id: "recommendations", label: "Recommendations", icon: <Star size={18} /> },
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

/* ─── Tags ─── */
const tagCls: Record<string, string> = {
  verified: "bg-[#DCE6D0] text-[#16301F]", pending: "bg-[#E8D36B] text-[#5c4a08]",
  flagged: "bg-[#E8C7AE] text-[#7a3f1a]", active: "bg-[#DCE6D0] text-[#16301F]",
  new: "bg-[#DCE6D0] text-[#16301F]", reviewed: "bg-[#E3E9F6] text-[#3d5790]",
  shortlisted: "bg-[#E8D36B] text-[#5c4a08]", closing: "bg-[#E8C7AE] text-[#7a3f1a]",
  high: "bg-[#E8C7AE] text-[#7a3f1a]", medium: "bg-[#E8D36B] text-[#5c4a08]",
  lavender: "bg-[#C8B5DE] text-[#4d3a74]",
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
    <button onClick={onClick} className="font-mono text-xs font-bold text-[#244B35] tracking-wide inline-flex items-center gap-1.5 hover:gap-3 transition-all mt-3">
      {children}
    </button>
  );
}

/* ─── Sidebar Content ─── */
function SidebarContent({ activeNav, setActiveNav }: { activeNav: string; setActiveNav: (id: string) => void }) {
  const { open } = useSidebar();
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className={open ? "" : "flex justify-center"}>
          {open ? <Logo /> : <LogoIcon />}
        </div>
        <div className="mt-8 flex flex-col gap-[2px]">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => setActiveNav(link.id)}
              className={`flex items-center gap-3 w-full text-left rounded-xl text-sm font-medium transition-colors ${open ? "px-3 py-2.5" : "px-0 py-2.5 justify-center"} ${activeNav === link.id ? "bg-[#244B35] text-white font-semibold" : "text-[#6B6F68] hover:bg-[#EDEBE0] hover:text-[#171A18]"}`}>
              <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 18, height: 18 }}>{link.icon}</span>
              {open && <span className="text-sm whitespace-pre">{link.label}</span>}
              {open && link.count !== undefined && (
                <span className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded-md ${activeNav === link.id ? "bg-white/20 text-white" : "bg-[#EDEBE0] text-[#6B6F68]"}`}>{link.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t pt-3 mt-2" style={{ borderColor: open ? "#E6E3D7" : "transparent" }}>
        <button onClick={() => setActiveNav("settings")} className={`flex items-center gap-3 w-full rounded-xl text-[#6B6F68] text-xs font-medium hover:bg-[#EDEBE0] hover:text-[#171A18] transition-colors ${open ? "px-3 py-2" : "px-0 py-2 justify-center"}`}>
          <Settings size={16} /> {open && "Settings"}
        </button>
        <button className={`flex items-center gap-3 w-full rounded-xl text-[#6B6F68] text-xs font-medium hover:bg-[#EDEBE0] hover:text-[#171A18] transition-colors ${open ? "px-3 py-2" : "px-0 py-2 justify-center"}`}>
          <LogOut size={16} /> {open && "Log out"}
        </button>
        {open && (
          <div className="mt-3 p-3 rounded-xl border" style={{ background: "#F7F6F0", borderColor: "#E6E3D7" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" style={{ background: "#8A6FB8", color: "#F7F6F0" }}>{faculty.initials}</div>
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: "#171A18" }}>{faculty.name}</div>
                <div className="text-[11px] font-mono" style={{ color: "#6B6F68" }}>Faculty</div>
              </div>
            </div>
          </div>
        )}
        {!open && (
          <div className="flex justify-center mt-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: "#8A6FB8", color: "#F7F6F0" }}>{faculty.initials}</div>
          </div>
        )}
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
      {/* Hero */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="col-span-12 rounded-[20px] p-7 overflow-hidden relative" style={{ background: "linear-gradient(135deg, #244B35 0%, #1C3D2B 50%, #1A3626 100%)", color: "#F7F6F0", boxShadow: "0 4px 24px rgba(36,75,53,.15)" }}>
        <div className="absolute right-3.5 bottom-3.5 w-16 h-16 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#DCE6D0 1px,transparent 1px)", backgroundSize: "8px 8px" }} />
        <div className="flex items-start gap-6">
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: "#DCE6D0" }}>
              <span className="inline-block w-[7px] h-[7px] bg-[#DCE6D0] mr-2 opacity-85" style={{ boxShadow: "0 7px 0 -2px #244B35" }} />
              Faculty Dashboard
            </span>
            <h2 className="font-bold text-[clamp(24px,3vw,36px)] tracking-tight leading-tight mt-4 mb-3">
              Mentoring the next generation of <em className="not-italic" style={{ color: "#E8D36B" }}>healthcare professionals.</em>
            </h2>
            <p className="text-[14px] max-w-[42ch] mb-6" style={{ color: "rgba(220,230,208,.75)" }}>
              You have {pendingEvidence.length} evidence items to review and {applicationsToReview.filter(a => a.status === "new").length} new applications today.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              {[
                { label: "Students", value: faculty.studentsCount, color: "#DCE6D0" },
                { label: "Pending Reviews", value: faculty.pendingReviews, color: "#E8D36B" },
                { label: "Opportunities", value: faculty.opportunitiesPosted, color: "#E8C7AE" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-bold text-3xl leading-none" style={{ color: s.color }}>{s.value}</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(220,230,208,.55)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex flex-col flex-shrink-0 w-[180px]">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(220,230,208,.55)" }}>Quick Summary</div>
            {[
              { label: "Verified Students", value: `${faculty.verifiedStudents}/${faculty.studentsCount}` },
              { label: "Avg Match Score", value: `${analytics.avgMatch}%` },
              { label: "Top Skill", value: analytics.topSkill },
              { label: "Weak Area", value: analytics.weakSkill },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5">
                <span className="text-[12px]" style={{ color: "rgba(220,230,208,.6)" }}>{item.label}</span>
                <span className="font-semibold text-[12px]" style={{ color: "#F7F6F0" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stat Cards */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: faculty.studentsCount, color: "#244B35", bg: "#DCE6D0" },
          { label: "Pending Reviews", value: faculty.pendingReviews, color: "#C98B5F", bg: "#F0E8DD" },
          { label: "Avg Match Score", value: `${analytics.avgMatch}%`, color: "#171A18", bg: "#EDEBE0" },
          { label: "Verified Students", value: faculty.verifiedStudents, color: "#8A6FB8", bg: "#EAE3F4" },
        ].map((s) => (
          <div key={s.label} className="rounded-[14px] px-5 py-4 text-center" style={{ background: s.bg }}>
            <div className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "#6B6F68" }}>{s.label}</div>
            <div className="font-bold text-3xl tracking-tight leading-none" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </motion.div>

      {/* Student Performance */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="col-span-12 lg:col-span-7 rounded-[20px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow>Students</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Student Overview</div>
        {students.slice(0, 4).map((s) => (
          <div key={s.id} className="flex items-center gap-3 py-3 border-b last:border-b-0" style={{ borderColor: "#EDEBE0" }}>
            <div className="w-9 h-9 rounded-lg grid place-items-center font-bold text-xs flex-shrink-0" style={{ background: "#EDEBE0", color: "#171A18" }}>{s.initials}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[13px] truncate">{s.name}</div>
              <div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{s.course} / {s.year} / {s.lastActive}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-sm" style={{ color: s.match >= 90 ? "#244B35" : s.match >= 80 ? "#C98B5F" : "#B99A22" }}>{s.match}%</div>
              <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>{s.verified}/{s.skills} verified</div>
            </div>
          </div>
        ))}
        <LinkMore>View all students</LinkMore>
      </motion.section>

      {/* Pending Reviews */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="col-span-12 lg:col-span-5 rounded-[20px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow color="#C98B5F">Pending Reviews</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Evidence to Review</div>
        {pendingEvidence.slice(0, 3).map((ev) => (
          <div key={ev.id} className="flex items-center gap-3 py-3 border-b last:border-b-0" style={{ borderColor: "#EDEBE0" }}>
            <div className="w-8 h-8 rounded-lg grid place-items-center font-bold text-[10px] flex-shrink-0" style={{ background: ev.status === "flagged" ? "#F0E8DD" : "#EFEDE3", color: ev.status === "flagged" ? "#C98B5F" : "#6B6F68" }}>
              {ev.status === "flagged" ? <AlertTriangle size={14} /> : <Eye size={14} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[13px] truncate">{ev.name}</div>
              <div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{ev.student} / {ev.submitted}</div>
            </div>
            <Tag cls={ev.status}>{ev.status === "flagged" ? "Flagged" : "Pending"}</Tag>
          </div>
        ))}
        <LinkMore>Review all evidence</LinkMore>
      </motion.section>

      {/* Posted Opportunities */}
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        className="col-span-12 rounded-[20px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow>Opportunities</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Posted Opportunities</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {postedOpportunities.map((opp) => (
            <div key={opp.id} className="border rounded-[14px] p-5 transition-all hover:-translate-y-0.5" style={{ borderColor: "#E6E3D7" }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-[15px] tracking-tight">{opp.title}</div>
                  <div className="font-mono text-[11px] mt-0.5" style={{ color: "#6B6F68" }}>{opp.org}</div>
                </div>
                <Tag cls={opp.status}>{opp.status === "active" ? "Active" : "Closing"}</Tag>
              </div>
              <div className="flex gap-3 mt-3 font-mono text-[11px]" style={{ color: "#6B6F68" }}>
                <span className="inline-flex items-center gap-1"><Users size={12} /> {opp.applicants} applicants</span>
                <span className="inline-flex items-center gap-1"><MapPin size={12} /> {opp.location}</span>
              </div>
            </div>
          ))}
        </div>
        <LinkMore>Manage all opportunities</LinkMore>
      </motion.section>
    </>
  );
}
/* ═══════════════════════════════════════════════════════
   SECTION: Profile
   ═══════════════════════════════════════════════════════ */
function ProfileSection() {
  return (
    <>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="col-span-12 lg:col-span-8 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow>My Profile</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Faculty Profile</div>
        <div className="flex items-start gap-5 mb-6">
          <div className="w-[72px] h-[72px] rounded-2xl grid place-items-center font-bold text-xl flex-shrink-0" style={{ background: "#8A6FB8", color: "#F7F6F0" }}>{faculty.initials}</div>
          <div className="flex-1">
            <div className="font-bold text-xl tracking-tight">{faculty.name}</div>
            <div className="font-mono text-xs mt-1" style={{ color: "#6B6F68" }}>{faculty.title}</div>
            <div className="font-mono text-xs" style={{ color: "#6B6F68" }}>{faculty.department} / {faculty.institution}</div>
            <div className="mt-2"><Tag cls="lavender">Faculty Mentor</Tag></div>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-all hover:bg-[#EFEDE3]" style={{ borderColor: "#E6E3D7" }}>
            <Edit3 size={13} /> Edit profile
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Email", value: faculty.email },
            { label: "Phone", value: faculty.phone },
            { label: "Department", value: faculty.department },
            { label: "Institution", value: faculty.institution },
          ].map((f) => (
            <div key={f.label} className="border rounded-xl p-3" style={{ borderColor: "#E6E3D7" }}>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#9A9D94" }}>{f.label}</div>
              <div className="font-semibold text-sm">{f.value}</div>
            </div>
          ))}
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="col-span-12 lg:col-span-4 rounded-[20px] border p-6 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow>Mentorship Stats</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">At a Glance</div>
        <div className="flex flex-col gap-3">
          {[
            { label: "Students Mentored", val: faculty.studentsCount, icon: <Users size={16} /> },
            { label: "Verified", val: faculty.verifiedStudents, icon: <Check size={16} /> },
            { label: "Avg Match", val: `${analytics.avgMatch}%`, icon: <TrendingUp size={16} /> },
            { label: "Evidence Reviews", val: faculty.pendingReviews, icon: <ClipboardCheck size={16} /> },
            { label: "Opportunities Posted", val: faculty.opportunitiesPosted, icon: <Briefcase size={16} /> },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: "#E6E3D7" }}>
              <div className="w-8 h-8 rounded-lg grid place-items-center" style={{ background: "#EAE3F4", color: "#8A6FB8" }}>{s.icon}</div>
              <div className="flex-1 font-medium text-sm">{s.label}</div>
              <div className="font-bold">{s.val}</div>
            </div>
          ))}
        </div>
      </motion.section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Students
   ═══════════════════════════════════════════════════════ */
function StudentsSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <Eyebrow>Students</Eyebrow>
          <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">My Students</div>
          <div className="text-[13px]" style={{ color: "#6B6F68" }}>{students.length} students / {faculty.verifiedStudents} with verified skills</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((s) => (
          <div key={s.id} className="border rounded-[14px] p-5 transition-all hover:-translate-y-0.5" style={{ borderColor: "#E6E3D7" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm" style={{ background: "#EDEBE0", color: "#171A18" }}>{s.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[14px] truncate">{s.name}</div>
                <div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{s.course} / {s.year}</div>
              </div>
              <Tag cls={s.status}>{s.status === "active" ? "Active" : "Pending"}</Tag>
            </div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>Match Score</span>
              <span className="font-bold text-sm" style={{ color: s.match >= 90 ? "#244B35" : "#C98B5F" }}>{s.match}%</span>
            </div>
            <PxBar pct={s.match} segments={12} />
            <div className="flex justify-between mt-2 text-[11px] font-mono" style={{ color: "#9A9D94" }}>
              <span>{s.verified}/{s.skills} verified skills</span>
              <span>{s.lastActive}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Evidence Review
   ═══════════════════════════════════════════════════════ */
function EvidenceReviewSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <Eyebrow color="#C98B5F">Evidence Review</Eyebrow>
      <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Pending Evidence Reviews</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingEvidence.map((ev) => (
          <div key={ev.id} className="border rounded-[14px] p-5 transition-all hover:-translate-y-0.5" style={{ borderColor: ev.status === "flagged" ? "#C98B5F" : "#E6E3D7" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm" style={{ background: ev.status === "flagged" ? "#F0E8DD" : "#EDEBE0", color: ev.status === "flagged" ? "#C98B5F" : "#6B6F68" }}>
                {ev.status === "flagged" ? <AlertTriangle size={18} /> : <FileText size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[14px] truncate">{ev.name}</div>
                <div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{ev.student}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <Tag cls={ev.status}>{ev.status === "flagged" ? "Flagged" : "Pending"}</Tag>
              <span className="font-mono text-[11px]" style={{ color: "#9A9D94" }}>{ev.submitted}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 font-semibold text-[12px] py-2 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: "#DCE6D0", color: "#16301F" }}>Approve</button>
              <button className="flex-1 font-semibold text-[12px] py-2 rounded-xl border transition-all hover:bg-[#F0E8DD]" style={{ borderColor: "#E6E3D7", color: "#C98B5F" }}>Flag</button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Opportunities
   ═══════════════════════════════════════════════════════ */
function OpportunitiesSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <Eyebrow>Opportunities</Eyebrow>
          <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Posted Opportunities</div>
          <div className="text-[13px]" style={{ color: "#6B6F68" }}>Opportunities you have posted for students</div>
        </div>
        <button className="inline-flex items-center gap-1.5 font-semibold text-[13px] px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: "#244B35", color: "#F7F6F0" }}>
          + Post opportunity
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {postedOpportunities.map((opp) => (
          <div key={opp.id} className="border rounded-[14px] p-5 transition-all hover:-translate-y-0.5" style={{ borderColor: "#E6E3D7" }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-bold text-[15px] tracking-tight">{opp.title}</div>
                <div className="font-mono text-[11px] mt-0.5" style={{ color: "#6B6F68" }}>{opp.org}</div>
              </div>
              <Tag cls={opp.status}>{opp.status === "active" ? "Active" : "Closing"}</Tag>
            </div>
            <div className="flex gap-3 mt-3 font-mono text-[11px]" style={{ color: "#6B6F68" }}>
              <span className="inline-flex items-center gap-1"><Users size={12} /> {opp.applicants} applicants</span>
              <span className="inline-flex items-center gap-1"><Clock size={12} /> {opp.duration}</span>
              <span className="inline-flex items-center gap-1"><MapPin size={12} /> {opp.location}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 font-semibold text-[12px] py-2 rounded-xl border transition-all hover:bg-[#EFEDE3]" style={{ borderColor: "#E6E3D7" }}>View applicants</button>
              <button className="font-semibold text-[12px] px-3 py-2 rounded-xl border transition-all hover:bg-[#EFEDE3]" style={{ borderColor: "#E6E3D7" }}>Edit</button>
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
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <Eyebrow>Applications</Eyebrow>
      <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Student Applications to Review</div>
      <div className="flex flex-col gap-3">
        {applicationsToReview.map((app) => (
          <div key={app.id} className="flex items-center gap-4 p-4 rounded-[14px] border transition-all hover:-translate-y-0.5" style={{ borderColor: "#E6E3D7" }}>
            <div className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm flex-shrink-0" style={{ background: "#EDEBE0", color: "#171A18" }}>{app.initials}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[14px]">{app.student}</div>
              <div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>{app.role} / {app.org}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-sm" style={{ color: app.match >= 90 ? "#244B35" : "#C98B5F" }}>{app.match}%</div>
              <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "#9A9D94" }}>match</div>
            </div>
            <Tag cls={app.status}>{app.status === "new" ? "New" : app.status === "reviewed" ? "Reviewed" : "Shortlisted"}</Tag>
            <div className="flex gap-1.5">
              <button className="font-semibold text-[11px] px-3 py-1.5 rounded-lg transition-all" style={{ background: "#DCE6D0", color: "#16301F" }}>Approve</button>
              <button className="font-semibold text-[11px] px-3 py-1.5 rounded-lg border transition-all" style={{ borderColor: "#E6E3D7" }}>View</button>
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
        className="col-span-12 lg:col-span-8 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow>Skill Distribution</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Student Skill Distribution</div>
        <div className="flex flex-col gap-4">
          {analytics.skillDistribution.map((sk) => (
            <div key={sk.name}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="font-semibold text-sm">{sk.name}</span>
                <span className="font-mono text-xs" style={{ color: "#6B6F68" }}>{sk.count} students ({sk.pct}%)</span>
              </div>
              <PxBar pct={sk.pct} segments={18} />
            </div>
          ))}
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="col-span-12 lg:col-span-4 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow color="#B99A22">Gap Analysis</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Skill Gap Severity</div>
        <div className="flex flex-col gap-3">
          {[
            { label: "High Severity", value: analytics.gapSeverity.high, color: "#C98B5F", bg: "#F0E8DD" },
            { label: "Medium Severity", value: analytics.gapSeverity.medium, color: "#B99A22", bg: "#F5EFC8" },
            { label: "Low Severity", value: analytics.gapSeverity.low, color: "#244B35", bg: "#DCE6D0" },
          ].map((g) => (
            <div key={g.label} className="rounded-xl p-4 flex items-center justify-between" style={{ background: g.bg }}>
              <div>
                <div className="font-semibold text-sm" style={{ color: g.color }}>{g.label}</div>
                <div className="font-mono text-[11px]" style={{ color: "#6B6F68" }}>Across all students</div>
              </div>
              <div className="font-bold text-2xl" style={{ color: g.color }}>{g.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t" style={{ borderColor: "#EDEBE0" }}>
          <div className="font-semibold text-sm mb-1">Key Insights</div>
          <div className="text-[12px] leading-relaxed" style={{ color: "#6B6F68" }}>
            <b style={{ color: "#171A18" }}>{analytics.topSkill}</b> is the most common verified skill ({students.filter(s => s.skills >= 7).length} students). <b style={{ color: "#171A18" }}>{analytics.weakSkill}</b> needs attention across {analytics.gapSeverity.high + analytics.gapSeverity.medium} students.
          </div>
        </div>
      </motion.section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION: Recommendations
   ═══════════════════════════════════════════════════════ */
function RecommendationsSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-12 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <Eyebrow color="#8A6FB8">Recommendations</Eyebrow>
      <div className="font-semibold text-[19px] tracking-tight mt-2 mb-0.5">Recommended for Your Students</div>
      <div className="text-[13px] mb-5" style={{ color: "#6B6F68" }}>Based on collective skill gaps across your student cohort</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations.map((r) => (
          <div key={r.title} className="border rounded-[14px] p-5 transition-all hover:-translate-y-0.5" style={{ borderColor: "#E6E3D7" }}>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#8A6FB8" }}>{r.gap}</div>
            <div className="font-semibold text-[15px] mb-1">{r.title}</div>
            <div className="flex items-center gap-2 mb-2">
              <Tag cls="lavender">{r.type}</Tag>
              <span className="font-mono text-[10px]" style={{ color: "#9A9D94" }}>{r.provider}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold" style={{ color: "#C98B5F" }}>{r.students} students would benefit</span>
              <button className="font-semibold text-[12px] px-3 py-1.5 rounded-xl transition-all" style={{ background: "#C8B5DE", color: "#4d3a74" }}>Recommend</button>
            </div>
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
  const [name, setName] = useState(faculty.name);
  const [email, setEmail] = useState(faculty.email);
  const [phone, setPhone] = useState(faculty.phone);
  const [department, setDepartment] = useState(faculty.department);
  const [institution, setInstitution] = useState(faculty.institution);
  const [bio, setBio] = useState(faculty.bio);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifApp, setNotifApp] = useState(true);
  const [notifNewApp, setNotifNewApp] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const inputCls = "w-full border rounded-xl px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-[#244B35]";
  const inputStyle = { borderColor: "#E6E3D7", background: "#FAF9F5", color: "#171A18" };
  const labelCls = "font-mono text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5 block";
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button type="button" onClick={() => onChange(!checked)} className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0" style={{ background: checked ? "#244B35" : "#D9D6CC" }}>
      <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }} />
    </button>
  );

  return (
    <>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="col-span-12 lg:col-span-8 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow>Account</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Profile Information</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Full Name</label><input className={inputCls} style={inputStyle} value={name} onChange={e => setName(e.target.value)} /></div>
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Email</label><input className={inputCls} style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Phone</label><input className={inputCls} style={inputStyle} type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
          <div><label className={labelCls} style={{ color: "#6B6F68" }}>Department</label><input className={inputCls} style={inputStyle} value={department} onChange={e => setDepartment(e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={labelCls} style={{ color: "#6B6F68" }}>Institution</label><input className={inputCls} style={inputStyle} value={institution} onChange={e => setInstitution(e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={labelCls} style={{ color: "#6B6F68" }}>Bio</label><textarea className={inputCls + " resize-none"} style={{ ...inputStyle, minHeight: 80 }} value={bio} onChange={e => setBio(e.target.value)} /></div>
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="col-span-12 lg:col-span-4 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow>Mentorship</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-4">Mentorship Settings</div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl grid place-items-center flex-shrink-0" style={{ background: "#EFEDE3", color: "#6B6F68" }}><ClipboardCheck size={16} /></div>
            <div className="flex-1 min-w-0"><div className="font-semibold text-[13px]" style={{ color: "#171A18" }}>Auto-approve evidence</div><div className="text-[11px]" style={{ color: "#9A9D94" }}>Automatically verify evidence from trusted issuers</div></div>
            <Toggle checked={autoApprove} onChange={setAutoApprove} />
          </div>
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="col-span-12 lg:col-span-6 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow color="#C98B5F">Notifications</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Notification Preferences</div>
        <div className="flex flex-col gap-5">
          {[
            { label: "Email notifications", desc: "Receive updates about students and applications", checked: notifEmail, onChange: setNotifEmail, icon: <Mail size={16} /> },
            { label: "Push notifications", desc: "Real-time alerts for new evidence submissions", checked: notifApp, onChange: setNotifApp, icon: <BellRing size={16} /> },
            { label: "New application alerts", desc: "Notify when students apply to your opportunities", checked: notifNewApp, onChange: setNotifNewApp, icon: <Bell size={16} /> },
            { label: "Weekly digest", desc: "Summary of student progress and pending reviews", checked: notifWeekly, onChange: setNotifWeekly, icon: <Star size={16} /> },
          ].map((n) => (
            <div key={n.label} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl grid place-items-center flex-shrink-0" style={{ background: "#EFEDE3", color: "#6B6F68" }}>{n.icon}</div>
              <div className="flex-1 min-w-0"><div className="font-semibold text-[13px]" style={{ color: "#171A18" }}>{n.label}</div><div className="text-[11px]" style={{ color: "#9A9D94" }}>{n.desc}</div></div>
              <Toggle checked={n.checked} onChange={n.onChange} />
            </div>
          ))}
        </div>
      </motion.section>
      <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="col-span-12 lg:col-span-6 rounded-[20px] border p-7 bg-white" style={{ borderColor: "#E6E3D7", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <Eyebrow color="#8A6FB8">Security</Eyebrow>
        <div className="font-semibold text-[19px] tracking-tight mt-2 mb-5">Account Security</div>
        <div className="flex flex-col gap-3">
          <button className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border transition-all hover:bg-[#EFEDE3]" style={{ borderColor: "#E6E3D7", color: "#6B6F68" }}><Lock size={14} /> Change password</button>
          <button className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border transition-all hover:bg-[#EFEDE3]" style={{ borderColor: "#E6E3D7", color: "#6B6F68" }}><Key size={14} /> Enable two-factor authentication</button>
          <div className="border-t pt-3 mt-1" style={{ borderColor: "#EDEBE0" }}>
            <button className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl border transition-all hover:bg-red-50" style={{ borderColor: "#E6E3D7", color: "#B33A3A" }}><Trash2 size={14} /> Delete account</button>
          </div>
        </div>
      </motion.section>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-12 flex items-center justify-between">
        <div className="text-[12px] font-mono" style={{ color: "#9A9D94" }}>All changes are saved locally. Connect a backend to persist settings.</div>
        <button onClick={handleSave} className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: saved ? "#DCE6D0" : "#244B35", color: saved ? "#16301F" : "#F7F6F0" }}>
          {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save all changes</>}
        </button>
      </motion.div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN DASHBOARD
   ═══════════════════════════════════════════════════════ */
export default function FacultyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  const renderSection = () => {
    switch (activeNav) {
      case "overview": return <OverviewSection />;
      case "profile": return <ProfileSection />;
      case "students": return <StudentsSection />;
      case "evidence": return <EvidenceReviewSection />;
      case "opportunities": return <OpportunitiesSection />;
      case "applications": return <ApplicationsSection />;
      case "analytics": return <AnalyticsSection />;
      case "recommendations": return <RecommendationsSection />;
      case "settings": return <SettingsSection />;
      default: return <OverviewSection />;
    }
  };

  const pageTitle: Record<string, string> = {
    overview: "Faculty Dashboard", profile: "My Profile", students: "My Students",
    evidence: "Evidence Review", opportunities: "Opportunities", applications: "Applications",
    analytics: "Analytics", recommendations: "Recommendations", settings: "Settings",
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
              {activeNav === "overview" ? <>{greeting}, <span style={{ color: "#244B35" }}>{faculty.name.split(" ")[1]}</span>.</> : <span style={{ color: "#171A18" }}>{pageTitle[activeNav]}</span>}
            </div>
            <div className="text-[13px]" style={{ color: "#6B6F68" }}>
              {activeNav === "overview" ? "Here's what your students need today." : `${faculty.name} / ${faculty.department}`}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-white" style={{ borderColor: "#E6E3D7", width: 210 }}>
              <Search size={16} style={{ color: "#9A9D94", flexShrink: 0 }} />
              <input type="text" placeholder="Search students..." className="border-none outline-none bg-transparent flex-1 text-[13px]" />
            </div>
            <button className="relative w-10 h-10 rounded-xl border bg-white grid place-items-center hover:bg-[#EFEDE3] transition-colors" style={{ borderColor: "#E6E3D7" }}>
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-[7px] h-[7px] rounded-full" style={{ background: "#C98B5F" }} />
            </button>
            <div className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm cursor-pointer" style={{ background: "#8A6FB8", color: "#F7F6F0" }}>{faculty.initials}</div>
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
