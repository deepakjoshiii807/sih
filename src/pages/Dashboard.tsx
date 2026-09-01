import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PaperCard from "@/components/PaperCard";
import OpportunityCard from "@/components/OpportunityCard";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";
import { opportunities, skillGaps, roadmapSteps } from "@/lib/mockData";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Good morning, <span className="gradient-text">Shubham</span>.</h1>
          <p className="text-[14px] text-white/35 sans">What are you looking for today?</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
          <SearchBar size="large" placeholder="Ask anything — courses, scholarships, jobs..." />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white tracking-tight">Recommended for You</h2>
                <a href="/explore" className="text-[11px] font-medium text-[#7C6BF0] hover:text-[#B8AEFF] transition-colors sans flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.slice(0, 4).map((opp, i) => <OpportunityCard key={opp.id} opportunity={opp} index={i} compact />)}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-lg font-bold text-white mb-4 tracking-tight">Your Skill Progress</h2>
              <PaperCard className="space-y-3">
                {skillGaps.map((s) => <ProgressBar key={s.skill} label={s.skill} progress={s.progress} completed={s.completed} />)}
              </PaperCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white tracking-tight">Career Roadmap</h2>
                <a href="/roadmap" className="text-[11px] font-medium text-[#7C6BF0] hover:text-[#B8AEFF] transition-colors sans flex items-center gap-1">Full roadmap <ArrowRight className="w-3 h-3" /></a>
              </div>
              <PaperCard>
                <div className="flex items-center gap-2 flex-wrap">
                  {roadmapSteps.slice(0, 5).map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <span className={`text-[11px] font-medium sans px-2.5 py-1 rounded-full ${s.status === "completed" ? "bg-[#00D2D3]/10 text-[#00D2D3] border border-[#00D2D3]/20" : s.status === "in-progress" ? "bg-[#5B8DEF]/10 text-[#5B8DEF] border border-[#5B8DEF]/20" : "bg-white/[0.04] text-white/25 border border-white/[0.06]"}`}>
                        {s.status === "completed" && "✓ "}{s.title}
                      </span>
                      {i < 4 && <span className="text-white/10">→</span>}
                    </div>
                  ))}
                </div>
              </PaperCard>
            </motion.div>
          </div>
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-[14px] font-bold text-white mb-3 flex items-center gap-2"><Bookmark className="w-4 h-4 text-[#FDCB6E]" /> Saved Opportunities</h3>
              <PaperCard className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <div key={opp.id} className="flex items-center gap-3 pb-3 border-b border-white/[0.04] last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0"><span className="text-[10px] font-bold text-white/30 sans">{opp.type[0].toUpperCase()}</span></div>
                    <div className="min-w-0"><p className="text-[12px] font-semibold text-white/80 truncate">{opp.title}</p><p className="text-[10px] text-white/25 sans">{opp.provider}</p></div>
                  </div>
                ))}
              </PaperCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h3 className="text-[14px] font-bold text-white mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-[#FF6B6B]" /> Upcoming Deadlines</h3>
              <PaperCard className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <div key={opp.id} className="pb-3 border-b border-white/[0.04] last:border-0 last:pb-0">
                    <p className="text-[12px] font-semibold text-white/80">{opp.title}</p>
                    <p className="text-[10px] text-[#FF6B6B] font-semibold sans mt-0.5">Deadline: {opp.deadline}</p>
                  </div>
                ))}
              </PaperCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="text-[14px] font-bold text-white mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-[#5B8DEF]" /> Community Activity</h3>
              <PaperCard>
                <p className="text-[12px] text-white/35 mb-3 sans">3 new threads in your communities</p>
                <a href="/community" className="text-[11px] font-medium text-[#7C6BF0] hover:text-[#B8AEFF] transition-colors sans flex items-center gap-1">View discussions <ArrowRight className="w-3 h-3" /></a>
              </PaperCard>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
