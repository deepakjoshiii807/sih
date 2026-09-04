import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import type { StudentDashboard } from "@/lib/student-api";
import { studentApi } from "@/lib/student-api";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Home, User, Shield, Target, GitCompare, Briefcase,
  FileText, Star, LayoutGrid, Settings, LogOut,
  Bell, Search, Upload, ChevronRight, BookOpen,
} from "lucide-react";

const fetchDashboard = () => studentApi.getDashboard();

/* ──────────────── helpers ──────────────── */

function pxSegs(pct: number, n = 18) {
  const filled = Math.round((pct / 100) * n);
  return Array.from({ length: n }, (_, i) => (
    <span
      key={i}
      className={`seg ${i < filled ? "on" : ""}`}
    />
  ));
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* ──────────────── SVG Icons ──────────────── */

const IC = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1Z" /></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>,
  vault: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="m9 15 2 2 4-4" /></svg>,
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>,
  gap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h16" /><path d="m7 6-3 3 3 3" /><path d="M20 15H4" /><path d="m17 12 3 3-3 3" /></svg>,
  brief: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>,
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></svg>,
  star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8Z" /></svg>,
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  gear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.02a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.02a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg>,
  out: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></svg>,
  folder: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z" /></svg>,
  pulse: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-8 6 16 3-8h4" /></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M8 15v3" /><path d="M13 11v7" /><path d="M18 7v11" /></svg>,
  pen: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>,
  note: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>,
};

const NAV_ITEMS = [
  { id: "Overview", label: "Overview", icon: <Home className="h-5 w-5 flex-shrink-0" /> },
  { id: "Profile", label: "My Profile", icon: <User className="h-5 w-5 flex-shrink-0" /> },
  { id: "Evidence", label: "Evidence Vault", icon: <Shield className="h-5 w-5 flex-shrink-0" />, count: 12 },
  { id: "Skills", label: "Skills", icon: <Target className="h-5 w-5 flex-shrink-0" /> },
  { id: "Skill Gap", label: "Skill Gap", icon: <GitCompare className="h-5 w-5 flex-shrink-0" /> },
  { id: "Opportunities", label: "Opportunities", icon: <Briefcase className="h-5 w-5 flex-shrink-0" />, count: 3 },
  { id: "Applications", label: "Applications", icon: <FileText className="h-5 w-5 flex-shrink-0" /> },
  { id: "Recommendations", label: "Recommendations", icon: <Star className="h-5 w-5 flex-shrink-0" /> },
  { id: "Portfolio", label: "Portfolio", icon: <LayoutGrid className="h-5 w-5 flex-shrink-0" /> },
];

/* ──────────────── main component ──────────────── */

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<StudentDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    studentApi.getDashboard().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);



  const showToast = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  };

  const handleNav = (id: string) => {
    setActiveNav(id);
    setSidebarOpen(false);
    showToast(id === "Overview" ? "Back to your overview" : `"${id}" — module preview (prototype)`);
  };

  if (loading || !data) {
    return (
      <div className="db-loading">
        <div className="db-spinner" />
        <span>Loading your dashboard…</span>
      </div>
    );
  }

  const { student, stats, skills, gaps, bestMatch, applications, recommendations, evidence, portfolio } = data;

  const QUICK_ACTIONS = [
    { label: "Upload Evidence", desc: "Back skills with proof", icon: "vault", c: "c1" },
    { label: "Explore Opportunities", desc: `${bestMatch.match}% match waiting`, icon: "brief", c: "c2" },
    { label: "Check Skill Gaps", desc: `${gaps.length} gaps to close`, icon: "gap", c: "c3" },
    { label: "Update Profile", desc: `${stats.profileCompletion}% complete`, icon: "user", c: "c4" },
  ];

  return (
    <>
      {/* Scoped styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

        .db-root { --bg:#F7F6F0; --bg-soft:#EFEDE3; --ink:#171A18; --muted:#6B6F68; --faint:#9A9D94; --forest:#244B35; --forest-deep:#1B3A2A; --forest-ink:#16301F; --sage:#DCE6D0; --lavender:#C8B5DE; --lavender-dk:#8A6FB8; --yellow:#E8D36B; --yellow-dk:#B99A22; --peach:#E8C7AE; --peach-dk:#C98B5F; --card:#FFFFFF; --line:#E6E3D7; --line-2:#EDEBE0; --shadow:0 1px 2px rgba(23,26,24,.04),0 18px 40px -26px rgba(23,26,24,.28); --radius:18px; --mono:"Space Mono",ui-monospace,monospace; --disp:"Space Grotesk",system-ui,sans-serif; --sans:"Inter",system-ui,sans-serif; font-family:var(--sans); color:var(--ink); background:var(--bg); -webkit-font-smoothing:antialiased; line-height:1.5; }
        .db-root * { box-sizing:border-box; margin:0; padding:0; }
        .db-root a { color:inherit; text-decoration:none; }
        .db-root button { font-family:inherit; cursor:pointer; border:none; background:none; color:inherit; }
        .db-root ::selection { background:var(--sage); }

        /* Eyebrow */
        .eyebrow { font-family:var(--mono); font-size:11px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--faint); display:inline-flex; align-items:center; gap:8px; }
        .eyebrow::before { content:""; width:7px; height:7px; background:var(--ink); opacity:.85; box-shadow:0 7px 0 -2px var(--bg); }
        .panel-title { font-family:var(--disp); font-weight:600; font-size:19px; letter-spacing:-.01em; margin:10px 0 2px; }
        .panel-sub { font-size:13px; color:var(--muted); margin-bottom:18px; }

        /* Tags */
        .tag { display:inline-flex; align-items:center; gap:6px; font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:3px 8px; border-radius:6px; white-space:nowrap; }
        .tag-verified { background:var(--sage); color:var(--forest-ink); }
        .tag-self { background:var(--line-2); color:var(--muted); }
        .tag-med { background:var(--yellow); color:#5c4a08; }
        .tag-high { background:var(--peach); color:#7a3f1a; }
        .tag-lav { background:var(--lavender); color:#4d3a74; }
        .tag-process { background:#E3E9F6; color:#3d5790; }
        .tag-review { background:var(--peach); color:#7a3f1a; }

        /* Buttons */
        .btn { display:inline-flex; align-items:center; gap:8px; font-family:var(--disp); font-weight:600; font-size:14px; padding:10px 16px; border-radius:10px; border:1px solid var(--line); background:var(--card); color:var(--ink); transition:transform .18s,box-shadow .18s; }
        .btn:hover { transform:translateY(-1px); box-shadow:0 10px 22px -14px rgba(23,26,24,.5); }
        .btn .arr { transition:transform .2s; display:inline-block; }
        .btn:hover .arr { transform:translateX(3px); }
        .btn-primary { background:var(--forest); border-color:var(--forest); color:#F7F6F0; }
        .btn-primary:hover { background:var(--forest-deep); }
        .btn-peach { background:var(--peach); border-color:var(--peach); color:#5a2f12; }
        .link-more { font-family:var(--mono); font-size:12px; font-weight:700; color:var(--forest); letter-spacing:.02em; display:inline-flex; align-items:center; gap:6px; transition:gap .2s; }
        .link-more:hover { gap:10px; }

        /* Layout */
        .app { display:flex; min-height:100vh; }
        .db-sidebar { background:var(--forest-ink); color:var(--sage); }
        .nav-label { font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:rgba(220,230,208,.4); padding:0 10px; margin-bottom:8px; }
        .nav-btn { display:flex; align-items:center; gap:12px; width:100%; text-align:left; padding:10px; margin-bottom:2px; border-radius:10px; color:rgba(220,230,208,.75); font-size:14px; font-weight:500; transition:background .15s,color .15s; position:relative; }
        .nav-btn:hover { background:rgba(220,230,208,.08); color:#F7F6F0; }
        .nav-btn.active { background:var(--sage); color:var(--forest-ink); font-weight:600; }
        .nav-btn.active::after { content:""; position:absolute; left:-12px; top:50%; transform:translateY(-50%); width:3px; height:22px; background:var(--yellow); border-radius:0 3px 3px 0; }
        .nav-btn .count { margin-left:auto; font-family:var(--mono); font-size:10px; background:rgba(220,230,208,.14); color:var(--sage); padding:2px 6px; border-radius:6px; }
        .nav-btn.active .count { background:var(--forest); color:var(--sage); }
        .side-meta { display:flex; align-items:center; gap:7px; padding:8px 10px; border-radius:10px; color:rgba(220,230,208,.6); font-size:12px; font-weight:500; transition:background .15s,color .15s; width:100%; text-align:left; }
        .side-meta:hover { background:rgba(220,230,208,.08); color:#F7F6F0; }
        .main { flex:1; min-width:0; display:flex; flex-direction:column; }

        /* Topbar */
        .topbar { position:sticky; top:0; z-index:40; display:flex; align-items:center; gap:16px; padding:20px 28px; background:rgba(247,246,240,.86); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
        .burger { display:none; width:40px; height:40px; border-radius:10px; border:1px solid var(--line); place-items:center; }
        .burger:hover { background:var(--bg-soft); }
        .h-title { font-family:var(--disp); font-weight:700; font-size:22px; letter-spacing:-.02em; }
        .h-title span { color:var(--forest); }
        .h-sub { font-size:13px; color:var(--muted); }
        .top-actions { margin-left:auto; display:flex; align-items:center; gap:10px; }
        .search { display:flex; align-items:center; gap:8px; border:1px solid var(--line); border-radius:10px; padding:9px 12px; background:var(--card); width:210px; color:var(--faint); font-size:13px; }
        .search:focus-within { border-color:var(--forest); box-shadow:0 0 0 3px rgba(36,75,53,.12); }
        .search svg { width:16px; height:16px; flex:none; }
        .search input { border:none; outline:none; background:none; flex:1; font-family:inherit; font-size:13px; color:var(--ink); }
        .icon-btn { position:relative; width:40px; height:40px; border-radius:10px; border:1px solid var(--line); background:var(--card); display:grid; place-items:center; color:var(--ink); transition:transform .15s,background .15s; }
        .icon-btn:hover { background:var(--bg-soft); transform:translateY(-1px); }
        .icon-btn svg { width:18px; height:18px; }
        .icon-btn .dot { position:absolute; top:9px; right:9px; width:7px; height:7px; border-radius:50%; background:var(--peach-dk); border:2px solid var(--card); }
        .avatar-hd { width:40px; height:40px; border-radius:11px; background:var(--yellow); color:var(--forest-ink); display:grid; place-items:center; font-family:var(--disp); font-weight:700; font-size:14px; cursor:pointer; }
        .dd-wrap { position:relative; }
        .dd { position:absolute; top:calc(100% + 10px); right:0; z-index:70; background:var(--card); border:1px solid var(--line); border-radius:14px; box-shadow:var(--shadow); min-width:280px; opacity:0; visibility:hidden; transform:translateY(-6px); transition:opacity .18s,transform .18s,visibility .18s; overflow:hidden; }
        .dd.open { opacity:1; visibility:visible; transform:none; }
        .dd-head { padding:14px 16px; border-bottom:1px solid var(--line-2); display:flex; align-items:center; justify-content:space-between; }
        .dd-head strong { font-family:var(--disp); font-size:14px; }
        .dd-head span { font-family:var(--mono); font-size:10px; color:var(--muted); }
        .dd-item { display:flex; gap:12px; padding:12px 16px; border-bottom:1px solid var(--line-2); align-items:flex-start; }
        .dd-item:last-child { border-bottom:none; }
        .dd-item:hover { background:var(--bg-soft); }
        .dd-ic { width:30px; height:30px; flex:none; border-radius:8px; display:grid; place-items:center; font-size:14px; }
        .dd-t { font-size:13px; font-weight:600; }
        .dd-d { font-size:12px; color:var(--muted); font-family:var(--mono); }
        .dd-item .dot { width:7px; height:7px; border-radius:50%; margin-left:auto; flex:none; margin-top:4px; }
        .dot-green { background:var(--forest); }
        .dot-yellow { background:var(--yellow-dk); }
        .dot-peach { background:var(--peach-dk); }
        .profile-dd { width:230px; min-width:230px; padding:8px; }
        .pdd-top { display:flex; align-items:center; gap:10px; padding:8px 8px 12px; border-bottom:1px solid var(--line-2); }
        .pdd-item { display:flex; align-items:center; gap:10px; padding:9px 8px; border-radius:8px; font-size:13.5px; font-weight:500; border-bottom:none; }
        .pdd-item:hover { background:var(--bg-soft); }
        .pdd-item.danger { color:#A0441E; }

        /* Content Bento */
        .content { padding:26px 28px 60px; }
        .grid { display:grid; gap:20px; grid-template-columns:repeat(3,1fr); grid-template-areas:"progress snapshot match""progress gaps journey""reco evidence portfolio""quick quick portfolio"; }
        .p-hero { grid-area:progress; } .p-snapshot { grid-area:snapshot; } .p-match { grid-area:match; }
        .p-gaps { grid-area:gaps; } .p-journey { grid-area:journey; } .p-reco { grid-area:reco; }
        .p-evidence { grid-area:evidence; } .p-portfolio { grid-area:portfolio; } .p-quick { grid-area:quick; }
        .panel { position:relative; background:var(--card); border:1px solid var(--line); border-radius:var(--radius); padding:24px; overflow:hidden; transition:transform .2s cubic-bezier(.2,.7,.2,1),box-shadow .2s; }
        .panel:hover { transform:translateY(-3px); box-shadow:var(--shadow); }
        .px-dots { position:absolute; right:14px; bottom:14px; width:64px; height:64px; opacity:.5; pointer-events:none; background-image:radial-gradient(var(--faint) 1px,transparent 1px); background-size:8px 8px; mask-image:linear-gradient(135deg,transparent 30%,#000); -webkit-mask-image:linear-gradient(135deg,transparent 30%,#000); }

        /* Hero */
        .hero { background:linear-gradient(160deg,#FFFFFF 0%,#FBF9F2 55%,#F2EFE2 100%); display:flex; flex-direction:column; }
        .hero-top { display:flex; align-items:center; gap:12px; }
        .hero-badge { font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.1em; background:var(--forest); color:var(--sage); padding:4px 9px; border-radius:6px; margin-left:auto; }
        .hero h2 { font-family:var(--disp); font-weight:700; font-size:clamp(22px,2.4vw,30px); letter-spacing:-.02em; line-height:1.12; margin:16px 0 10px; }
        .hero h2 em { font-style:normal; color:var(--forest); position:relative; }
        .hero h2 em::after { content:""; position:absolute; left:0; right:0; bottom:2px; height:7px; background:var(--yellow); opacity:.5; z-index:-1; }
        .hero p { font-size:14px; color:var(--muted); max-width:40ch; margin-bottom:22px; }
        .hero-metrics { display:flex; gap:12px; flex-wrap:wrap; }
        .metric { flex:1; min-width:96px; border:1px solid var(--line); border-radius:12px; padding:12px 13px; background:#fff; }
        .metric-num { font-family:var(--disp); font-weight:700; font-size:24px; letter-spacing:-.02em; }
        .metric-num small { font-size:13px; color:var(--muted); font-weight:600; }
        .metric-label { font-family:var(--mono); font-size:10px; color:var(--muted); margin-top:2px; line-height:1.3; }
        .metric .pix { display:flex; gap:3px; margin-top:8px; }
        .metric .pix i { width:8px; height:6px; background:var(--line-2); display:block; border-radius:1px; }
        .metric.m-forest .metric-num { color:var(--forest); }
        .metric.m-forest .pix i.on { background:var(--forest); }
        .metric.m-yellow .metric-num { color:var(--yellow-dk); }
        .metric.m-yellow .pix i.on { background:var(--yellow-dk); }
        .metric.m-peach .metric-num { color:var(--peach-dk); }
        .metric.m-peach .pix i.on { background:var(--peach-dk); }

        /* Journey */
        .journey { margin-top:24px; border-top:1px dashed var(--line); padding-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:0 22px; }
        .journey-title { grid-column:1/-1; font-family:var(--mono); font-size:11px; font-weight:700; letter-spacing:.14em; color:var(--faint); text-transform:uppercase; margin-bottom:14px; }
        .jstep { position:relative; display:flex; gap:12px; padding-bottom:18px; }
        .jstep:last-child { padding-bottom:0; }
        .jline { position:absolute; left:11px; top:24px; bottom:4px; width:2px; background:var(--line); }
        .jstep.done .jline { background:var(--forest); }
        .jnode { width:24px; height:24px; flex:none; border-radius:7px; z-index:1; display:grid; place-items:center; font-family:var(--mono); font-size:11px; font-weight:700; background:#fff; border:2px solid var(--line); color:var(--faint); }
        .jstep.done .jnode { background:var(--forest); border-color:var(--forest); color:#F7F6F0; }
        .jstep.active .jnode { background:var(--yellow); border-color:var(--yellow-dk); color:var(--forest-ink); box-shadow:0 0 0 4px rgba(232,211,107,.25); }
        .jstep.future .jnode { border-style:dashed; }
        .jlab { font-family:var(--disp); font-weight:600; font-size:13.5px; }
        .jsub { font-family:var(--mono); font-size:10px; color:var(--faint); }

        /* Skill rows */
        .skill-row { padding:11px 0; border-bottom:1px solid var(--line-2); }
        .skill-row:last-of-type { border-bottom:none; }
        .skill-head { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
        .skill-name { font-family:var(--disp); font-weight:600; font-size:14px; }
        .skill-val { margin-left:auto; font-family:var(--mono); font-weight:700; font-size:12px; }
        .skill-val::after { content:"%"; color:var(--faint); font-size:10px; }
        .pxbar { display:flex; gap:3px; flex-wrap:wrap; }
        .pxbar .seg { width:7px; height:13px; background:var(--line-2); display:block; border-radius:1px; }
        .pxbar.gapbar .seg { height:10px; }
        .pxbar .seg.on { background:var(--forest); }
        .pxbar.yellow .seg.on { background:var(--yellow-dk); }

        /* Match */
        .match-layout { display:flex; flex-direction:column; gap:18px; }
        .match-top { display:flex; gap:16px; align-items:flex-start; }
        .match-ring-wrap { position:relative; flex:none; width:116px; height:116px; }
        .match-ring { width:116px; height:116px; transform:rotate(-90deg); }
        .match-ring .b { fill:none; stroke:var(--line-2); stroke-width:11; }
        .match-ring .f { fill:none; stroke:var(--peach-dk); stroke-width:11; stroke-linecap:round; stroke-dasharray:326.7; stroke-dashoffset:326.7; transition:stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1); }
        .match-ring.in .f { stroke-dashoffset:26.1; }
        .ring-num { position:absolute; inset:0; display:grid; place-items:center; font-family:var(--disp); font-weight:700; font-size:26px; color:var(--peach-dk); }
        .ring-num small { font-size:12px; color:var(--muted); font-weight:600; }
        .match-role { font-family:var(--disp); font-weight:700; font-size:20px; letter-spacing:-.01em; line-height:1.15; }
        .match-org { font-family:var(--mono); font-size:12px; color:var(--muted); margin-top:4px; }
        .match-meta { display:flex; gap:6px; margin-top:10px; flex-wrap:wrap; }
        .chip { font-family:var(--mono); font-size:10.5px; font-weight:700; border:1px solid var(--line); border-radius:6px; padding:3px 8px; color:var(--muted); display:inline-flex; align-items:center; gap:5px; }
        .chip.loc::before { content:"●"; color:var(--peach-dk); font-size:8px; }
        .chip.dur::before { content:"▮"; color:var(--peach-dk); font-size:8px; }
        .skills-title { font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.12em; color:var(--faint); text-transform:uppercase; margin-bottom:8px; }
        .skills-chips { display:flex; flex-wrap:wrap; gap:6px; }
        .mch { font-size:11.5px; font-weight:500; border-radius:6px; padding:4px 9px; background:var(--sage); color:var(--forest-ink); }
        .mch.miss { background:var(--line-2); color:var(--muted); text-decoration:line-through; }
        .match-note { font-size:12px; color:var(--muted); border-top:1px dashed var(--line); padding-top:14px; display:flex; gap:8px; line-height:1.5; }
        .match-note .ic { flex:none; color:var(--peach-dk); width:15px; height:15px; margin-top:1px; }
        .match-actions { display:flex; gap:10px; margin-top:4px; flex-wrap:wrap; }

        /* Gaps */
        .gap-row { padding:11px 0; border-bottom:1px solid var(--line-2); }
        .gap-row:last-of-type { border-bottom:none; }
        .gap-head { display:flex; align-items:baseline; justify-content:space-between; margin-bottom:7px; }
        .gap-name { font-family:var(--disp); font-weight:600; font-size:14px; }
        .gap-pct { font-family:var(--mono); font-weight:700; font-size:12px; }
        .gap-meta { display:flex; align-items:center; gap:10px; margin-top:7px; }
        .gap-target { font-size:11px; color:var(--faint); font-family:var(--mono); }
        .gap-cta { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:16px; flex-wrap:wrap; }

        /* Applications */
        .app-item { position:relative; padding-left:26px; padding-bottom:20px; }
        .app-item:not(:last-child)::before { content:""; position:absolute; left:6px; top:16px; bottom:2px; width:2px; background:var(--line); }
        .app-dot { position:absolute; left:0; top:4px; width:14px; height:14px; border-radius:5px; background:var(--line-2); border:2px solid var(--card); box-shadow:0 0 0 1px var(--line); }
        .app-item.applied .app-dot { background:var(--forest); box-shadow:0 0 0 3px rgba(36,75,53,.18); }
        .app-item.shortlisted .app-dot { background:var(--yellow); box-shadow:0 0 0 3px rgba(232,211,107,.25); }
        .app-role { font-family:var(--disp); font-weight:600; font-size:14.5px; }
        .app-org { font-family:var(--mono); font-size:11px; color:var(--muted); margin-top:1px; }
        .app-status { display:flex; align-items:center; gap:8px; margin-top:7px; font-size:12.5px; color:var(--muted); }
        .app-status .tick { font-family:var(--mono); font-weight:700; font-size:11px; padding:2px 7px; border-radius:5px; }
        .app-status.applied .tick { background:var(--sage); color:var(--forest-ink); }
        .app-status.shortlisted .tick { background:var(--yellow); color:#5c4a08; }

        /* Reco */
        .reco-item { display:flex; gap:12px; padding:13px 0; border-bottom:1px solid var(--line-2); }
        .reco-item:last-of-type { border-bottom:none; }
        .reco-ic { width:36px; height:36px; flex:none; border-radius:10px; background:var(--lavender); color:#4d3a74; display:grid; place-items:center; }
        .reco-ic svg { width:17px; height:17px; }
        .reco-gap { font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.12em; color:var(--lavender-dk); text-transform:uppercase; }
        .reco-course { font-family:var(--disp); font-weight:600; font-size:14.5px; margin-top:3px; }
        .reco-why { font-size:12px; color:var(--muted); margin-top:4px; }

        /* Evidence */
        .ev-stats { display:grid; grid-template-columns:repeat(2,1fr); gap:9px; margin-bottom:16px; }
        .ev-stat { border:1px solid var(--line); border-radius:11px; padding:10px 12px; background:var(--bg-soft); }
        .ev-num { font-family:var(--disp); font-weight:700; font-size:19px; display:flex; align-items:center; gap:7px; }
        .ev-num .pix { display:inline-flex; gap:2px; }
        .ev-num .pix i { width:6px; height:6px; background:var(--line-2); display:block; border-radius:1px; }
        .ev-num.green .pix i { background:var(--forest); }
        .ev-num.blue .pix i { background:var(--lavender-dk); }
        .ev-num.peach .pix i { background:var(--peach-dk); }
        .ev-lab { font-family:var(--mono); font-size:10px; color:var(--muted); }
        .ev-item { display:flex; align-items:center; gap:10px; padding:9px 0; border-bottom:1px solid var(--line-2); font-size:13px; }
        .ev-item:last-of-type { border-bottom:none; }
        .ev-file { width:26px; height:30px; flex:none; border:1px solid var(--line); border-radius:5px; position:relative; background:#fff; }
        .ev-file::before { content:""; position:absolute; top:-1px; right:-1px; width:9px; height:9px; background:var(--bg); border-bottom-left-radius:4px; border:1px solid var(--line); border-top:none; border-right:none; }
        .ev-name { font-weight:500; font-size:13px; }
        .ev-sub { font-size:11px; color:var(--faint); font-family:var(--mono); }
        .ev-status { margin-left:auto; }
        .upload-btn { margin-top:14px; width:100%; display:flex; align-items:center; justify-content:center; gap:8px; border:1.5px dashed var(--forest); border-radius:11px; color:var(--forest); font-family:var(--disp); font-weight:600; font-size:13.5px; padding:11px; transition:background .15s,transform .15s; }
        .upload-btn:hover { background:var(--sage); transform:translateY(-1px); }

        /* Quick Actions */
        .quick-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .qaction { display:flex; align-items:center; gap:11px; border:1px solid var(--line); border-radius:12px; padding:13px 14px; background:#fff; text-align:left; transition:transform .18s,border .18s,box-shadow .18s; }
        .qaction:hover { transform:translateY(-2px); border-color:var(--forest); box-shadow:var(--shadow); }
        .qa-ic { width:34px; height:34px; flex:none; border-radius:9px; display:grid; place-items:center; }
        .qa-ic svg { width:17px; height:17px; }
        .qa-ic.c1 { background:var(--sage); color:var(--forest-ink); }
        .qa-ic.c2 { background:var(--peach); color:#7a3f1a; }
        .qa-ic.c3 { background:var(--yellow); color:#5c4a08; }
        .qa-ic.c4 { background:var(--lavender); color:#4d3a74; }
        .qa-t { font-family:var(--disp); font-weight:600; font-size:13.5px; line-height:1.2; }
        .qa-d { font-size:11px; color:var(--faint); font-family:var(--mono); }

        /* Portfolio */
        .portfolio { padding:24px; }
        .pf-stats { display:flex; flex-direction:column; gap:9px; margin:14px 0; }
        .pf-stat { display:flex; align-items:center; justify-content:space-between; font-size:13px; border-bottom:1px solid var(--line-2); padding-bottom:8px; }
        .pf-stat span:first-child { color:var(--muted); }
        .pf-stat b { font-family:var(--disp); font-weight:700; font-size:15px; }
        .pf-cards { display:flex; gap:8px; margin-top:4px; }
        .pf-mini { flex:1; border:1px solid var(--line); border-radius:9px; padding:8px; background:var(--bg-soft); }
        .pfm-ic { width:22px; height:22px; border-radius:6px; background:var(--sage); color:var(--forest-ink); display:grid; place-items:center; margin-bottom:6px; }
        .pfm-ic svg { width:12px; height:12px; }
        .pfm-t { font-size:10px; font-weight:600; line-height:1.2; }
        .pfm-d { font-size:9px; color:var(--faint); font-family:var(--mono); }
        .pf-open { margin-top:14px; width:100%; }

        /* Dash note */
        .dash-note { margin-top:26px; text-align:center; font-family:var(--mono); font-size:11px; color:var(--faint); display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; }
        .dash-note .lb { background:var(--line-2); color:var(--muted); padding:2px 7px; border-radius:5px; letter-spacing:.08em; }

        /* Toast */
        .toast { position:fixed; left:50%; bottom:26px; transform:translate(-50%,16px); background:var(--forest-ink); color:var(--sage); font-size:13px; padding:12px 18px; border-radius:11px; box-shadow:var(--shadow); z-index:100; opacity:0; visibility:hidden; transition:opacity .25s,transform .25s,visibility .25s; display:flex; align-items:center; gap:9px; }
        .toast.show { opacity:1; visibility:visible; transform:translate(-50%,0); }
        .toast .pix { display:inline-flex; gap:2px; }
        .toast .pix i { width:5px; height:5px; background:var(--yellow); display:block; border-radius:50%; }
        .backdrop { position:fixed; inset:0; z-index:55; background:rgba(23,26,24,.4); opacity:0; visibility:hidden; transition:opacity .25s,visibility .25s; }
        .backdrop.show { opacity:1; visibility:visible; }
        .bottomnav { display:none; }

        /* Loading */
        .db-loading { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; background:var(--bg); gap:16px; font-size:14px; color:var(--muted); }
        .db-spinner { width:36px; height:36px; border:3px solid var(--line); border-top-color:var(--forest); border-radius:50%; animation:spin .8s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }

        /* Responsive */
        @media (max-width:1100px) {
          .grid { grid-template-columns:repeat(2,1fr); grid-template-areas:"progress progress""snapshot match""gaps journey""reco evidence""quick portfolio"; }
          .quick-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:1024px) {
          .main { margin-left:0; }
        }
        @media (max-width:760px) {
          .topbar { padding:16px; }
          .search { display:none; }
          .h-title { font-size:19px; }
          .db-content { padding:18px 16px 60px; }
          .db-grid { grid-template-columns:1fr; gap:14px; }
          .panel { padding:18px; border-radius:15px; }
          .hero-metrics { flex-direction:column; }
          .metric { display:flex; align-items:center; justify-content:space-between; }
          .metric .pix { display:none; }
          .journey { grid-template-columns:1fr; gap:0; }
          .hero h2 { font-size:24px; }
          .match-top { flex-direction:column; }
          .match-ring-wrap { align-self:flex-start; }
          .quick-grid { grid-template-columns:1fr 1fr; gap:10px; }
          .qaction { padding:11px; gap:9px; }
          .qa-t { font-size:12.5px; }
          .qa-d { display:none; }
          .qa-ic { width:30px; height:30px; }
        }
      `}</style>

      <div className="db-root">
        <div className="app">
          {/* ─── SIDEBAR ─── */}
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
            <SidebarBody className="db-sidebar">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {sidebarOpen ? (
                  <div className="flex items-center gap-2.5 py-1 relative z-20 mb-4">
                    <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: 'var(--sage)', color: 'var(--forest-ink)' }}>SB</div>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold text-sm whitespace-pre" style={{ color: '#F7F6F0' }}>Lead2Learn</motion.span>
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-bold text-sm relative z-20 mb-4" style={{ background: 'var(--sage)', color: 'var(--forest-ink)' }}>SB</div>
                )}
                <div className="nav-label">Workspace</div>
                <div className="flex flex-col gap-0.5">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      className={`nav-btn ${activeNav === item.id ? 'active' : ''}`}
                      onClick={() => handleNav(item.id)}
                    >
                      {item.icon}
                      {item.count !== undefined && <span className="count">{item.count}</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button className="side-meta">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button className="side-meta" onClick={() => navigate('/') }>
                  <LogOut className="w-4 h-4" /> Logout
                </button>
                <div className="mt-2" style={{ padding: '12px', borderRadius: '12px', background: 'rgba(220,230,208,.07)', border: '1px solid rgba(220,230,208,.1)' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" style={{ background: 'var(--yellow)', color: 'var(--forest-ink)' }}>{student.initials}</div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate" style={{ color: '#F7F6F0' }}>{student.name}</div>
                      <div className="text-xs" style={{ color: 'rgba(220,230,208,.55)', fontFamily: 'var(--mono)' }}>{student.course} · {student.year}</div>
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <div className="flex justify-between text-xs mb-1" style={{ color: 'rgba(220,230,208,.6)', fontFamily: 'var(--mono)' }}>
                      <span>Profile</span><span>{stats.profileCompletion}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(220,230,208,.14)' }}>
                      <div className="h-full rounded-full" style={{ width: `${stats.profileCompletion}%`, background: 'var(--yellow)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </SidebarBody>
          </Sidebar>          {/* ─── BACKDROP ─── */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-[55] bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* ─── MAIN ─── */}
          <div className="main">
            {/* Topbar */}
            <header className="topbar">
              <div>
                <div className="h-title">
                  {greeting()}, <span>{student.name.split(" ")[0]}</span>.
                </div>
                <div className="h-sub">
                  Here&apos;s what your skill journey looks like today.
                </div>
              </div>
              <div className="top-actions">
                <div className="search">
                  <Search size={16} />
                  <input type="text" placeholder="Search skills, opportunities…" />
                </div>
                <button className="icon-btn">
                  <Bell size={18} />
                  <span className="dot" />
                </button>
                <div className="avatar-hd">{student.initials}</div>
              </div>
            </header>

            {/* Content */}
            <main className="content">
              <div className="grid">
                {/* ─── HERO / Progress ─── */}
                <section className="panel hero p-hero">
                  <span className="px-dots" />
                  <div className="hero-top">
                    <span className="eyebrow">Personal Progress</span>
                    <span className="hero-badge">DEMO DATA</span>
                  </div>
                  <h2>
                    Your next opportunity <em>starts with your skills.</em>
                  </h2>
                  <p>
                    You&apos;ve built a strong foundation. Close a few skill gaps to
                    unlock better matches.
                  </p>
                  <div className="hero-metrics">
                    {[
                      { label: "Profile Completion", value: stats.profileCompletion, color: "forest", px: Math.round(stats.profileCompletion / 100 * 6) },
                      { label: "Skill Confidence", value: stats.skillConfidence, color: "yellow", px: Math.round(stats.skillConfidence / 100 * 6) },
                      { label: "Best Match", value: stats.bestMatch, color: "peach", px: Math.round(stats.bestMatch / 100 * 6) },
                    ].map((m) => (
                      <div key={m.label} className={`metric m-${m.color}`}>
                        <div>
                          <div className="metric-num">
                            {m.value}<small>%</small>
                          </div>
                          <div className="metric-label">{m.label}</div>
                        </div>
                        <div className="pix">
                          {Array.from({ length: 6 }, (_, i) => (
                            <i key={i} className={i < m.px ? "on" : ""} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="journey">
                    <div className="journey-title">Your Skill Journey</div>
                    {[
                      { label: "Evidence", sub: "6 items verified", done: true },
                      { label: "Skills", sub: "18 extracted", done: true },
                      { label: "Skill Gap", sub: `Close ${gaps.length} gaps`, active: true },
                      { label: "Match", sub: `Best match ${stats.bestMatch}%` },
                      { label: "Opportunity", sub: "Apply now" },
                    ].map((s, i) => (
                      <div
                        key={s.label}
                        className={`jstep ${s.done ? "done" : s.active ? "active" : "future"}`}
                      >
                        {i < 4 && <div className="jline" />}
                        <div className="jnode">{s.done ? "✓" : i + 1}</div>
                        <div>
                          <div className="jlab">{s.label}</div>
                          <div className="jsub">{s.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ─── SKILL SNAPSHOT ─── */}
                <section className="panel p-snapshot">
                  <span className="eyebrow">Skill Snapshot</span>
                  <div className="panel-title">Your Skill Snapshot</div>
                  <div className="panel-sub">Verified vs self-declared</div>
                  {skills.map((sk) => (
                    <div key={sk.id} className="skill-row">
                      <div className="skill-head">
                        <span className="skill-name">{sk.name}</span>
                        {sk.origin === "evidence" ? (
                          <span className="tag tag-verified">✓ Evidence</span>
                        ) : (
                          <span className="tag tag-self">Self-declared</span>
                        )}
                        <span className="skill-val">{sk.confidence}</span>
                      </div>
                      <div className={`pxbar ${sk.origin === "self-declared" ? "yellow" : ""}`}>
                        {pxSegs(sk.confidence)}
                      </div>
                    </div>
                  ))}
                  <button
                    className="link-more"
                    style={{ marginTop: 10 }}
                    onClick={() => handleNav("Skills")}
                  >
                    View all skills <span>→</span>
                  </button>
                </section>

                {/* ─── BEST MATCH ─── */}
                <section className="panel p-match">
                  <span className="eyebrow">Best Match</span>
                  <div className="panel-title">Best Match For You</div>
                  <div className="match-layout">
                    <div className="match-top">
                      <div className="match-ring-wrap">
                        <svg className="match-ring" viewBox="0 0 120 120">
                          <circle className="b" cx="60" cy="60" r="52" />
                          <circle className="f" cx="60" cy="60" r="52" />
                        </svg>
                        <div className="ring-num">
                          {bestMatch.match}<small>%</small>
                        </div>
                      </div>
                      <div>
                        <div className="match-role">{bestMatch.title}</div>
                        <div className="match-org">
                          {bestMatch.org} / {bestMatch.division}
                        </div>
                        <div className="match-meta">
                          <span className="chip loc">{bestMatch.location}</span>
                          <span className="chip dur">{bestMatch.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="skills-title">
                        Skills matched · {bestMatch.matchedSkills.length + bestMatch.missingSkills.length} of 9
                      </div>
                      <div className="skills-chips">
                        {bestMatch.matchedSkills.map((s) => (
                          <span key={s} className="mch">✓ {s}</span>
                        ))}
                        {bestMatch.missingSkills.map((s) => (
                          <span key={s} className="mch miss">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="match-note">
                      <span className="ic">{IC.note}</span>
                      <span>{bestMatch.explanation}</span>
                    </div>
                    <div className="match-actions">
                      <button className="btn btn-peach" onClick={() => handleNav("Opportunities")}>
                        View opportunity <span className="arr">→</span>
                      </button>
                      <button className="btn" onClick={() => handleNav("Opportunities")}>
                        See all opportunities
                      </button>
                    </div>
                  </div>
                </section>

                {/* ─── SKILL GAPS ─── */}
                <section className="panel p-gaps">
                  <span className="eyebrow" style={{ color: "var(--yellow-dk)" }}>Skill Gap</span>
                  <div className="panel-title">Your Biggest Skill Gaps</div>
                  <div className="panel-sub">
                    Matched against your target role · <b style={{ color: "var(--ink)" }}>{student.targetRole}</b>
                  </div>
                  {gaps.map((g) => (
                    <div key={g.id} className="gap-row">
                      <div className="gap-head">
                        <span className="gap-name">{g.name}</span>
                        <span className="gap-pct">{g.current}%</span>
                      </div>
                      <div className="pxbar gapbar yellow">{pxSegs(g.current, 16)}</div>
                      <div className="gap-meta">
                        <span className={`tag ${g.severity === "High" ? "tag-high" : "tag-med"}`}>
                          Gap: {g.severity}
                        </span>
                        <span className="gap-target">Target {g.required}%+</span>
                      </div>
                    </div>
                  ))}
                  <div className="gap-cta">
                    <span style={{ fontSize: 11, color: "var(--faint)", fontFamily: "var(--mono)" }}>
                      vs. target role requirements
                    </span>
                    <button className="link-more" onClick={() => handleNav("Skill Gap")}>
                      Close these gaps <span>→</span>
                    </button>
                  </div>
                </section>

                {/* ─── APPLICATIONS ─── */}
                <section className="panel p-journey">
                  <span className="eyebrow">Applications</span>
                  <div className="panel-title">Application Journey</div>
                  <div className="panel-sub">Quick status of your submissions</div>
                  {applications.map((app) => (
                    <div key={app.id} className={`app-item ${app.stage}`}>
                      <span className="app-dot" />
                      <div className="app-role">{app.role}</div>
                      <div className="app-org">{app.org}</div>
                      <div className={`app-status ${app.stage}`}>
                        <span className="tick">{app.stageLabel}</span>
                        <span>{app.status}</span>
                      </div>
                    </div>
                  ))}
                  <button className="link-more" onClick={() => handleNav("Applications")}>
                    View all applications <span>→</span>
                  </button>
                </section>

                {/* ─── RECOMMENDATIONS ─── */}
                <section className="panel p-reco">
                  <span className="eyebrow" style={{ color: "var(--lavender-dk)" }}>Recommendations</span>
                  <div className="panel-title">Recommended For Your Skill Gaps</div>
                  <div className="panel-sub">
                    Not random — every pick maps to a gap you can close.
                  </div>
                  {recommendations.map((r) => (
                    <div key={r.id} className="reco-item">
                      <div className="reco-ic">{IC.chart}</div>
                      <div>
                        <div className="reco-gap">{r.closesGap}</div>
                        <div className="reco-course">{r.title}</div>
                        <span className="tag tag-lav" style={{ marginTop: 6 }}>{r.type}</span>
                        <p className="reco-why">{r.why}</p>
                      </div>
                    </div>
                  ))}
                  <button
                    className="link-more"
                    style={{ marginTop: 8 }}
                    onClick={() => handleNav("Recommendations")}
                  >
                    Explore learning paths <span>→</span>
                  </button>
                </section>

                {/* ─── EVIDENCE VAULT ─── */}
                <section className="panel p-evidence">
                  <span className="eyebrow">Evidence Vault</span>
                  <div className="panel-title">Evidence Vault</div>
                  <div className="panel-sub">Proof that backs your skills</div>
                  <div className="ev-stats">
                    <div className="ev-stat">
                      <div className="ev-num">{evidence.total}</div>
                      <div className="ev-lab">Evidence items</div>
                    </div>
                    <div className="ev-stat">
                      <div className="ev-num green">
                        <span className="pix"><i /><i /></span>
                        {evidence.verified}
                      </div>
                      <div className="ev-lab">Verified</div>
                    </div>
                    <div className="ev-stat">
                      <div className="ev-num blue">
                        <span className="pix"><i /><i /></span>
                        {evidence.processing}
                      </div>
                      <div className="ev-lab">Processing</div>
                    </div>
                    <div className="ev-stat">
                      <div className="ev-num peach">
                        <span className="pix"><i /><i /></span>
                        {evidence.needsReview}
                      </div>
                      <div className="ev-lab">Needs review</div>
                    </div>
                  </div>
                  {evidence.items.map((ev) => (
                    <div key={ev.id} className="ev-item">
                      <span className="ev-file" />
                      <div>
                        <div className="ev-name">{ev.title}</div>
                        <div className="ev-sub">{ev.issuer} · {ev.kind}</div>
                      </div>
                      <span
                        className={`tag ev-status ${
                          ev.status === "verified"
                            ? "tag-verified"
                            : ev.status === "processing"
                              ? "tag-process"
                              : "tag-review"
                        }`}
                      >
                        {ev.status === "verified"
                          ? "✓ Verified"
                          : ev.status === "processing"
                            ? "… Processing"
                            : "! Needs review"}
                      </span>
                    </div>
                  ))}
                  <button className="upload-btn" onClick={() => handleNav("Evidence")}>
                    + Upload evidence
                  </button>
                </section>

                {/* ─── QUICK ACTIONS ─── */}
                <section className="panel p-quick">
                  <span className="eyebrow">Quick Actions</span>
                  <div className="panel-title" style={{ marginTop: 6 }}>
                    What do you want to do?
                  </div>
                  <div className="quick-grid" style={{ marginTop: 12 }}>
                    {QUICK_ACTIONS.map((qa) => (
                      <button key={qa.label} className="qaction" onClick={() => handleNav(qa.label)}>
                        <span className={`qa-ic ${qa.c}`}>{IC[qa.icon as keyof typeof IC]}</span>
                        <span>
                          <span className="qa-t">{qa.label}</span>
                          <br />
                          <span className="qa-d">{qa.desc}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* ─── PORTFOLIO ─── */}
                <section className="panel portfolio p-portfolio">
                  <span className="eyebrow">Portfolio</span>
                  <div className="panel-title">Your Verified Portfolio</div>
                  <div className="pf-stats">
                    <div className="pf-stat">
                      <span>Projects</span>
                      <b>{portfolio.projects}</b>
                    </div>
                    <div className="pf-stat">
                      <span>Certificates</span>
                      <b>{portfolio.certificates}</b>
                    </div>
                    <div className="pf-stat">
                      <span>Verified Skills</span>
                      <b>{portfolio.verifiedSkills}</b>
                    </div>
                  </div>
                  <div className="pf-cards">
                    {portfolio.featured.map((f, i) => (
                      <div key={i} className="pf-mini">
                        <div className="pfm-ic">{IC.folder}</div>
                        <div className="pfm-t">{f.title}</div>
                        <div className="pfm-d">Verified</div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary pf-open"
                    onClick={() => handleNav("Portfolio")}
                  >
                    Open portfolio <span className="arr">→</span>
                  </button>
                </section>
              </div>

              <div className="dash-note">
                <span className="lb">PROTOTYPE</span>
                <span>
                  Rendering synthetic demo data · connect the SkillBridge REST API to
                  go live.
                </span>
              </div>
            </main>
          </div>
        </div>

        {/* ─── BOTTOM NAV (mobile) ─── */}


        {/* ─── TOAST ─── */}
        <div className={`toast ${toast ? "show" : ""}`}>
          <span className="pix"><i /><i /><i /></span>
          <span>{toast}</span>
        </div>
      </div>
    </>
  );
}
