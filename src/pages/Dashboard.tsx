import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock, MessageSquare, Target, Zap, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PaperCard from "@/components/PaperCard";
import OpportunityCard from "@/components/OpportunityCard";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";
import { PixelGraduation, PixelDocument, PixelGraph, PixelTarget } from "@/components/PixelIcons";
import { opportunities, skillGaps, roadmapSteps } from "@/lib/mockData";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 pixel-card bg-card p-6 shadow-[4px_4px_0px_var(--ink)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-forest border-[3px] border-[#2A4A35] shadow-[3px_3px_0px_#2A4A35] flex items-center justify-center text-xl font-bold text-cream pixel shrink-0">S</div>
            <div>
              <h1 className="text-2xl font-extrabold text-ink tracking-tight">Good morning, <span className="text-forest">Shubham</span>. 👋</h1>
              <p className="text-[13px] text-ink-muted sans">What are you looking for today?</p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
          <SearchBar size="large" placeholder="Ask anything — courses, scholarships, jobs..." />
        </motion.div>

        {/* Stats Row */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Profile", value: "72%", icon: PixelTarget, color: "var(--forest)" },
            { label: "Verified Skills", value: "32", icon: PixelDocument, color: "var(--blue)" },
            { label: "Total Skills", value: "48", icon: PixelGraduation, color: "var(--purple)" },
            { label: "Match Score", value: "HIGH", icon: PixelGraph, color: "var(--yellow)" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cream-dark border-2 border-ink shadow-[2px_2px_0px_var(--ink)] flex items-center justify-center shrink-0">
                  <s.icon className="text-ink" size={18} />
                </div>
                <div>
                  <p className="pixel text-[9px] text-ink-muted">{s.label}</p>
                  <p className="text-xl font-extrabold text-ink">{s.value}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold text-ink tracking-tight flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow" /> Recommended for You
                </h2>
                <a href="/explore" className="text-[11px] font-bold text-forest hover:text-forest-light transition-colors sans flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.slice(0, 4).map((opp, i) => <OpportunityCard key={opp.id} opportunity={opp} index={i} compact />)}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-lg font-extrabold text-ink mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue" /> Your Skill Progress
              </h2>
              <PaperCard className="space-y-3">
                {skillGaps.map((s) => <ProgressBar key={s.skill} label={s.skill} progress={s.progress} completed={s.completed} />)}
              </PaperCard>
            </motion.div>

            {/* Roadmap Preview */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold text-ink tracking-tight flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-forest" /> Career Roadmap
                </h2>
                <a href="/roadmap" className="text-[11px] font-bold text-forest hover:text-forest-light transition-colors sans flex items-center gap-1">Full roadmap <ArrowRight className="w-3 h-3" /></a>
              </div>
              <PaperCard>
                <div className="flex items-center gap-2 flex-wrap">
                  {roadmapSteps.slice(0, 5).map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold pixel px-2.5 py-1 border-2 ${s.status === "completed" ? "bg-forest text-white border-[#2A4A35] shadow-[2px_2px_0px_#2A4A35]" : s.status === "in-progress" ? "bg-blue text-white border-[#2A5A6A] shadow-[2px_2px_0px_#2A5A6A]" : "bg-cream-dark text-ink-muted border-border shadow-[2px_2px_0px_var(--border)]"}`}>
                        {s.status === "completed" && "✓ "}{s.title}
                      </span>
                      {i < 4 && <span className="text-ink-muted font-bold">→</span>}
                    </div>
                  ))}
                </div>
              </PaperCard>
            </motion.div>
          </div>

          <div className="space-y-6">
            {/* Saved */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-[14px] font-extrabold text-ink mb-3 flex items-center gap-2"><Bookmark className="w-4 h-4 text-yellow" /> Saved</h3>
              <PaperCard className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <div key={opp.id} className="flex items-center gap-3 pb-3 border-b-[2px] border-border last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-cream-dark border-2 border-border flex items-center justify-center shrink-0"><span className="text-[10px] font-bold text-ink-muted pixel">{opp.type[0].toUpperCase()}</span></div>
                    <div className="min-w-0"><p className="text-[12px] font-bold text-ink truncate">{opp.title}</p><p className="text-[10px] text-ink-muted sans">{opp.provider}</p></div>
                  </div>
                ))}
              </PaperCard>
            </motion.div>

            {/* Deadlines */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h3 className="text-[14px] font-extrabold text-ink mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-[#C75B4A]" /> Deadlines</h3>
              <PaperCard className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <div key={opp.id} className="pb-3 border-b-[2px] border-border last:border-0 last:pb-0">
                    <p className="text-[12px] font-bold text-ink">{opp.title}</p>
                    <p className="text-[10px] text-[#C75B4A] font-bold sans mt-0.5 pixel">⏰ {opp.deadline}</p>
                  </div>
                ))}
              </PaperCard>
            </motion.div>

            {/* Community */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="text-[14px] font-extrabold text-ink mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-5 text-purple" /> Community</h3>
              <PaperCard>
                <p className="text-[12px] text-ink-muted mb-3 sans">3 new threads in your communities</p>
                <a href="/community" className="pixel-btn pixel-btn-accent text-[7px] py-1.5">View Discussions →</a>
              </PaperCard>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
