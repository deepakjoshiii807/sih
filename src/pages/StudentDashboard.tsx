import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  BookOpen,
  Target,
  Briefcase,
  TrendingUp,
  ChevronRight,
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Award,
  FileText,
  Zap,
  Star,
  LogOut,
  Search,
  Filter,
  Calendar,
  MapPin,
  IndianRupee,
  BarChart3,
  GraduationCap,
  BriefcaseBusiness,
  Sparkles,
  FolderOpen,
} from "lucide-react";
import {
  api,
  type StudentDashboard,
  type StudentSkill,
  type SkillGap,
  type Opportunity,
  type Application,
  type LearningRecommendation,
} from "@/lib/student-api";

/* ─────────────────────── helpers ─────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.07 } },
};

const Card = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`bg-[#0e0e14] border border-white/[0.06] rounded-2xl ${className}`}
  >
    {children}
  </motion.div>
);

const Pill = ({ children, color = "#22C55E" }: { children: React.ReactNode; color?: string }) => (
  <span
    className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
    style={{
      background: `${color}15`,
      color,
      border: `1px solid ${color}30`,
    }}
  >
    {children}
  </span>
);

const stageColors: Record<string, string> = {
  applied: "#3B82F6",
  shortlisted: "#F59E0B",
  interview: "#A855F7",
  offer: "#22C55E",
  joined: "#10B981",
};

/* ─────────────────────── main ─────────────────────── */

export default function StudentDashboard() {
  const [data, setData] = useState<StudentDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "skills" | "opportunities" | "applications" | "portfolio"
  >("overview");

  useEffect(() => {
    api.getDashboard().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-10 h-10 border-2 border-[#22C55E]/30 border-t-[#22C55E] rounded-full animate-spin" />
          <span className="text-white/40 text-sm font-medium">
            Loading your dashboard…
          </span>
        </motion.div>
      </div>
    );
  }

  const { student, stats, skills, gaps, bestMatch, applications, recommendations, evidence, portfolio } =
    data;

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* ─── Top Nav ─── */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center">
                <span className="text-black font-bold text-[10px] tracking-tight">
                  L2L
                </span>
              </div>
              <span className="text-[#E1E0CC] font-semibold text-sm tracking-tight hidden sm:block">
                Lead2Learn
              </span>
            </div>

            {/* Tabs — desktop */}
            <div className="hidden md:flex items-center gap-1">
              {(
                [
                  ["overview", "Overview", BarChart3],
                  ["skills", "Skills", BookOpen],
                  ["opportunities", "Opportunities", Search],
                  ["applications", "Applications", Briefcase],
                  ["portfolio", "Portfolio", FolderOpen],
                ] as const
              ).map(([key, label, Icon]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === key
                      ? "bg-[#22C55E]/15 text-[#22C55E]"
                      : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            {/* User pill */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/[0.04] rounded-full px-3 py-1.5 border border-white/[0.06]">
                <div className="w-6 h-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center text-[10px] font-bold text-[#22C55E]">
                  {student.initials}
                </div>
                <span className="text-xs text-white/60 hidden sm:block">
                  {student.name.split(" ")[0]}
                </span>
              </div>
              <button className="text-white/30 hover:text-white/60 transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Tabs ─── */}
      <div className="md:hidden sticky top-14 sm:top-16 z-40 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.06] overflow-x-auto">
        <div className="flex gap-1 px-3 py-2 min-w-max">
          {(
            [
              ["overview", "Overview"],
              ["skills", "Skills"],
              ["opportunities", "Opps"],
              ["applications", "Apps"],
              ["portfolio", "Portfolio"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                activeTab === key
                  ? "bg-[#22C55E]/15 text-[#22C55E]"
                  : "text-white/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Content ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* ─── OVERVIEW TAB ─── */}
        {activeTab === "overview" && (
          <motion.div {...stagger} initial="initial" animate="animate" className="space-y-6">
            {/* Profile Header */}
            <motion.div variants={fadeUp}>
              <Card className="p-5 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#22C55E]/20 to-[#22C55E]/5 border border-[#22C55E]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#22C55E] font-bold text-xl sm:text-2xl">
                      {student.initials}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#E1E0CC] tracking-tight">
                      {student.name}
                    </h1>
                    <p className="text-white/40 text-sm mt-1">
                      {student.course} · {student.year} · {student.institution}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Pill color="#3B82F6">
                        <Target size={10} />
                        {student.targetRole}
                      </Pill>
                      <Pill>
                        <MapPin size={10} />
                        {student.location}
                      </Pill>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-2">
                    <div className="text-right">
                      <span className="text-white/30 text-[10px] uppercase tracking-wider font-semibold">
                        Best Match
                      </span>
                      <div className="text-[#22C55E] text-3xl font-bold">
                        {stats.bestMatch}%
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  label: "Profile Completion",
                  value: `${stats.profileCompletion}%`,
                  icon: User,
                  color: "#22C55E",
                },
                {
                  label: "Skill Confidence",
                  value: `${stats.skillConfidence}%`,
                  icon: BookOpen,
                  color: "#3B82F6",
                },
                {
                  label: "Applications",
                  value: applications.length.toString(),
                  icon: Briefcase,
                  color: "#F59E0B",
                },
                {
                  label: "Verified Docs",
                  value: `${evidence.verified}/${evidence.total}`,
                  icon: Shield,
                  color: "#A855F7",
                },
              ].map((s) => (
                <Card key={s.label} className="p-4 sm:p-5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${s.color}15` }}
                  >
                    <s.icon size={16} style={{ color: s.color }} />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[#E1E0CC]">
                    {s.value}
                  </div>
                  <div className="text-white/35 text-[11px] font-medium mt-0.5">
                    {s.label}
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Best Match */}
            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Star size={14} className="text-[#22C55E]" />
                Best Matching Opportunity
              </h3>
              <OpportunityCard opp={bestMatch} featured />
            </motion.div>

            {/* Two-column: Applications + Recommendations */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applications */}
              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Briefcase size={14} className="text-[#3B82F6]" />
                  Recent Applications
                </h3>
                <div className="space-y-3">
                  {applications.map((app) => (
                    <ApplicationCard key={app.id} app={app} />
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#F59E0B]" />
                  Recommended For You
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <RecommendationCard key={rec.id} rec={rec} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ─── SKILLS TAB ─── */}
        {activeTab === "skills" && (
          <motion.div {...stagger} initial="initial" animate="animate" className="space-y-6">
            <motion.div variants={fadeUp}>
              <h2 className="text-xl font-bold text-[#E1E0CC] mb-1">Your Skills</h2>
              <p className="text-white/35 text-sm">
                Skills detected from your academic records, certificates and self-declarations.
              </p>
            </motion.div>

            {/* Skills Grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((sk) => (
                <SkillCard key={sk.id} skill={sk} />
              ))}
            </motion.div>

            {/* Skill Gaps */}
            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle size={14} className="text-[#F59E0B]" />
                Skill Gaps for {student.targetRole}
              </h3>
              <div className="space-y-3">
                {gaps.map((gap) => (
                  <GapCard key={gap.id} gap={gap} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ─── OPPORTUNITIES TAB ─── */}
        {activeTab === "opportunities" && (
          <motion.div {...stagger} initial="initial" animate="animate" className="space-y-6">
            <motion.div variants={fadeUp}>
              <h2 className="text-xl font-bold text-[#E1E0CC] mb-1">
                Matching Opportunities
              </h2>
              <p className="text-white/35 text-sm">
                Opportunities matched to your skills and target role.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="flex-1 bg-[#0e0e14] border border-white/[0.06] rounded-xl px-4 py-2.5 flex items-center gap-2">
                <Search size={14} className="text-white/30" />
                <span className="text-white/30 text-sm">Search opportunities…</span>
              </div>
              <button className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 flex items-center gap-2 text-white/40 text-sm hover:bg-white/[0.08] transition-colors">
                <Filter size={14} />
                Filters
              </button>
            </motion.div>

            <motion.div variants={fadeUp}>
              <OpportunityCard opp={bestMatch} featured />
            </motion.div>

            {/* Extra mock opportunities */}
            {[
              {
                id: "op-2",
                title: "AYUSH Research Fellowship",
                org: "CCRAS",
                division: "Central Research Council",
                location: "New Delhi",
                duration: "6 Months",
                stipend: "₹18,000/mo",
                match: 85,
                matchedSkills: ["Research Methods", "Data Analysis"],
                missingSkills: ["Scientific Writing"],
                explanation: "85% match — strong alignment with research and data skills.",
              },
              {
                id: "op-3",
                title: "Pharmacovigilance Intern",
                org: "NIPER",
                division: "Drug Safety Division",
                location: "Hyderabad",
                duration: "4 Months",
                match: 78,
                matchedSkills: ["Clinical Research"],
                missingSkills: ["Statistical Analysis", "Scientific Writing"],
                explanation: "78% match — clinical research experience is highly valued here.",
              },
              {
                id: "op-4",
                title: "Public Health Data Analyst",
                org: "MoHFW",
                division: "National Health Mission",
                location: "Remote",
                duration: "3 Months",
                stipend: "₹10,000/mo",
                match: 74,
                matchedSkills: ["Python", "Data Analysis"],
                missingSkills: ["Statistical Analysis"],
                explanation: "74% match — your Python and data analysis skills are a strong fit.",
              },
            ].map((opp) => (
              <motion.div key={opp.id} variants={fadeUp}>
                <OpportunityCard opp={opp as Opportunity} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ─── APPLICATIONS TAB ─── */}
        {activeTab === "applications" && (
          <motion.div {...stagger} initial="initial" animate="animate" className="space-y-6">
            <motion.div variants={fadeUp}>
              <h2 className="text-xl font-bold text-[#E1E0CC] mb-1">Applications</h2>
              <p className="text-white/35 text-sm">
                Track your applications and their progress.
              </p>
            </motion.div>

            {/* Pipeline */}
            <motion.div variants={fadeUp}>
              <Card className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-1 sm:gap-2">
                  {["Applied", "Shortlisted", "Interview", "Offer", "Joined"].map(
                    (stage, i) => {
                      const count = applications.filter(
                        (a) => a.stageLabel === stage
                      ).length;
                      return (
                        <div key={stage} className="flex items-center flex-1">
                          <div className="flex-1 text-center">
                            <div
                              className={`text-lg sm:text-xl font-bold ${
                                count > 0 ? "text-[#E1E0CC]" : "text-white/20"
                              }`}
                            >
                              {count}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-white/30 font-medium mt-0.5">
                              {stage}
                            </div>
                          </div>
                          {i < 4 && (
                            <div className="w-4 sm:w-8 h-px bg-white/[0.06] mx-1" />
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Application list */}
            <motion.div variants={fadeUp} className="space-y-3">
              {applications.map((app) => (
                <ApplicationCard key={app.id} app={app} full />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PORTFOLIO TAB ─── */}
        {activeTab === "portfolio" && (
          <motion.div {...stagger} initial="initial" animate="animate" className="space-y-6">
            <motion.div variants={fadeUp}>
              <h2 className="text-xl font-bold text-[#E1E0CC] mb-1">Portfolio</h2>
              <p className="text-white/35 text-sm">
                Your projects, certificates and verified skills.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Projects", value: portfolio.projects, icon: FolderOpen, color: "#22C55E" },
                { label: "Certificates", value: portfolio.certificates, icon: Award, color: "#3B82F6" },
                { label: "Verified Skills", value: portfolio.verifiedSkills, icon: Shield, color: "#A855F7" },
                {
                  label: "Evidence",
                  value: `${evidence.verified}/${evidence.total}`,
                  icon: FileText,
                  color: "#F59E0B",
                },
              ].map((s) => (
                <Card key={s.label} className="p-4 text-center">
                  <s.icon size={18} style={{ color: s.color }} className="mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#E1E0CC]">{s.value}</div>
                  <div className="text-[10px] text-white/30 font-medium mt-0.5">
                    {s.label}
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Featured Projects */}
            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap size={14} className="text-[#22C55E]" />
                Featured Work
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {portfolio.featured.map((f, i) => (
                  <Card key={i} className="p-5 group hover:border-[#22C55E]/20 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <FolderOpen size={18} className="text-[#22C55E]/50" />
                      <ArrowUpRight
                        size={14}
                        className="text-white/20 group-hover:text-[#22C55E] transition-colors"
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-[#E1E0CC] mb-1">
                      {f.title}
                    </h4>
                    <Pill>{f.tag}</Pill>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Evidence */}
            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText size={14} className="text-[#A855F7]" />
                Evidence Documents
              </h3>
              <div className="space-y-2">
                {evidence.items.map((ev) => (
                  <Card key={ev.id} className="p-4 flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          ev.status === "verified"
                            ? "#22C55E15"
                            : ev.status === "processing"
                              ? "#F59E0B15"
                              : "#EF444415",
                      }}
                    >
                      {ev.status === "verified" ? (
                        <CheckCircle2 size={16} className="text-[#22C55E]" />
                      ) : ev.status === "processing" ? (
                        <Clock size={16} className="text-[#F59E0B]" />
                      ) : (
                        <AlertTriangle size={16} className="text-[#EF4444]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#E1E0CC] truncate">
                        {ev.title}
                      </h4>
                      <p className="text-[11px] text-white/30">
                        {ev.issuer} · {ev.kind}
                      </p>
                    </div>
                    <Pill
                      color={
                        ev.status === "verified"
                          ? "#22C55E"
                          : ev.status === "processing"
                            ? "#F59E0B"
                            : "#EF4444"
                      }
                    >
                      {ev.status === "verified"
                        ? "Verified"
                        : ev.status === "processing"
                          ? "Processing"
                          : "Needs Review"}
                    </Pill>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

/* ─────────────────── sub-components ─────────────────── */

function SkillCard({ skill }: { skill: StudentSkill }) {
  return (
    <Card className="p-4 group hover:border-[#22C55E]/20 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-[#E1E0CC]">{skill.name}</h4>
        <Pill color={skill.origin === "evidence" ? "#22C55E" : "#3B82F6"}>
          {skill.origin === "evidence" ? (
            <Shield size={9} />
          ) : (
            <User size={9} />
          )}
          {skill.origin === "evidence" ? "Verified" : "Self-declared"}
        </Pill>
      </div>

      {/* Confidence bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, #22C55E, ${
                skill.confidence >= 80 ? "#22C55E" : skill.confidence >= 60 ? "#F59E0B" : "#EF4444"
              })`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.confidence}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <span className="text-xs font-bold text-[#E1E0CC] w-8 text-right">
          {skill.confidence}%
        </span>
      </div>

      {skill.source && (
        <p className="text-[10px] text-white/25 mt-2.5 flex items-center gap-1">
          <BookOpen size={9} />
          {skill.source}
        </p>
      )}
    </Card>
  );
}

function GapCard({ gap }: { gap: SkillGap }) {
  const sevColor =
    gap.severity === "High"
      ? "#EF4444"
      : gap.severity === "Medium"
        ? "#F59E0B"
        : "#22C55E";

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-[#E1E0CC]">{gap.name}</h4>
        <Pill color={sevColor}>{gap.severity} Priority</Pill>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/30 w-16">Your Level</span>
          <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#22C55E]"
              initial={{ width: 0 }}
              animate={{ width: `${gap.current}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          <span className="text-[10px] text-white/40 w-8 text-right">{gap.current}%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/30 w-16">Required</span>
          <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#3B82F6]"
              initial={{ width: 0 }}
              animate={{ width: `${gap.required}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            />
          </div>
          <span className="text-[10px] text-white/40 w-8 text-right">{gap.required}%</span>
        </div>
      </div>
    </Card>
  );
}

function OpportunityCard({
  opp,
  featured = false,
}: {
  opp: Opportunity;
  featured?: boolean;
}) {
  return (
    <Card
      className={`p-5 sm:p-6 group hover:border-[#22C55E]/20 transition-all ${
        featured ? "ring-1 ring-[#22C55E]/10" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-base font-bold text-[#E1E0CC]">{opp.title}</h3>
            {featured && <Pill color="#22C55E">Best Match</Pill>}
          </div>
          <p className="text-white/40 text-sm mb-3">
            {opp.org} · {opp.division}
          </p>

          <div className="flex flex-wrap gap-3 text-[11px] text-white/30 mb-4">
            <span className="flex items-center gap-1">
              <MapPin size={10} /> {opp.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={10} /> {opp.duration}
            </span>
            {opp.stipend && (
              <span className="flex items-center gap-1">
                <IndianRupee size={10} /> {opp.stipend}
              </span>
            )}
          </div>

          <p className="text-[12px] text-white/30 mb-4 leading-relaxed">
            {opp.explanation}
          </p>

          {/* Matched / Missing Skills */}
          <div className="flex flex-wrap gap-1.5">
            {opp.matchedSkills.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
              >
                ✓ {s}
              </span>
            ))}
            {opp.missingSkills.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20"
              >
                ✗ {s}
              </span>
            ))}
          </div>
        </div>

        {/* Match circle */}
        <div className="flex sm:flex-col items-center gap-3 sm:items-end flex-shrink-0">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="4"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#22C55E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 28}
                initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                animate={{
                  strokeDashoffset:
                    2 * Math.PI * 28 * (1 - opp.match / 100),
                }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-[#E1E0CC]">
                {opp.match}
                <span className="text-[10px] text-white/30">%</span>
              </span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] font-semibold text-[#22C55E] hover:text-[#16a34a] transition-colors">
            Apply Now
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </Card>
  );
}

function ApplicationCard({
  app,
  full = false,
}: {
  app: Application;
  full?: boolean;
}) {
  const color = stageColors[app.stage] || "#22C55E";

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15` }}
        >
          <Briefcase size={16} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm font-semibold text-[#E1E0CC] truncate">
              {app.role}
            </h4>
            <Pill color={color}>{app.stageLabel}</Pill>
          </div>
          <p className="text-[11px] text-white/30">{app.org}</p>
          {full && (
            <div className="mt-2 space-y-1">
              <p className="text-[11px] text-white/40">{app.status}</p>
              {app.nextStep && (
                <p className="text-[11px] text-[#22C55E]/70 flex items-center gap-1">
                  <Calendar size={10} />
                  {app.nextStep}
                </p>
              )}
            </div>
          )}
        </div>
        {full && (
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-[#E1E0CC]">
              {app.match}
              <span className="text-[10px] text-white/30">%</span>
            </div>
            <div className="text-[9px] text-white/25">match</div>
          </div>
        )}
      </div>
    </Card>
  );
}

function RecommendationCard({ rec }: { rec: LearningRecommendation }) {
  const typeColors: Record<string, string> = {
    Course: "#3B82F6",
    Workshop: "#F59E0B",
    "Learning path": "#A855F7",
  };

  return (
    <Card className="p-4 group hover:border-[#22C55E]/20 transition-colors cursor-pointer">
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${typeColors[rec.type] || "#22C55E"}15` }}
        >
          <GraduationCap
            size={16}
            style={{ color: typeColors[rec.type] || "#22C55E" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm font-semibold text-[#E1E0CC] truncate">
              {rec.title}
            </h4>
          </div>
          <p className="text-[11px] text-white/30">
            {rec.provider} · {rec.duration}
          </p>
          <p className="text-[11px] text-white/25 mt-1.5">{rec.why}</p>
          <div className="flex items-center gap-2 mt-2">
            <Pill color={typeColors[rec.type] || "#22C55E"}>{rec.type}</Pill>
            <span className="text-[10px] text-white/20">
              Closes gap: {rec.closesGap}
            </span>
          </div>
        </div>
        <ChevronRight
          size={14}
          className="text-white/20 group-hover:text-[#22C55E] transition-colors mt-1 flex-shrink-0"
        />
      </div>
    </Card>
  );
}
